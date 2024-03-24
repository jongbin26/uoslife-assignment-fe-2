import { useEffect, useContext } from 'react';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';

interface ProfileResponse {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

const useApi = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(LoginContext);

  const checkIsLogin = useEffect(() => {
    new Promise<ProfileResponse>((resolve, reject) => {
      const accessToken = localStorage.getItem('access_token');
      //access_token이 있는 경우
      if (accessToken) {
        API.get('auth/profile', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then(response => response.json())
          .then(() => setIsLogin(true))
          .catch(error => {
            if (error.response.status === 401) {
              setIsLogin(false);
              console.log('401에러');
              return;
            }
          });
        ///main으로 라우팅
        navigate('/main');
      }
      //access_token이 없는 경우
      else {
        checkIsRefreshTokenExpired().catch(() => {
          navigate('/');
        });
      }
    });
  }, [isLogin]);

  const checkIsRefreshTokenExpired = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = new Promise<LoginResponse>((resolve, reject) => {
      API.post('auth/refresh-token', {
        json: { refreshToken },
        body: JSON.stringify({
          refreshToken: `${refreshToken}`,
        }),
      })
        .then(response => response.json<LoginResponse>())
        .then(data => {
          resolve(data);
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
        })
        .catch(error => {
          setIsLogin(false);
          navigate('/');
        });
    });
    return response;
  };

  return { checkIsLogin, checkIsRefreshTokenExpired };
};
export default useApi;

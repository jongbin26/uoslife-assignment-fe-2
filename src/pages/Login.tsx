import React, { useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { API } from '../api';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';
import Toast from '../components/Toast';
import loadingIcon from '../images/loading-icon.svg';
import logo from '../images/Logo.svg';
import { StyledButton } from '../components/Button';
import checkIsLogin from '../hooks/useApi';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isToast, setIsToast] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const { setIsLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const loginInputRef = useRef<HTMLInputElement>(null);

  //로그인 상태 확인checkIsLogin();
  checkIsLogin();

  const handleLogin = async (email: string, password: string) => {
    new Promise<LoginResponse>((resolve, reject) => {
      API.post('auth/login', {
        json: { email, password },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(response => response.json<LoginResponse>())
        .then(data => {
          resolve(data);
          setIsLogin(true);
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          navigate('/main');
        })
        .catch(error => {
          console.log(error);
          setIsLogin(false);
          setIsLoading(false);
          handleToast('일치하는 정보를 찾을 수 없습니다.');
          setEmail('');
          setPassword('');
          loginInputRef.current?.focus();
        });
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!email || !password) {
      handleToast('입력을 모두 완료해주세요.');
      return;
    }
    setIsLoading(true);
    handleLogin(email, password);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleToast = (message: string) => {
    setToastMessage(message);
    setIsToast(true);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer: number = window.setTimeout(() => {
      setIsToast(false);
    }, 2000);
    setTimer(newTimer);
  };
  return (
    <Wrapper>
      <StyledForm onSubmit={onSubmit}>
        <LogoImg src={logo} />
        <InputWrapper $loadingState={isLoading}>
          <StyledInput
            type="email"
            placeholder="이메일"
            onChange={onEmailChange}
            value={email}
            ref={loginInputRef}
          />
          <StyledInput
            type="password"
            placeholder="비밀번호"
            onChange={onPasswordChange}
            value={password}
          />
        </InputWrapper>
        <LoadingIcon $loadingState={isLoading} src={loadingIcon} />
        <StyledButton type="submit">로그인</StyledButton>
      </StyledForm>
      {/* <LoadingIcon $loadingState={isLoading} src={loadingIcon} /> */}
      <Toast toastState={isToast}>{toastMessage}</Toast>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  align-items: center;
  justify-content: center;
`;

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLInputElement>) => void;
};

const StyledForm = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 500px;
  height: 350px;
  padding: 20px;

  border: 1px solid #d0d0d0;
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 #d0d0d0;
`;

const scaleAnimation = keyframes`
  0%{
    scale: 100%;
  }
  50%{
    scale: 105%;
  }
  100%{
    sacle:100%;
  }
`;

const StyledInput = styled.input`
  width: 200px;
  height: 40px;
  margin: 10px;

  border: 1px solid #707070;
  border-radius: 5px;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:focus {
    border: 1px solid #1e75de;
    animation: ${scaleAnimation} 0.3s linear forwards;
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  } 
`;

type LoadingProps = {
  $loadingState: boolean;
};

const LoadingIcon = styled.img<LoadingProps>`
  position: absolute;
  opacity: 0;
  ${props =>
    props.$loadingState &&
    css`
      opacity: 1;
      transform: translateY(-10%);
    `}
  animation: ${rotateAnimation} 4s cubic-bezier(0.25, 0.51, 0.43, 0.7) infinite;
  transition: ease-in 0.1s;
  width: 48px;
  height: 48px;
`;

const LogoImg = styled.img`
  width: 35px;
  height: 35px;
  margin: 10px;
`;

const InputWrapper = styled.div<LoadingProps>`
  display: flex;
  flex-direction: column;
  opacity: 1;
  ${props =>
    props.$loadingState &&
    css`
      opacity: 0;
      transform: translateY(-10%);
    `}
  transition: ease-in 0.1s;
`;

export default Login;

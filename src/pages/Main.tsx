// import Category from '../components/Category';
import { StyledButton } from '../components/Button';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../App';
import checkIsLogin from '../hooks/useApi';
import Todo from '../components/Todo';
import styled from 'styled-components';
import logo from '../images/Logo.svg';

const Main = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const clickLogout = (): void => {
    setIsLogin(false);
    if (localStorage.getItem('access_token'))
      localStorage.removeItem('access_token');
    if (localStorage.getItem('refresh_token'))
      localStorage.removeItem('refresh_token');
    navigate('/');
  };

  //로그인 상태 확인
  checkIsLogin();
  return (
    <MainWrapper>
      <Header>
        <LogoImg src={logo} />
        <StyledButton onClick={clickLogout}>로그아웃</StyledButton>
      </Header>
      <Todo />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  padding: 10px;
  top: 0;
  border-bottom: 1px solid #878787;
`;

const LogoImg = styled.img`
  width: 35px;
  height: 35px;
  margin: 10px;
`;
export default Main;

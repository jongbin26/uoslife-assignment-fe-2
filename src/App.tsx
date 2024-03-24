import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createContext } from 'react';
import GlobalStyle from './GlobalStyle';
import Login from './pages/Login';
import Main from './pages/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/main',
    element: <Main />,
  },
]);

interface LoginContextType {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const defaultSetIsLogin = () => {};

export const LoginContext = createContext<LoginContextType>({
  isLogin: false,
  setIsLogin: defaultSetIsLogin,
});

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <LoginContext.Provider value={{ isLogin, setIsLogin }}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </LoginContext.Provider>
    </>
  );
};

export default App;

import styled, { css } from 'styled-components';

const Toast = ({ children, toastState }) => {
  return (
    <ToastContainer $toastState={toastState}>
      <ToastText>{children}</ToastText>
    </ToastContainer>
  );
};
export default Toast;

const ToastContainer = styled.div`
  position: absolute;
  top: 26%;
  padding: 12px;

  opacity: 0;
  box-shadow: 0 4px 24px 0 #cecece;
  display: flex;
  min-width: 100px;
  height: 50px;

  border-radius: 8px;
  background-color: #408cff;
  align-items: center;
  justify-content: center;
  transition: ease-in 0.5s;
  ${props =>
    props.$toastState &&
    css`
      opacity: 1;
      transform: translateY(-10%);
    `}
`;
const ToastText = styled.div`
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -2px;
`;

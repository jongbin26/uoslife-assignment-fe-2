import styled from 'styled-components';
import todoApi from '../../hooks/todoApi';

const { deleteTodo } = todoApi();

const SelectModal = ({
  isModalOn,
  setIsModalOn,
  setIsUpdateModalOn,
  targetId,
  setTargetId,
  setUpdateText,
}) => {
  const clickUpdateButton = () => {
    setIsUpdateModalOn(true);
    setIsModalOn(false);
  };
  const clickDeleteButton = () => {
    setIsModalOn(false);
    deleteTodo(targetId);
  };
  const closeModal = () => {
    setIsModalOn(false);
    setTargetId(null);
    setUpdateText(null);
  };

  return (
    <ModalWrapper $isModalOn={isModalOn}>
      <Item onClick={clickUpdateButton}>수정하기</Item>
      <Item onClick={clickDeleteButton}>삭제하기</Item>
      <Item onClick={closeModal}>취소하기</Item>
    </ModalWrapper>
  );
};
export default SelectModal;

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 250px;

  border: 1px solid #d0d0d0;
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 #d0d0d0;
  overflow: hidden;
  z-index: 800;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;

  opacity: ${props => (props.$isModalOn ? '1' : '0')};
  pointer-events: ${props => (props.$isModalOn ? 'auto' : 'none')};

  font-size: 18px;
  :nth-child(1) {
    color: green;
  }
  :nth-child(2) {
    color: red;
  }
  :nth-child(3) {
    color: black;
  }
`;
const Item = styled.div`
  display: flex;
  padding: 10px 20px 10px 20px;
  width: 100%;
  flex-basis: 34%;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  cursor: pointer;
  transition: ease-out 0.2s;
  &:hover {
    background-color: #d0d0d0;
    scale: 101%;
  }
  gap: 20px;
`;

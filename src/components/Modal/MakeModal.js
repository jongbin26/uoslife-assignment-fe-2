import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import todoApi from '../../hooks/todoApi';
const { createTodo, updateTodo } = todoApi();

const MakeModal = ({
  children,
  isModalOn,
  setIsModalOn,
  type,
  targetId,
  setTargetId,
  updateText,
  setUpdateText,
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (type === '추가') {
      setText('');
    } else if (type === '수정') {
      setText(updateText);
    }
  }, [isModalOn]);
  //type에 따라서 추가하기랑 수정하기
  const clickBottomButton = () => {
    if (text.length === 0) {
      inputRef.current?.focus();
      return;
    }
    if (type === '추가') {
      createTodo(text);
    } else if (type === '수정') {
      updateTodo(targetId, text);
      setUpdateText(null);
    }
    //updateAPI
    setIsModalOn(false);
  };
  const closeModal = () => {
    setIsModalOn(false);
    if (type === '수정') {
      setTargetId(null);
      setUpdateText(null);
    }
  };
  return (
    <ModalWrapper $isModalOn={isModalOn}>
      <TopBar type={type}>
        <div>{children}</div>
        <div onClick={closeModal}>x</div>
      </TopBar>
      <StyledInput
        spellCheck="false"
        value={text}
        onChange={e => setText(e.target.value)}
        ref={inputRef}
      />
      <BottomButton type={type} onClick={clickBottomButton}>
        완료
      </BottomButton>
    </ModalWrapper>
  );
};
export default MakeModal;

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 250px;

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
`;
const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #878787;

  padding: 10px 20px 10px 20px;
  width: 100%;
  flex-basis: 20%;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  :nth-child(1) {
    color: ${props => (props.type === '추가' ? '#0089ff' : 'green')};
    flex-basis: 90%;
  }
  :nth-child(2) {
    display: flex;
    flex-basis: 10%;
    align-items: center;
    justify-content: end;
    color: red;
    font-size: 26px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      scale: 120%;
    }
  }
`;

const StyledInput = styled.textarea`
  flex-basis: 60%;
  background-color: #fff;
  border: none;
  padding: 20px;

  font-size: 18px;
  color: black;
  &:focus {
    outline: none;
  }
`;
const BottomButton = styled.div`
  width: 100%;
  padding: 10px 20px 10px 20px;

  display: flex;
  flex-basis: 20%;\
  align-items: center;
  justify-content: center;

  background-color: #0089ff;
  color: #fff;

  cursor: pointer;
  transition: ease-out 0.2s;
  &:hover {
    background-color: #1e75de;
    scale: 105%;
  }
`;

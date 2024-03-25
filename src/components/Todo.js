import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import todoApi from '../hooks/todoApi';
import loadingIcon from '../images/loading-icon.svg';
import SelectModal from './Modal/SelectModal';
import MakeModal from './Modal/MakeModal';

const Todo = () => {
  const [todoList, setTodoList] = useState(null);
  const { getTodo } = todoApi();
  const [isSelectModalOn, setIsSelectModalOn] = useState(false);
  const [isCreateModalOn, setIsCreateMoadlOn] = useState(false);
  const [isUpdateModalOn, setIsUpdateMoadlOn] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [updateText, setUpdateText] = useState('');

  //Todo 리스트 불러오기
  useEffect(() => {
    const timer = setTimeout(() => {
      getTodo().then(data => {
        setTodoList(data.data);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [isCreateModalOn, isSelectModalOn, isUpdateModalOn]);

  const changeDate = dateString => {
    return `${dateString.substring(5, 7)}.${dateString.substring(8, 10)}`;
  };

  const clickItem = data => {
    setTargetId(data.id);
    setIsSelectModalOn(true);
    setUpdateText(data.attributes.todo);
  };

  const closeBlackScreen = () => {
    setIsCreateMoadlOn(false);
    setIsSelectModalOn(false);
    setTargetId(null);
    setUpdateText(null);
  };

  return (
    <TodoListWrapper>
      {todoList ? (
        <TodoList>
          <ItemList>
            {todoList.map(data => (
              <Item key={data.id} onClick={() => clickItem(data)}>
                <Content>{data.attributes.todo}</Content>
                <Date>{changeDate(data.attributes.updatedAt)}</Date>
              </Item>
            ))}
          </ItemList>
          <CreateButton onClick={() => setIsCreateMoadlOn(true)}>
            생성
          </CreateButton>
        </TodoList>
      ) : (
        <LoadingIconWrapper>
          <LoadingIcon src={loadingIcon} />
        </LoadingIconWrapper>
      )}
      <BlackScreen
        $isBlackScreenOn={isSelectModalOn || isCreateModalOn || isUpdateModalOn}
        onClick={closeBlackScreen}
      />
      <SelectModal
        isModalOn={isSelectModalOn}
        setIsModalOn={setIsSelectModalOn}
        setIsUpdateModalOn={setIsUpdateMoadlOn}
        targetId={targetId}
        setTargetId={setTargetId}
        setUpdateText={setUpdateText}
        setTodoList={setTodoList}
      />
      <MakeModal
        isModalOn={isCreateModalOn}
        setIsModalOn={setIsCreateMoadlOn}
        type={'추가'}
      >
        추가하기
      </MakeModal>
      <MakeModal
        isModalOn={isUpdateModalOn}
        setIsModalOn={setIsUpdateMoadlOn}
        setTargetId={setTargetId}
        targetId={targetId}
        updateText={updateText}
        setUpdateText={setUpdateText}
        type={'수정'}
      >
        수정하기
      </MakeModal>
    </TodoListWrapper>
  );
};
export default Todo;

const TodoListWrapper = styled.div`
  display: flex;
  width: 40%;
  height: 75%;
  margin-top: 5%;
  border: 1px solid #d0d0d0;
  border-radius: 16px;
  box-shadow: 0 4px 24px 0 #d0d0d0;
  overflow: hidden;
  @media screen and (min-width: 300px) {
    margin-top: 15%;
    width: 90%;
    height: 80%;
  }
`;

const ItemList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Item = React.memo(styled.div`
  display: flex;
  padding: 10px 20px 10px 20px;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  transition: ease-out 0.2s;
  &:hover {
    background-color: #d0d0d0;
    scale: 101%;
  }
  gap: 20px;
`);

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  } 
`;

const LoadingIcon = styled.img`
  position: absolute;
  animation: ${rotateAnimation} 4s cubic-bezier(0.25, 0.51, 0.43, 0.7) infinite;
  transition: ease-in 0.1s;
  width: 48px;
  height: 48px;
`;
const LoadingIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  font-size: 18px;
`;
const Date = styled.div`
  color: #707070;
  font-size: 15px;
`;
const TodoList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CreateButton = styled.div`
  display: flex;
  padding: 10px 20px 10px 20px;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;

  background-color: #0089ff;
  color: #fff;

  cursor: pointer;
  transition: ease-out 0.2s;
  &:hover {
    background-color: #1e75de;
    scale: 107%;
  }
  gap: 20px;
`;
const BlackScreen = styled.div`
  transition: all 0.3s ease-in-out;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000000b3;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 500;
  opacity: ${props => (props.$isBlackScreenOn ? '1' : '0')};
  pointer-events: ${props => (props.$isBlackScreenOn ? 'auto' : 'none')};
  backdrop-filter: blur(8px);
`;

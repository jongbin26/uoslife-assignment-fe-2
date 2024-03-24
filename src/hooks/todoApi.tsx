import { TODO_API } from '../api';
const todoApi = () => {
  const getTodo = () => {
    const response = new Promise((resolve, reject) => {
      TODO_API.get('')
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
    return response;
  };

  const createTodo = (todoMessage: string) => {
    const response = new Promise((resolve, reject) => {
      TODO_API.post('', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { todo: todoMessage },
        }),
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  const updateTodo = (id: number, todoMessage: string) => {
    const response = new Promise((resolve, reject) => {
      TODO_API.put(`${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { todo: todoMessage },
        }),
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  const deleteTodo = (id: number) => {
    const response = new Promise((resolve, reject) => {
      TODO_API.delete(`${id}`)
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  return { getTodo, createTodo, updateTodo, deleteTodo };
};
export default todoApi;

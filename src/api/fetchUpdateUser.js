import api from './api';

export const fetchUpdateUser = (userId, data) => (
  api().patch('/user/update', {
    userId,
    ...data,
  })
);

import api from './api';

export const fetchAddUser = (user) => (
  api().post('/user/add', {
    ...user,
  })
);

import api from './api';

export const fetchLogin = (email, passwd) => (
  api().post('/login', {
    email,
    passwd,
  })
);

import api from './api';

export const fetchDelete = (id) => (
  api().delete(`/user/delete/?userId=${id}`)
);

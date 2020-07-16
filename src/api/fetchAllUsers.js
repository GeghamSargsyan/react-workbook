import api from './api';

export const fetchAllUsers = () => (
  api().get('/')
);

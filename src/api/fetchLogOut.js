import api from './api';

export const fetchLogOut = () => (
  api().delete('/logout')
);

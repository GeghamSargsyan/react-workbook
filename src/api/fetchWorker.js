import api from './api';

export const fetchWorker = (id) => (
  api().get(`user/?userId=${id}`)
);

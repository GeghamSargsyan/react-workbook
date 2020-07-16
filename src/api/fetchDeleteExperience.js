import api from './api';

export const fetchDeleteExperience = (id) => (
  api().delete(`/company/delete?id=${id}`)
);

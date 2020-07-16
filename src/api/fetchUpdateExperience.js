import api from './api';

export const fetchUpdateExperience = (id, ex) => (
  api().patch('/company/update', {
    id,
    ...ex,
  })
);

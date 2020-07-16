import api from './api';

export const fetchAddExperience = (userId, experience) => (
  api().post('/company/add', {
    userId,
    ...experience,
  })
);

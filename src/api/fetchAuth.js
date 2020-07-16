import api from './api';

export const fetchAuth = () => api().get('/auth');

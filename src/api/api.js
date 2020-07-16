import axios from 'axios';

export default () => {
  const sessionToken = sessionStorage.getItem('token');
  const localToken = localStorage.getItem('token');
  const token = sessionToken || localToken;
  return axios.create({
    baseURL: 'http://workbookapi.ofshant.com',
    headers: {
      ...(token && { authorization: `Bearer ${token}` }),
    },
  });
};

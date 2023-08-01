import axios from 'axios';

export const loginApiHandler = (loginData: any) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/login`, loginData);
};

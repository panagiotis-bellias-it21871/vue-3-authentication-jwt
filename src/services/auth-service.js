/*
    Authentication Service
*/

import axios from 'axios';

const API_URL = 'http://localhost:8000/auth/';

class AuthService {
  login(user) {
    const formData = new FormData();
            formData.set('username', user.email);
            formData.set('password', user.password);
    console.log({
        formData
    })
    return axios
      .post(API_URL + 'jwt/login', formData)
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch(e => {
        console.log(e);
      });
  }

  //profile(user) {

  //}

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();

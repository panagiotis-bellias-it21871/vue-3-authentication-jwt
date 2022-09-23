/*
    Authentication Service
*/

import axios from 'axios';

const API_URL = process.env.VUE_APP_BACKEND_URL + "/" + process.env.VUE_APP_AUTH_ENDPOINT_PREFIX + "/";

class AuthService {
  login(user) {
    const formData = new FormData();
            formData.set('username', user.email);
            formData.set('password', user.password);
    console.log({
        formData
    })
    return axios
      .post(API_URL + process.env.VUE_APP_AUTH_LOGIN_ENDPOINT, formData)
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

/*
    Data Service
*/

import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_BACKEND_URL + "/" + process.env.VUE_APP_BASE_ENDPOINT_PREFIX + "/" + process.env.VUE_APP_RL_LETTERS_ENDPOINT + "/";

class DataService {
  createRlRequest(carrier_name, carrier_email, status, text, teacher_id, student_id) {
    const request_body = {
        carrier_name,
        carrier_email,
        status,
        text,
        teacher_id,
        student_id
    }
    return axios.post(API_URL, request_body, { headers: authHeader() })
  }

}

export default new DataService();

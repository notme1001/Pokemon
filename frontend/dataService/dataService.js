import axios from 'axios';
// import { getItem } from '../../utility/localStorageControl';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const authHeader = () => ({
  'Content-Type': 'application/json',
});

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

class DataService {
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
      headers: { ...authHeader() },
    });
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static patch(path = '', data = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static put(path = '', data = {}) {
    return client({
      method: 'PUT',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static delete(path = '', data = {}) {
    return client({
      method: 'DELETE',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }
}

client.interceptors.request.use(config => {
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers};

  return requestConfig;
});

client.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        // set respon error apapun disini
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  },
);
export { DataService };

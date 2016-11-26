import 'isomorphic-fetch';
import promise from 'es6-promise';

promise.polyfill();

const methods = ['post', 'get'];

export function checkStatus(response) {
	console.log('checkStatus')
  if (response.status < 200 || response.status >= 300) {
		console.log('err')
    const error = new Error(response.statustext);
    error.response = response;
    throw error;
  }
  return response;
}

class ApiService {
  constructor() {
    methods.forEach(method => {
      this[method] = (path, { body } = {}) => {
        const token = localStorage.getItem('id_token');

        let requestInit = {
          method,
          cache: 'default',
        };

        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

        if (token) {
          headers.Authorization = `JWT ${token}`;
        }

        if (body) {
          requestInit.body = JSON.stringify(body);
        }
				console.log(headers);
        requestInit.headers = headers;
        const request = new Request(path);
				console.log(request);
        return fetch(request, requestInit)
					.then(checkStatus)
          .then(response => response.json()
            .then(json => ({ json, response }))
					.catch(error => {
						console.error(error);
					})
        );
      };
    });
  }
}

export default new ApiService();

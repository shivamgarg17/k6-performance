import http from 'k6/http';

export default function(){

    let baseURL = __ENV.BASE_URL;
    http.get(`${baseURL}/public/crocodiles/`)

}


/* Script Execution
baseURL =https://test-api.k6.io
k6 run -e BASE_URL=https://test-api.k6.io env_k6.js 

*/
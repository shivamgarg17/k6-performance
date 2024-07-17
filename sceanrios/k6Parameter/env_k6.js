import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options={
    // vus : 5,
    // duration :'5s',
}

export default function(){

    let baseURL = __ENV.BASE_URL;
    let res= http.get(`${baseURL}/public/crocodiles/`)
    const crocodiles = res.json();
    let ids = crocodiles.map(item => item.id);
    console.log(ids)

    const credentials ={
       username : 'Test'+ randomString(8),
       password : 'secret'+ randomString(10)
    }
    console.log(JSON.stringify(credentials))

}


/* Script Execution
baseURL =https://test-api.k6.io
k6 run -e BASE_URL=https://test-api.k6.io env_k6.js 

*/
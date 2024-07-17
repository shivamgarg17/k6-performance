import http from 'k6/http';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';
import { check } from 'k6';

const sharedArray = new SharedArray('User Registration', function () {
    return JSON.parse(open('./users.json')).users;
});
console.log(sharedArray);

// export const options={

// }
export default function () {

    sharedArray.forEach((item) => {
        const details = {
            'username': item.username,
            'password': item.password,
        }
        let response = http.post('https://test-api.k6.io/auth/token/login/', JSON.stringify(details),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        check(response, {
            'status is 200': (r) => r.status === 200,
    
        })
    });  
}

//k6 login cloud --token 6c00f1aefcd9653840f259376b3356a6e8515196f33372c6ecbc8d05a166416d
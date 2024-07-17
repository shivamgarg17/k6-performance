import http from 'k6/http';
import { check } from 'k6';

export const options = {
    stages: [
        {
            duration: '10s',
            target: 10
        },
        {
            duration: '60s',
            target: 10
        },
        {
            duration: '10s',
            target: 0
        }
    ],
    thresholds: {
        http_req_duration: ['p(90)<1250', 'p(95)<1300'],
        checks: ['rate>=0.99'],
    },
    ext: {
        loadimpact: {
            ProjectID: 3705299
        }
    }

}
export default function () {
    const body = JSON.stringify({
        'username': 'k6TestShivam1721041771760',
        'password': 'Test@1234'
    })
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let response = http.post('https://test-api.k6.io/auth/token/login/', body, params);
    let accessToken = response.json().access;

    http.get(
        'https://test-api.k6.io/my/crocodiles/', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }
    )
    let createCrocodile = JSON.stringify({
        "name": "Mazek Junior",
        "sex": 'M',
        "date_of_birth": "2013-07-15"
    })
    let responseCreate = http.post(
        'https://test-api.k6.io/my/crocodiles/',
        createCrocodile,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }

    )
    console.log(responseCreate);
    let crocodileId = responseCreate.json().id
    let newResponse = http.get(`https://test-api.k6.io/my/crocodiles/${crocodileId}`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    )
    check(newResponse, {
        'status is 200': (r) => r.status === 200,
        'crocodile id is ': (r) => newResponse.json().id === crocodileId
    })


    // console.log(newResponse);

}
import http from 'k6/http';
import {check} from 'k6';

export const options={

}

export default function(){
    let response= http.get('https://test-api.k6.io/public/crocodiles/')
    const data = response.json()[0].id;
    let name = response.json()[0].name;
    console.log(name)
    
    response= http.get(`https://test-api.k6.io/public/crocodiles/${data}/`)
    console.log(response.headers)

    check(response,{
        'status is 200':(r)=> r.status === 200,
        'name is ':(r)=> response.json().name === name

    })
}

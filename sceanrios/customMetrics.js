import http from 'k6/http';
import {check} from 'k6';
import exec from 'k6/execution'

export const options= {
    vus : 10,
    duration :'10s',
    thresholds:{
        http_req_duration: ['p(90)<30'],
       
    }
}
export default function() {
 const response= http.get('https://test.k6.io');

 check(response,{
    "status is 200": (r) => response.status === 200,
    "page is startpage":(res) => res.body.includes('Collection of simple web-pages')

 });
}
import http from 'k6/http';
import {check} from 'k6';
import exec from 'k6/execution'

export const options= {
    vus : 10,
    duration :'10s',
    thresholds:{
        http_req_duration: ['p(90)<30'],
        http_req_failed:['rate<0.01'],
        checks:['rate==0.1']
    }
}
export default function() {
 const response= http.get('https://test.k6.io' + (exec.scenario.iterationInTest === 1 ? 'foo':''));

 check(response,{
    "status is 200": (r) => response.status === 200,
    "page is startpage":(res) => res.body.includes('Collection of simple web-pages')

 });
}
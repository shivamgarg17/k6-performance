import http from 'k6/http';
import {check} from 'k6';

export const options= {
  
    thresholds:{
        http_req_duration: ['p(90)<1000'], 
        'http_req_duration{status:200}':["p(90)<100"]      
    }
}

export default function(){
    http.get('https://run.mocky.io/v3/465efee9-a3c3-4c62-a030-5e94dbeea518');
   http.get('https://run.mocky.io/v3/d077d476-131b-47cd-aada-1447e4dff943?mocky-delay=2000ms');
}
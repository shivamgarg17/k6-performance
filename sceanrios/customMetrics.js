import http from 'k6/http';
import {check} from 'k6';
import exec from 'k6/execution';
import {Trend} from 'k6/metrics';  // custom metrics demo

export const options= {
    vus : 5,
    duration :'5s',
    thresholds:{
        http_req_duration: ['p(90)<30'],
        response_time_news_page:['p(95)<100']
       
    }
}
let newsPageResponseTrend= new Trend('response_time_news_page');
export default function() {
 const response= http.get('https://test.k6.io');


 check(response,{
    "status is 200": (r) => response.status === 200,
    "page is startpage":(res) => res.body.includes('Collection of simple web-pages')

 });
 const metricscheckRes= http.get('https://test.k6.io/news.php');
 newsPageResponseTrend.add(metricscheckRes.timings.duration);
}
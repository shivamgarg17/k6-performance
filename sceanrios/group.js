import http from 'k6/http';
import {group} from 'k6';

export const options ={
    thresholds: {
        http_req_duration:['p(90)<150'],
        'group_duration{group:::HomePage}':['p(90)<300'],
        'group_duration{group:::NewsPage}':['p(90)<300'],
    }

}
export default function() {

    group('HomePage',function (){
        const response= http.get('https://test.k6.io');
        const contactsRes= http.get('https://test.k6.io/contacts.php');

    });

    group('NewsPage',function (){
        const response= http.get('https://test.k6.io/news.php');

    });
    
}   
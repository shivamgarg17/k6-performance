import http from 'k6/http';


export default function(){
    const body = JSON.stringify({
        'username':'k6TestShivam' + Date.now(),
        'password':'Test@1234',
        'first_name':'Shivam',
        'last_name':'Garg'
    })
    const params ={
            headers:{
              'Content-Type':'application/json'
            }
    }
    http.post('https://test-api.k6.io/user/register/',body,params)
}
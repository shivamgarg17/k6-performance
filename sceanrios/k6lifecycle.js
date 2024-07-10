import http from 'k6/http';

export const options ={

}

console.log('---init page---');

export function setup(){
// is called once in  the cycle
}


export default function (){
    // default fucntion that K6 call for every iteration
}

export function teardown(){
    //its call the end of the test
}
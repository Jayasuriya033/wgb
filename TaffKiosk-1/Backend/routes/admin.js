const hari = new Promise((reslove, reject) => {
    var age = 18;
    if(age >= 18)
       setTimeout(reslove, 3000, "Hari Eligible") 
    else setTimeout(reject, 3000, "Hari Not Eligible") 
})
const suriya = new Promise((reslove, reject) => {
    var age = 19;
    if(age >= 18)
       setTimeout(reslove, 3000, "Suriya Eligible") 
    else setTimeout(reject, 3000, "Suriya Not Eligible") 
})
// const sanju = new Promise((reslove, reject) => {
//     var age = 1;
//     if(age >= 18)
//        setTimeout(reslove, 1000, "Sanju Eligible") 
//     else setTimeout(reject, 3000, "Sanju Not Eligible") 
// })
// myPromise.then((age)=>{
//     console.log(`you are ${age} old. so you are eligible..`);
// }).catch((err) => {
//     console.log(err);
// })
// var age = 18;

// myPromise.then(success).catch(lose);

// function success(age){
//     console.log(`You are ${age} years old. So you are Eligible`);
// }

// function lose(age){
//     console.log(`You are ${age} years old. So you are Not Eligible`);
// }

// Promise.allSettled([hari,suriya,sanju]).then((message)=> console.log(message)).catch((message)=> console.log(message))


async function fn(){
    try{console.log("Hi");
    const res = await suriya
    console.log(res);
    console.log("Bye......");}
    catch(message){
        console.log(message);
    }
}

fn();
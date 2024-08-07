
function sample1(sum){
    console.log(sum);
    }
    
    function name1(x,y,callback) {
        var sum = x+y;
        callback(sum);
        
    }
    
    
    name1(1,2,sample1);



    const mypromise = new Promise((reslove, reject)=>{
        var val = 1;
        if(val == 1){
            reslove("Okay");
        }
        else{
            reject("Error")
        }
    })


    mypromise.then(
        function fun1(params) {
            console.log(params);
        }
    ).catch(
        function fun2(params) {
            console.log(params);
        }
    )
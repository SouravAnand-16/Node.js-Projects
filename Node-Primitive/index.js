const fs = require("fs");

// complete the following fubctions

function isNumber(num) {
    if(typeof(num) === 'number'){
        try{
            let content = fs.appendFileSync('test.txt','it is a Number.','utf-8');
        }catch(error){
            console.log(error);
        }
    }else{
        try{
            let content = fs.appendFileSync('test.txt','it is Not a Number.','utf-8');
        }catch(error){
            console.log(error);
        }
    }
}

function isStr(str) {
    if(typeof(str) === 'string'){
        try{
            let content = fs.appendFileSync('test.txt','it is a String.','utf-8');
        }catch(error){
            console.log(error);
        }
    }else{
        try{
            let content = fs.appendFileSync('test.txt','it is Not a String.','utf-8');
        }catch(error){
            console.log(error);
        }
    }
}

function isArray(arr) {
    if(Array.isArray(arr)){
        try{
            let content = fs.appendFileSync('test.txt','it is a Array.','utf-8');
        }catch(error){
            console.log(error);
        }
    }else{
        try{
            let content = fs.appendFileSync('test.txt','it is Not a Array.','utf-8');
        }catch(error){
            console.log(error);
        }
    }
}

function isObj(obj) {
         if(typeof obj === 'object' && obj !== null && !Array.isArray(obj)){
            try{
                let content = fs.appendFileSync('test.txt','this is a object.','utf-8');
            }catch(error){
                console.log(error);
            }
         }else{
            try{
                let content = fs.appendFileSync('test.txt','this is not a object.','utf-8');
            }catch(error){
                console.log(error);
            }
        }
}

function cls() {
    try {
        fs.unlinkSync('test.txt');
        console.log('test.txt deleted successfully.');
    } catch (err) {
        console.error('Error deleting test.txt:', err.message);
    }
}

// Export All the functions
module.exports = {isNumber,isStr,isArray,isObj,cls};


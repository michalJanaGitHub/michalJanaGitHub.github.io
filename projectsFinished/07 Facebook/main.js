var dataBase = [
    {userName: "andrei",
    passWord:"supersecret"
    },
    {userName: "sally",
    passWord:"123"
    },
    {userName: "ingrid",
    passWord:"777"
    },
    
];

var newsFeed = [
    {
        userName: "Bobby",
        timeLine: "So tired from all that learning"
    },
    {
        userName: "Saly",
        timeLine: "Javascript is sooooo coool"
    },
    {
        userName: "Mitch",
        timeLine: "Javascript is preeetyy cool coool"
    },
];

function isUserValidA(userName, passWord){
    for (var i = 0; i < dataBase.length; i++){
        if (dataBase[i].userName === userName &&
           dataBase[i].passWord === passWord){
            return true;
        }
    }
    return false;
}

function isUserValid(userName, passWord){
    // for (var i = 0; i < dataBase.length; i++){
    //     if (dataBase[i].userName === userName &&
    //        dataBase[i].passWord === passWord){
    //         return true;
    //     }
    // };
    dataBase.forEach(function(user, i){
        if(user.userName === userName && user.passWord === passWord ){
                return true;
            }
    });
    return false;
}

function signIn(user, pass){
    if (isUserValid(user, pass)){
        console.log(newsFeed);
    } else {
        alert("Sorry, wrong username and password");
    }
}
    
    
var userNamePrompt = prompt("What's your username?");
var passWordPrompt = prompt("What's your password?");
signIn(userNamePrompt,passWordPrompt);
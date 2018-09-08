window.onload = function(){

document.querySelectorAll("p")[1].innerHTML = "HelloWorld";


function myfunc(){
    var x = document.querySelectorAll("p")[1].innerHTML;
    console.log(x);

}

myfunc();

};
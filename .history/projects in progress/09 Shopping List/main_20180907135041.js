window.onload = function(){

    document.getElementsByTagName("p")[1].innerHTML = "HelloWorld";
    function myfunc(){
        var x = document.querySelectorAll("p")[1].innerHTML;
        console.log(x);
    }
    myfunc();
    document.querySelectorAll("ul li")[5].innerHTML = "HelloWorld";
    document.querySelector("p#first").innerHTML = "HelloWorld";

};
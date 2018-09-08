window.onload = function(){

    document.getElementsByTagName("p")[1].innerHTML = "HelloWorld";
    
    function myfunc(){
        var x = document.querySelectorAll("p")[1].innerHTML;
        console.log(x);
        console.log(document.querySelector("li").getAttribute("random"));
        console.log(document.querySelector("li").setAttribute("random", "1000"));
    }
    myfunc();
    
    document.querySelectorAll("ul li")[5].innerHTML = "HelloWorld";
    document.querySelector("p#first").innerHTML = "HelloWorld";    
    document.querySelector("p#first").innerHTML = "HelloWorld";
    document.querySelector("li.fourth").innerHTML = "HelloWorld";
    document.querySelector("li[random]").innerHTML = "HelloWorld";

    

};
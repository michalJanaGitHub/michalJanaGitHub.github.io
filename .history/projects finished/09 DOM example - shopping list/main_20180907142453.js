window.onload = function(){

    document.getElementsByTagName("p")[1].innerHTML = "HelloWorld";
    
    function myfunc(){
        var x = document.querySelectorAll("p")[1].innerHTML;
        console.log(x);

        console.log(document.querySelector("li").getAttribute("random"));
        document.querySelector("li").setAttribute("random", "1000");
        console.log(document.querySelector("li").getAttribute("random"));

        document.querySelector("h1").style.background = "red";
        document.querySelector("p").style.setProperty("background", "red");

        var h1 = document.querySelector("h1");
        h1.className = "coolTitle";

        
        h1 = document.querySelector("p");
        h1.classList.add("coolTitle");
        
        h1 = document.querySelectorAll("li")[1];
        h1.classList.add("done");
    }
    myfunc();
    
    document.querySelectorAll("ul li")[5].innerHTML = "HelloWorld";
    document.querySelector("p#first").innerHTML = "HelloWorld";    
    document.querySelector("p#first").innerHTML = "HelloWorld";
    document.querySelector("li.fourth").innerHTML = "HelloWorld";
    document.querySelector("li[random]").innerHTML = "HelloWorld";

    

};
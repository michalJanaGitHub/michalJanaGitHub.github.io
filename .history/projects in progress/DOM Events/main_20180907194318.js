window.onload = function(){
    var button = document.getElementsByTagName("button");
    button[0].addEventListener("click; mouseEnter", function() {
        console.log("CLICK!!!");
    });
    var input = document.getElementById("input");

    var butEnter = document.getElementById("but2");    
    butEnter.addEventListener("click", function(){
        console.log("click is working");
    });


};
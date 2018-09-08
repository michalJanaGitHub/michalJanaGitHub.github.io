document.onload = function(){
    var button = document.getElementsByTagName("button");
    button[0].addEventListener("click", function() {
        console.log("CLICK!!!");
    });
    button[0].addEventListener("mouseenter", function() {
        console.log("CLICK!!!");
    });

};
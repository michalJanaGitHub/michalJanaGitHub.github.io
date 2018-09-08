window.onload = function(){
    var button = document.getElementsByTagName("button");
    button[0].addEventListener("click, mouseenter, mouseleave", function() {
        console.log("CLICK!!!");
    });
    // button[0].addEventListener("mouseenter", function() {
    //     console.log("CLICK!!!");
    // });

};
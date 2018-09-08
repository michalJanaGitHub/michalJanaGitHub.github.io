window.onload = function(){
    var button = document.getElementsByTagName("button");
    var input = document.querySelector("input");
    var butEnter = document.getElementById("but2");    
    var li = document.createElement("li");
    var ul = document.getElementByTagName("ul");

    button[0].addEventListener("mouseEnter", function() {
        console.log("CLICK!!!");
    });

    butEnter.addEventListener("click", function(){
        console.log("click is working");
        
        li.appendChild(document.createTextNode(input.value));
        ul[0].appendChild(li);
    });


};
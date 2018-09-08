window.onload = function(){
    var button = document.getElementsByTagName("button")[0];
    var input = document.querySelector("input");
    var butEnter = document.querySelector("#but2");  
    var ul = document.getElementsByTagName("ul")[0];

    button.addEventListener("mouseEnter", function() {
        console.log("CLICK!!!");
    });

    butEnter.addEventListener("click", function(){
        if(input.value.length>0){
            console.log("click is working");  
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(input.value));
            ul.appendChild(li);
        }
    });


};
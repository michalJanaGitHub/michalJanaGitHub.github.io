window.onload = function(){
    var button = document.getElementsByTagName("button")[0];
    var input = document.querySelector("input");
    var butEnter = document.querySelector("#but2");  
    var ul = document.getElementsByTagName("ul")[0];

    button.addEventListener("mouseenter", function() {
        console.log("CLICK!!!");
    });

    function inputLength(){
        return input.value.length;
    }

    function createListElement(){
        console.log("click is working");  
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(input.value));
        ul.appendChild(li);
        input.value = "";        
    }

    function addListAfterClick(){
        if(inputLength()>0){
            createListElement();
        }
    }

    function addListAfterEnter(){
        console.log(event.which);
        if(inputLength()>0 && event.keyCode === 13){
            createListElement();
        }
    }

    butEnter.addEventListener("click", addListAfterClick());
    input.addEventListener("keypress", addListAfterEnter());




};
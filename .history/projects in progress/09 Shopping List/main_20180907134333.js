window.onload = function(){

document.getElementsByName("p")[1].innerText = "HelloWorld";


function myfunc(){
    var x = document.querySelectorAll("p")[1].innerHTML;
    console.log(x);

}

myfunc();

this.document.querySelectorAll("ul li")[5].innerText = "Also HelloWorld";


};
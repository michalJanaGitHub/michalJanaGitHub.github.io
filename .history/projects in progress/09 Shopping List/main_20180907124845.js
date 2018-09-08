// var h1s = document.getElementsByTagName("p");

// console.log(h1s);

// var elements = document.getElementsByClassName("first, second");
// console.log(elements);

// var selectedElements = document.getElementsByTagName("P");

// function myFunc() {
//     document.getElementsByTagName("P")[0].innerHTML = "Hello World!";
// }

// myfunc();

// console.log(elements);
// console.log(selectedElements);
// console.log(selectedElements.length);
 

var x = document.getElementsByTagName("P");
var i;
for (i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = "red";
}
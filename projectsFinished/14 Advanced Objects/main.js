// reference type
var object1 = { value: 10 };
var object2 = object1;
var object3 = { value: 10 };

console.log('object1 === object2', object1 === object2);
console.log('object1 === object3', object1 === object3);

// reference types are created by the programmer Javascript cannot know object1 and object3 are equal


console.log('object1.value = 15');
object1.value = 15;
console.log("object1.value", object1.value);
console.log("object2.value", object2.value);
console.log("object3.value", object3.value);

// context vs scope
function b() {
    let a = 4; // function has its own scope
}

this.console.log("Window is the context of this object");

function a() {
    console.log(this);
}

a();
window.a();

const object4 = {
    a: function () {
        console.log(this)
    }
};

object4.a();

// instantiation - make a copy of object and reuse the code, making multiple copies of an object

class Player { //classes are capitalized
    constructor(name, type) {
        console.log("player", this);
        this.name = name;
        this.type = type;
    }
    introduce() {
        console.log(`Hi, I am ${this.name}, I'm a ${this.type}`);
    }
}

// const bobo = new Player("Robert", "Hunter");
// bobo.introduce();

class Wizard extends Player {
    constructor(name, type) {
        super(name, type);
        console.log('wizard', this);
    }
    play() {
        console.log(`WEEEEEE i'm a ${this.type}`);
    }
}

const wizard1 = new Wizard("Shelly", "Healer");
const wizard2 = new Wizard("Shawn", "Dark Magic");

wizard1.introduce();
wizard1.play();
wizard2.introduce();
wizard2.play();




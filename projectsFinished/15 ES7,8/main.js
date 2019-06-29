// .includes
let strVar = 'Hellooooooo';
console.log(strVar.includes('o'));

const pets = ['cat', 'doc', 'bat'];
console.log(pets.includes('dog'));

// Exponential operator

const square = (x) => x ** 2;
console.log(square(5));

const cube = (x) => x ** 3;
console.log(cube(5));

// string padding
// .padstart(), .padEnd()

console.log('Turtle'.padStart(10));
console.log('Turtle'.padEnd(10));


/////////////////////////////////////////////////

// trailing commas
const fun = (a, b, c, d, ) => console.log(a);
fun(1, 2, 3, 4);

const fun2 = (
    a,
    b,
    c,
    d,
) => {
    console.log(b);
}
fun2(1, 2, 3, 4);


/////////////////////////////////////////////////
// object.values, object.entries, object.keys

let obj = {
    username0: 'Santa',
    username1: 'Rudolf',
    usrname2: 'Mr.Grinch'
};

Object.keys(obj).forEach((key, index) => {
    console.log(key, obj[key]);
});

Object.values(obj).forEach(value => {
    console.log(value);
});

Object.entries(obj).forEach(value => {
    console.log(value);
});

console.log(
    Object.entries(obj).map(value => {
        return value[1] + value[0].replace('username', '');
    })
);

// Async Await - coming next.

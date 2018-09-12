var array = [1, 2, 10, 16];

const double = []
const newArray = array.forEach(num => {
    double.push(num * 2);
});

console.log('forEach', double);

// map, filter, reduce

// const mapArray = array.map(num => {return num * 2;});
const mapArray = array.map(num => num * 2);

console.log('map', mapArray);

// map should be used with arrays - restriction on operations - needs to return something. Map transforms the array - creates a new array. For each just dos bunch of actions on each element. With map you have to return. This is cleaner programming - pure function. Avoids side effects, always making a new array.


// filter

// const filterArray = array.filter(num => {
//     return num > 5;
// });
const filterArray = array.filter(num => num > 5);

console.log('filter', filterArray);

// reduce

const reduceArray = array.reduce((accumulator, num) => {
    return accumulator + num
}, 5.123);

console.log('reduce', reduceArray);


window.onload = function() {
    ///////////////////////////////////////////////////////////////////////////
    // Compose
    
    const compose = (f, g) => (a) => f(g(a));
    
    const sum = (num) => num + 1;

    console.log(compose(sum, sum)(5));
    
    
    
    ///////////////////////////////////////////////////////////////////////////
    // Currying
    // const multiply = (a,b) => a * b;
    // const curriedMultiply = (a) => (b) => a * b;
    // const multiplyBy5 = curriedMultiply(5)

    // this.console.log(multiplyBy5(20));

    ////////////////////

    // const multiply = (a,b) => a * b;
    // const curriedMultiply = (a) => (b) => a * b;
    // console.log(curriedMultiply(3));
    // console.log(curriedMultiply(3)(3));


    
    ///////////////////////////////////////////////////////////////////////////
    // Closures - principle in JS that child scope always have access to the parent scope

    // const first = () => {
    //     var greet = 'Hi';
    //     const second = () => {
    //         alert(greet);
    //     }
    //     return second();
    // };

    // const newFunc = () => { 
    //     first();
    // };
    // newFunc();


};


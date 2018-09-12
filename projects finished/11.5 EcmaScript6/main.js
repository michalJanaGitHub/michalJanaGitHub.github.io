window.onload = function(){

    //////////////////////////////////////////////////////////////
    // arrow functions
    function add(a,b) {
        return a+b;
    }

    const add2 = (a, b) => a+b;

    console.log(add, add(2,3));
    console.log(add, add2(2,3));



    //////////////////////////////////////////////////////////////
    //Symbol type
    // they create a completely unique type - assures there will not be any conflict

    // let sym1 = Symbol();
    // let sym2 = Symbol('foo');
    // let sym3 = Symbol('foo');

    // console.log(sym1);
    // console.log(sym2);
    // console.log(sym3);

    // console.log(sym2 === sym3);
    // console.log(sym2 == sym3);
    
    //////////////////////////////////////////////////////////////
    // Default arguments
    
    // function greet(name='', age=30, pet='cat') {
    //     console.log(`Hello ${name} you seem to be ${age-10}. What a lovely ${pet} you have don't you want to join us for dinner?`);
    // }
    
    // greet();
    // greet("john", 50, "monkey");    
    
    
    //////////////////////////////////////////////////////////////
    // Template strings
    
    // const name = "Sally" ;
    // const age = 34;
    // const pet = "horse";
    
    // const greetings = `Hello ${name} you seem to be ${age-10}. What a lovely ${pet} you have don't you want to join us for dinner?`
    // console.log(greetings);
    
    //////////////////////////////////////////////////////////////
    // Dynamic property values within objects
    
    // let a = "simon";
    // let b = true;
    // let c = {};
    
    // const obj = {a,b,c};
    
    // console.log(obj);
    

    // let maxSpeedInTheCity = "50km/h";
    
    // const street = {
        //     name: "Rovná",
    //     maxSpeed: [maxSpeedInTheCity]
    // };
    
    // console.log(street.maxSpeed);
    
    //////////////////////////////////////////////////////////////

    // const obj = {
        //     player: "bobby",
    //     experience: 100,
    //     wizardLevel: false
    // }
    
    // const player = obj.player;
    // const experience = obj.experience;
    // //this is equivalent to:
    // const {player, experience} = obj

    // let wizardLevel = obj.experience;
    // //is equivalent to:
    // let{ wizardLevel} = obj;
    
    
    //////////////////////////////////////////////////////////////
    // Constants cannot be overwritten - anything that shouldn't change should be a constant
    
    // const player = 'booby';
    // let experience = 100;
    // let wizardLevel = false;
    
    // if (experience > 90) {
        //     let wizardLevel = true;
        //     console.log('inside', wizardLevel);
        // }
        // console.log('inside', wizardLevel);

        // const obj = {
            //     player: "bobby",
            //     experience: 100,
    //     wizardLevel: false
    // };
    
    // obj.wizardLevel = true;
    // console.log(obj.wizardLevel);
    
    // let obj = {};
    
    ////////////////////////////////////////////////////////////
    // Don't use var any more
    
    // const player = 'booby';
    // let experience = 100;
    // var wizardLevel = false;
    
    // if (experience > 90) {
        //     wizardLevel = true;
        // }
    // console.log(wizardLevel);
    
};
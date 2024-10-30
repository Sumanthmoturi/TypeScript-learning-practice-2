//Classes

//1.Class Members
class Point{}

//2.Fields
class Point1 {
    x:number
    y:number
}
const pt=new Point1()
pt.x=0;
pt.y=0;
console.log(`${pt.x} , ${pt.y}`)


//3.--strictPropertyInitialization:- The strictPropertyInitialization setting controls whether class fields need to be initialized in the constructor.
class Greet3 {
    name:string;
    constructor() {
        this.name="Hello"
    }
}


//4.Constructors;- Class constructors are very similar to functions. You can add parameters with type annotations, default values, and overloads
class Point2 {
    x:number;
    y:number;
    constructor(x:number,y:number) {
        this.x=x
        this.y=y
    }
}

//Another Example
class Point3{
    x:number;
    y:number;
    constructor(x: number, y: number);
    constructor(xy: string);
    constructor(x: string | number, y: number = 0) {
    //.....
    }
}


//4.Super() calls: super() call must be called in constructor before using this. members
class Base {
    greet(p0: string) {
        throw new Error("Method not implemented.");
    }
    k = 4;
  }
   
  class Derived extends Base {
    constructor() {
      super()  //if forot,TypeScript will tell you it's necessary
      console.log(this.k);
    }
  }


//5.Methods:- A function property on a class is called a method. Methods can use all the same type annotations as functions and constructors
class Point4 {
    x=10;
    y=12;
scale(n:number):void {
    this.x*=n;
    this.y*=n;
}
}


/*6.Getters/Setters:-
                     ->Classes can also have accessors:
                     ->If get exists but no set, the property is automatically readonly
                     ->If the type of the setter parameter is not specified, it is inferred from the return type of the getter
*/
class Point5 {
    _length=0
    get length() {
        return this._length
    }
    set length(value) {
        this._length=value
    }
}

//Example
class Thing {
    _size = 0;
   
    get size(): number {
      return this._size;
    }
   
    set size(value: string | number | boolean) {
      let num = Number(value);
   
      if (!Number.isFinite(num)) {
        this._size = 0;
        return;
      }
      this._size = num;
    }
  }



//7.Index signatures: Classes can declare index signatures;

class MyClass {
    [s: string]: boolean | ((s: string) => boolean);
   
    check(s: string) {
      return this[s] as boolean;
    }
}


//8.Class Heritage:- Classes can inherit from base classes 

//Implements Clauses
interface Pingable {
    ping(): void;
  }
   
  class Sonar implements Pingable {
    ping() {
      console.log("ping!");
    }
  }


//Extends Clauses
class Animal {
    move() {
      console.log("Moving along!");
    }
  }
class Dog extends Animal {
    woof(times: number) {
      for (let i = 0; i < times; i++) {
        console.log("woof!");
      }
    }
  }
const d1 = new Dog();
d1.move();
d1.woof(3);


//super. syntax is an overriding method so that a derived class can override a base class field or property
class Base1 {
    greet() {
      console.log("Hello, world!");
    }
  }
   
  class Deriveds extends Base1 {
    greet(name?: string) {
      if (name === undefined) {
        super.greet();
      } else {
        console.log(`Hello, ${name.toUpperCase()}`);
      }
    }
  }
   
  const d = new Deriveds();
  d.greet();
  d.greet("reader");
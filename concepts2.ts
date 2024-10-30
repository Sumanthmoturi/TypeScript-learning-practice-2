//2.Functions

/*2.1:Function type expression:-
                            ->Simplest way to define a function is with function type expression
                            ->These types are similar to arrow functions      
*/
function greet(fn: (a:string)=> void) {
    fn("HelloWorld")
}                   
function printToConsole(s:string) {
    console.log(s);
}         
greet(printToConsole)
                            // -> we can use type alias to name a function type
                            type greetFunction=(a:string) => void;
                            function greet(fn:greetFunction) {
                                fn("HelloWorld")
                            }
/*Call signatures:-
                    -> Function type expression syntax doesn't allow for declaring properties
                    ->If wewant to describe something callable with properties, we can write a call signature in an object type
*/

type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
  };
  function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
  }
   
  function myFunc(someArg: number) {
    return someArg > 3;
  }
  myFunc.description = "default description";
   
  doSomething(myFunc);

/*Construct Signatures:-
                        ->You can write a construct signature by adding a new keyword infront of call signature
*/
type SomeObject= {
    //....
}
type SomeConstructor= {
    new (s:string): SomeObject
}                        
function fn(ctor:SomeConstructor) {
    return new ctor ("hello")
}



/*2.2: Generic functions:-
                           ->Genreics are used when we want to describe a correspondence between two values
                           ->We do this by declaring a type parameter in function signature
*/
function firstElement<Type>(arr:Type[]):Type | undefined {
    return arr[0]
}



/*2.3:Inference:- 
                 ->The type was inferred-chosen automatically by TypeScript
                 ->We can use multiple type parameters
*/

function map<Input, Output>(arr:Input[], func:(arg:Input) => Output): Output[] {
    return arr.map(func)
}



/*2.4:Constraints:-
               -> We can use constraints to linit the kind of types that type parameter can accept

*/
function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
      return a;
    } else {
      return b;
    }
  }
const longerArray=longest([1],[1,2,3])
const longestString=longest("ALice", "Bob")

//2.5Working with constrained values

function minimumLength<Type extends { length: number }>(
    obj: Type,
    minimum: number
  ): Type {
    if (obj.length >= minimum) {
      return obj;
    } else {
      return { length: minimum};
    }
}
const arr = minimumLength([1, 2, 3], 6);
console.log(arr.slice(0));


//2.6:Speciying type arguments
function combine<Type>(arr1:Type[], arr2:Type[]):Type[] {
    arr1.concat(arr2)

}
const array=combine([1,2,3],[4,5,6])
const array1=combine<string | number>([1,2,3], ["hello"]);



//2.7:Writing good generic functions
function element<Type>(arr:Type[]) {
    return arr[0]
}

//similarly we can write like this as well
function sameElement<Type extends any[]>(arr:Type) {
    return arr[0]
}
const one=element([1,2,3])
const sameOne=sameElement([1,2,3])

//2.7.1:-Use fewer Parameters
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func);
  }
   
function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[],
    func: Func
  ): Type[] {
    return arr.filter(func);
  }
  
  

//Optional Parameters
function f(n: number, x?:string) {
    console.log(n,x);
    console.log(n);
  }
  f(10)
  f(10,"Ten");

//Default Parameters: wen can also provide a default parameters
function funct(x=10) {
    if (x>0) {
        console.log("Hi")
    }
}


//Optional Parameters in callback
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i);
    }
  }
  myForEach([1, 2, 3], (a) => console.log(a));
  myForEach([1, 2, 3], (a, i) => console.log(a, i));


//2.8: Declaring this in a function:- 
const user2 = {
    id: 123,
   
    admin: false,
    becomeAdmin: function () {
      this.admin = true;
    },
  };



//2.9:- Void:-void represents the return value of functions which don’t return a value
function noop() {
    return;
  }

//2.10:-unknown:- The unknown type represents any value. This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value
function f1(a:any) {
    a.b();
}
function f2(a:unknown) {
    a.b()
}
//Example for unknown type
function safeParse(s: string): unknown {
    return JSON.parse(s);
  }
  const obj3 = safeParse("ki");



/*2.11:never:-
              -> Some functions never return a value
              ->The never type represents values which are never observed
*/
function fail(msg:string):never {
    throw new Error(msg);
}

//Another example
function functi(x:string | number) {
    if (typeof x==="string") {
        console.log("hi")
    } else if (typeof x ==="number") {
        console.log(12)
    } else {
        x;  // has type never
    }
}


/*2.12: Function:-
                -> Function can always be called; these calls return any:
*/
function doSomething(f: Function) {
    return f(1, 2, 3);
  }




//2.13:Rest Parameters and Arguments:-
//Rest parameters:- A rest parameter appears after all other parameters, and uses the ... syntax
function multiply(n:number, ...m:number[]) {
  return m.map((x=> n*x))
}
const result=multiply(10,1,2,3,4)

//Rest Arguments
const arr3=[1,2,3]
const arr4=[4,5,6]
arr3.push(...arr4)


//2.14: Parameter Destructuring:- We use this to unpack objects
function sum({a, b, c}:{a:number, b:number, c:number}) {
  console.log(a+b+c)
} 
//similarly
type chars={e:number,f:number,g:number}
function sum({e,f,g}:chars) {
  console.log(e+f+g)
}


//2.15: Assignability of functions:-
//return type VOID
type voidFunc = () => void;
 
const f5: voidFunc = () => {
  return true;
};
 
const f4: voidFunc = () => true;
 
const f3: voidFunc = function () {
  return true;
};
const v1 = f4();
 
const v2 = f5();
 
const v3 = f3();
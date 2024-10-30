//Object Types


/*1.Object types:-
                 ->The fundamental way that we group and pass data around is through objects
                 ->Object types can be  
                                       1.Anonymous
                                       2.Can be named using either an interface
                                       3. or Type alias
*/
function greet (person:{name:string, age:number}) {     //Anonymous
    console.log("Hello" + person.name )
}  

interface Person {       //Interface
    name:string;
    age:number;
}
function greet(person:Person) {
    console.log("Hello" + person.name);
}

type Person1 = {
    name:string;
    age:number;
}
function greet(person:Person1) {
    console.log("Hello" + person.age)
}



/*2.Property Modifiers:-
                         ->Property modifiers are used to control the access of properties in an object
*/
//2.1:Optional properties(?)
interface Paint {
    shape:string;
    xPos?:number;
    yPos?:number;
}
function paintShape(opts:Paint) {
    let xPos=opts.xPos===undefined ?0:opts.xPos;
    let yPos=opts.yPos === undefined ?0:opts.yPos;
    console.log("shape is: " +opts.shape + "coordinates are :" + {xPos,yPos})
}


//2.2: readOnly properties:-  Properties can also be marked as readonly for TypeScript
interface SomeType {
    readonly prop: string
}
function doSomething(obj:SomeType) {
    console.log(`prop has value ${obj.prop} `)
}
obj.prop="harry"


//Example
interface Person {
    name: string;
    age: number;
  }
   
  interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
  }
   
  let writablePerson: Person = {
    name: "Person McPersonface",
    age: 42,
  };
   
  let readonlyPerson: ReadonlyPerson = writablePerson;
   
  console.log(readonlyPerson.age);
  writablePerson.age++;
  console.log(readonlyPerson.age);


/*2.3: Index Signatures:- 
                         ->use an index signature to describe the types of possible values
*/
interface stringArray {
    [index:number]:string
}
const myArray:stringArray= getStringArray()
const secondItem=myArray[1]
console.log(secondItem)

//Example
interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number; // should be number or string
    name: string; //shoud be number or string
  }

//you can make index signatures readonly in order to prevent assignment to their indices
interface ReadonlyStringArray {
    readonly [index: number]: string;
  }
   
  let myArray1: ReadonlyStringArray = getReadOnlyStringArray();
  myArray1[2] = "Mallory";


/*3.Excess Property Checks:-
                            ->Excess Property Checks are used to check if an object has any properties that are not defined in the interface
*/
interface SquareConfig {
    color?: string;
    width?: number;
  }
   
  function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
      color: config.color || "red",
      area: config.width ? config.width * config.width : 20,
    };
  }
   
  let mySquare = createSquare({ colour: "red", width: 100 });



/*4.Extending Types:-
                   ->Extending types is used to extend the properties of an interface
*/
interface BasicAddress {
    name?:string;
    street:string;
    sity:string;
    country:string;
    postalCode:string;
}
interface AddressWithUnit {
    name?: string;
    unit: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
  }
//Instead of writing full seperatley, we can extend the original type and just add new fields that are unique to new one
interface BasicAddress {
    name?:string;
    street:string;
    sity:string;
    country:string;
    postalCode:string;
}
interface AddressWithUnit extends BasicAddress {
    unit: string;
}

//Another example
interface Colorful {
    color:string;
}
interface Gradient {
    radius:number;
}
interface Total extends  Colorful,Gradient {
    price:number;
}
const total:Total = {
    color:"red",
    radius: 42,
    price:1000
}



/*5.Intersection Types(&):-
                         ->Intersection types used to combine existing object types
*/
interface Colorful {
    color:string;
}
interface Circle {
    radius:number;
}
type ColorfulCircle=Colorful & Circle;

function draw(circle:Colorful & Circle) {
    console.log(`color was ${circle.color}`)
    console.log(`color is ${circle.radius}`)
}
draw({color:"blue", radius:45})
draw ({color:"green", radius:100})


/*Generic Object Types:-
                         -> when we already know the type of contents, we’d need to do precautionary checks, or use error-prone type assertions
*/
interface Box {
    contents: unknown;
  }
   
  let xa: Box = {
    contents: "hello world",
  };
  if (typeof xa.contents === "string") {
    console.log(xa.contents.toLowerCase());
  }
  console.log((xa.contents as string).toLowerCase());

//Example:
interface NumberBox {
    contents: number;
  }
   
  interface StringBox {
    contents: string;
  }
   
  interface BooleanBox {
    contents: boolean;
  }
  function setContents(box: StringBox, newContents: string): void;
  function setContents(box: NumberBox, newContents: number): void;
  function setContents(box: BooleanBox, newContents: boolean): void;
  function setContents(box: { contents: any }, newContents: any) {
    box.contents = newContents;
  }

//Generic type example
interface Box1<Type> {
    contents: Type;
  }
  interface StringBox {
    contents: string;
  }
   
  let boxA: Box1<string> = { contents: "hello" };
  boxA.contents;
   
  let boxB: StringBox = { contents: "world" };
  boxB.contents;

//Array type
function doingSomething(value:Array<string>) {
    console.log(value)   
}
let myArray2:string[]=["hello"]
doingSomething(myArray2)
doingSomething(new Array("Hello World"))


//readOnly Array type:- The ReadonlyArray is a special type that describes arrays that shouldn’t be changed.

function doStuff(values: ReadonlyArray<string>) {
    // We can read from 'values'...but we can't mutate values
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`)

}


//Tuples types:-A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.
type StringNumberPair = [string, number];
function doSomething(pair: StringNumberPair) {
    const a=pair[0]
    const b=pair[1]
    console.log(`i am ${a} and  i am ${b} `)
}
doSomething(["Hello",42])


//example:We can also destructure tuples using JavaScript’s array destructuring.
function doSomething(stringHash: [string, number]) {
    const [inputString, hash] = stringHash;
   
    console.log(inputString);
           
    console.log(hash);
}

//Tuples can also have rest elements, which have to be an array/tuple type.
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
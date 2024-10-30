//Type Manipulation

//A.Generics

//1.normal without genreics
function identity(arg: number): number {
    return arg;
  }
//similarly
function identity1(arg: any): any {     //or we could describe the function using any type
    return arg;
  }
//Generic type
function identity3<Type>(args:Type): Type {
    return args

}


//2.Working with Genreic type variables


function loggingIdentity<Type>(arg: Type[]): Type[]{
    console.log(arg.length);
    return arg;
  }
//similarly
function loggingIdentity1<Type>(arg: Array<Type>): Array<Type>{
    console.log(arg.length);   // Array has a .length, so no more error
    return arg;
  }



//3.Generic types
function identity4<Type>(args:Type):Type {
    return args

}
let myIdentity3:<Type>(args:Type)=> Type=identity4


//generic interface usage
interface GenericIdentityFn {
    <Type>(arg: Type): Type;
  }
   
  function identify<Type>(arg: Type): Type {
    return arg;
  }
   
  let myIdentify: GenericIdentityFn = identify;
//similarly
interface GenericIdentityFn1<Type> {
    (arg: Type): Type;
  }
   
  function identifier<Type>(arg: Type): Type {
    return arg;
  }
   
  let myIdentity: GenericIdentityFn1<number> = identifier;



//4.Generic classes
class GenericNumber<NumType> {
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
  }
   
  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function (x, y) {
    return x + y;
  };

//similarly we can use string or more complex objects
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};
 
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));




/*B.Keyof Type Operator:-
                         ->The keyof operator takes an object type and produces a string or numeric literal union of its keys
*/

type point={x:number,y:number}
type p=keyof point

//If the type has a string or number index signature, keyof will return those types instead
type Arrayish={[n:number]:unknown}
type A=keyof Arrayish

 
type Mapish = { [k: string]: boolean };
type M = keyof Mapish;



//C.Typeof Type operator: typeof operator returns the type of a value
let s="Hello"
console.log(typeof s)

//example
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

//example
function f() {
    return {x:10,y:3}
}
type P=ReturnType<typeof f>;


//D.Indexed Access Types:-Indexed Access Types allow you to access a property of an object type using square brackets

type PersonA={age:number; name:string; alive:boolean}
type Age=Person["age"]

//example
type I1 = Person["age" | "name"];
type I2 = Person[keyof Person];
type AliveOrName = "alive" | "name";

//example
const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
  ];
   
  type PersonB = typeof MyArray[number];
         
  type Age1 = typeof MyArray[number]["age"];

  type Age2 = Person["age"];
        


//E.Conditional Types
interface Animal {
    live():void;
}
interface Dog extends Animal {
    woof():void;
}
type Example1=Dog extends Animal ? number:string;
type Example2=RegExp extends Animal ? number:string;


//Example
interface IdLabel {
    id: number /* some fields */;
  }
  interface NameLabel {
    name: string /* other fields */;
  }
   
  function createLabel(id: number): IdLabel;
  function createLabel(name: string): NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
  }
//similarlywe can make it like this
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
  function createLabel1<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
  }
let a0 = createLabel("typescript");
let b = createLabel(2.8);
let c = createLabel(Math.random() ? "hello" : 42);


//Distributive Conditional Types
type ToArray<Type>=Type extends any ? Type[]: never;
type StrArrOrNumber=ToArray<string | number>



//F.Mapped Types:-Mapped types build on the syntax for index signatures, which are used to declare the types of properties which have not been declared ahead of time
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
  };
type Features = {
    darkMode: () => void;
    newUserProfile: () => void;
  };
   
  type FeatureOptions = OptionsFlags<Features>;

/*Mapping Modifiers(readOnly and ?):-
                                     -> There are two additional modifiers which can be applied during mapping: readonly and ? 
                                     ->  You can remove or add these modifiers by prefixing with - or +.
                                     ->If you don’t add a prefix, then + is assumed.
*/
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
  };
   
  type LockedAccount = {
    readonly id: string;
    readonly name: string;
  };
   
  type UnlockedAccount = CreateMutable<LockedAccount>;
//Example
type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
  };
   
  type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
  };
   
  type Users = Concrete<MaybeUser>;


//Key Remapping via as:-  re-map keys in mapped types with an as clause in a mapped type
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as KeyType]: Type[Properties]
}

//Example
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
interface Person {
    name: string;
    age: number;
    location: string;
}
type LazyPerson = Getters<Person>;

//You can filter out keys by producing never via a conditional type
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};
 
interface Circle {
    kind: "circle";
    radius: number;
}
 
type KindlessCircle = RemoveKindField<Circle>;

//You can map over arbitrary unions, not just unions of string | number | symbol, but unions of any type
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}
 
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
 
type Config = EventConfig<SquareEvent | CircleEvent>



//F.Template Literals
type World="world";
type Greetings=`Hello ${World}`

//When using unions
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

//Here Unions are cross multiplies
type AllLocaleIDss = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;


//Example
const person = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26,
  });
  person.on("firstNameChanged", (newValue) => {
    console.log(`firstName was changed to ${newValue}!`);
  });
  type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;


//Interference with template literals
type PropEventSource2<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
const person3 = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});
person.on("firstNameChanged", newName => {
    console.log(`new name is ${newName.toUpperCase()}`);
});
 
person.on("ageChanged", newAge => {
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
})


//Intrinsic String Manipulation Types

//Uppercase<StringType>:- Converts each character in string to uppercaseversion
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">

//Lowercase<StringType>:- Converts each character in string to lowercase equivalent
type Greeting2 = "Hello, world"
type QuietGreeting2 = Lowercase<Greeting>

type ASCIICacheKey2<Str extends string> = `id-${Lowercase<Str>}`
type MainID2 = ASCIICacheKey<"MY_APP">

//Capitalize<StringType>:-Converts the first character in the string to an uppercase equivalent.
type LowercaseGreeting = "hello, world";
type Greeting4 = Capitalize<LowercaseGreeting>;

//Uncapitalize<StringType>:Converts the first character in the string to a lowercase equivalent.
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
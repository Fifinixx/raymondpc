"use client";

import { JSX } from "react";
import { useState, useRef, useEffect } from "react";
// let url = "www.google.com"; // here typescript automatically sets the type of string. This is calledd type inference

// function convertCurrency(amount: number, currency: string): string {
//   // this function has a return type of string
//   //...
//   return `$${amount}`;
// }
// convertCurrency(23, "STR");

//function Button(props: { backgroundColor: string, fontSize:number }) { // this is how you specify types inside an object. props is an object here or you can destructure here
// function Button({
//   backgroundColor,
//   fontSize,
//   show
// }: {
//   backgroundColor: string;
//   fontSize: number;
//   show: boolean;
// }) {
//   // this is how you destructure and metion type
//   // return <button className={`${props.backgroundColor}`} style={{fontSize: `${props.fontSize}`}}></button>;
//   return (
//     <button
//       className={`${backgroundColor}`}
//       style={{
//         fontSize: `${fontSize}`,
//         display: `${show ? "block" : "hidden"}`,
//       }}
//     ></button>
//   );
// }

// now the above props have started to bloat, we can define a separate type to keep our code clean

// type color = "red" | "blue" | "green"

// type ButtonProps = {
//   // declare type
//   backgroundColor: "red" | "blue" | "green"; // only allow strings, and also only these 2 words. This is called a union type
//   //backgroundColor : color; // you can also have nested types like this
//   fontSize?: number; // ? makes the property optional. Now you can ommit fontSize from the props
//   show: boolean;
//   padding: number[];
//   //padding : [number, number, number, number] // to have exactly 4 elements inside the array, this is called tuple
// };

// function Button({ backgroundColor, fontSize, show }: ButtonProps) { // the reuturn type of a react component is JSX.Element
//   // here is mention the button prop types
//   return (
//     <button
//       className={`${backgroundColor}`}
//       style={{
//         fontSize: `${fontSize}`,
//         display: `${show ? "block" : "hidden"}`,
//       }}
//     ></button>
//   );
// }

// export default function Home() {
//     return <Button backgroundColor="red" fontSize={20} show={true} padding= {[1,2,3,4]}/>; // if you don't know what types are here, press control space to see the list of properties set
//   }

// now we can further refactor the above code to be more clutter free
// type ButtonProps = {
//     // style:{
//     //     backgroundColor:"red" | "blue" | "green";
//     //     fontSize:number;
//     //     display:string;
//     //     padding:number;

//     // }
//     style:React.CSSProperties // we can eiher specify each styles like above or use Reacts inbuilt CSSProperties. For only CSS only though

// }
// function Button({style}: ButtonProps) {
//   return (
//     <button
//       className={`${style.backgroundColor}`}
//       style={style}
//     ></button>
//   );
// }

// export default function Home() {
//   return <Button style = {{backgroundColor:"red",  fontSize:20, display:"block",  padding:2}}/>;
// }

// type ButtonProps = {
//   props: Record<string, number>; // When we pass an object, we can specify both the type of keys and the type of values
// };

// function Button({ props }: ButtonProps) {
//   return <button></button>;
// }

// export default function Home() {
//   return <Button props={{ prop1: 1, prop2: 2, prop3: 3 }} />;
// }

// passing functions
// type ButtonProps = {
//     onClick : (params:string) => void
// }
// function Button({onClick}:ButtonProps){
//     return <button onClick={() => onClick("test")}></button>
// }
// export default function Home() {
//     function onClick(param: string){console.log(param)}
//     return <Button onClick = {onClick} />;
//   }

// passing children
// type ButtonProps = {
//   //children: JSX.Element; // to have only JSX elements
//   children: React.ReactNode; // to have everything, text, JSX, boolean ...etc
// };
// function Button({ children }: ButtonProps) {
//   return <button>{children}</button>;
// }
// export default function Home() {
//   return <Button>Click Me!</Button>;
// }

// pass in state setter functions

// type ButtonProps = {
//     setCount : React.Dispatch<React.SetStateAction<number>>
// }

// function Button({ setCount }: ButtonProps) {
//     setCount(43);
//   return <button></button>;
// }
// export default function Home() {
//     const [count, setCount] = useState(0);
//   return <Button setCount={setCount} />;
// }

//We can also use interfaces instead of type alias like below
//Problem is Interface can only create objects and not a single data types

// interface ButtonProps{
//     setCount : React.Dispatch<React.SetStateAction<number>>
// }

// function Button({ setCount }: ButtonProps) {
//     setCount(43);
//   return <button></button>;
// }
// export default function Home() {
//     const [count, setCount] = useState(0);
//   return <Button setCount={setCount} />;
// }

// helper type, to pass all valid props without destructuring them. It spreads the styles as well
//ComponentPropsWithoutRef if not passing refs and ComponentPropsWithRef if passing refs
// Also if we need to pass in something other, we can do that as well
// type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
//   text: string;
//   myfunc: () => void;
// };
// function Button({ text, myfunc, ...props }: ButtonProps) {
//   return (
//     <button {...props} onClick={myfunc}>
//       {text}
//     </button>
//   );
// }
// export default function Home() {
//   return (
//     <Button
//       type="button"
//       autoFocus={true}
//       text={"Some text"}
//       myfunc={() => console.log("My function")}
//     />
//   );
// }


//handling states

// function Button() {
//   const ref = useRef<HTMLButtonElement>(null); // no need to use null as a fallback value like we used in useState below. Because useRef behaves differently
//   return (
// <button ref = {ref}>
//     </button>
//   );
// }
// export default function Home() {
//   // useContext is pending
//   const [count, setCount] = useState(0); // count automatically infered as number here
//   const [count1, setCount1] = useState<number>(0); // count  set to number explicity here. But here, you need to set the default value to number only
//   const [user, setUser] = useState<{name:string, age:number} | null>(null) // Assign something first, but has a different type
//   const name = user?.name // to access user.name, use optional chaining, since it can be null
//   return (
//     <Button
    
//     />
//   );
// }


//const inference/ read-only

// function Button(){
//   // when we declare a variable in TypeScript, it only knows the type of the variable and not the actula value
//   // below Math.pow expects exactly 2 arguments. But when we declare an Array, TypeScript only knows that it is of type numbers[], it does not know how many elements are there.
//   // as const makes the array, read only. Means it cannot be modified and means its exactly the numbers given and not anything else
//   const  arr  = [2, 5] as const
//   const power = Math.pow(...arr)
//   return <button></button>
// }

// export default function Home(){

// }


// below is how you handle something from localstorage
// type theme = "light" | "dark" | "system"
// function Button(){
//   useEffect(() => {
//     const theme = localStorage.getItem("theme") as theme // getItem is infered as string | null, so we can assert as theme here
//   }, [])
//   return <button></button>
// }

// export default function Home(){

// }




// Omit

// type User = {
//   session:string,
//   name: string
// }
// type guest = Omit <User, "name"> // gets all fields from User except name
// function Button(){
//   return <>
//   </>
// }

// export default function Home(){
//   return <Button />
// }


//GENERICS
// function convert <T> (value : T): T{
//   return value;
// }

// // works with both numbeers and strings
// convert("str")
// convert(2)


//To import external types
//import {type Color} from  "../../address";



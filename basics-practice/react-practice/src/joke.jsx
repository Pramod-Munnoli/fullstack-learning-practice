import { useState, useEffect } from "react"
export default function Joker(){
let [Joke ,setJoke]=useState({});

const URL = "https://official-joke-api.appspot.com/random_joke";

let GetJoke = async ()=>{
    let response = await fetch(URL);
    let jsoneResponse = await response.json();
    console.log(jsoneResponse);
    setJoke({setup: jsoneResponse.setup, punchline: jsoneResponse.punchline});
};
 

useEffect( ()=>{async function GetJoke (){
    let response = await fetch(URL);
    let jsoneResponse = await response.json();
    console.log(jsoneResponse);
    setJoke({setup: jsoneResponse.setup, punchline: jsoneResponse.punchline});
}
GetJoke();
},[]);
  
    return(
        <div>
            <h2>Joker!</h2>
            <h2>{Joke.setup}</h2>
            <h2>{Joke.punchline}</h2>
            <button onClick={GetJoke}>New Joke</button>
        </div>
    )
};
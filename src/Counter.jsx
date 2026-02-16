import { useState} from "react";
export default function Counter(){
     let[Count , setCount]= useState(0);
     let  incCount = () => {
       setCount(Count+1);
       console.log(Count)
     }
    

    return( 
        <div>
            <h3>Count ={Count} </h3>
            <button onClick={incCount}>Increment</button>
        </div>
    )
} 
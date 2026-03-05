
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';import { useState ,useEffect} from "react";
export default function Counter(){
let [countx ,setcountx]=useState(0);
let [county ,setcounty]=useState(0);

let InCountsx=()=>{
 setcountx(currCount =>currCount +1);
 console.log(countx);
}
let InCountsy=()=>{
 setcounty(currCount =>currCount +1);
 console.log(county);
}

useEffect(function printSomethig(){
    console.log("this is the useEfeect");
},[countx ])


return( 
    <>
    <div>
        <h3> count ={countx}</h3>
        <Button onClick={InCountsx}  variant="contained">Count</Button>
    </div>
    <div>
        <h3> count ={county}</h3>
        <Button onClick={InCountsy} variant="contained">Count</Button>
       <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button> 
    </div>
    </>
)
}
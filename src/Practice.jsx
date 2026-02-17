//  import { useState } from "react"

// export default function LikeButton (){
//     let [isLiked ,setisLiked] = useState(false);
//     let [coLike ,setcoLike] = useState(0);
//     let  Like = () =>{
//         let newLike = !isLiked;
//         setisLiked(newLike);
//         setcoLike(coLike + 1);
//     }
//     return(
//         <div>
//             <p>Clicks : {coLike}</p>
//             <p onClick={Like}> 
//                 {isLiked ? (<i class="fa-solid fa-heart"></i>)
//                 :(<i class="fa-regular fa-heart"></i>)}
//             </p>
//         </div>
//     )
// }




//Ludo Board

import { useState } from "react"
export default function LudoBoard(){
    // object in state
    let [moves , setmoves] = useState({blue:0,yellow:0,green:0,red:0});
    // array in state
    let [arr ,setarr] = useState(["no Moves"]);
    let updateBlue = () =>{

         setmoves((prevMoves)=>{
            return {...prevMoves,blue:prevMoves.blue +1} 
         });
        setarr((prearr)=>{
            return [...prearr,"blue"];
        });
        console.log(arr);

    };
    let updateyellow = () =>{
         console.log(moves.yellow);
        setmoves((prevMoves)=>{
            return {...prevMoves,yellow:prevMoves.yellow +1} 
        });};
    let updategreen = () =>{
         console.log(moves.green);
        setmoves((prevMoves)=>{
            return {...prevMoves,green:prevMoves.green +1} 
        });};

    let updateRed = () =>{
         console.log(moves.red);
        setmoves((prevMoves)=>{
            return {...prevMoves,red:prevMoves.red +1} 
        });};
  return(
    <div>
    <h4>Game Begins</h4>
    <p>{arr}</p>
    <div className="board">
        <p>Blue Moves ={moves.blue}</p>
        <button style={{backgroundColor:"blue"}} onClick={updateBlue}>+1</button>
        <p>yellow Moves ={moves.yellow}</p> 
        <button style={{backgroundColor:"yellow",Color:"black"}} onClick={updateyellow}>+1</button>
        <p>Green Moves ={moves.green}</p>
        <button style={{backgroundColor:"green"}} onClick={updategreen}>+1</button>
        <p>Red Moves ={moves.red}</p>
        <button style={{backgroundColor:"red"}} onClick={updateRed}>+1</button>
    </div>
    </div>
   )} 
import { useState } from "react"
import "./App.css";
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

// import { useState } from "react"
// export default function LudoBoard(){
//     // object in state
//     let [moves , setmoves] = useState({blue:0,yellow:0,green:0,red:0});
//     // array in state
//     let [arr ,setarr] = useState(["no Moves"]);
//     let updateBlue = () =>{

//          setmoves((prevMoves)=>{
//             return {...prevMoves,blue:prevMoves.blue +1} 
//          });
//         setarr((prearr)=>{
//             return [...prearr,"blue"];
//         });
//         console.log(arr);

//     };
//     let updateyellow = () =>{
//          console.log(moves.yellow);
//         setmoves((prevMoves)=>{
//             return {...prevMoves,yellow:prevMoves.yellow +1} 
//         });};
//     let updategreen = () =>{
//          console.log(moves.green);
//         setmoves((prevMoves)=>{
//             return {...prevMoves,green:prevMoves.green +1} 
//         });};

//     let updateRed = () =>{
//          console.log(moves.red);
//         setmoves((prevMoves)=>{
//             return {...prevMoves,red:prevMoves.red +1} 
//         });};
//   return(
//     <div>
//     <h4>Game Begins</h4>
//     <p>{arr}</p>
//     <div className="board">
//         <p>Blue Moves ={moves.blue}</p>
//         <button style={{backgroundColor:"blue"}} onClick={updateBlue}>+1</button>
//         <p>yellow Moves ={moves.yellow}</p> 
//         <button style={{backgroundColor:"yellow",Color:"black"}} onClick={updateyellow}>+1</button>
//         <p>Green Moves ={moves.green}</p>
//         <button style={{backgroundColor:"green"}} onClick={updategreen}>+1</button>
//         <p>Red Moves ={moves.red}</p>
//         <button style={{backgroundColor:"red"}} onClick={updateRed}>+1</button>
//     </div>
//     </div>
//    )} 

// import { v4 as uuidv4} from 'uuid' ;

// export default function TodoList(){
// let [Todos ,setTodos] =useState([{task:"sample Task",id:uuidv4(),isDone:false}]);
// let [newTodo ,setnewTodo] =useState("");

// let   addnewTask =()=>{
//     setTodos((prevTodo)=>{
//         return [...prevTodo,{task:newTodo , id:uuidv4(),isDone:false}]
//     })
//     setnewTodo("");
// }

// let updateValue =(event)=>{
//     setnewTodo(event.target.value);
// } 

// let deleteTodo =(id)=>{
//     setTodos(Todos.filter((todo)=>todo.id !=id));
// }

// let upperCaseAll =()=>{
//   setTodos((prevTodo)=>
//      prevTodo.map((todo)=>{
//        return {...todo,task:todo.task.toUpperCase()}
//     }));
// }

// let upperCaseOne =(id)=>{
//       setTodos((prevTodo)=>
//         prevTodo.map((todo) =>{
//             if(todo.id == id){
//                return {...todo,task:todo.task.toUpperCase()}
//             } else {
//                 return todo;
//             }
//     })
//   );
// }

// let MarkDone =(id)=>{
//     setTodos((prevTodo)=>
//        prevTodo.map((todo)=>{
//         if(todo.id == id){
//             return {...todo,isDone:true}
//         }
//          return todo;
//       }));
// };


// let markDoneAll =()=>{
//   setTodos((prevTodo)=>
//      prevTodo.map((todo)=>{
//        return {...todo,isDone:true}
//     }));
// }
//     return(  
//         <div>
//             <input type="text" placeholder="Enter task" value={newTodo} onChange={updateValue} /><br />
//             <button onClick={addnewTask}>Add Task</button><br /><br /> 
//             <hr />
//             <h4>Todo List</h4>
//             <ul>{Todos.map((todo)=>(
//                 <li key={todo.id}>
//                     <span style={todo.isDone ? { textDecoration: "line-through", color: "gray" } : {}}> 
//                         {todo.task}
//                     </span>
//                     &nbsp;&nbsp;&nbsp;
//                     <button onClick={() =>deleteTodo(todo.id)} >delete</button>
//                     <button onClick={() =>upperCaseOne(todo.id)} >Uppercase</button>
//                     <button onClick={() => MarkDone(todo.id)} >Done</button>
//                 </li>
//             ))} </ul>
//             <button onClick={markDoneAll}>Mark All</button>
//             <button >Delete All</button>
//         </div>
//     )
// }


// import { genTicket } from "./helper"
// import Ticket from "./Ticket";
// import Button from "./Button";
// export default function Lottery({n=3 ,winCondition}){

//     let [ticket,setticket]=useState(genTicket(n));
//     let isWinning = winCondition(ticket);

//     let Buyticket=()=>{
//         setticket(genTicket(n));
//     }

//     return(
//         <div>
//              <h1>Lottery Gmae!</h1>
//               <Ticket ticket={ticket}/>
//              <br />
//              <Button action={Buyticket} /> 
//              <h3>{isWinning && "Congratulations you are won!"}</h3>
//         </div >
//     )
// }

export default function Form(){
    let [Formdata,setFormdata]=useState({
        Fullname: "",
        password: ""
    });
    
    let handleInput =(e)=>{
        setFormdata((currDta)=>{
            return {...currDta, [e.target.name] : e.target.value};
        })
    }

    let handleSUbmit = (event)=>{
       event.preventDefault();
       console.log(Formdata);
       setFormdata({
        Fullname: "",
        password: ""
       });
    }
    return(
        <form action="" onSubmit={handleSUbmit}>
            <label htmlFor="Fullname">Full Name</label><br />
            <input type="text" id="Fullname" name="Fullname" placeholder="enter Your full name"
             value={Formdata.Fullname} onChange={handleInput} />
             <br /> <br />
            <label htmlFor="password">Password</label><br />
            <input type="text" id="password"  name="password" placeholder="enter password"
             value={Formdata.password} onChange={handleInput}/>
            <button>Submit</button>
        </form>
    )
}

  


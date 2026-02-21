import './App.css'
import Ticket from  './Ticket'
import Lottery from './Practice'
import CommentForm from  './CommentForm'
import Counter  from './Counter'
import Joker from './joke'


function App() {

  // let winCondition = (ticket)=>{
  //   return  ticket.every((num)=> num === ticket[0]); 
  // }

  return (
    <>
          {/* <Lottery n={3} winCondition={winCondition}/>  */}
         {/* <CommentForm/> */}
         {/* <Counter /> */}
         <Joker />
   </>
  )
}

export default App

import './App.css'
import Ticket from  './Ticket'
import Lottery from './Practice'
import CommentForm from  './CommentForm'
import Counter  from './Counter'
import Joker from './joke'
import Button from './Button'
import Searchbox from './Searchbox'
import Info from './InfoBox'
import Form from './form'
import WeatherApp from './WeatherApp'

function App() {

  // let winCondition = (ticket)=>{
  //   return  ticket.every((num)=> num === ticket[0]); 
  // }

  return (
    <>
          {/* <Lottery n={3} winCondition={winCondition}/>  */}
         {/* <CommentForm/> */}
         {/* { <Counter /> } */}
         {/* <Joker /> */} 
         <WeatherApp/>
         <Form/>
   </>
  )
}

export default App

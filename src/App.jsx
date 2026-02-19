import './App.css'
import Ticket from  './Ticket'
import Lottery from './Practice'

function App() {

  let winCondition = (ticket)=>{
    return  ticket.every((num)=> num === ticket[0]); 
  }

  return (
    <>
          <Lottery n={3} winCondition={winCondition}/> 
    </>
  )
}

export default App

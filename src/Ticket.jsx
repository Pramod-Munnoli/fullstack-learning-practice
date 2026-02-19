import TicketNum from "./TIcketNum"

export default function Ticket({ticket }){
    return (
    <div className="Ticket">
        <p>Ticket</p>
    {ticket.map((num, idx)=>{
        return <TicketNum num={num} key={idx}/>
    })}
    </div>
    );
}
import { useState } from "react"

 export default function commentForm(){

    let [formData ,setformData] = useState({
        username:"",
        remark:"",
        rating:1
    })

    let handleInput =(e)=>{
        setformData((currData)=>{
          return { ...currData,[ e.target.name ]:[ e.target.value]}
        })  
    }

   let handlSubmit = (event)=>{
       event.preventDefault();
       console.log(formData);
       setformData({
        username:"",
        remark:"",
        rating:1
       });
    }
    return(<div>
        <h4>Give a Comment</h4>
            <form action="" onSubmit={handlSubmit}>
                <input  name="username" value={formData.username} onChange={handleInput} placeholder="usernme" type="text" />
                <br /><br />
                <textarea name="remark" value={formData.remark} onChange={handleInput} id=""  >Remarks</textarea>
                <br /><br />
                <input name="rating" value={formData.rating} onChange={handleInput} placeholder="rating" type="number" min={1} max={5}/>
                <br /><br />
                <button >Add Comment</button>
            </form>
            </div>) 
}

import { useState } from "react"

export default function LikeButton (){
    let [isLiked ,setisLiked] = useState(false);
    let [coLike ,setcoLike] = useState(0);
    let  Like = () =>{
        let newLike = !isLiked;
        setisLiked(newLike);
        setcoLike(coLike + 1);
    }
    return(
        <div>
            <p>Clicks : {coLike}</p>
            <p onClick={Like}> 
                {isLiked ? (<i class="fa-solid fa-heart"></i>)
                :(<i class="fa-regular fa-heart"></i>)}
            </p>
        </div>
    )
}
export default function Price({ oldprice, newprice }) {
    let handleClick = () =>{
        console.log("buy now clicked");
    }
    
    return (
        <div className="bg-yellow-400 w-full h-20 flex flex-col justify-center items-center gap-1 rounded-b-xl px-4 py-2 border-t border-gray-100">
            <div className="flex items-center gap-3">
                <span className="text-gray-600 line-through text-md font-medium">₹{oldprice}</span>
                <span className="text-gray-900 text-xl font-bold">₹{newprice}</span>
            </div>
            <button 
                onClick={handleClick} 
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1 px-4 rounded-full transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
            >
                Buy Now
            </button>
        </div>
    )
}

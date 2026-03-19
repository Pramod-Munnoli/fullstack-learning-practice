import Price from "./price.jsx"; 
export default function Products({title,idx}){
    let oldprice = ["1200","1500","2000","2500"];
    let newprice = ["1000","1200","1500","1800"];
    let description = ["much better mouse","much better keyboard","much better monitor","much better camera"];
    return (
        <div className="bg-white text-gray-900 border border-gray-200 w-64 h-80 m-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between items-center overflow-hidden transform hover:-translate-y-2 group">
            <div className="p-6 text-center">
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors uppercase tracking-wider">{title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{description[idx]}</p>
            </div>
            <Price oldprice={oldprice[idx]} newprice={newprice[idx]} />
        </div>
    )
}
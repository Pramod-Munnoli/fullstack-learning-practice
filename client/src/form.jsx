export default function Form() {
    let handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("form submitted");
    }
    return (
        <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Subscribe for Updates</h3>
            <input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-blue-200 transition-all duration-200 active:scale-[0.98]">
                Submit Registration
            </button>
        </form>
    )
}
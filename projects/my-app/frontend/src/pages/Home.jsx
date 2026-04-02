import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ListingCard from '../components/ListingCard';
import { useFlash } from '../context/FlashContext';

function Home() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showTax, setShowTax] = useState(false);
    const { showFlash } = useFlash();

    const activeCategory = searchParams.get('category') || "All";
    const searchQuery = searchParams.get('q') || "";

    const categories = [
        { name: "Trending", icon: "fire" },
        { name: "Rooms", icon: "bed" },
        { name: "Iconic Cities", icon: "mountain-city" },
        { name: "Mountains", icon: "mountain" },
        { name: "Castles", icon: "fort-awesome" },
        { name: "Amazing Pools", icon: "person-swimming" },
        { name: "Camping", icon: "campground" },
        { name: "Farms", icon: "wheat-awn" },
        { name: "Arctic", icon: "snowflake" },
        { name: "Domes", icon: "igloo" },
        { name: "Boats", icon: "ship" }
    ];

    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            try {
                const params = {};
                if (activeCategory !== "All") params.category = activeCategory;
                if (searchQuery) params.q = searchQuery;

                const response = await api.get('/listings', { params });
                if (response.data.success) {
                    setListings(response.data.allListings);
                }
            } catch {
                showFlash('error', "Failed to load listings");
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, [activeCategory, searchQuery, showFlash]);

    const handleCategoryClick = (name) => {
        const newParams = new URLSearchParams(searchParams);
        if (name === "All") {
            newParams.delete('category');
        } else {
            newParams.set('category', name);
        }
        setSearchParams(newParams);
    };

    if (loading) return (
        <div className="flex flex-col gap-6 items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium tracking-widest text-sm">LOADING WANDERLUST...</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            {/* Filters Bar from original EJS */}
            <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div id="filters" className="flex items-center gap-8 overflow-x-auto pb-4 no-scrollbar grow">
                    <button 
                        onClick={() => handleCategoryClick("All")}
                        className={`flex flex-col items-center gap-2 min-w-fit group cursor-pointer transition-all ${activeCategory === "All" ? 'opacity-100 border-b-2 border-slate-900 pb-1' : 'opacity-70 hover:opacity-100'}`}
                    >
                        <div className="text-xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-earth-americas"></i>
                        </div>
                        <span className="text-xs font-semibold whitespace-nowrap">All</span>
                    </button>
                    {categories.map((cat) => (
                        <button 
                            key={cat.name}
                            onClick={() => handleCategoryClick(cat.name)}
                            className={`flex flex-col items-center gap-2 min-w-fit group cursor-pointer transition-all ${activeCategory === cat.name ? 'opacity-100 border-b-2 border-slate-900 pb-1' : 'opacity-70 hover:opacity-100'}`}
                        >
                            <div className="text-xl group-hover:scale-110 transition-transform">
                                <i className={`fa-solid fa-${cat.icon}`}></i>
                            </div>
                            <span className="text-xs font-semibold whitespace-nowrap">{cat.name}</span>
                        </button> 
                    ))}
                </div>

                <div className="flex items-center gap-4 border border-slate-200 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-semibold text-slate-700 cursor-pointer" htmlFor="taxToggle">Display total after taxes</label>
                        <input 
                            className="w-10 h-5 bg-slate-200 rounded-full appearance-none cursor-pointer relative transition-all checked:bg-primary" 
                            type="checkbox" 
                            id="taxToggle" 
                            checked={showTax}
                            onChange={() => setShowTax(!showTax)}
                        />
                    </div>
                </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                {listings.length > 0 ? (
                    listings.map(listing => (
                        <ListingCard key={listing._id} listing={listing} showTax={showTax} />
                    ))
                ) : (
                    <div className="col-span-full py-32 text-center space-y-4">
                       <div className="text-5xl opacity-20">🌍</div>
                       <h3 className="text-xl font-bold text-gray-800">No properties found</h3>
                       <p className="text-gray-500 max-w-sm mx-auto">Try adjusting your filters or creating a new listing!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;

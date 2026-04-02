import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function ListingCard({ listing: initialListing, showTax = false }) {
    const [listing, setListing] = useState(initialListing);
    const { user } = useAuth();
    const navigate = useNavigate();

    const isLiked = user && listing.likes && listing.likes.includes(user._id);

    const toggleLike = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!user) {
            toast.info("Please login to like listings!");
            navigate('/login');
            return;
        }

        try {
            const response = await api.post(`/listings/${listing._id}/like`);
            if (response.data.success) {
                // Update local likes state
                const updatedLikes = response.data.liked 
                    ? [...listing.likes, user._id]
                    : listing.likes.filter(id => id !== user._id);
                
                setListing({ ...listing, likes: updatedLikes });
            }
        } catch {
            toast.error("Failed to toggle like");
        }
    };

    return (
        <Link to={`/listings/${listing._id}`} className="group cursor-pointer block">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl mb-3 shadow-sm group-hover:shadow-xl transition-all duration-300">
                {listing.image && listing.image.url && (
                    <img 
                        src={listing.image.url} 
                        alt={listing.title} 
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                )}
                
                {/* Like Button */}
                <div className="absolute top-3 right-3 z-10">
                    <button 
                        onClick={toggleLike}
                        className={`flex items-center gap-1 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 transition-all ${isLiked ? 'text-primary' : 'text-white'}`}
                    >
                        <i className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart text-lg drop-shadow-md transition-colors`}></i>
                        <span className="text-white text-xs font-semibold">{listing.likes ? listing.likes.length : 0}</span>
                    </button>
                </div>
            </div>
            
            <div className="flex flex-col">
                <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">
                        {listing.title}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                        <i className="fa-solid fa-star text-xs text-yellow-400"></i>
                        4.9
                    </span>
                </div>
                <span className="text-sm text-slate-500 mt-1">
                    {listing.location}, {listing.country}
                </span>
                <div className="mt-2 font-semibold text-slate-900 flex items-center">
                    &#8377; {listing.price ? listing.price.toLocaleString("en-IN") : 0} 
                    <span className="font-normal text-slate-500 ml-1">night</span>
                    {showTax && (
                        <i className="text-sm text-primary font-medium ml-2 transition-all opacity-100 italic"> 
                            &nbsp; +18% GST
                        </i>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ListingCard;

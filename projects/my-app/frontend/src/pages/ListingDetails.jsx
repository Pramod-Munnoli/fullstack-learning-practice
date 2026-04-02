import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useFlash } from '../context/FlashContext';

const MAPTILER_API_KEY = "Z8ZWWFKzdiX6xQjUJqrY"; // From backend .env

function ListingDetails() {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
    const { user } = useAuth();
    const { showFlash } = useFlash();
    const navigate = useNavigate();
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await api.get(`/listings/${id}`);
                if (response.data.success) {
                    setListing(response.data.listing);
                }
            } catch {
                showFlash('error', "Failed to load listing details");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id, navigate, showFlash]);

    useEffect(() => {
        const sdk = window.maptilersdk;
        if (!listing || !mapContainer.current || !sdk) return;

        sdk.config.apiKey = MAPTILER_API_KEY;
        const coords = listing.geometry?.coordinates || [77.209, 28.6139];

        if (!map.current) {
            // First time map initialization
            map.current = new sdk.Map({
                container: mapContainer.current,
                style: sdk.MapStyle.OUTDOOR,
                center: coords,
                zoom: 14
            });

            map.current.marker = new sdk.Marker({ color: "#ff385c" })
                .setLngLat(coords)
                .setPopup(new sdk.Popup({ offset: 25 }).setHTML(`<h4 style="margin:0;font-weight:bold;">${listing.title}</h4><p style="margin:0;font-size:12px;">${listing.location}</p>`))
                .addTo(map.current);
        } else {
            // Update existing map
            map.current.setCenter(coords);
            if (map.current.marker) {
                map.current.marker.setLngLat(coords);
                map.current.marker.getPopup().setHTML(`<h4 style="margin:0;font-weight:bold;">${listing.title}</h4><p style="margin:0;font-size:12px;">${listing.location}</p>`);
            }
        }
    }, [listing]);

    const handleToggleLike = async () => {
        if (!user) {
            showFlash('error', "Please login to like listings!");
            navigate('/login');
            return;
        }
        try {
            const response = await api.post(`/listings/${id}/like`);
            if (response.data.success) {
                const updatedLikes = response.data.liked 
                    ? [...listing.likes, user._id]
                    : listing.likes.filter(uid => uid !== user._id);
                setListing({ ...listing, likes: updatedLikes });
            }
        } catch {
            showFlash('error', "Failed to toggle like");
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            showFlash('error', "Sign in to leave a review");
            navigate('/login');
            return;
        }

        setReviewLoading(true);
        try {
            const response = await api.post(`/listings/${id}/reviews`, { reviews: reviewData });
            if (response.data.success) {
                showFlash('success', "Review posted successfully!");
                setReviewData({ rating: 5, comment: '' });
                const res = await api.get(`/listings/${id}`);
                setListing(res.data.listing);
            }
        } catch (err) {
            showFlash('error', err.response?.data?.message || "Failed to post review");
        } finally {
            setReviewLoading(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await api.delete(`/listings/${id}/reviews/${reviewId}`);
            showFlash('success', "Review deleted");
            setListing({
                ...listing,
                reviews: listing.reviews.filter(r => r._id !== reviewId)
            });
        } catch {
            showFlash('error', "Failed to delete review");
        }
    };

    const handleDeleteListing = async () => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        
        setLoading(true); // Lock the UI immediately
        try {
            const response = await api.delete(`/listings/${id}`);
            if (response.data.success) {
                showFlash('success', "Listing deleted successfully!");
                navigate('/', { replace: true });
            }
        } catch (err) {
            setLoading(false); // Only unlock if it failed
            showFlash('error', err.response?.data?.message || "Delete failed");
        }
    };

    if (loading) return (
        <div className="flex flex-col gap-6 items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium tracking-widest text-sm">LOADING DETAILS...</p>
        </div>
    );

    if (!listing) return <div className="text-center py-20 text-gray-500 font-bold">LISTING NOT FOUND</div>;

    const isOwner = user && listing.owner && (user._id === listing.owner._id || user._id === listing.owner);
    const isLiked = user && listing.likes && listing.likes.includes(user._id);

    return (
        <div className="max-w-5xl mx-auto py-10 px-4 md:px-8">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-6 font-semibold transition-colors">
                <i className="fa-solid fa-chevron-left text-xs"></i>
                Back to all listings
            </Link>

            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <div className="relative h-[300px] md:h-[500px]">
                    <img src={listing.image.url} alt={listing.title} className="w-full h-full object-cover" />
                    <div className="absolute top-6 right-6 z-10 flex flex-col items-center gap-1">
                        <button 
                            onClick={handleToggleLike}
                            className={`bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all ${isLiked ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
                        >
                            <i className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart text-xl`}></i>
                        </button>
                        <span className="like-count bg-white/80 backdrop-blur-sm text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full shadow">
                            {listing.likes ? listing.likes.length : 0}
                        </span>
                    </div>
                </div>

                <div className="p-6 md:p-12">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                        <div className="flex-1 w-full">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">{listing.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-slate-500 mb-8 text-sm md:text-base">
                                <span className="flex items-center gap-1">
                                    <i className="fa-solid fa-location-dot text-primary"></i>
                                    {listing.location}, {listing.country}
                                </span>
                                <span className="flex items-center gap-1 font-semibold text-slate-900">
                                    <i className="fa-solid fa-star text-xs text-yellow-400"></i>
                                    {listing.reviews?.length || 0} reviews
                                </span>
                                <span className="flex items-center gap-1 font-semibold text-slate-900">
                                    <i className="fa-solid fa-user text-xs"></i>
                                    Owned by: {listing.owner?.username || "Host"}
                                </span>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">About this place</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">{listing.description}</p>
                            </div>

                            {isOwner && (
                                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4">
                                    <button onClick={() => navigate(`/listings/${id}/edit`)} className="btn bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-8 rounded-xl font-bold gap-2 flex items-center">
                                        <i className="fa-solid fa-pen-to-square"></i> Edit
                                    </button>
                                    <button onClick={handleDeleteListing} className="btn bg-red-50 text-red-600 hover:bg-red-100 py-3 px-8 rounded-xl font-bold gap-2 flex items-center">
                                        <i className="fa-solid fa-trash"></i> Delete
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pricing Card */}
                        <div className="w-full lg:w-80 bg-slate-50 rounded-2xl p-6 border border-slate-200 sticky top-24 h-fit">
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-3xl font-bold text-slate-900">&#8377;{listing.price?.toLocaleString("en-IN")}</span>
                                <span className="text-slate-500">night</span>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 border border-slate-300 rounded-xl overflow-hidden bg-white">
                                    <div className="p-3 border-r border-b border-slate-200">
                                        <label className="block text-[10px] uppercase font-extrabold text-slate-500">Check-in</label>
                                        <span className="text-sm text-slate-400">Add date</span>
                                    </div>
                                    <div className="p-3 border-b border-slate-200">
                                        <label className="block text-[10px] uppercase font-extrabold text-slate-500">Checkout</label>
                                        <span className="text-sm text-slate-400">Add date</span>
                                    </div>
                                    <div className="p-3 col-span-2">
                                        <label className="block text-[10px] uppercase font-extrabold text-slate-500">Guests</label>
                                        <span className="text-sm text-slate-700">1 guest</span>
                                    </div>
                                </div>

                                <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl shadow-lg shadow-pink-100 transition-all">
                                    Reserve Now
                                </button>

                                <p className="text-center text-xs text-slate-500">You won't be charged yet</p>
                            </div>
                        </div>
                    </div>

                    {/* Review Section */}
                    <div className="mt-8 pt-8 border-t border-slate-100">
                        {/* Leave a Review Form */}
                        {user && (
                            <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100 mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <i className="fa-solid fa-pen-nib text-primary"></i>
                                    Leave a Review
                                </h2>
                                <p className="text-slate-500 mb-8 text-sm">Share your experience with other travelers.</p>

                                <form onSubmit={handleReviewSubmit} className="space-y-6">
                                    {/* Rating Selection */}
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Your Rating</label>
                                        <div className="flex items-center gap-2 bg-white w-fit p-3 rounded-2xl border border-slate-200 shadow-sm">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => setReviewData({ ...reviewData, rating: num })}
                                                    className={`transition-colors text-2xl ${reviewData.rating >= num ? 'text-yellow-400' : 'text-slate-200'}`}
                                                >
                                                    <i className="fa-solid fa-star"></i>
                                                </button>
                                            ))}
                                            <span className="text-sm font-medium text-slate-400 ml-2">Select stars</span>
                                        </div>
                                    </div>

                                    {/* Comment Field */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Comment</label>
                                        <textarea
                                            required
                                            rows="4"
                                            value={reviewData.comment}
                                            onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary resize-none placeholder-slate-400"
                                            placeholder="Write your thoughts about this place..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={reviewLoading}
                                        className="bg-slate-900 hover:bg-black text-white font-bold py-4 px-8 rounded-2xl transition-all active:scale-95 shadow-lg flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <i className="fa-solid fa-paper-plane text-xs"></i>
                                        {reviewLoading ? "Posting..." : "Post Review"}
                                    </button>
                                </form>
                            </div>
                        )}

                        <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100">
                            <h2 className="text-xl font-bold mb-6 text-slate-900">All Reviews</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {listing.reviews && listing.reviews.length > 0 ? (
                                    listing.reviews.map(review => (
                                        <div key={review._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm group">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-bold text-slate-900 mb-1">
                                                        <b>@{review.author?.username || "Anonymous"}</b>
                                                    </p>
                                                    <span className="flex items-center gap-1 font-semibold text-slate-900 text-sm">
                                                        {review.rating} <i className="fa-solid fa-star text-xs text-yellow-400"></i>
                                                    </span>
                                                </div>
                                                {(user?._id === review.author?._id || user?._id === review.author) && (
                                                    <button 
                                                        onClick={() => handleDeleteReview(review._id)}
                                                        className="bg-slate-900 hover:bg-black text-white text-xs px-3 py-1.5 rounded-xl transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-slate-600 leading-relaxed text-sm">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-500 italic col-span-full py-4">No reviews yet. If you have visited this place, please share your experience with us!</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <i className="fa-solid fa-map-location-dot text-primary"></i>
                            Where you'll be
                        </h2>
                        <div ref={mapContainer} className="h-[400px] w-full rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingDetails;

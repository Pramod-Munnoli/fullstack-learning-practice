import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useFlash } from '../context/FlashContext';

function EditListing() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        country: '',
        category: ''
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();
    const { showFlash } = useFlash();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await api.get(`/listings/${id}`);
                if (response.data.success) {
                    const l = response.data.listing;
                    setFormData({
                        title: l.title,
                        description: l.description,
                        price: l.price,
                        location: l.location,
                        country: l.country,
                        category: l.category || ''
                    });
                    setPreview(l.image.url);
                }
            } catch {
                showFlash('error', "Failed to load listing for editing");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id, navigate, showFlash]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(`listing[${key}]`, formData[key]);
        });
        if (image) {
            data.append('listing[image]', image);
        }

        try {
            const response = await api.put(`/listings/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                showFlash('success', "Listing updated successfully!");
                navigate(`/listings/${id}`);
            }
        } catch {
            showFlash('error', "Update failed. Please try again.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col gap-6 items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 font-medium tracking-widest text-sm">RETRIEVING DATA...</p>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-pen-to-square text-primary"></i>
                    Edit Listing
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Field */}
                    <div className="space-y-1">
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="space-y-1">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            required
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        ></textarea>
                    </div>

                    {/* Current Image Preview */}
                    <div className="space-y-1">
                        <p className="block text-sm font-semibold text-gray-700">Current Listing Image</p>
                        <img src={preview} className="w-40 h-28 object-cover rounded-xl shadow-sm border border-gray-100" />
                    </div>

                    {/* Image Upload Field */}
                    <div className="space-y-1">
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Upload New Image</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                    </div>

                    {/* Price and Country Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                required
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="country" className="block text-sm font-semibold text-gray-700">Country</label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                required
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Category Field */}
                    <div className="space-y-1">
                        <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category</label>
                        <select
                            name="category"
                            id="category"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white text-gray-700 cursor-pointer rounded-xl border border-gray-200 outline-none appearance-none transition-all hover:bg-gray-50 hover:border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="Trending">Trending</option>
                            <option value="Rooms">Rooms</option>
                            <option value="Iconic Cities">Iconic Cities</option>
                            <option value="Mountains">Mountains</option>
                            <option value="Castles">Castles</option>
                            <option value="Amazing Pools">Amazing Pools</option>
                            <option value="Camping">Camping</option>
                            <option value="Farms">Farms</option>
                            <option value="Arctic">Arctic</option>
                            <option value="Domes">Domes</option>
                            <option value="Boats">Boats</option>
                        </select>
                    </div>

                    {/* Location Field */}
                    <div className="space-y-1">
                        <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            required
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-100"
                    >
                        {updating ? "Updating..." : "Update Listing"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditListing;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useFlash } from '../context/FlashContext';

function CreateListing() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        country: '',
        category: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { showFlash } = useFlash();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(`listing[${key}]`, formData[key]);
        });
        if (image) {
            data.append('listing[image]', image);
        }

        try {
            const response = await api.post('/listings', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                showFlash('success', "New listing created!");
                navigate('/');
            }
        } catch (err) {
            showFlash('error', err.response?.data?.message || "Failed to create listing");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-circle-plus text-primary"></i>
                    Create New Listing
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
                            placeholder="e.g. Cozy Beachfront Villa"
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
                            placeholder="Tell guests about your place..."
                        ></textarea>
                    </div>

                    {/* Image Upload Field */}
                    <div className="space-y-1">
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Upload Listing Image</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            required
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                    </div>

                    {/* Price and Country Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price (per night)</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                required
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="1200"
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
                                placeholder="e.g. India"
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
                            <option value="" disabled>Select Category</option>
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
                            placeholder="e.g. Goa"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-pink-200"
                    >
                        {loading ? "Creating..." : "Create Listing"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateListing;

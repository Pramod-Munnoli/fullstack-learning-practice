import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useFlash } from '../context/FlashContext';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showFlash } = useFlash();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/login', formData);
            if (response.data.success) {
                login(response.data.user, response.data.token);
                showFlash('success', "Welcome back, " + response.data.user.username + "!");
                navigate('/');
            }
        } catch (err) {
            showFlash('error', err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-20 px-8 min-h-[80vh] relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-50 to-pink-50 opacity-10 animate-pulse duration-1000 group-hover:opacity-20 transition-opacity"></div>
            
            <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[50px] shadow-2xl border border-white/50 w-full max-w-md space-y-10 relative z-10 transform hover:scale-[1.01] transition-transform duration-500">
                <div className="text-center space-y-3">
                    <h1 className="text-5xl font-black text-gray-800 tracking-tighter">Welcome Back</h1>
                    <p className="text-gray-400 font-medium tracking-wide italic">Great to see you again!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="relative group/input">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-100/50 p-5 rounded-3xl outline-none focus:ring-4 focus:ring-red-100 transition-all border border-transparent focus:border-red-400 font-medium placeholder:text-gray-300 placeholder:italic"
                            />
                        </div>
                        <div className="relative group/input">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-100/50 p-5 rounded-3xl outline-none focus:ring-4 focus:ring-red-100 transition-all border border-transparent focus:border-red-400 font-medium placeholder:text-gray-300 placeholder:italic"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white p-5 rounded-3xl font-black text-xl hover:shadow-2xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                LOGGING IN...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2 group-hover:tracking-widest transition-all">
                                LOGIN <span className="opacity-50 group-hover:opacity-100 translate-x-2">&rarr;</span>
                            </span>
                        )}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-gray-400 font-medium">
                        New here? <Link to="/signup" className="text-red-500 hover:text-red-600 font-black italic underline decoration-red-100 hover:decoration-red-500 underline-offset-8 transition-all">Sign Up</Link>
                    </p>
                </div>
            </div>
            
            <div className="absolute top-1/4 -right-20 w-64 h-64 bg-red-400 opacity-10 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-pink-400 opacity-10 blur-[80px] rounded-full"></div>
        </div>
    );
}

export default Login;

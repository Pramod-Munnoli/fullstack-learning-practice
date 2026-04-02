import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const response = await api.get('/api/current-user');
                if (response.data.success) {
                    setUser(response.data.user);
                }
            } catch (err) {
                console.error("No active session found");
            } finally {
                setLoading(false);
            }
        };
        checkUserSession();
    }, []);

    const login = (userData) => setUser(userData);
    const logout = async () => {
        try {
            await api.get('/logout');
            setUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

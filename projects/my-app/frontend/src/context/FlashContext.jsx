import React, { createContext, useContext, useState } from 'react';

const FlashContext = createContext();

export function FlashProvider({ children }) {
    const [messages, setMessages] = useState([]);

    const showFlash = (type, text) => {
        const id = Math.random().toString(36).substring(7);
        setMessages([{ id, type, text }]);
        setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== id));
        }, 5000);
    };

    return (
        <FlashContext.Provider value={{ showFlash }}>
            {messages.length > 0 && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-7xl px-4 pointer-events-none">
                    {messages.map(m => (
                        <div 
                            key={m.id} 
                            className={`pointer-events-auto mb-4 pl-4 pr-12 py-3 rounded border relative animate-in slide-in-from-top-4 duration-300 shadow-lg ${
                                m.type === 'success' 
                                ? 'bg-green-100 border-green-400 text-green-700' 
                                : 'bg-red-100 border-red-400 text-red-700'
                            }`}
                            role="alert"
                        >
                            <span className="block sm:inline font-medium">{m.text}</span>
                            <button 
                                onClick={() => setMessages(prev => prev.filter(msg => msg.id !== m.id))}
                                className="absolute top-0 bottom-0 right-0 px-4 py-3 focus:outline-none hover:opacity-70 transition-opacity"
                            >
                                <span className="text-2xl leading-none">&times;</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {children}
        </FlashContext.Provider>
    );
}

export const useFlash = () => useContext(FlashContext);

import React, { useState, useEffect, useContext } from 'react';
import { toBengaliNumber, getBanglaDate } from '../utils/bengaliUtils';
import { AppContext } from '../App';

const Header = () => {
    const { language } = useContext(AppContext);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString(language === 'en' ? 'en-US' : 'bn-BD', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    return (
        <header className="glass fixed top-0 left-0 w-full z-50 px-4 py-3 mb-4 rounded-b-2xl">
            <div className="flex justify-between items-center max-w-2xl mx-auto">
                <div className="flex items-center space-x-2">
                    <img src="/amarlogo.png" alt="Logo" className="w-10 h-10 object-contain" />
                    <div>
                        <h1 className="text-xl font-bold text-emerald-800 leading-tight">
                            {language === 'en' ? 'Hisabnama' : 'হিসাবনামা'}
                        </h1>
                        <p className="text-xs text-emerald-600 font-medium">
                            {language === 'en' ? 'Smart Utility App' : 'স্মার্ট ইউটিলিটি অ্যাপ'}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-emerald-900 font-bold text-lg tabular-nums">{formattedTime}</p>
                    <p className="text-xs text-emerald-600">{getBanglaDate()}</p>
                </div>
            </div>
        </header>
    );
};

export default Header;

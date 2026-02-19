import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Banknote, Calculator, MoonStar, Settings, FileText } from 'lucide-react';
import { AppContext } from '../App';

const FooterMenu = ({ activeTab, setActiveTab }) => {
    const { theme } = useContext(AppContext);

    const tabs = [
        { id: 'cash', icon: Banknote },
        { id: 'age', icon: Calculator },
        { id: 'islamic', icon: MoonStar },
        { id: 'amar_hisab', icon: FileText },
        { id: 'settings', icon: Settings },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div className={`backdrop-blur-2xl border-t w-full rounded-t-2xl px-6 py-4 flex items-center justify-between pointer-events-auto transition-colors duration-300 ${theme === 'dark' ? 'bg-black/80 border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]' : 'bg-white/80 border-emerald-100 shadow-[0_-10px_40px_rgba(34,197,94,0.1)]'}`}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none group"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                />
                            )}
                            <span className="relative z-10">
                                <Icon
                                    size={24}
                                    className={`transition-colors duration-300 ${isActive ? 'text-white' : (theme === 'dark' ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-emerald-600')}`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default FooterMenu;

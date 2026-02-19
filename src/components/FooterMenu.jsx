import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Banknote, Calculator, MoonStar, Settings, AlarmClock } from 'lucide-react';
import { AppContext } from '../App';

const FooterMenu = ({ activeTab, setActiveTab }) => {
    const { theme } = useContext(AppContext);

    const tabs = [
        { id: 'cash', icon: Banknote },
        { id: 'age', icon: Calculator },
        { id: 'islamic', icon: MoonStar },
        { id: 'alarm', icon: AlarmClock },
        { id: 'settings', icon: Settings },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div className="bg-black/95 backdrop-blur-2xl border-t border-white/10 w-full rounded-t-2xl px-6 py-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pointer-events-auto">
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
                                    className="absolute inset-0 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)]"
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                />
                            )}
                            <span className="relative z-10">
                                <Icon
                                    size={24}
                                    className={`transition-colors duration-300 ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-white'}`}
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

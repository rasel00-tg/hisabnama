import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Banknote, Calculator, MoonStar, Settings, AlarmClock } from 'lucide-react';
import { AppContext } from '../App';

const FooterMenu = ({ activeTab, setActiveTab }) => {
    const { language, theme } = useContext(AppContext);

    const tabs = [
        { id: 'cash', label: language === 'bn' ? 'টাকা' : 'Cash', icon: Banknote },
        { id: 'age', label: language === 'bn' ? 'বয়স' : 'Age', icon: Calculator },
        { id: 'islamic', label: language === 'bn' ? 'ইসলামিক' : 'Islamic', icon: MoonStar },
        { id: 'alarm', label: language === 'bn' ? 'অ্যালার্ম' : 'Alarm', icon: AlarmClock },
        { id: 'settings', label: language === 'bn' ? 'সেটিংস' : 'Settings', icon: Settings },
    ];

    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
            <div className={`glass px-2 py-2 rounded-full flex items-center justify-between shadow-2xl space-x-1 max-w-sm w-full mx-auto backdrop-blur-xl border ${theme === 'dark' ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-emerald-200'}`}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative flex-1 flex flex-col items-center justify-center p-2 rounded-full transition-colors duration-300 z-10 ${isActive ? 'text-white' : (theme === 'dark' ? 'text-emerald-400 hover:bg-emerald-900/30' : 'text-emerald-600 hover:bg-emerald-50')
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-emerald-500 rounded-full shadow-emerald-200 shadow-md"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 flex flex-col items-center">
                                <Icon size={20} className={isActive ? 'mb-1' : 'mb-0'} />
                                {isActive && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-[10px] font-medium leading-none"
                                    >
                                        {tab.label}
                                    </motion.span>
                                )}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default FooterMenu;

import React, { useState, useContext } from 'react';
import { RotateCcw, Share2 } from 'lucide-react';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { notes } from '../data/notes';
import { AppContext } from '../App';

const CashCalculator = () => {
    const { language } = useContext(AppContext);
    const [counts, setCounts] = useState({});

    const [isResetting, setIsResetting] = useState(false);

    const handleChange = (value, count) => {
        let newCount = parseInt(count);
        if (isNaN(newCount)) newCount = 0;
        if (newCount < 0) return;
        setCounts((prev) => ({ ...prev, [value]: count === '' ? '' : newCount }));
    };

    const handleReset = () => {
        setIsResetting(true);
        setTimeout(() => {
            setCounts({});
            setIsResetting(false);
        }, 600);
    };

    const calculateTotal = () => {
        let totalAmount = 0;
        let totalNotes = 0;
        notes.forEach((note) => {
            const count = counts[note.value] === '' ? 0 : (counts[note.value] || 0);
            totalAmount += count * note.value;
            totalNotes += count;
        });
        return { totalAmount, totalNotes };
    };

    const handleShare = async () => {
        const { totalAmount, totalNotes } = calculateTotal();
        if (totalAmount === 0) return;

        const date = new Date().toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });

        let text = `*${language === 'bn' ? 'হিসাবের বিবরণ' : 'Calculation Details'}*\n`;
        text += `${language === 'bn' ? 'সময়' : 'Time'}: ${date}\n\n`;

        notes.forEach((note) => {
            const count = counts[note.value] === '' ? 0 : (counts[note.value] || 0);
            if (count > 0) {
                text += `৳${note.value} x ${count} = ৳${note.value * count}\n`;
            }
        });

        text += `\n--------------------\n`;
        text += `${language === 'bn' ? 'মোট নোট' : 'Total Notes'}: ${totalNotes}\n`;
        text += `${language === 'bn' ? 'সর্বমোট' : 'Grand Total'}: ৳${totalAmount}\n`;
        text += `\nDeveloped By : Rasedul Karim`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: language === 'bn' ? 'আমার হিসাব' : 'Amar Hisab',
                    text: text,
                });
            } else {
                await navigator.clipboard.writeText(text);
                alert(language === 'bn' ? 'হিসাব কপি করা হয়েছে!' : 'Calculation copied!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const { totalAmount, totalNotes } = calculateTotal();

    const t = {
        totalMoney: language === 'bn' ? 'মোট টাকা' : 'Total Amount',
        totalNotes: language === 'bn' ? 'মোট নোট' : 'Total Notes',
        share: language === 'bn' ? 'শেয়ার করুন' : 'Share',
        clear: language === 'bn' ? 'মুছে ফেলুন' : 'Clear',
    };

    return (
        <div className="space-y-2 pb-20 fade-in relative">
            {/* Reset Animation Overlay */}
            {isResetting && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
                    <img src="/amarlogo.png" alt="Logo" className="w-20 h-20 mb-4 animate-bounce" />
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {language === 'bn' ? 'হিসাবনামা' : 'Hisabnama'}
                    </h2>
                    <p className="text-emerald-400 font-medium">
                        {language === 'bn' ? 'হিসাব মুছে ফেলা হয়েছে' : 'Calculation Cleared'}
                    </p>
                </div>
            )}

            {/* Summary Card */}
            <div className="glass-card bg-gradient-to-tr from-emerald-500 to-emerald-700 text-white border-none">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-emerald-100 text-xs uppercase tracking-wider">{t.totalMoney}</p>
                        <h2 className="text-3xl font-bold mt-1">৳{language === 'bn' ? toBengaliNumber(totalAmount) : totalAmount}</h2>
                    </div>
                    <div className="border-l border-emerald-400 pl-4">
                        <p className="text-emerald-100 text-xs uppercase tracking-wider">{t.totalNotes}</p>
                        <h2 className="text-3xl font-bold mt-1">{language === 'bn' ? toBengaliNumber(totalNotes) : totalNotes}</h2>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded-lg border border-emerald-50 dark:border-gray-700 shadow-sm transition-colors">
                <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                    <Share2 size={18} />
                    <span>{t.share}</span>
                </button>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-600 mx-2"></div>
                <button
                    onClick={handleReset}
                    className="flex-1 flex items-center justify-center space-x-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                    <RotateCcw size={18} />
                    <span>{t.clear}</span>
                </button>
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-2 gap-2">
                {notes.map((note) => (
                    <div key={note.value} className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm border border-emerald-50 dark:border-gray-700 flex flex-col justify-between transition-colors">
                        <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center space-x-1.5 flex-shrink-0">
                                <img
                                    src={note.image}
                                    alt={note.label}
                                    className="h-7 w-auto object-contain drop-shadow-sm rounded"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                                <span className={`font-bold text-base whitespace-nowrap ${note.value >= 500 ? 'text-emerald-700 dark:text-emerald-400' :
                                    note.value >= 100 ? 'text-emerald-600 dark:text-emerald-500' :
                                        'text-emerald-500 dark:text-emerald-600'
                                    }`}>৳{language === 'bn' ? toBengaliNumber(note.value) : note.value}</span>
                            </div>

                            <div className="min-w-0 flex-1 flex justify-end ml-1">
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate block">
                                    ৳{language === 'bn' ? toBengaliNumber((counts[note.value] || 0) * note.value) : (counts[note.value] || 0) * note.value}
                                </span>
                            </div>
                        </div>

                        <input
                            type="number"
                            inputMode="numeric"
                            placeholder="0"
                            value={counts[note.value] === undefined ? '' : counts[note.value]}
                            onChange={(e) => handleChange(note.value, e.target.value)}
                            className="w-full text-center bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded py-1 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-transparent font-bold text-gray-700 dark:text-white text-base transition-colors"
                        />
                    </div>
                ))}
            </div>

            {/* Ad Space */}
            <div className="w-full h-[60px] bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <span className="text-xs text-gray-400 font-medium">Space for Ads</span>
            </div>
        </div>
    );
};

export default CashCalculator;

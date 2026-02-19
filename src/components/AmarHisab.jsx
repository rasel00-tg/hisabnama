import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2, CheckCircle, BarChart2, PieChart as PieIcon, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const AmarHisab = () => {
    const [transactions, setTransactions] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('pabo'); // 'pabo' (Receivable) or 'debo' (Payable)
    const [note, setNote] = useState('');
    const [view, setView] = useState('list'); // 'list' or 'analysis'

    // Load data from local storage on mount
    useEffect(() => {
        const storedData = localStorage.getItem('amar_hisab_data');
        if (storedData) {
            setTransactions(JSON.parse(storedData));
        }
    }, []);

    // Save data to local storage whenever transactions change
    useEffect(() => {
        localStorage.setItem('amar_hisab_data', JSON.stringify(transactions));
    }, [transactions]);

    const handleAddTransaction = () => {
        if (!name || !amount) return;
        const newTransaction = {
            id: Date.now(),
            name,
            amount: parseFloat(amount),
            type, // 'pabo' or 'debo'
            note,
            date: new Date().toISOString(), // Standard format
            status: 'pending', // 'pending' or 'completed'
        };
        setTransactions([newTransaction, ...transactions]);
        setName('');
        setAmount('');
        setNote('');
    };

    const handleMarkAsCompleted = (id) => {
        const updatedTransactions = transactions.map(t =>
            t.id === id ? { ...t, status: 'completed' } : t
        );
        setTransactions(updatedTransactions);
    };

    const handleDelete = (id) => {
        const updatedTransactions = transactions.filter(t => t.id !== id);
        setTransactions(updatedTransactions);
    };

    // Calculations
    const pendingTransactions = transactions.filter(t => t.status === 'pending');
    const completedTransactions = transactions.filter(t => t.status === 'completed');

    const totalPabo = pendingTransactions
        .filter(t => t.type === 'pabo')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalDebo = pendingTransactions
        .filter(t => t.type === 'debo')
        .reduce((sum, t) => sum + t.amount, 0);

    // Chart Data Preparation
    const prepareChartData = () => {
        // Group by month
        const monthlyData = {};
        transactions.forEach(t => {
            const date = new Date(t.date);
            const monthKey = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { name: monthKey, pabo: 0, debo: 0 };
            }
            if (t.type === 'pabo') monthlyData[monthKey].pabo += t.amount;
            else monthlyData[monthKey].debo += t.amount;
        });
        return Object.values(monthlyData);
    };

    const pieData = [
        { name: 'পাবো (Receivable)', value: totalPabo, color: '#10b981' }, // Emerald-500
        { name: 'দেবো (Payable)', value: totalDebo, color: '#ef4444' }, // Red-500
    ];

    const COLORS = ['#10b981', '#ef4444'];

    return (
        <div className="space-y-6 pb-40 px-4 min-h-screen">
            {/* Header / Tabs - Sticky */}
            {/* Adjusted top position and z-index to avoid overlapping with main header */}
            <div className="sticky top-20 z-40 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-xl py-2 shadow-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 mb-4 transition-all -mx-2 px-2">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setView('list')}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${view === 'list' ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 ring-offset-1' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    >
                        বাকি তালিকা
                    </button>
                    <button
                        onClick={() => setView('analysis')}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${view === 'analysis' ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 ring-offset-1' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    >
                        বিশ্লেষণ
                    </button>
                </div>
            </div>

            {view === 'list' ? (
                <div className="space-y-6 animate-fade-in">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-3xl border border-emerald-100 dark:border-emerald-800 flex flex-col items-center justify-center shadow-sm">
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-widest mb-1">মোট পাবো</span>
                            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">৳ {totalPabo.toLocaleString()}</span>
                            <ArrowUpCircle size={20} className="text-emerald-500 mt-2 opacity-80" />
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-3xl border border-red-100 dark:border-red-800 flex flex-col items-center justify-center shadow-sm">
                            <span className="text-[10px] text-red-600 dark:text-red-400 uppercase font-bold tracking-widest mb-1">মোট দেবো</span>
                            <span className="text-2xl font-black text-red-600 dark:text-red-400">৳ {totalDebo.toLocaleString()}</span>
                            <ArrowDownCircle size={20} className="text-red-500 mt-2 opacity-80" />
                        </div>
                    </div>

                    {/* Input Form - Improved Layout for Mobile Fit */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-blue-500 opacity-50"></div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                            <PlusCircle size={14} className="mr-2" /> নতুন লেনদেন
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="নাম (Name)"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 text-sm font-medium transition-all"
                                />
                                <div className="flex space-x-3">
                                    <input
                                        type="number"
                                        placeholder="পরিমাণ (Amount)"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-1/2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 text-sm font-medium transition-all"
                                    />
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-1/2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 dark:text-slate-200 text-sm font-medium transition-all cursor-pointer"
                                    >
                                        <option value="pabo">পাবো (+)</option>
                                        <option value="debo">দেবো (-)</option>
                                    </select>
                                </div>
                                <input
                                    type="text"
                                    placeholder="নোট (যেমন: তারিখ বা কারণ)..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 text-sm font-medium transition-all"
                                />
                            </div>

                            <button
                                onClick={handleAddTransaction}
                                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 flex items-center justify-center space-x-2 transition-transform active:scale-95 text-sm uppercase tracking-wide"
                            >
                                <span>লিস্টে যোগ করুন</span>
                            </button>
                        </div>
                    </div>

                    {/* Transaction List */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase px-2 tracking-widest">চলমান তালিকা ({pendingTransactions.length})</h3>
                        {pendingTransactions.length === 0 ? (
                            <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                                <p className="text-slate-400 text-sm font-medium">এখনো কোনো বাকি নেই</p>
                            </div>
                        ) : (
                            pendingTransactions.map(t => (
                                <motion.div
                                    key={t.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center group"
                                >
                                    <div className="flex items-center space-x-3 overflow-hidden">
                                        <div className={`w-2 h-10 rounded-full flex-shrink-0 ${t.type === 'pabo' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm truncate">{t.name}</h4>
                                            <p className="text-xs text-slate-400 truncate">{t.note || new Date(t.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 flex-shrink-0 pl-2">
                                        <span className={`font-bold text-base whitespace-nowrap ${t.type === 'pabo' ? 'text-emerald-600' : 'text-red-500'}`}>
                                            ৳ {t.amount}
                                        </span>
                                        <div className="flex space-x-1">
                                            <button onClick={() => handleMarkAsCompleted(t.id)} className="p-2 bg-slate-100 dark:bg-slate-700 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors">
                                                <CheckCircle size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(t.id)} className="p-2 bg-slate-100 dark:bg-slate-700 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Completed History */}
                    {completedTransactions.length > 0 && (
                        <div className="space-y-3 pt-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase px-2 tracking-widest">সম্পন্ন হিসাব</h3>
                            {completedTransactions.map(t => (
                                <div key={t.id} className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 opacity-60 flex justify-between items-center grayscale hover:grayscale-0 transition-all">
                                    <div className="flex items-center space-x-3 overflow-hidden">
                                        <CheckCircle size={16} className="text-slate-400 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-slate-500 dark:text-slate-400 text-sm line-through truncate">{t.name}</h4>
                                        </div>
                                    </div>
                                    <span className="font-bold text-slate-400 text-sm line-through whitespace-nowrap">৳ {t.amount}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6 animate-fade-in">
                    {/* Charts */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-6 flex items-center tracking-widest">
                            <PieIcon size={14} className="mr-2" /> মোট বাকি সারাংশ
                        </h3>
                        {totalPabo === 0 && totalDebo === 0 ? (
                            <div className="h-48 flex items-center justify-center text-slate-300 text-sm font-medium bg-slate-50 dark:bg-slate-900/50 rounded-2xl">কোনো ডেটা নেই</div>
                        ) : (
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-6 flex items-center tracking-widest">
                            <BarChart2 size={14} className="mr-2" /> মাসিক লেনদেন চিত্র
                        </h3>
                        <div className="h-64 w-full text-xs">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={prepareChartData()}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorPabo" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorDebo" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} dy={10} />
                                    <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                                        itemStyle={{ paddingBottom: '2px' }}
                                    />
                                    <Area type="monotone" dataKey="pabo" stackId="1" stroke="#10b981" strokeWidth={2} fill="url(#colorPabo)" />
                                    <Area type="monotone" dataKey="debo" stackId="1" stroke="#ef4444" strokeWidth={2} fill="url(#colorDebo)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AmarHisab;

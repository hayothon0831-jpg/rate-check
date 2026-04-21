/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  TrendingUp, 
  Coins, 
  Copy, 
  Check, 
  Info, 
  Zap, 
  DollarSign, 
  Users,
  BarChart3,
  ExternalLink,
  Eye,
  Target
} from 'lucide-react';

export default function App() {
  const [followers, setFollowers] = useState<number | ''>(50000);
  const [views, setViews] = useState<number | ''>(10000); // Новое поле для просмотров
  const [category, setCategory] = useState<'Lifestyle' | 'Business' | 'Entertainment'>('Lifestyle');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [copied, setCopied] = useState(false);

  const currencySymbols = { USD: '$', EUR: '€', GBP: '£' };
  const exchangeRates = { USD: 1, EUR: 0.92, GBP: 0.78 };

  const results = useMemo(() => {
    if (!followers || !views) return null;

    // Логика 2026: Базовая цена за просмотр (CPV)
    let cpvBase = 0.03; // База $0.03 за просмотр
    
    // Коэффициент ниши
    const categoryMultipliers = {
      Lifestyle: 1,
      Business: 1.8, // Бизнес дороже
      Entertainment: 0.7 // Юмор дешевле из-за низкой платежеспособности
    };

    // Расчет средней стоимости
    const baseRate = Number(views) * cpvBase * categoryMultipliers[category];
    
    // Бонус за "Качество" (соотношение просмотров к подписчикам)
    const reachQuality = Number(views) / Number(followers);
    const qualityBonus = reachQuality > 0.3 ? 1.2 : 1; // Если смотрят >30% фанатов - цена выше

    const midEstimate = baseRate * qualityBonus;
    const lowEstimate = midEstimate * 0.75;
    const highEstimate = midEstimate * 1.25;

    // Типизация инфлюенсера
    let tier = '';
    if (followers < 10000) tier = 'Nano-Influencer';
    else if (followers < 100000) tier = 'Micro-Influencer';
    else if (followers < 500000) tier = 'Mid-Tier Influencer';
    else tier = 'Macro-Influencer';

    const exchange = exchangeRates[currency];

    return {
      low: lowEstimate * exchange,
      mid: midEstimate * exchange,
      high: highEstimate * exchange,
      tier,
      cSymbol: currencySymbols[currency]
    };
  }, [followers, views, category, currency]);

  const handleCopy = () => {
    if (!results) return;
    const text = `Influencer Rate Estimate (2026 Standard):
Tier: ${results.tier}
Avg. Views: ${views}
Niche: ${category}
Est. Range: ${results.cSymbol}${results.low.toFixed(0)} - ${results.cSymbol}${results.high.toFixed(0)}
Calculated via RATECheck`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen selection:bg-neon-green/30 px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <header className="flex flex-col md:flex-row justify-between items-baseline gap-8">
          <div className="flex flex-col">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                RATE<span className="accent-text">Check</span>
              </h1>
            </motion.div>
            <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-xs mt-2 ml-1">
              The Real-Reach Pricing Standard 2026
            </p>
          </div>
          <div id="ad-header" className="ad-slot w-full md:w-72 h-20 rounded-lg flex items-center justify-center text-[10px] text-slate-700 uppercase font-bold tracking-widest border border-slate-800">
            Ad Space
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-8">
              
              <div className="space-y-6">
                {/* Followers Input */}
                <div className="input-group space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Users size={14} /> Total Followers
                    </label>
                    <span className="text-xl font-bold text-accent-color mono">{followers ? followers.toLocaleString() : '0'}</span>
                  </div>
                  <input type="number" value={followers} onChange={(e) => setFollowers(e.target.value === '' ? '' : Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-2xl mono focus:border-accent-color outline-none transition-all" />
                </div>

                {/* Views Input */}
                <div className="input-group space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Eye size={14} /> Average Views (Real Reach)
                    </label>
                    <span className="text-xl font-bold text-blue-400 mono">{views ? views.toLocaleString() : '0'}</span>
                  </div>
                  <input type="number" value={views} onChange={(e) => setViews(e.target.value === '' ? '' : Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-2xl mono focus:border-blue-400 outline-none transition-all" placeholder="Enter avg views..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Niche Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Target size={14} /> Content Niche
                    </label>
                    <select value={category} onChange={(e: any) => setCategory(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none">
                      <option value="Lifestyle">Lifestyle / Blog</option>
                      <option value="Business">Business / Finance / Tech</option>
                      <option value="Entertainment">Entertainment / Humour</option>
                    </select>
                  </div>

                  {/* Currency */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Coins size={14} /> Currency
                    </label>
                    <div className="flex gap-2">
                      {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                        <button key={curr} onClick={() => setCurrency(curr)} className={`flex-1 py-3 rounded-xl border transition-all text-[10px] font-bold ${currency === curr ? 'bg-accent-color border-accent-color text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>{curr}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-accent-color/20 p-8 rounded-3xl relative shadow-2xl">
                  <div className="space-y-8">
                    <div className="border-b border-slate-800 pb-4">
                      <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent-color mb-1">Recommended Rate</div>
                      <div className="text-xl font-black uppercase italic text-white">{results.tier}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-5xl font-black tracking-tighter mono">
                        {results.cSymbol}{results.mid.toFixed(0)}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                        Market Range: <span className="text-white">{results.cSymbol}{results.low.toFixed(0)} - {results.cSymbol}{results.high.toFixed(0)}</span>
                      </div>
                    </div>
                    <button onClick={handleCopy} className="w-full bg-accent-color hover:bg-amber-300 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase text-sm tracking-widest">
                      {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Copied' : 'Copy Quote'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl h-64 flex flex-col items-center justify-center text-center opacity-50">
                  <Info size={32} className="text-slate-500 mb-4" />
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Enter followers and views</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <footer className="text-center pt-8 border-t border-white/5 opacity-40">
          <p className="text-[10px] uppercase tracking-widest font-bold">© 2026 RATECheck Professional Analytics</p>
        </footer>
      </div>
    </div>
  );
}

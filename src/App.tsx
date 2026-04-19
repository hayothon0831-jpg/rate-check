/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
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
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [followers, setFollowers] = useState<number | ''>(50000);
  const [likes, setLikes] = useState<number | ''>(1750);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [copied, setCopied] = useState(false);

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£'
  };

  const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78
  };

  const calculatedER = useMemo(() => {
    if (!followers || !likes) return 0;
    return (Number(likes) / Number(followers)) * 100;
  }, [followers, likes]);

  const results = useMemo(() => {
    if (!followers || !calculatedER) return null;

    // Base Industry Logic
    // Standard: $10 per 1k followers (for 2.5% engagement)
    const baseRate = (Number(followers) / 1000) * 10;
    
    // Engagement Multiplier: 2.5% is the baseline. 
    // Every 1% above/below adds/subtracts 20% value.
    const engagementFactor = 1 + ((calculatedER - 2.5) * 0.2);
    
    // High Engagement Bonus: > 3% adds automatic 15% value
    const engagementBonus = calculatedER > 3 ? 1.15 : 1;
    
    // Professionalism/Brand Demand Factor
    const brandFactor = 1.15;

    const midEstimate = baseRate * Math.max(0.5, engagementFactor) * brandFactor * engagementBonus;
    
    // Low and High bounds (e.g., -20% and +30%)
    const lowEstimate = midEstimate * 0.8;
    const highEstimate = midEstimate * 1.3;

    // Categorization
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
      cSymbol: currencySymbols[currency],
      hasBonus: calculatedER > 3
    };
  }, [followers, calculatedER, currency]);

  const handleCopy = () => {
    if (!results) return;
    const text = `Influencer Rate Estimate:
Tier: ${results.tier}
Engagement: ${calculatedER.toFixed(2)}%
Est. Low: ${results.cSymbol}${results.low.toFixed(0)}
Est. Mid: ${results.cSymbol}${results.mid.toFixed(0)}
Est. High: ${results.cSymbol}${results.high.toFixed(0)}
Calculated via RATECheck`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen selection:bg-neon-green/30 px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section (SEO) */}
        <header className="flex flex-col md:flex-row justify-between items-baseline gap-8">
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                RATE<span className="accent-text">Check</span>
              </h1>
            </motion.div>
            <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-xs mt-2 ml-1">
              The Influencer & Brand Pricing Standard
            </p>
          </div>
          
          <div id="ad-header" className="ad-slot w-full md:w-72 h-20 rounded-lg overflow-hidden">
            AD SPACE - PREMIUM BANNER
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Input Panel */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-8"
            >
              <div className="space-y-6">
                <div className="input-group space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Total Followers
                    </label>
                    <span className="text-2xl font-bold text-accent-color mono">
                      {followers ? followers.toLocaleString() : '0'}
                    </span>
                  </div>
                  <input 
                    type="number"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-2xl mono focus:border-accent-color outline-hidden transition-all"
                    placeholder="50000"
                  />
                </div>

                <div className="input-group space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Average Likes Per Post
                    </label>
                    <span className="text-2xl font-bold text-accent-color mono">
                      {likes ? likes.toLocaleString() : '0'}
                    </span>
                  </div>
                  <input 
                    type="number"
                    value={likes}
                    onChange={(e) => setLikes(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-2xl mono focus:border-accent-color outline-hidden transition-all"
                    placeholder="1750"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Calculated Engagement</span>
                    <span className={`text-3xl font-bold mono transition-colors ${calculatedER > 3 ? 'text-accent-color' : 'text-white'}`}>
                      {calculatedER.toFixed(2)}<span className="text-sm text-slate-500 ml-1">%</span>
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] items-center gap-2 font-bold uppercase tracking-widest text-slate-400 flex">
                      <Coins size={12} /> Currency
                    </label>
                    <div className="flex gap-2">
                      {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                        <button
                          key={curr}
                          onClick={() => setCurrency(curr)}
                          className={`flex-1 py-3 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-widest ${
                            currency === curr 
                              ? 'bg-accent-color border-accent-color text-slate-950' 
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SEO Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
              <article>
                <h3 className="text-accent-color text-xs font-bold uppercase tracking-widest mb-2">Why Pricing Matters</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Undervaluing your content is a common mistake for <span className="text-white font-medium">micro-influencers</span>. 
                  Our tool uses a precise formula that weighs <span className="text-white font-medium">sponsored post costs</span> against 
                  engagement quality, not just raw follower counts.
                </p>
              </article>
              <article>
                <h3 className="text-accent-color text-xs font-bold uppercase tracking-widest mb-2">The Standard</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  High engagement rates signal a loyal community, allowing you 
                  to command a premium for <span className="text-white font-medium">brand deal sponsorship</span>. 
                  Calculated based on 2026 industry standards.
                </p>
              </article>
            </div>
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              {results ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900 border border-accent-color/20 p-8 rounded-3xl relative overflow-hidden group shadow-2xl"
                >
                  <div className="space-y-8 relative">
                    <div className="border-b border-slate-800 pb-4">
                      <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent-color mb-1">Estimated Worth</div>
                      <div className="text-xl font-black uppercase italic tracking-tighter text-white">{results.tier}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-5xl md:text-6xl font-black tracking-tighter mono">
                        {results.cSymbol}{results.mid.toFixed(0)}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-500">
                        <span>Range:</span>
                        <span className="text-white">{results.cSymbol}{results.low.toFixed(0)}</span>
                        <span>-</span>
                        <span className="text-white">{results.cSymbol}{results.high.toFixed(0)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={handleCopy}
                        className="w-full bg-accent-color hover:bg-amber-300 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase text-sm tracking-widest"
                      >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? 'Copied' : 'Copy Quote'}
                      </button>
                      
                      <div className="ad-slot w-full h-14 rounded-xl border-dashed">
                        AFFILIATE
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl h-64 flex flex-col items-center justify-center text-center space-y-4 opacity-50 grayscale">
                  <Info size={32} className="text-slate-500" />
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Enter metrics to calculate</p>
                </div>
              )}
            </AnimatePresence>

            {/* Ad Slot: Sidebar */}
            <div id="ad-sidebar" className="ad-slot w-full aspect-square rounded-3xl">
              AD SPACE - VERTICAL DISPLAY
            </div>

            <div className="p-6 border border-slate-800 rounded-3xl bg-slate-900/50">
              <h4 className="text-xs font-black uppercase tracking-tighter mb-4 border-b border-slate-800 pb-2">Creator Insights</h4>
              <ul className="text-[10px] text-slate-500 space-y-3 uppercase font-bold tracking-wider">
                <li className="flex items-center gap-2">• Rate parity standards 2026</li>
                <li className="flex items-center gap-2">• Engagement quality metrics</li>
                <li className="flex items-center gap-2">• High-value niche benchmarks</li>
                <li className="flex items-center gap-2">• Negotiation safety tips</li>
              </ul>
            </div>
          </div>

        </main>

        {/* How to use & SEO Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 italic">
              <Zap className="text-accent-color" size={18} /> How to use this tool
            </h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[10px] font-bold text-white">1</span>
                <span>Enter your aggregate **Follower Count** from Instagram or TikTok.</span>
              </li>
              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[10px] font-bold text-white">2</span>
                <span>Calculate your **Engagement Rate** (Average likes + comments per post / followers).</span>
              </li>
              <li className="flex gap-3">
                <span className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center text-[10px] font-bold text-white">3</span>
                <span>Use the generated **Influencer Pricing Range** to negotiate fair trade brand deals.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 italic">
              <ExternalLink className="text-accent-color" size={18} /> Optimize Your Growth
            </h3>
            <p className="text-sm text-text-secondary !leading-relaxed">
              Don't just chase <span className="text-white">sponsored post pricing</span>. Build trust by disclosing 
              partnerships clearly. Metrics like <span className="text-white">engagement factor</span> and 
              <span className="text-white">brand affinity</span> are the new gold standards for 2026. 
              Our calculator is updated monthly to reflect shifts in the creator economy.
            </p>
          </div>
        </section>

        {/* Ad Slot: Footer */}
        <div id="ad-footer" className="ad-slot w-full h-32 rounded-lg">
          [ Horizontal Leaderboard Ad ]
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-white/5 space-y-4 opacity-40 hover:opacity-100 transition-opacity">
          <p className="text-[10px] uppercase tracking-widest font-bold">
            © 2026 Influencer Rate & Brand Deal pricing Calculator
          </p>
          <div className="flex justify-center gap-6 text-[10px] font-medium">
            <a href="#" className="hover:text-accent-color">Privacy Policy</a>
            <a href="#" className="hover:text-accent-color">Terms of Service</a>
            <a href="#" className="hover:text-accent-color">Affiliate Disclosure</a>
          </div>
        </footer>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FooterProps {
  onSelectProduct: (product: 'supercharts' | 'screener') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectProduct }) => {
  const [legalModal, setLegalModal] = useState<{ title: string; content: string } | null>(null);

  const openLegal = (title: string, content: string) => {
    setLegalModal({ title, content });
  };

  return (
    <footer className="border-t border-[#f0f3fa] bg-white pt-10 pb-8 text-xs text-[#787b86]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Nav Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-10 border-b border-[#f0f3fa]">
          <div>
            <h3 className="font-bold text-[#131722] mb-3">Products</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectProduct('supercharts')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Supercharts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProduct('supercharts')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Pine Script®
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProduct('screener')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Stock Screener
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProduct('screener')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  ETF Screener
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectProduct('screener')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Crypto Screener
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#131722] mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openLegal('About TradingView', 'TradingView is a charting platform and social network used by 60M+ traders and investors worldwide to spot opportunities across global markets.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('Features', 'Explore institutional-grade charting, financial market screeners, automated pine script backtesting, and live collaborative community stream ideas.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('Pricing Plans', 'Choose between Essential, Plus, and Premium tiers with up to 25 indicators per chart, unlimited alert webhooks, and second-based intervals.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('Wall of Love', 'Read verified reviews from hundreds of thousands of active market participants, hedge fund analysts, and retail traders around the world.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Wall of Love
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('Careers', 'We are always looking for passionate engineers, quantitative analysts, and UX designers to build the future of financial analytics.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#131722] mb-3">Community</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openLegal('Refer a Friend', 'Invite fellow traders to TradingView and earn up to $30 in TradingView Coins for every friend who activates an upgraded subscription.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Refer a friend
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('Trade Ideas', 'Discover thousands of published ideas, trade set-ups, and macro analysis shared daily by seasoned analysts across all asset classes.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Ideas
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('Open-Source Scripts', 'Access the world’s largest open library of trading algorithms, custom indicators, and automated strategies written in Pine Script®.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Scripts
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('House Rules', 'Our community principles prioritize respectful discourse, transparent rationale, and genuine trading education over promotional noise.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  House Rules
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('Moderation Team', 'Our volunteer and staff moderators maintain high content quality, protect community integrity, and enforce market disclosure standards.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Moderators
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#131722] mb-3">Business</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openLegal('Financial Widgets', 'Embed interactive charts, market overviews, ticker tapes, and economic calendars directly onto your website with zero latency.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Widgets
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('Charting Libraries', 'Deploy our high-performance canvas charting engine directly into your enterprise trading app or fintech banking portal.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Charting libraries
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('Lightweight Charts™', 'An open-source, ultra-fast 40KB financial chart library designed specifically for mobile and responsive web applications.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Lightweight Charts™
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegal('Partner Advertising', 'Reach an affluent, financially engaged audience of investors and crypto enthusiasts across mobile, web, and desktop apps.')}
                  className="hover:text-[#2962ff] transition-colors text-left"
                >
                  Advertising
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#131722] mb-3">Social</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2962ff] transition-colors block"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2962ff] transition-colors block"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2962ff] transition-colors block"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2962ff] transition-colors block"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://reddit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2962ff] transition-colors block"
                >
                  Reddit
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#131722] mb-3">Made by humans</h3>
            <p className="leading-relaxed">
              Select market data provided by ICE Data Services. Select reference data provided by FactSet. © 2026 TradingView, Inc.
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer / Legal Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-4">
          <div>© 2026 TradingView, Inc. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => openLegal('Terms of Use', 'By accessing and utilizing the TradingView market intelligence platform, you agree to these Terms of Service. Market data is displayed for personal analysis purposes.')}
              className="hover:underline"
            >
              Terms of Use
            </button>
            <button
              onClick={() => openLegal('Market Disclaimer', 'All stock quotes, cryptocurrency prices, forex rates, and commodity data are provided for informational purposes only and do not constitute financial advice.')}
              className="hover:underline"
            >
              Disclaimer
            </button>
            <button
              onClick={() => openLegal('Privacy Policy', 'We value your privacy and comply with global data protection standards (GDPR, CCPA). Your trading preferences and saved indicators are securely encrypted.')}
              className="hover:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => openLegal('Cookies Policy', 'We use essential cookies to maintain session states, remember your preferred chart timeframes, and authenticate your user account securely.')}
              className="hover:underline"
            >
              Cookies Policy
            </button>
            <button
              onClick={() => openLegal('Security Overview', 'Our infrastructure employs end-to-end SSL/TLS encryption, SOC2 certified data centers, and multi-factor authentication for account security.')}
              className="hover:underline"
            >
              Security
            </button>
          </div>
        </div>
      </div>

      {/* Legal & Info Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#e0e3eb] relative">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 p-1 text-[#787b86] hover:text-[#131722] rounded-lg hover:bg-[#f0f3fa]"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-[#131722] mb-2">{legalModal.title}</h3>
            <p className="text-xs text-[#787b86] leading-relaxed">{legalModal.content}</p>
            <button
              onClick={() => setLegalModal(null)}
              className="mt-5 w-full py-2 bg-[#131722] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

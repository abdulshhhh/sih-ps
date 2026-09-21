'use client';

import React, { useState } from 'react';
import { useAuth, UserPersona } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

export default function HomePage() {
  const { loginAs, loginAsGuest } = useAuth();
  const [selectedSector, setSelectedSector] = useState<UserPersona | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useLanguage();

  const handleGuestLogin = async () => {
    if (!selectedSector) return;
    setErrorMsg('');
    try {
      await loginAsGuest();
      loginAs(selectedSector);
    } catch (err: any) {
      setErrorMsg(err.message || 'Guest login failed');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-slate-900 flex flex-col md:flex-row overflow-y-auto">
      {/* Brand Side */}
      <div className="hidden md:flex w-1/2 bg-primary flex-col justify-between p-10 relative overflow-hidden min-h-screen">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-primary icon-fill text-[28px]">
              assured_workload
            </span>
          </div>
          <h1 className="font-display font-black text-3xl text-white tracking-tight">
            {t('login.title')}
          </h1>
        </div>

        <div className="relative z-10 my-auto py-8">
          <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 font-mono text-xs font-bold rounded border border-amber-500/40 mb-4">
            {t('login.badge1')}
          </div>
          <h2 className="text-4xl font-display font-bold text-white mb-6 leading-tight whitespace-pre-line">
            {t('login.heroTitle')}
          </h2>
          <p className="text-primary-fixed-dim text-base max-w-md mb-8 leading-relaxed">
            {t('login.heroSubtitle')}
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 rounded-full border border-white/20 text-white/90 text-sm font-medium flex items-center gap-2 bg-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></span>
              {t('login.badge2')}
            </div>
            <div className="px-4 py-2 rounded-full border border-white/20 text-white/90 text-sm font-medium flex items-center gap-2 bg-white/5">
              <span className="material-symbols-outlined text-info text-[18px]">verified</span>
              {t('login.badge3')}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-white/50 font-mono">
          {t('login.footer')}
        </div>
      </div>

      {/* Login / Persona Selection Side */}
      <div className="w-full md:w-1/2 bg-slate-950 md:bg-surface-container-lowest flex flex-col justify-center items-center p-4 sm:p-8 md:p-10 min-h-screen relative overflow-y-auto">
        <div className="w-full max-w-md animate-fade-in my-auto py-6">
          <div className="md:hidden flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow">
              <span className="material-symbols-outlined text-white icon-fill">assured_workload</span>
            </div>
            <h1 className="font-display font-black text-2xl text-white md:text-primary">{t('login.title')}</h1>
          </div>

          <div className="mb-6 relative flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900 md:text-primary mb-1">
                {t('login.platformAccess')}
              </h2>
              <p className="text-slate-600 md:text-on-surface-variant text-sm">
                {selectedSector ? t('login.promptEnter') : t('login.promptSelect')}
              </p>
            </div>
            <div className="shrink-0 ml-4">
              <LanguageSwitcher />
            </div>
          </div>

          {!selectedSector ? (
            <div className="space-y-4">
              {/* Bidder Role Card */}
              <button
                onClick={() => setSelectedSector('BIDDER')}
                className="w-full group relative flex items-center p-4 sm:p-5 border border-slate-200 md:border-outline-variant rounded-2xl hover:border-info hover:shadow-md transition-all text-left bg-white hover:bg-blue-50/30"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-info flex items-center justify-center shrink-0 mr-4 group-hover:scale-110 transition-transform shadow-sm">
                  <span className="material-symbols-outlined icon-fill text-[26px]">storefront</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-primary text-base group-hover:text-info transition-colors">
                    {t('login.vendorRole')}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {t('login.vendorDesc')}
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-info group-hover:translate-x-1 transition-all">
                  arrow_forward
                </span>
              </button>

              {/* Officer Role Card */}
              <button
                onClick={() => setSelectedSector('CLIENT')}
                className="w-full group relative flex items-center p-4 sm:p-5 border border-slate-200 md:border-outline-variant rounded-2xl hover:border-warning hover:shadow-md transition-all text-left bg-white hover:bg-amber-50/30"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-warning flex items-center justify-center shrink-0 mr-4 group-hover:scale-110 transition-transform shadow-sm">
                  <span className="material-symbols-outlined icon-fill text-[26px]">gavel</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-primary text-base group-hover:text-warning transition-colors">
                    {t('login.officerRole')}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {t('login.officerDesc')}
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-warning group-hover:translate-x-1 transition-all">
                  arrow_forward
                </span>
              </button>

              {/* Prototype Access Notice Banner */}
              <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl border border-blue-700/50 shadow-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-mono text-[10px] font-black rounded uppercase tracking-wider">
                    PROTOTYPE ACCESS
                  </span>
                  <span className="text-xs font-semibold text-blue-200">SIH Evaluation Mode</span>
                </div>
                <p className="text-xs leading-relaxed text-blue-100">
                  For SIH evaluation, select either persona above and use the instant <strong className="text-amber-300 font-bold">Guest Login</strong> button.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 md:border-outline-variant rounded-2xl p-5 sm:p-6 shadow-xl">
              {/* Header with Back Button */}
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
                <button
                  onClick={() => setSelectedSector(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600"
                  title="Back to Persona Selection"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>
                <div className="font-bold text-lg text-primary">
                  {selectedSector === 'BIDDER' ? t('login.vendorLogin') :
                    selectedSector === 'CLIENT' ? t('login.officerLogin') :
                      t('login.adminLogin')}
                </div>
              </div>

              {/* PROTOTYPE ACCESS & GUEST LOGIN FEATURED BOX */}
              <div className="p-5 bg-slate-900 text-white rounded-xl border border-slate-700 shadow-md">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="material-symbols-outlined text-amber-400 text-[20px]">verified</span>
                  <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-mono text-[10px] font-black rounded uppercase tracking-wider">
                    PROTOTYPE ACCESS
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed mb-5">
                  For SIH evaluation, please use the <strong className="text-amber-300 font-bold">Guest Login</strong> option to access the platform.
                </p>

                {errorMsg && (
                  <div className="bg-danger/20 text-red-200 text-xs p-3 rounded-lg border border-danger/40 mb-4 font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* FEATURED GUEST BUTTON */}
                <button
                  type="button"
                  onClick={handleGuestLogin}
                  className="w-full py-4 px-4 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-slate-950 font-extrabold text-base rounded-xl flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
                  <span>Enter as <strong className="underline underline-offset-2">Guest Login</strong></span>
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-200/50 flex items-center justify-between text-[11px] text-slate-400">
            <span>{t('login.footerTag1')}</span>
            <span>•</span>
            <span>{t('login.footerTag2')}</span>
            <span>•</span>
            <span>{t('login.footerTag3')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

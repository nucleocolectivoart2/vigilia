/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VigiliaCore } from './components/VigiliaCore';
import { VigiliaFace } from './components/VigiliaFace';
import { VigiliaAuth } from './components/VigiliaAuth';
import { VigiliaCover } from './components/VigiliaCover';
import { Eye, Terminal, Fingerprint, Maximize, Minimize, Activity, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  // VIGILIA (CORE) is the primary main module
  const [activeModule, setActiveModule] = useState<'CORE' | 'FACE' | 'AUTH'>('CORE');
  const [operatorName, setOperatorName] = useState<string>('OPERADOR');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCover, setShowCover] = useState<boolean>(true);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fallback for browsers that restrict programmatic fullscreen
    }
  };

  const handleEnterFromCover = (module: 'CORE' | 'FACE' | 'AUTH') => {
    setActiveModule(module);
    setShowCover(false);
  };

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-black overflow-hidden font-mono select-none">
      {/* Portada / Cover Overlay */}
      <VigiliaCover 
        isOpen={showCover} 
        onEnter={handleEnterFromCover} 
        onClose={() => setShowCover(false)} 
      />

      {/* Top Header Navigation */}
      <header className="h-11 sm:h-12 bg-[#030604] border-b border-green-950 flex items-center justify-between px-3 sm:px-4 z-40 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setShowCover(true)}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
            <span className="text-xs sm:text-sm font-black tracking-widest text-white hover:text-green-400 transition-colors">
              VIGILIA <span className="text-green-500 font-normal hidden xs:inline">// NÚCLEO COLECTIVO</span>
            </span>
          </div>

          {/* Desktop/Tablet Module Tabs - VIGILIA CORE IS PRIMARY (01) */}
          <nav className="hidden md:flex items-center gap-1.5 ml-4 pl-4 border-l border-green-950/80">
            <button
              onClick={() => setActiveModule('CORE')}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all min-h-[36px] ${
                activeModule === 'CORE'
                  ? 'bg-green-950/80 border border-green-500 text-white shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                  : 'text-neutral-400 hover:text-green-400 border border-transparent hover:bg-green-950/30'
              }`}
            >
              <Terminal size={13} className={activeModule === 'CORE' ? 'text-green-400' : ''} />
              01 · KERNEL VIGILIA
            </button>
            <button
              onClick={() => setActiveModule('FACE')}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all min-h-[36px] ${
                activeModule === 'FACE'
                  ? 'bg-green-950/80 border border-green-500 text-white shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                  : 'text-neutral-400 hover:text-green-400 border border-transparent hover:bg-green-950/30'
              }`}
            >
              <Eye size={13} className={activeModule === 'FACE' ? 'text-green-400' : ''} />
              02 · ROSTRO & MIRADA
            </button>
            <button
              onClick={() => setActiveModule('AUTH')}
              className={`px-2.5 py-1.5 rounded-sm text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all min-h-[36px] ${
                activeModule === 'AUTH'
                  ? 'bg-green-950/80 border border-green-500 text-white shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                  : 'text-neutral-500 hover:text-green-400 border border-transparent hover:bg-green-950/30'
              }`}
              title="Protocolo Biométrico de Acceso"
            >
              <Fingerprint size={13} />
              03 · PROTOCOLO
            </button>
          </nav>
        </div>

        {/* Right Status, Portada & Fullscreen Actions */}
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] text-green-500 font-mono">
          <button
            onClick={() => setShowCover(true)}
            className="px-2 py-1 rounded border border-green-900/80 hover:border-green-500 bg-green-950/40 text-neutral-300 hover:text-green-300 flex items-center gap-1.5 text-[10px] font-bold transition-all min-h-[34px]"
            title="Abrir Portada y Manifiesto de Vigilia"
          >
            <BookOpen size={12} className="text-green-400" />
            <span className="hidden sm:inline">PORTADA / INFO</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 bg-green-950/40 px-2 py-0.5 border border-green-900/60 rounded">
            <Activity size={10} className="text-green-400" />
            <span className="text-neutral-400">SUJETO:</span>
            <span className="text-green-300 font-bold">{operatorName}</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 sm:px-2.5 sm:py-1 rounded border border-green-900/80 hover:border-green-500 text-neutral-400 hover:text-green-300 hover:bg-green-950/40 flex items-center gap-1 text-[10px] transition-all min-h-[36px] min-w-[36px] justify-center"
            title="Alternar Pantalla Completa"
          >
            {isFullscreen ? <Minimize size={13} /> : <Maximize size={13} />}
            <span className="hidden sm:inline">{isFullscreen ? 'SALIR' : 'FULLSCREEN'}</span>
          </button>
        </div>
      </header>

      {/* Active Module View */}
      <main className="flex-1 w-full h-[calc(100dvh-2.75rem)] md:h-[calc(100dvh-3rem)] pb-14 md:pb-0 overflow-hidden relative">
        {activeModule === 'CORE' && <VigiliaCore userName={operatorName} />}
        {activeModule === 'FACE' && <VigiliaFace />}
        {activeModule === 'AUTH' && (
          <VigiliaAuth
            onAccessGranted={(name) => {
              setOperatorName(name);
              setActiveModule('CORE');
            }}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Tab Bar (Ergonomic Thumb-Zone Navigation) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#030704]/95 backdrop-blur-md border-t border-green-950/90 z-50 flex items-center justify-around px-2 pb-safe select-none">
        <button
          onClick={() => setActiveModule('CORE')}
          className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded transition-all ${
            activeModule === 'CORE'
              ? 'text-white'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <div className={`p-1 rounded-full ${activeModule === 'CORE' ? 'bg-green-950 text-green-400 border border-green-500/70 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : ''}`}>
            <Terminal size={17} />
          </div>
          <span className={`text-[9px] font-bold tracking-tight mt-0.5 ${activeModule === 'CORE' ? 'text-green-300' : 'text-neutral-500'}`}>
            KERNEL
          </span>
        </button>

        <button
          onClick={() => setActiveModule('FACE')}
          className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded transition-all ${
            activeModule === 'FACE'
              ? 'text-white'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <div className={`p-1 rounded-full ${activeModule === 'FACE' ? 'bg-green-950 text-green-400 border border-green-500/70 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : ''}`}>
            <Eye size={17} />
          </div>
          <span className={`text-[9px] font-bold tracking-tight mt-0.5 ${activeModule === 'FACE' ? 'text-green-300' : 'text-neutral-500'}`}>
            ROSTRO
          </span>
        </button>

        <button
          onClick={() => setActiveModule('AUTH')}
          className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded transition-all ${
            activeModule === 'AUTH'
              ? 'text-white'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <div className={`p-1 rounded-full ${activeModule === 'AUTH' ? 'bg-green-950 text-green-400 border border-green-500/70 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : ''}`}>
            <Fingerprint size={17} />
          </div>
          <span className={`text-[9px] font-bold tracking-tight mt-0.5 ${activeModule === 'AUTH' ? 'text-green-300' : 'text-neutral-500'}`}>
            PROTOCOLO
          </span>
        </button>

        <button
          onClick={() => setShowCover(true)}
          className="flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded transition-all text-neutral-500 hover:text-green-400"
        >
          <div className="p-1 rounded-full text-green-600">
            <BookOpen size={17} />
          </div>
          <span className="text-[9px] font-bold tracking-tight mt-0.5 text-neutral-500">
            PORTADA
          </span>
        </button>
      </nav>
    </div>
  );
}

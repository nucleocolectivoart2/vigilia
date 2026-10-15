/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, Terminal, Fingerprint, Activity, Sparkles, Shield, ChevronRight, X, Play } from 'lucide-react';

interface VigiliaCoverProps {
  onEnter: (module: 'CORE' | 'FACE' | 'AUTH') => void;
  onClose?: () => void;
  isOpen: boolean;
}

export const VigiliaCover: React.FC<VigiliaCoverProps> = ({ onEnter, onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#020503]/95 backdrop-blur-xl flex flex-col font-mono select-none overflow-y-auto text-green-400">
      {/* Background CRT and Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Close button if revisiting */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full border border-green-800/80 bg-black/60 text-green-400 hover:text-white hover:border-green-400 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Cerrar Portada"
        >
          <X size={18} />
        </button>
      )}

      <div className="relative flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-between">
        {/* Header Branding */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-green-950 pb-6">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_#22c55e]"></span>
            <div>
              <span className="text-[10px] tracking-[0.3em] text-green-600 uppercase font-bold block">
                NÚCLEO COLECTIVO · LABORATORIO DE ARTE & IA
              </span>
              <span className="text-xs text-neutral-400 tracking-wider">
                MANUEL // INSTALACIÓN INTERACTIVA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-green-700 font-mono">
            <span className="px-2 py-0.5 border border-green-900 rounded bg-green-950/40">v2026.4 // MULTITOUCH 3D</span>
            <span className="px-2 py-0.5 border border-green-900 rounded bg-green-950/40">CÓMPUTO LOCAL PRIVADO</span>
          </div>
        </header>

        {/* Hero Section */}
        <div className="my-8 sm:my-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-block px-3 py-1 rounded bg-green-950/70 border border-green-500/50 text-green-300 text-xs font-bold tracking-widest uppercase">
              PROYECTO PRINCIPAL
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-none">
              VIGILIA<span className="text-green-500 italic">EXP</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-sans">
              Instalación interactiva de observación cibernética, biometría generativa y poética algorítmica. Un espejo maquínico que transmuta tu respiración, mirada y movimiento físico en paisajes visuales y sonoros reactivos en tiempo real.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onEnter('CORE')}
                className="px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-black text-sm tracking-[0.2em] rounded-sm transition-all shadow-[0_0_25px_rgba(34,197,94,0.5)] flex items-center gap-2.5 min-h-[48px] active:scale-95 group cursor-pointer"
              >
                <Play size={16} className="fill-black group-hover:scale-110 transition-transform" />
                <span>INICIAR EXPERIENCIA (KERNEL)</span>
              </button>

              <button
                onClick={() => onEnter('FACE')}
                className="px-6 py-4 bg-green-950/60 hover:bg-green-900/60 text-green-300 border border-green-700/80 hover:border-green-400 font-bold text-xs tracking-wider rounded-sm transition-all flex items-center gap-2 min-h-[48px] active:scale-95 cursor-pointer"
              >
                <Eye size={15} />
                <span>ROSTRO & MIRADA</span>
              </button>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="w-full lg:w-[420px] flex-shrink-0">
            <div className="relative rounded-lg overflow-hidden border border-green-800/80 bg-black/80 shadow-[0_0_40px_rgba(34,197,94,0.15)] group">
              <img 
                src="/img/vigilia.png" 
                alt="Vigilia Instalación Interactiva" 
                className="w-full h-64 sm:h-72 object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/85 backdrop-blur-md rounded border border-green-900/80 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <Activity size={12} className="text-green-400 animate-pulse" />
                  <span className="text-white font-bold">ÓPTICA TERMOGENERATIVA</span>
                </div>
                <span className="text-green-500 font-mono">SENSOR ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-green-950">
          {/* Module 1: Kernel Vigilia */}
          <div 
            onClick={() => onEnter('CORE')}
            className="p-4 rounded border border-green-900/60 hover:border-green-500 bg-green-950/20 hover:bg-green-950/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-green-500 font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <Terminal size={13} /> 01 · KERNEL VIGILIA
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500 text-black font-bold">PRINCIPAL</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-green-300 transition-colors">
                Matriz Óptica & Poética Kinética
              </h3>
              <p className="text-[11px] text-neutral-400 font-sans mt-1.5 leading-relaxed">
                Malla 3D de respiración, análisis de audio espectral, visión térmica y generación poética en vivo.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-green-400 font-bold mt-3 group-hover:translate-x-1 transition-transform">
              <span>EXPLORAR KERNEL</span>
              <ChevronRight size={12} />
            </div>
          </div>

          {/* Module 2: Rostro & Mirada */}
          <div 
            onClick={() => onEnter('FACE')}
            className="p-4 rounded border border-green-900/60 hover:border-green-500 bg-green-950/20 hover:bg-green-950/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-green-500 font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <Eye size={13} /> 02 · ROSTRO & MIRADA
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-green-300 transition-colors">
                Biometría Facial & Cosmos
              </h3>
              <p className="text-[11px] text-neutral-400 font-sans mt-1.5 leading-relaxed">
                478 puntos de malla sagrada, pupilas reactivas, auras de tensión y enjambre nebular de 400 partículas.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-green-400 font-bold mt-3 group-hover:translate-x-1 transition-transform">
              <span>EXPLORAR ROSTRO</span>
              <ChevronRight size={12} />
            </div>
          </div>

          {/* Module 3: Protocolo */}
          <div 
            onClick={() => onEnter('AUTH')}
            className="p-4 rounded border border-green-900/60 hover:border-green-500 bg-green-950/20 hover:bg-green-950/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-green-500 font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <Fingerprint size={13} /> 03 · PROTOCOLO BIOMÉTRICO
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-green-300 transition-colors">
                Credencialización de Operador
              </h3>
              <p className="text-[11px] text-neutral-400 font-sans mt-1.5 leading-relaxed">
                Escaneo biométrico procedimental, registro del sujeto observado y verificación de acceso en el sistema.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-green-400 font-bold mt-3 group-hover:translate-x-1 transition-transform">
              <span>ACCEDER A PROTOCOLO</span>
              <ChevronRight size={12} />
            </div>
          </div>
        </div>

        {/* Footer info & gestures hint */}
        <footer className="mt-8 pt-4 border-t border-green-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-neutral-500">
          <div className="flex items-center gap-2">
            <Sparkles size={11} className="text-green-500" />
            <span>GESTOS TÁCTILES: Pellizcar para Zoom Focal · Rotación con 2 dedos para perspectiva 3D</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Shield size={10} className="text-green-600" /> Sin transmisión de video a servidores</span>
            <span>NÚCLEO COLECTIVO © 2026</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

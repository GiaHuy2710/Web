import React from 'react';
import { Terminal, Globe, Gamepad2, CheckCircle2, Boxes } from 'lucide-react';
import { ProductKind } from './types';

interface Props {
  selectedKind: ProductKind;
  onSelectKind: (kind: ProductKind) => void;
}

export const ProductTypeSelector: React.FC<Props> = ({ selectedKind, onSelectKind }) => {
  return (
    <div className="p-6 rounded-3xl bg-[#090e17] border border-white/[0.06] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Boxes className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-white tracking-wide">
            1. Chọn Loại Sản Phẩm Số
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Bắt buộc • Chọn 1 loại hình
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Công cụ & CLI */}
        <div
          onClick={() => onSelectKind('cli')}
          className={`p-5 rounded-2xl border transition cursor-pointer ${
            selectedKind === 'cli'
              ? 'bg-[#0f1726] border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
              : 'bg-[#0b101b] border-white/[0.06] hover:border-white/[0.15]'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Terminal className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                CLI / Crate / Go
              </span>
              {selectedKind === 'cli' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
            </div>
          </div>
          <h3 className="text-base font-bold text-white">Công cụ & CLI</h3>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Developer tools, Shell extensions, Raycast/Alfred extensions, Linters, utilities dòng lệnh cross-platform.
          </p>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-2 text-[10px] font-mono text-emerald-400">
            <span>● Cargo</span>
            <span>● npm</span>
            <span>● Binary Executable</span>
          </div>
        </div>

        {/* Card 2: Website & Web App */}
        <div
          onClick={() => onSelectKind('web')}
          className={`p-5 rounded-2xl border transition cursor-pointer ${
            selectedKind === 'web'
              ? 'bg-[#0f1726] border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
              : 'bg-[#0b101b] border-white/[0.06] hover:border-white/[0.15]'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Globe className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                Fullstack / Next.js
              </span>
              {selectedKind === 'web' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
            </div>
          </div>
          <h3 className="text-base font-bold text-white">Website & Web App</h3>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Nền tảng Cloud SaaS, Interactive Portfolio, WebXR dashboards, Micro-apps trực tuyến và PWA tiện ích.
          </p>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-2 text-[10px] font-mono text-cyan-400">
            <span>● Vercel</span>
            <span>● Cloudflare Workers</span>
            <span>● Docker</span>
          </div>
        </div>

        {/* Card 3: Game Số & Indie */}
        <div
          onClick={() => onSelectKind('game')}
          className={`p-5 rounded-2xl border transition cursor-pointer ${
            selectedKind === 'game'
              ? 'bg-[#0f1726] border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
              : 'bg-[#0b101b] border-white/[0.06] hover:border-white/[0.15]'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Gamepad2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                Indie / GameDev
              </span>
              {selectedKind === 'game' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
            </div>
          </div>
          <h3 className="text-base font-bold text-white">Game Số & Indie</h3>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Trò chơi 2D/3D Indie, HTML5/Canvas experiments, bản xuất Godot WebAssembly, Unity WebGL, và ROM.
          </p>
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-2 text-[10px] font-mono text-purple-400">
            <span>● WASM</span>
            <span>● PixiJS</span>
            <span>● Godot 4</span>
            <span>● WebGL</span>
          </div>
        </div>
      </div>
    </div>
  );
};
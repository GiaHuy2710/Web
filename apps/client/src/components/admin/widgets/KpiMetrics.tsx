import React, { useState, useEffect } from 'react';
import { Boxes, Download, Users, Server } from 'lucide-react';
import { ProductRegistryItem } from '../products/types';
import { AdminUserMember } from '../users/types';

export const KpiMetrics: React.FC = () => {
  const [products, setProducts] = useState<ProductRegistryItem[]>(() => {
    try {
      const raw = localStorage.getItem('devfolio_products');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  });

  const [users, setUsers] = useState<AdminUserMember[]>(() => {
    try {
      const raw = localStorage.getItem('devfolio_users');
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    const handleSync = () => {
      try {
        const rawProducts = localStorage.getItem('devfolio_products');
        setProducts(rawProducts ? JSON.parse(rawProducts) : []);
      } catch {
        // ignore
      }

      try {
        const rawUsers = localStorage.getItem('devfolio_users');
        setUsers(rawUsers ? JSON.parse(rawUsers) : []);
      } catch {
        // ignore
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('devfolio_products_updated', handleSync);
    window.addEventListener('devfolio_users_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('devfolio_products_updated', handleSync);
      window.removeEventListener('devfolio_users_updated', handleSync);
    };
  }, []);

  // Compute products metrics
  const totalProducts = products.length;
  const webAppsCount = products.filter(
    (p) => p.category === 'web' || p.categoryLabel?.toLowerCase().includes('web')
  ).length;
  const toolsCount = products.filter(
    (p) =>
      p.category === 'cli' ||
      p.categoryLabel?.toLowerCase().includes('cli') ||
      p.categoryLabel?.toLowerCase().includes('tool')
  ).length;
  const gamesCount = products.filter(
    (p) => p.category === 'game' || p.categoryLabel?.toLowerCase().includes('game')
  ).length;

  // Compute downloads metrics
  const totalDownloadsNum = products.reduce((acc, p) => {
    const val = parseInt(p.downloads?.replace(/[^0-9]/g, '') || '0', 10);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  const formattedDownloads =
    totalDownloadsNum >= 1000
      ? `${(totalDownloadsNum / 1000).toFixed(1)}k`
      : `${totalDownloadsNum}`;

  // Compute users metrics
  const totalUsers = users.length;
  const activeUsersCount = users.filter((u) => u.status === 'active').length;
  const activeRate =
    totalUsers > 0 ? Math.round((activeUsersCount / totalUsers) * 100) : 0;

  // Compute CDN storage metrics
  const usedGb = totalProducts > 0 ? (totalProducts * 0.25).toFixed(1) : '0.0';
  const quotaPercent =
    totalProducts > 0
      ? Math.min(100, Math.round((parseFloat(usedGb) / 100) * 100))
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Tổng sản phẩm & Tools */}
      <div className="p-5 rounded-2xl bg-[#0b101a] border border-white/[0.06] hover:border-emerald-500/30 transition group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Tổng sản phẩm & Tools
          </span>
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400">
            <Boxes className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5 mt-3">
          <span className="text-3xl font-extrabold text-white tracking-tight">{totalProducts}</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/[0.06] text-slate-400 border border-white/[0.08]">
            {totalProducts > 0 ? `+${totalProducts} kỳ này` : '0 kỳ này'}
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.05] text-[11px] text-slate-400 flex items-center gap-2">
          <span className="text-emerald-400 font-medium">{webAppsCount} Web Apps</span>
          <span>•</span>
          <span>{toolsCount} Tools</span>
          <span>•</span>
          <span>{gamesCount} Games</span>
        </div>
      </div>

      {/* Card 2: Lượt tải & Demo Live */}
      <div className="p-5 rounded-2xl bg-[#0b101a] border border-white/[0.06] hover:border-cyan-500/30 transition group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Lượt tải & Demo Live
          </span>
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
            <Download className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5 mt-3">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {totalDownloadsNum > 0 ? formattedDownloads : '0'}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            {totalDownloadsNum > 0 ? '+100%' : '0%'}
          </span>
        </div>

        {/* Sparkline curve */}
        <div className="mt-2 h-5 w-full flex items-end">
          <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 20">
            <path
              d={totalDownloadsNum > 0 ? "M0,15 Q15,18 30,12 T60,8 T80,4 T100,2" : "M0,18 L100,18"}
              fill="none"
              stroke={totalDownloadsNum > 0 ? "#10b981" : "#475569"}
              strokeWidth="2"
              strokeDasharray={totalDownloadsNum > 0 ? undefined : "3 3"}
            />
          </svg>
        </div>

        <div className="mt-2 pt-2 border-t border-white/[0.05] text-[11px] flex items-center justify-between">
          <span className="text-slate-400">30 ngày qua</span>
          <span className="text-emerald-400 font-medium">
            {totalDownloadsNum > 0 ? `+${formattedDownloads} lượt mới` : 'Chưa có lượt tải'}
          </span>
        </div>
      </div>

      {/* Card 3: Người dùng & Đăng ký */}
      <div className="p-5 rounded-2xl bg-[#0b101a] border border-white/[0.06] hover:border-emerald-500/30 transition group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Người dùng & Đăng ký
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-2.5 mt-3">
          <span className="text-3xl font-extrabold text-white tracking-tight">{totalUsers}</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            {totalUsers > 0 ? `+${totalUsers} tuần này` : '0 tuần này'}
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.05] text-[11px] flex items-center justify-between">
          <span className="text-slate-400">Tỷ lệ hoạt động (Active)</span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${activeRate}%` }}
              />
            </div>
            <span className="text-white font-semibold">{activeRate}%</span>
          </div>
        </div>
      </div>

      {/* Card 4: CDN Edge & Băng thông */}
      <div className="p-5 rounded-2xl bg-[#0b101a] border border-white/[0.06] hover:border-blue-500/30 transition group relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            CDN Edge & Băng thông
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
            <Server className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 mt-3">
          <span className="text-3xl font-extrabold text-white tracking-tight">{usedGb}</span>
          <span className="text-sm text-slate-400 font-semibold">/ 100 GB</span>
        </div>

        <div className="mt-4 pt-3 border-t border-white/[0.05] text-[11px] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400">
            <div className="w-10 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${quotaPercent}%` }}
              />
            </div>
            <span>{quotaPercent}% quota</span>
          </div>
          <span className="text-emerald-400 font-medium">Zero Egress Fees</span>
        </div>
      </div>
    </div>
  );
};

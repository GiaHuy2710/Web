import React, { useState } from 'react';
import { Terminal, Globe, Gamepad2, Search, Layout, Box } from 'lucide-react';
import { ProductRegistryItem } from './types';

interface Props {
  products: ProductRegistryItem[];
}

export const ProductTable: React.FC<Props> = ({ products }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const renderIcon = (type: ProductRegistryItem['categoryIcon']) => {
    switch (type) {
      case 'terminal':
        return <Terminal className="w-4 h-4 text-emerald-400" />;
      case 'web':
        return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'game':
        return <Gamepad2 className="w-4 h-4 text-purple-400" />;
      case 'tool':
        return <Search className="w-4 h-4 text-amber-400" />;
      case 'window':
        return <Layout className="w-4 h-4 text-blue-400" />;
      default:
        return <Box className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#090e17] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-white/[0.06] bg-[#0c121e] text-[10px] font-mono text-slate-400 tracking-wider uppercase">
              <th className="p-3.5 pl-4 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === products.length && products.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-white/20 bg-slate-900 text-emerald-400 cursor-pointer"
                />
              </th>
              <th className="p-3.5">SẢN PHẨM & MÃ ĐỊNH DANH</th>
              <th className="p-3.5">PHÂN LOẠI & TECH STACK</th>
              <th className="p-3.5">SEMVER HIỆN TẠI</th>
              <th className="p-3.5">LƯỢT TẢI / TRUY CẬP</th>
              <th className="p-3.5">TÌNH TRẠNG</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-white/[0.04]">
            {products.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-white/[0.02] transition cursor-pointer"
              >
                {/* Checkbox */}
                <td className="p-3.5 pl-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleSelectOne(item.id)}
                    className="rounded border-white/20 bg-slate-900 text-emerald-400 cursor-pointer"
                  />
                </td>

                {/* Tên & Slug */}
                <td className="p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#111724] border border-white/[0.08] flex items-center justify-center shrink-0">
                      {renderIcon(item.categoryIcon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <span>{item.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 font-normal">
                          {item.indexTag}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {item.slug} // {item.code}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Phân loại & Tech stack */}
                <td className="p-3.5">
                  <div className="space-y-1">
                    <div className="text-slate-300 font-medium flex items-center gap-1">
                      {item.categoryLabel}
                    </div>
                    <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.2 rounded bg-white/[0.05] border border-white/[0.07] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>

                {/* SemVer */}
                <td className="p-3.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border ${
                      item.versionType === 'stable'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : item.versionType === 'rc'
                        ? 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                        : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                    }`}
                  >
                    {item.version}
                  </span>
                </td>

                {/* Lượt tải */}
                <td className="p-3.5">
                  <div className="font-bold text-white">{item.downloads}</div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {item.subStats}
                  </div>
                </td>

                {/* Tình trạng */}
                <td className="p-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                      item.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                        : item.status === 'draft'
                        ? 'bg-white/[0.05] text-slate-400 border-white/[0.08]'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/25'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'active'
                          ? 'bg-emerald-400'
                          : item.status === 'draft'
                          ? 'bg-slate-400'
                          : 'bg-amber-400'
                      }`}
                    />
                    <span>{item.statusLabel}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3.5 bg-[#0a0f19] border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          Hiển thị <span className="font-bold text-white">1 - 6</span> trên tổng số{' '}
          <span className="font-bold text-white">48</span> sản phẩm
        </div>

        <div className="flex items-center gap-1 font-mono text-xs">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-slate-300 disabled:opacity-40 cursor-pointer"
          >
            ‹ Trước
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg bg-emerald-400 text-slate-950 font-bold flex items-center justify-center cursor-pointer"
          >
            1
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg hover:bg-white/[0.08] text-slate-400 flex items-center justify-center cursor-pointer"
          >
            2
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg hover:bg-white/[0.08] text-slate-400 flex items-center justify-center cursor-pointer"
          >
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button
            type="button"
            className="w-7 h-7 rounded-lg hover:bg-white/[0.08] text-slate-400 flex items-center justify-center cursor-pointer"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-slate-300 cursor-pointer"
          >
            Sau ›
          </button>
        </div>
      </div>
    </div>
  );
};
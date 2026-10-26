import React, { useState, useEffect } from 'react';
import { Boxes, Edit3, Clock, MoreVertical, Terminal, Globe, Gamepad2 } from 'lucide-react';
import { RecentUploadsTableProps } from '../types';
import { ProductRegistryItem } from '../products/types';

export { type RecentUploadsTableProps };

export const RecentUploadsTable: React.FC<RecentUploadsTableProps> = ({ onShowToast }) => {
  const [products, setProducts] = useState<ProductRegistryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('devfolio_products');
        if (raw) return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    return [];
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const raw = localStorage.getItem('devfolio_products');
        if (raw) setProducts(JSON.parse(raw));
      } catch {
        // ignore
      }
    };
    window.addEventListener('devfolio_products_updated', handleUpdate);
    return () => window.removeEventListener('devfolio_products_updated', handleUpdate);
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-[#0b101a] border border-white/[0.06]">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
        <div>
          <h2 className="font-bold text-white text-sm">
            Sản phẩm tải lên gần đây & Trạng thái
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Quản lý trực tiếp các artifact, package & repo demo
          </p>
        </div>
        <button 
          onClick={() => onShowToast(`Danh sách đang có ${products.length} sản phẩm.`)}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition cursor-pointer"
        >
          <span>Xem tất cả ({products.length})</span>
          <span>→</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-white/[0.05]">
              <th className="py-3 px-2">Tên sản phẩm / Repo</th>
              <th className="py-3 px-2">Phiên bản</th>
              <th className="py-3 px-2">Trạng thái</th>
              <th className="py-3 px-2">Lượt tải</th>
              <th className="py-3 px-2 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400">
                  <Boxes className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <div className="text-white font-semibold">Chưa có sản phẩm nào được tải lên</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Các dự án và bản build mới khi bạn đăng tải sẽ tự động xuất hiện tại đây.
                  </div>
                </td>
              </tr>
            ) : (
              products.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3.5 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#111724] border border-white/[0.08] flex items-center justify-center text-cyan-400">
                        {item.category === 'cli' ? (
                          <Terminal className="w-4 h-4 text-emerald-400" />
                        ) : item.category === 'game' ? (
                          <Gamepad2 className="w-4 h-4 text-purple-400" />
                        ) : (
                          <Globe className="w-4 h-4 text-cyan-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.categoryLabel}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-2">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                      {item.version}
                    </span>
                  </td>
                  <td className="py-3.5 px-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {item.status === 'active' ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 font-mono text-slate-300">{item.downloads} dl</td>
                  <td className="py-3.5 px-2 text-right">
                    <div className="inline-flex items-center gap-1 text-slate-400">
                      <button onClick={() => onShowToast(`Chỉnh sửa ${item.name}`)} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => onShowToast(`Xem lịch sử ${item.name}`)} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                        <Clock className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => onShowToast('Menu tùy chọn mở rộng')} className="p-1.5 hover:text-white rounded-lg hover:bg-white/[0.06] transition cursor-pointer">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

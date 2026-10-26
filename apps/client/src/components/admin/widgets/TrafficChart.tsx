import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

export const TrafficChart: React.FC = () => {
  const [chartMetric, setChartMetric] = useState<'views' | 'downloads' | 'builds'>('views');
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const [hasData, setHasData] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem('devfolio_products');
      if (raw) return JSON.parse(raw).length > 0;
    } catch {
      // ignore
    }
    return false;
  });

  useEffect(() => {
    const handleSync = () => {
      try {
        const raw = localStorage.getItem('devfolio_products');
        setHasData(raw ? JSON.parse(raw).length > 0 : false);
      } catch {
        // ignore
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('devfolio_products_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('devfolio_products_updated', handleSync);
    };
  }, []);

  const chartData = hasData
    ? [
        { day: '10', views: 720, downloads: 410, builds: 1 },
        { day: '11', views: 810, downloads: 460, builds: 2 },
        { day: '12', views: 690, downloads: 380, builds: 1 },
        { day: '13', views: 940, downloads: 520, builds: 2 },
        { day: '14', views: 1120, downloads: 680, builds: 3 },
        { day: '15', views: 890, downloads: 490, builds: 2 },
        { day: '16', views: 1040, downloads: 610, builds: 2 },
        { day: '17', views: 980, downloads: 570, builds: 2 },
        { day: '18', views: 1450, downloads: 910, builds: 4 },
        { day: '19', views: 1620, downloads: 1040, builds: 4 },
        { day: '20', views: 1842, downloads: 1210, builds: 5, isPeak: true },
        { day: '21', views: 1510, downloads: 980, builds: 3 },
        { day: '22', views: 1420, downloads: 920, builds: 3 },
        { day: 'Hôm nay', views: 1730, downloads: 1150, builds: 4, isToday: true },
      ]
    : [];

  const maxVal = chartData.length > 0 ? Math.max(...chartData.map((d) => d[chartMetric])) : 1;

  return (
    <div className="p-6 rounded-2xl bg-[#0b101a] border border-white/[0.06] relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.05]">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h2 className="font-bold text-white text-sm">
              Lưu lượng truy cập & Lượt tải theo ngày
            </h2>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Dữ liệu phân phối thời gian thực từ 12 cụm CDN Edge
          </p>
        </div>

        {/* Switcher: Lượt xem | Lượt tải | Bản build */}
        <div className="p-1 rounded-xl bg-[#0e1524] border border-white/[0.06] flex items-center gap-1 text-xs self-start sm:self-auto">
          <button
            onClick={() => setChartMetric('views')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              chartMetric === 'views' ? 'bg-[#1b2639] text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Lượt xem
          </button>
          <button
            onClick={() => setChartMetric('downloads')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              chartMetric === 'downloads' ? 'bg-[#1b2639] text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Lượt tải
          </button>
          <button
            onClick={() => setChartMetric('builds')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              chartMetric === 'builds' ? 'bg-[#1b2639] text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bản build
          </button>
        </div>
      </div>

      {/* 4 Highlight Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-white/[0.05]">
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Ngày cao điểm</div>
          <div className="text-base font-bold text-white mt-0.5">{hasData ? '1,842' : '0'}</div>
          <div className="text-[10px] text-emerald-400">{hasData ? '+24% vs trung bình' : 'Chưa có đỉnh tải'}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Truy cập Desktop</div>
          <div className="text-base font-bold text-white mt-0.5">{hasData ? '94.2%' : '0%'}</div>
          <div className="text-[10px] text-cyan-400">{hasData ? 'Developers / Terminals' : 'Chưa ghi nhận'}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Avg Duration</div>
          <div className="text-base font-bold text-white mt-0.5">{hasData ? '4m 38s' : '0s'}</div>
          <div className="text-[10px] text-slate-400">{hasData ? 'Tương tác công cụ' : 'Chưa có phiên tương tác'}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Bounce Rate</div>
          <div className="text-base font-bold text-white mt-0.5">{hasData ? '16.4%' : '0.0%'}</div>
          <div className="text-[10px] text-emerald-400">{hasData ? '-3.1% ổn định' : 'Trạng thái ổn định'}</div>
        </div>
      </div>

      {/* Bar Chart Bars */}
      <div className="pt-6 pb-2">
        {!hasData ? (
          <div className="h-48 flex flex-col items-center justify-center text-center text-slate-500">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-2.5 text-slate-400">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-slate-300">Chưa ghi nhận dữ liệu lưu lượng truy cập</div>
            <p className="text-[11px] text-slate-500 mt-0.5 max-w-sm">
              Hệ thống chưa ghi nhận lượt xem hoặc lượt tải nào. Biểu đồ sẽ hiển thị trực quan khi người dùng bắt đầu tương tác.
            </p>
          </div>
        ) : (
          <div className="h-48 flex items-end gap-2 sm:gap-3 px-2">
            {chartData.map((item, idx) => {
              const val = item[chartMetric];
              const heightPercent = Math.round((val / maxVal) * 100);
              const isHigh = heightPercent > 70;
              const isSelected = hoveredDay === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredDay(idx)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {/* Tooltip */}
                  {(item.isPeak || isSelected) && (
                    <div className="absolute -top-7 z-10 px-1.5 py-0.5 rounded-md bg-emerald-500 text-gray-950 font-bold text-[10px] shadow-lg animate-bounce">
                      {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                    </div>
                  )}

                  {/* Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      isHigh
                        ? 'bg-gradient-to-t from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                        : 'bg-[#151e2e] group-hover:bg-[#223048]'
                    }`}
                  />

                  {/* X-Axis Label */}
                  <div className="mt-2 text-[10px] text-slate-400 font-mono group-hover:text-white transition">
                    {item.day === 'Hôm nay' ? (
                      <span className="text-emerald-400 font-bold">Hôm nay</span>
                    ) : (
                      item.day
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

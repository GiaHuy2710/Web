import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export const TrafficChart: React.FC = () => {
  const [chartMetric, setChartMetric] = useState<'views' | 'downloads' | 'builds'>('views');
  const [hoveredDay, setHoveredDay] = useState<number | null>(20);

  const chartData = [
    { day: '10', views: 7200, downloads: 4100, builds: 6 },
    { day: '11', views: 8100, downloads: 4600, builds: 8 },
    { day: '12', views: 6900, downloads: 3800, builds: 4 },
    { day: '13', views: 9400, downloads: 5200, builds: 9 },
    { day: '14', views: 11200, downloads: 6800, builds: 12 },
    { day: '15', views: 8900, downloads: 4900, builds: 7 },
    { day: '16', views: 10400, downloads: 6100, builds: 10 },
    { day: '17', views: 9800, downloads: 5700, builds: 8 },
    { day: '18', views: 14500, downloads: 9100, builds: 14 },
    { day: '19', views: 16200, downloads: 10400, builds: 15 },
    { day: '20', views: 18420, downloads: 12100, builds: 18, isPeak: true },
    { day: '21', views: 15100, downloads: 9800, builds: 13 },
    { day: '22', views: 14200, downloads: 9200, builds: 11 },
    { day: 'Hôm nay', views: 17300, downloads: 11500, builds: 16, isToday: true },
  ];

  const maxVal = Math.max(...chartData.map((d) => d[chartMetric]));

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
          <div className="text-base font-bold text-white mt-0.5">18,420</div>
          <div className="text-[10px] text-emerald-400">+24% vs trung bình</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Truy cập Desktop</div>
          <div className="text-base font-bold text-white mt-0.5">94.2%</div>
          <div className="text-[10px] text-cyan-400">Developers / Terminals</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Avg Duration</div>
          <div className="text-base font-bold text-white mt-0.5">4m 38s</div>
          <div className="text-[10px] text-slate-400">Tương tác công cụ</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Bounce Rate</div>
          <div className="text-base font-bold text-white mt-0.5">16.4%</div>
          <div className="text-[10px] text-emerald-400">-3.1% ổn định</div>
        </div>
      </div>

      {/* Bar Chart Bars */}
      <div className="pt-6 pb-2">
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
      </div>
    </div>
  );
};

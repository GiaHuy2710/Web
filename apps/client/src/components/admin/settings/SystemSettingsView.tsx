import React, { useState } from 'react';
import {
  Globe,
  Key,
  FileCode2,
  User,
  History,
  Save,
  Cloud,
  CheckCircle2,
} from 'lucide-react';
import {
  SettingsTab,
  WebsiteSeoConfig,
  ApiKeyItem,
  VersionHistoryItem,
  SystemSettingsViewProps,
} from './types';
import {
  INITIAL_SEO_CONFIG,
  INITIAL_API_KEYS,
  INITIAL_VERSION_HISTORIES,
} from './mockData';
import { SeoMetadataTab } from './SeoMetadataTab';
import { ApiKeysTab } from './ApiKeysTab';
import { AdminProfileTab } from './AdminProfileTab';
import { VersionHistoryModal } from './VersionHistoryModal';
import { PurgeCacheConfirmModal } from './PurgeCacheConfirmModal';
import { AuditLogsView, addAuditLog } from '../audit';

export const SystemSettingsView: React.FC<SystemSettingsViewProps> = ({
  onShowToast,
  initialTab = 'seo',
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);
  
  const [seoConfig, setSeoConfig] = useState<WebsiteSeoConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('devfolio_seo_config');
        if (raw) return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    return INITIAL_SEO_CONFIG;
  });

  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('devfolio_api_keys');
        if (raw) return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    return INITIAL_API_KEYS;
  });

  const [versionHistories, setVersionHistories] = useState<VersionHistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('devfolio_version_histories');
        if (raw) return JSON.parse(raw);
      } catch {
        // ignore
      }
    }
    return INITIAL_VERSION_HISTORIES;
  });

  // Modals state
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Save all settings handler
  const handleSaveAll = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      try {
        localStorage.setItem('devfolio_seo_config', JSON.stringify(seoConfig));
        
        // Tạo snapshot phiên bản mới
        const nextVerNum = (versionHistories.length + 1).toString();
        const newVersion: VersionHistoryItem = {
          id: `ver-${Date.now()}`,
          version: `v2.4.${nextVerNum}`,
          timestamp: new Date().toLocaleString('vi-VN'),
          author: 'Quản trị viên',
          summary: seoConfig.brandTitle ? `Cập nhật cấu hình: ${seoConfig.brandTitle}` : 'Cập nhật cấu hình Studio & SEO',
          changes: [
            seoConfig.brandTitle ? `Tên website: ${seoConfig.brandTitle}` : 'Cấu hình tiêu đề mặc định',
            seoConfig.customDomain ? `Tên miền: ${seoConfig.customDomain}` : 'Cấu hình domain',
            `Từ khóa: ${seoConfig.keywords.length} thẻ`,
          ],
          isCurrent: true,
        };
        const updatedHistories = [newVersion, ...versionHistories.map((v) => ({ ...v, isCurrent: false }))];
        setVersionHistories(updatedHistories);
        localStorage.setItem('devfolio_version_histories', JSON.stringify(updatedHistories));
      } catch {
        // ignore
      }

      addAuditLog({
        action: 'Cập nhật cấu hình Studio & SEO Metadata',
        category: 'config',
        severity: 'success',
        details: seoConfig.brandTitle
          ? `Lưu tham số cho website "${seoConfig.brandTitle}".`
          : 'Lưu thay đổi tham số hệ thống.',
        targetResource: 'sys://config/studio/seo',
      });

      onShowToast('Đã lưu tất cả thay đổi cấu hình Studio & đồng bộ Cloudflare Edge thành công!');
    }, 600);
  };

  // Rollback handler
  const handleRollback = (ver: VersionHistoryItem) => {
    const updated = versionHistories.map((v) => ({ ...v, isCurrent: v.id === ver.id }));
    setVersionHistories(updated);
    try {
      localStorage.setItem('devfolio_version_histories', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setIsVersionModalOpen(false);

    addAuditLog({
      action: `Khôi phục cấu hình hệ thống về [${ver.version}]`,
      category: 'config',
      severity: 'warning',
      details: ver.summary,
      targetResource: 'sys://config/studio/rollback',
    });

    onShowToast(`Đã khôi phục thành công cấu hình phiên bản [${ver.version}]!`);
  };

  // Revoke API Key
  const handleRevokeKey = (id: string) => {
    const updated = apiKeys.map((k) =>
      k.id === id ? { ...k, status: 'revoked' as const } : k
    );
    setApiKeys(updated);
    try {
      localStorage.setItem('devfolio_api_keys', JSON.stringify(updated));
    } catch {
      // ignore
    }

    addAuditLog({
      action: `Thu hồi khóa API Token ID #${id}`,
      category: 'security',
      severity: 'warning',
      details: 'Vô hiệu hóa quyền programmatic access.',
      targetResource: `auth://api-keys/${id}`,
    });

    onShowToast('Đã thu hồi token thành công. Token không còn quyền truy cập.');
  };

  // Add API Key
  const handleAddKey = (newKey: ApiKeyItem) => {
    const updated = [newKey, ...apiKeys];
    setApiKeys(updated);
    try {
      localStorage.setItem('devfolio_api_keys', JSON.stringify(updated));
    } catch {
      // ignore
    }

    addAuditLog({
      action: `Tạo khóa API mới: [${newKey.name}]`,
      category: 'api',
      severity: 'success',
      details: `Phạm vi quyền: ${newKey.role}. Hạn dùng: ${newKey.expiresIn}`,
      targetResource: `auth://api-keys/${newKey.id}`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. TOP BREADCRUMB & LATENCY STATUS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-mono text-slate-400">
          <span>workspace</span>
          <span className="text-slate-600">/</span>
          <span className="text-emerald-400 font-semibold">admin-studio</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Production v2.4 — 100% Operational</span>
          </div>

          <span className="text-slate-600">|</span>

          <div className="flex items-center gap-1.5 text-cyan-300">
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>Latency: 18ms</span>
          </div>
        </div>
      </div>

      {/* 2. TITLE & ACTION BUTTONS HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-white/[0.05]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Cài đặt hệ thống & Cấu hình Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Quản lý cấu hình toàn diện, tham số triển khai CI/CD, kết nối khóa bảo mật và truy vết nhật ký kiểm toán DevFolio.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Lịch sử phiên bản Button */}
          <button
            type="button"
            onClick={() => setIsVersionModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#111724] hover:bg-[#182337] border border-white/[0.09] text-slate-200 text-xs font-semibold transition cursor-pointer shadow-sm hover:border-white/20"
          >
            <History className="w-4 h-4 text-slate-400" />
            <span>Lịch sử phiên bản</span>
          </button>

          {/* Lưu tất cả thay đổi Button */}
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition shadow-[0_0_20px_rgba(52,211,153,0.35)] cursor-pointer disabled:opacity-75"
          >
            <Save className={`w-4 h-4 stroke-[2.4] ${isSaving ? 'animate-spin' : ''}`} />
            <span>{isSaving ? 'Đang lưu...' : 'Lưu tất cả thay đổi'}</span>
          </button>
        </div>
      </div>

      {/* 3. SUB-TABS NAVIGATION (Pill Segmented Style) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] pb-3">
        {/* Tab 1: Cấu hình Website & SEO */}
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
            activeTab === 'seo'
              ? 'bg-[#0f2420] text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Globe className={`w-4 h-4 ${activeTab === 'seo' ? 'text-emerald-400' : 'text-slate-400'}`} />
          <span>Cấu hình Website & SEO</span>
        </button>

        {/* Tab 2: Khóa API & CI/CD */}
        <button
          type="button"
          onClick={() => setActiveTab('apikeys')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
            activeTab === 'apikeys'
              ? 'bg-[#0c1e30] text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Key className={`w-4 h-4 ${activeTab === 'apikeys' ? 'text-cyan-400' : 'text-slate-400'}`} />
          <span>Khóa API & CI/CD</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </button>

        {/* Tab 3: Nhật ký kiểm toán (Audit Log) */}
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <FileCode2 className={`w-4 h-4 ${activeTab === 'audit' ? 'text-emerald-400' : 'text-slate-400'}`} />
          <span>Nhật ký kiểm toán (Audit Log)</span>
        </button>

        {/* Tab 4: Hồ sơ quản trị viên */}
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#152033] text-white border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-emerald-400' : 'text-slate-400'}`} />
          <span>Hồ sơ quản trị viên</span>
        </button>
      </div>

      {/* 4. TAB CONTENTS */}
      {activeTab === 'seo' && (
        <SeoMetadataTab
          config={seoConfig}
          onChangeConfig={setSeoConfig}
          onOpenPurgeModal={() => setIsPurgeModalOpen(true)}
          onShowToast={onShowToast}
        />
      )}

      {activeTab === 'apikeys' && (
        <ApiKeysTab
          apiKeys={apiKeys}
          onShowToast={onShowToast}
          onRevokeKey={handleRevokeKey}
          onAddKey={handleAddKey}
        />
      )}

      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Bạn đang xem chế độ nhúng của <span className="font-bold text-white">Nhật ký kiểm toán hệ thống</span>. Mọi thay đổi cấu hình đều được ghi nhận trực tiếp vào sổ cái tại đây.
              </span>
            </div>
          </div>
          <AuditLogsView onShowToast={onShowToast} isEmbeddedInSettings={true} />
        </div>
      )}

      {activeTab === 'profile' && (
        <AdminProfileTab onShowToast={onShowToast} />
      )}

      {/* 5. MODALS */}
      <VersionHistoryModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
        histories={versionHistories}
        onRollback={handleRollback}
      />

      <PurgeCacheConfirmModal
        isOpen={isPurgeModalOpen}
        onClose={() => setIsPurgeModalOpen(false)}
        onConfirm={() => {
          addAuditLog({
            action: 'Xóa toàn bộ Cache CDN Edge trên 280+ Cloudflare Edge PoPs',
            category: 'deploy',
            severity: 'info',
            details: 'Làm rỗng cache tĩnh toàn cầu. Kết nối trực tiếp vào Origin Server.',
            targetResource: 'cloudflare://zones/edge/purge_all',
          });
          onShowToast('Đã phát tín hiệu Purge All CDN Cache tới 280+ Cloudflare Edge PoPs thành công!');
        }}
      />
    </div>
  );
};

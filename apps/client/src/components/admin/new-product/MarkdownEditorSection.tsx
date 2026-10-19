import React, { useState } from 'react';
import {
  FileText,
  Bold,
  Italic,
  Heading,
  Code,
  Link2,
  Image,
  List,
  ListOrdered,
  Table,
  Eye,
} from 'lucide-react';
import { EditorMode } from './types';

interface Props {
  content: string;
  setContent: (v: string) => void;
}

export const MarkdownEditorSection: React.FC<Props> = ({ content, setContent }) => {
  const [mode, setMode] = useState<EditorMode>('markdown');

  const insertSyntax = (prefix: string, suffix: string = '') => {
    setContent(content + `\n${prefix}Nội dung${suffix}`);
  };

  return (
    <div className="p-6 rounded-3xl bg-[#090e17] border border-white/[0.06] space-y-4">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-white tracking-wide">
            3. Mô tả chi tiết & Hướng dẫn cài đặt
          </h2>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-[#0d1422] border border-white/[0.06] text-xs font-medium">
          <button
            type="button"
            onClick={() => setMode('markdown')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              mode === 'markdown'
                ? 'bg-[#152033] text-white border border-white/10 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Markdown
          </button>
          <button
            type="button"
            onClick={() => setMode('wysiwyg')}
            className={`px-3 py-1 rounded-lg transition cursor-pointer ${
              mode === 'wysiwyg'
                ? 'bg-[#152033] text-white border border-white/10 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            WYSIWYG
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition cursor-pointer ${
              mode === 'preview'
                ? 'bg-[#152033] text-emerald-300 border border-white/10 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Box */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0b101a] overflow-hidden">
        {/* Toolbar */}
        <div className="p-2.5 bg-[#0e1524] border-b border-white/[0.06] flex items-center justify-between gap-2 text-slate-400 flex-wrap">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => insertSyntax('**', '**')}
              title="Bold"
              className="p-1.5 rounded-lg hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('*', '*')}
              title="Italic"
              className="p-1.5 rounded-lg hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('### ')}
              title="Heading"
              className="p-1.5 rounded-lg hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
            >
              <Heading className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-white/[0.1] mx-1" />

            <button
              type="button"
              onClick={() => insertSyntax('```bash\n', '\n```')}
              title="Code block"
              className="p-1.5 rounded-lg hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('[Tiêu đề link](https://...)')}
              title="Link"
              className="p-1.5 rounded-lg hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
            >
              <Link2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('![Mô tả ảnh](https://...)')}
              title="Image"
              className="p-1.5 rounded-lg hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
            >
              <Image className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-white/[0.1] mx-1" />

            <button
              type="button"
              onClick={() => insertSyntax('- ')}
              title="List"
              className="p-1.5 rounded-lg hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('1. ')}
              title="Numbered List"
              className="p-1.5 rounded-lg hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertSyntax('| Cột 1 | Cột 2 |\n|---|---|\n| Dữ liệu 1 | Dữ liệu 2 |')}
              title="Table"
              className="p-1.5 rounded-lg hover:bg-white/[0.08] hover:text-white transition cursor-pointer"
            >
              <Table className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400 pr-2">
            UTF-8 / GFM v0.29
          </div>
        </div>

        {/* Text Input / Preview */}
        {mode === 'preview' ? (
          <div className="p-5 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed min-h-[220px] bg-[#070b12] whitespace-pre-wrap">
            {content}
          </div>
        ) : (
          <textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nhập nội dung markdown hướng dẫn chi tiết..."
            className="w-full bg-[#070b12] p-5 font-mono text-xs sm:text-sm text-emerald-400/90 placeholder-slate-600 focus:outline-none transition leading-relaxed resize-y selection:bg-emerald-500/30"
          />
        )}
      </div>
    </div>
  );
};
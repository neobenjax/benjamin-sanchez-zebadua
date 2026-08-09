'use client';

import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Copy, Check, FileText } from 'lucide-react';
import { Button } from './ui/Button';

interface ThemeDocumentationViewerProps {
  markdownText: string;
  themeName: string;
}

export function ThemeDocumentationViewer({ markdownText, themeName }: ThemeDocumentationViewerProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdownText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Separate frontmatter from markdown body
  const yamlMatch = markdownText.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/);
  const frontmatterRaw = yamlMatch ? yamlMatch[1] : '';
  const bodyRaw = yamlMatch ? yamlMatch[2] : markdownText;

  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-[var(--color-text-primary)]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="text-[var(--color-accent)] font-semibold bg-[var(--color-secondary-bg)] border border-[var(--border-subtle)] px-1.5 py-0.5 rounded-xs font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  // Simple section parser for headings, lists, tables, and code blocks
  const renderMarkdownBody = (rawText: string) => {
    const lines = rawText.split(/\r?\n/);
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableHeader: string[] = [];
    let tableRows: string[][] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushTable = (key: number) => {
      if (tableHeader.length > 0) {
        elements.push(
          <div key={`table-${key}`} className="overflow-x-auto my-4 rounded-sm border border-[var(--border-subtle)] bg-[var(--color-surface)]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--color-secondary-bg)] font-mono text-[var(--color-text-primary)] border-b border-[var(--border-subtle)]">
                <tr>
                  {tableHeader.map((h, i) => (
                    <th key={i} className="p-3 font-bold uppercase tracking-wider">{renderInlineFormatting(h.trim())}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--color-text-secondary)]">
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[var(--color-secondary-bg)]/80 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 font-mono">
                        {renderInlineFormatting(cell.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableHeader = [];
      tableRows = [];
      inTable = false;
    };

    const flushCodeBlock = (key: number) => {
      elements.push(
        <pre key={`code-${key}`} className="my-4 p-4 rounded-sm bg-[var(--color-secondary-bg)] border border-[var(--border-subtle)] text-[var(--color-text-primary)] font-mono text-xs overflow-x-auto">
          <code>{codeContent.join('\n')}</code>
        </pre>
      );
      codeContent = [];
      inCodeBlock = false;
    };

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${key}`} className="list-disc pl-5 my-2 space-y-1.5 text-xs text-[var(--color-text-secondary)]">
            {listItems.map((item, i) => (
              <li key={i}>{renderInlineFormatting(item)}</li>
            ))}
          </ul>
        );
      }
      listItems = [];
      inList = false;
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Handle Code Blocks
      if (trimmed.startsWith('```')) {
        if (inList) flushList(idx);
        if (inTable) flushTable(idx);
        if (inCodeBlock) {
          flushCodeBlock(idx);
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      // Handle Tables
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        if (inList) flushList(idx);
        const cells = trimmed.split('|').slice(1, -1);
        if (cells.every(c => /^[\s:-]+$/.test(c))) {
          return;
        }
        if (!inTable) {
          inTable = true;
          tableHeader = cells;
        } else {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable(idx);
      }

      if (!trimmed) {
        if (inList) flushList(idx);
        return;
      }

      // Handle Bullet Lists
      if (trimmed.startsWith('- ')) {
        inList = true;
        listItems.push(trimmed.replace(/^- /, ''));
        return;
      } else if (inList) {
        flushList(idx);
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={idx} className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-text-primary)] mt-6 mb-3 pb-2 border-b border-[var(--border-subtle)]">
            {renderInlineFormatting(trimmed.replace(/^#\s+/, ''))}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-xl md:text-2xl font-serif font-bold text-[var(--color-text-primary)] mt-5 mb-2.5">
            {renderInlineFormatting(trimmed.replace(/^##\s+/, ''))}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-lg font-serif font-bold text-[var(--color-text-primary)] mt-4 mb-2">
            {renderInlineFormatting(trimmed.replace(/^###\s+/, ''))}
          </h3>
        );
      } else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={idx} className="p-3.5 my-3 rounded-sm bg-[var(--color-secondary-bg)] border-l-4 border-[var(--color-accent)] text-xs text-[var(--color-text-secondary)] italic">
            {renderInlineFormatting(trimmed.replace(/^>\s+/, ''))}
          </blockquote>
        );
      } else {
        elements.push(
          <p key={idx} className="text-xs text-[var(--color-text-secondary)] my-2 leading-relaxed">
            {renderInlineFormatting(trimmed)}
          </p>
        );
      }
    });

    if (inList) flushList(lines.length);
    if (inTable) flushTable(lines.length);
    if (inCodeBlock) flushCodeBlock(lines.length);

    return elements;
  };

  return (
    <div className="flex flex-col w-full rounded-sm border border-[var(--border-subtle)] bg-[var(--color-surface)] overflow-hidden shadow-lg">
      {/* Documentation Bar Header */}
      <div className="flex items-center justify-between p-4 bg-[var(--color-secondary-bg)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-[var(--color-accent)]" />
          <span className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
            Documentation: {themeName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleCopy} className="text-xs py-1 px-2.5">
            {copied ? <Check className="w-3.5 h-3.5 text-[var(--color-accent)]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Spec'}
          </Button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
            aria-label="Toggle documentation section"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Documentation Content */}
      {isExpanded && (
        <div className="p-6 md:p-8 flex flex-col gap-6 max-h-[650px] overflow-y-auto custom-scrollbar bg-[var(--color-primary-bg)]">
          {/* Frontmatter YAML Metadata Card */}
          {frontmatterRaw && (
            <div className="p-4 rounded-sm bg-[var(--color-secondary-bg)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-1.5 font-bold text-[var(--color-accent)] uppercase mb-2">
                <FileText className="w-3.5 h-3.5" /> YAML Frontmatter Metadata
              </div>
              <pre className="whitespace-pre-wrap text-[var(--color-text-secondary)]">{frontmatterRaw}</pre>
            </div>
          )}

          {/* Parsed Markdown Body */}
          <div className="flex flex-col">{renderMarkdownBody(bodyRaw)}</div>
        </div>
      )}
    </div>
  );
}

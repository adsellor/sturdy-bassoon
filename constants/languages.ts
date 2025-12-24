import type { AnimationPreset } from '@/components/hello-animation';

export interface LanguageVariant {
  id: string;
  label: string;
  color: string;
  preset: AnimationPreset;
}

const LANGUAGE_POOL: LanguageVariant[] = [
  {
    id: 'en',
    label: 'Hello',
    color: '#2563EB',
    preset: { type: 'bounce', durationMs: 900, intensity: 0.08 },
  },
  {
    id: 'es',
    label: 'Hola',
    color: '#EA580C',
    preset: { type: 'pop', durationMs: 750, intensity: 0.12 },
  },
  {
    id: 'fr',
    label: 'Bonjour',
    color: '#10B981',
    preset: { type: 'wave', durationMs: 1100, intensity: 0.07 },
  },
  {
    id: 'de',
    label: 'Hallo',
    color: '#7C3AED',
    preset: { type: 'bounce', durationMs: 820, intensity: 0.09 },
  },
  {
    id: 'ja',
    label: 'こんにちは',
    color: '#DB2777',
    preset: { type: 'flip', durationMs: 1200, intensity: 0.05 },
  },
  {
    id: 'ko',
    label: '안녕하세요',
    color: '#0EA5E9',
    preset: { type: 'pop', durationMs: 680, intensity: 0.15 },
  },
  {
    id: 'zh',
    label: '你好',
    color: '#F97316',
    preset: { type: 'wave', durationMs: 1050, intensity: 0.08 },
  },
  {
    id: 'hi',
    label: 'नमस्ते',
    color: '#4ADE80',
    preset: { type: 'bounce', durationMs: 980, intensity: 0.1 },
  },
  {
    id: 'pt',
    label: 'Olá',
    color: '#6366F1',
    preset: { type: 'pop', durationMs: 700, intensity: 0.14 },
  },
  {
    id: 'ar',
    label: 'مرحبا',
    color: '#FACC15',
    preset: { type: 'flip', durationMs: 1150, intensity: 0.06 },
  },
  {
    id: 'ru',
    label: 'Здравствуйте',
    color: '#14B8A6',
    preset: { type: 'wave', durationMs: 1300, intensity: 0.05 },
  },
];

export function getRandomLanguageCycle(count = 8): LanguageVariant[] {
  const pool = [...LANGUAGE_POOL];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

export function getLanguagePool(): LanguageVariant[] {
  return [...LANGUAGE_POOL];
}


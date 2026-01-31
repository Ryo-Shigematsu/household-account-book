import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Next.js アプリのパスを指定
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  // テスト環境をjsdomに設定（ブラウザ環境をシミュレート）
  testEnvironment: 'jest-environment-jsdom',
  
  // セットアップファイル
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // テスト対象のファイルパターン
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  
  // カバレッジ対象外
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
  ],
  
  // モジュール名のエイリアス（tsconfig.jsonと合わせる）
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // 変換対象外
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\.module\.(css|sass|scss)$',
  ],
};

export default createJestConfig(config);
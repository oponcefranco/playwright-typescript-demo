import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import type { TSESLint } from '@typescript-eslint/utils'

const config: TSESLint.FlatConfig.ConfigArray = [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'dist/**',
      'build/**',
    ],
  },
  // Base configuration
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  // TypeScript configuration
  ...tseslint.configs.recommended,
] as const

export default config

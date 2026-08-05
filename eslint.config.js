import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['dist/**', 'coverage/**', 'cypress/screenshots/**', 'cypress/videos/**'],
  },

  pluginVue.configs['flat/essential'],

  // Type-aware rules. This is what catches the unawaited playerSubmitsGuess()
  // via @typescript-eslint/no-floating-promises.
  vueTsConfigs.recommendedTypeChecked,

  // Turns off every rule that would fight with Prettier over formatting.
  skipFormatting,
)

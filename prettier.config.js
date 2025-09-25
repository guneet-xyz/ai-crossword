/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} & import('prettier-package-json') & import ('@trivago/prettier-plugin-sort-imports')*/
export default {
  // Configuration for prettier
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-package-json",
    "@trivago/prettier-plugin-sort-imports",
  ],
  semi: false,

  // Configuration for @trivago/prettier-plugin-sort-import
  importOrder: ["^@/(.*)$", "^[./]", "<THIRD_PARTY_MODULES>"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

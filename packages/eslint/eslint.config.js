import antfu from "@antfu/eslint-config";

export default antfu({
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
});

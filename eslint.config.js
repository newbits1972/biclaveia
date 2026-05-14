import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["set-admin-role.cjs"] },
  js.configs.recommended, 
  tseslint.configs.recommended
);

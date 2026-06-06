// 📄 src/vite-env.d.ts 파일 내용
/// <reference types="vite/client" />

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
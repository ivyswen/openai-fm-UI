/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#333333", // 深灰色 (播放按钮)
        secondary: "#555555", // 中灰色 (分享按钮)
        tertiary: "#777777", // 浅灰色 (下载按钮)
        screen: "#f5f5f5", // 更浅的背景色
        foreground: "#333333", // 深灰色文本
        accent: {
          coral: "#e3bb9e",
          sand: "#ada38c",
          pink: "#ddc3c0",
          orange: "#d68650",
        },
        border: "rgba(0, 0, 0, 0.1)", // 边框颜色
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "2/1": "2 / 1",
        "2.5/1": "2.5 / 1",
      },
      boxShadow: {
        textarea: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
        button: "0 1px 3px rgba(0, 0, 0, 0.2)", // 更深的阴影
      },
      maxWidth: {
        "(--page-max-width)": "1280px",
      },
      keyframes: {
        'loading-gradient': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'loading-gradient': 'loading-gradient 1.5s infinite',
      }
    },
  },
  plugins: [],
};

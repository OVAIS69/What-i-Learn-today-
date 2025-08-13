import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blossom: {
          50:'#fff1f4',100:'#ffe4ea',200:'#ffc9d7',300:'#ffadc4',400:'#ff90b0',
          500:'#ff739d',600:'#ff5188',700:'#e03a73',800:'#b62d5b',900:'#8a2446'
        },
        lavender: {
          100: "#F1E6FF", 200:"#E5D4FF", 300:"#D8B4FE", 400:"#C084FC"
        },
        spring: { 200:"#D3F9D8", 300:"#B7E4C7" }
      },
      backgroundImage: {
        "blossom-gradient":
          "radial-gradient(1200px 600px at 10% -10%, rgba(255,173,196,0.35), transparent), radial-gradient(1200px 600px at 90% 110%, rgba(216,180,254,0.30), transparent)"
      },
      boxShadow: {
        glow: "0 10px 40px rgba(255, 115, 157, 0.25)"
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        "float-slow": "float 16s ease-in-out infinite",
        "float-med": "float 12s ease-in-out infinite",
        "float-fast": "float 8s ease-in-out infinite",
        "fall": "fall 22s linear infinite",
        "sway": "sway 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fall: {
          "0%": { transform: "translateY(-10vh) translateX(0)" },
          "100%": { transform: "translateY(120vh) translateX(10vw)" }
        },
        sway: {
          "0%,100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(2vw)" }
        }
      }
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: ["class"],
//   content: [
//     './pages/**/*.{ts,tsx}',
//     './components/**/*.{ts,tsx}',
//     './app/**/*.{ts,tsx}',
//     './src/**/*.{ts,tsx}',
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       keyframes: {
//         "accordion-down": {
//           from: { height: 0 },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: 0 },
//         },
//         "fade-in": {
//           from: { opacity: 0 },
//           to: { opacity: 1 },
//         },
//         "fade-out": {
//           from: { opacity: 1 },
//           to: { opacity: 0 },
//         },
//         "slide-in-right": {
//           from: { transform: "translateX(100%)" },
//           to: { transform: "translateX(0)" },
//         },
//         "slide-out-right": {
//           from: { transform: "translateX(0)" },
//           to: { transform: "translateX(100%)" },
//         },
//         "slide-in-left": {
//           from: { transform: "translateX(-100%)" },
//           to: { transform: "translateX(0)" },
//         },
//         "slide-out-left": {
//           from: { transform: "translateX(0)" },
//           to: { transform: "translateX(-100%)" },
//         },
//         "slide-in-bottom": {
//           from: { transform: "translateY(100%)" },
//           to: { transform: "translateY(0)" },
//         },
//         "slide-out-bottom": {
//           from: { transform: "translateY(0)" },
//           to: { transform: "translateY(100%)" },
//         },
//         "slide-in-top": {
//           from: { transform: "translateY(-100%)" },
//           to: { transform: "translateY(0)" },
//         },
//         "slide-out-top": {
//           from: { transform: "translateY(0)" },
//           to: { transform: "translateY(-100%)" },
//         },
//         "scale-in": {
//           from: { transform: "scale(0.95)", opacity: 0 },
//           to: { transform: "scale(1)", opacity: 1 },
//         },
//         "scale-out": {
//           from: { transform: "scale(1)", opacity: 1 },
//           to: { transform: "scale(0.95)", opacity: 0 },
//         },
//         "spin": {
//           from: { transform: "rotate(0deg)" },
//           to: { transform: "rotate(360deg)" },
//         },
//         "ping": {
//           "75%, 100%": { transform: "scale(2)", opacity: 0 },
//         },
//         "pulse": {
//           "50%": { opacity: 0.5 },
//         },
//         "bounce": {
//           "0%, 100%": { 
//             transform: "translateY(0)",
//             animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
//           },
//           "50%": {
//             transform: "translateY(-25%)",
//             animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)"
//           },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//         "fade-in": "fade-in 0.3s ease-out",
//         "fade-out": "fade-out 0.3s ease-in",
//         "slide-in-right": "slide-in-right 0.3s ease-out",
//         "slide-out-right": "slide-out-right 0.3s ease-in",
//         "slide-in-left": "slide-in-left 0.3s ease-out",
//         "slide-out-left": "slide-out-left 0.3s ease-in",
//         "slide-in-bottom": "slide-in-bottom 0.3s ease-out",
//         "slide-out-bottom": "slide-out-bottom 0.3s ease-in",
//         "slide-in-top": "slide-in-top 0.3s ease-out",
//         "slide-out-top": "slide-out-top 0.3s ease-in",
//         "scale-in": "scale-in 0.3s ease-out",
//         "scale-out": "scale-out 0.3s ease-in",
//         "spin": "spin 1s linear infinite",
//         "ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
//         "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
//         "bounce": "bounce 1s infinite",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}", "./src/styles/utils.css"],
  theme: {
    extend: {
      // Font families
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji"
        ]
      },
      // Colors
      colors: {
        background: {
          primary: "var(--color-background-primary)",
          "primary-light": "var(--color-background-primary-light)",
          secondary: "var(--color-background-secondary)",
          "secondary-light": "var(--color-background-secondary-light)"
        },
        header: {
          link: "var(--color-header-link)",
          linkActive: "var(--color-header-link-active)"
        },
        footer: {
          link: "var(--color-footer-link)"
        }
      },
      // Animations
      keyframes: {
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      },
      animation: {
        slideDown: "slideDown 0.3s ease forwards"
      },
      // Shadow boxes
      boxShadow: {
        "inner-light": "inset 0 -3px 0 #3ee997"
      },
      // Containers max widths
      maxWidth: {
        container: "var(--max-container-width)"
      },
      // Breakpoints for media queries
      screens: {
        xs: "478px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1900px"
      }
    },
    plugins: []
  }
}

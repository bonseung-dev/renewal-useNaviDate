import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        skin1: '#7BB4DD',
        skin2: '#B2D6EF',
        skin3: '#DDF1FF',
        skin4: '#F5FBFF',
        skin5: '#FFFFFF',
        skin6: '#FAE9A8',
        skin7: '#F66466',

        font1: '#292929',
        font2: '#343434',
        font3: '#454545',
        font4: '#6B6B6B',
        font5: '#DDDDDD',

        // globals.css에서 사용
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        chart1: 'hsl(var(--chart-1))',
        chart2: 'hsl(var(--chart-2))',
        chart3: 'hsl(var(--chart-3))',
        chart4: 'hsl(var(--chart-4))',
        chart5: 'hsl(var(--chart-5))',
      },
      fontFamily: {
        title: ['var(--font-score-dream)', 'sans-serif'],
        cal: ['var(--font-cal)', 'sans-serif'],
      },
      fontSize: {
        // Bold
        'b-h0': ['20px', 'auto'],
        'b-h1': ['18px', 'auto'],
        'b-h2': ['16px', 'auto'],
        'b-h3': ['14px', 'auto'],
        'b-h4': ['12px', 'auto'],
        'b-h5': ['10px', 'auto'],
        // Light
        'l-title0': ['20px', 'auto'],
        'l-title1': ['18px', 'auto'],
        'l-title2': ['16px', 'auto'],
        'l-title3': ['14px', 'auto'],
        'l-title4': ['12px', 'auto'],
        'l-title5': ['10px', 'auto'],
        // Medium
        'm-h0': ['20px', 'auto'],
        'm-h1': ['18px', 'auto'],
        'm-h2': ['16px', 'auto'],
        'm-h3': ['14px', 'auto'],
        'm-h4': ['12px', 'auto'],
        calendar: ['32px', 'auto'],
      },
      boxShadow: {
        shadow1: '3px 3px 4px rgba(0, 0, 0, 0.23)',
        shadow2: '5px 5px 13px rgba(0, 0, 0, 0.23)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'calc(var(--radius) + 4px)',
        md: 'calc(var(--radius) + 2px)',
        sm: 'calc(var(--radius) - 2px)',
      },
    },
  },
  plugins: [],
};

export default config;

# DI Wholesale - Medical & Hospital Supplies

A modern Next.js application featuring a beautiful banner section for medical and hospital supplies.

## Features

- ✨ Modern banner section with gradient overlay
- 🎨 Built with shadcn-ui components
- 📱 Fully responsive design
- 🔍 Product search functionality
- 🖼️ Custom background image integration

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
di-wholesale/
├── app/
│   ├── globals.css       # Global styles and Tailwind CSS
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page
├── components/
│   ├── banner-section.tsx # Main banner component
│   └── ui/               # shadcn-ui components
│       ├── button.tsx
│       └── input.tsx
├── lib/
│   └── utils.ts          # Utility functions
├── public/
│   └── Banner_Section.png # Banner background image
└── package.json
```

## Banner Section

The banner section features:
- Background image with gradient overlay
- Gradient: `linear-gradient(270deg, rgba(255, 255, 255, 0.1) 14.9%, #7B00E0 81.25%)`
- Responsive text and search bar
- Search functionality with icon button

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn-ui** - UI component library
- **Lucide React** - Icons

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

To customize the banner:
- Edit `components/banner-section.tsx` for content and layout
- Modify `app/globals.css` for global styles
- Update gradient colors in the banner component's inline style


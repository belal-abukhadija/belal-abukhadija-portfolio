# Belal Abukhadija - Portfolio Website

A modern, SEO-optimized portfolio website showcasing web development tools and projects. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Stack**: Next.js 15 with App Router, TypeScript, and Tailwind CSS
- **SEO Optimized**: Full metadata, structured data (JSON-LD), sitemap, and robots.txt
- **Responsive Design**: Beautiful on all devices from mobile to desktop
- **Smooth Animations**: Engaging user experience with Tailwind animations
- **Easy to Maintain**: Clean code architecture with comprehensive documentation
- **Extensible**: Simple configuration file for adding new tools
- **Performance**: Optimized for Core Web Vitals and fast loading
- **PWA Ready**: Web app manifest for progressive web app features

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-belal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📝 Adding New Tools

Adding new tools is incredibly simple! Just edit the `lib/tools-data.ts` file:

```typescript
export const tools: Tool[] = [
  // ... existing tools
  {
    name: "Your New Tool",
    description: "A brief description of what your tool does",
    url: "https://yourtool.belal.work/",
    icon: "IconName", // Any lucide-react icon name
    color: "from-blue-500 to-purple-500", // Tailwind gradient classes
    category: "Category" // Optional
  },
];
```

That's it! Your new tool will automatically appear on the website.

### Available Lucide Icons

Visit [lucide.dev](https://lucide.dev/icons/) to browse all available icons. Some popular ones:
- `Palette`, `Binary`, `FileSignature`, `Share2`, `Type`, `ImageDown`
- `Code`, `Database`, `Globe`, `Lock`, `Mail`, `Search`, `Settings`

## 🎨 Customization

### Personal Information

Edit `lib/tools-data.ts` to update your personal information:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  domain: "yourdomain.com"
};
```

### Colors and Theme

The theme uses a light and green color palette. To customize colors, edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Your primary color shades
  },
  accent: {
    // Your accent color shades
  },
}
```

### SEO Configuration

Update SEO settings in `app/layout.tsx`:
- Meta descriptions
- Keywords
- Open Graph images
- Twitter card settings
- Google verification code

## 📁 Project Structure

```
portfolio-belal/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with SEO metadata
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── sitemap.ts         # Sitemap generation
│   ├── robots.ts          # Robots.txt configuration
│   └── manifest.ts        # PWA manifest
├── components/            # React components
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── Tools.tsx         # Tools grid section
│   ├── ToolCard.tsx      # Individual tool card
│   ├── About.tsx         # About section
│   └── Footer.tsx        # Footer with contact info
├── lib/                   # Utility files
│   ├── tools-data.ts     # Tools and personal info configuration
│   └── structured-data.ts # JSON-LD structured data
├── public/                # Static assets
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
└── package.json          # Project dependencies
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) - Modern sans-serif font

## 📊 SEO Features

- ✅ Server-side rendering for better crawlability
- ✅ Semantic HTML structure
- ✅ Meta tags (Open Graph, Twitter Cards)
- ✅ Structured data (JSON-LD) for rich snippets
- ✅ Automatic sitemap.xml generation
- ✅ robots.txt configuration
- ✅ Canonical URLs
- ✅ Web manifest for PWA
- ✅ Optimized Core Web Vitals

## 🎯 Performance

- Fast page loads with Next.js optimizations
- Image optimization with Next.js Image component (ready for use)
- CSS optimization with Tailwind CSS purging
- Minimal JavaScript bundle size
- Smooth animations with CSS

## 📱 Responsive Design

The website is fully responsive and looks great on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1280px and up)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Your site will be deployed!

### Other Platforms

You can also deploy to:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Any Node.js hosting service

## 📄 License

ISC License - Feel free to use this project for your own portfolio!

## 👤 Author

**Belal Abukhadija**
- Email: belalabukhadija97@gmail.com
- GitHub: [@belalslah](https://github.com/belalslah)
- LinkedIn: [Belal Abu Khadija](https://www.linkedin.com/in/belal-abu-khadija-9a591730b)
- Website: [belal.work](https://belal.work)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first approach
- Lucide for the beautiful icons

---

Made with ❤️ by Belal Abukhadija

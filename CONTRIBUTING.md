# Contributing to the Portfolio

Thank you for your interest in contributing! This document provides guidelines for maintaining and extending the portfolio website.

## 🏗️ Architecture Overview

### Component Structure

The project follows a component-based architecture with clear separation of concerns:

- **Components**: Reusable UI components in `/components`
- **Data**: Configuration in `/lib/tools-data.ts`
- **Styles**: Tailwind classes and global CSS in `/app/globals.css`
- **App**: Pages and layouts in `/app` directory

### Design Principles

1. **Clean Code**: Follow TypeScript best practices
2. **Reusability**: Create reusable components
3. **Maintainability**: Clear naming and documentation
4. **Performance**: Optimize for Core Web Vitals
5. **Accessibility**: Semantic HTML and ARIA labels

## 📋 Making Changes

### Adding a New Tool

1. Open `lib/tools-data.ts`
2. Add a new object to the `tools` array:

```typescript
{
  name: "Tool Name",
  description: "Clear description of what the tool does",
  url: "https://tool.belal.work/",
  icon: "IconName", // From lucide-react
  color: "from-color-500 to-color-500", // Tailwind gradient
  category: "Category" // Optional
}
```

3. Save the file - the new tool will automatically appear!

### Modifying Personal Information

Edit the `personalInfo` object in `lib/tools-data.ts`:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description",
  email: "your.email@example.com",
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  domain: "yourdomain.com"
};
```

### Updating Colors

1. Open `tailwind.config.ts`
2. Modify the color palette in the `theme.extend.colors` section
3. Update component colors if needed

### Adding New Sections

To add a new section to the home page:

1. Create a new component in `/components/YourSection.tsx`
2. Import and add it to `app/page.tsx`:

```typescript
import YourSection from "@/components/YourSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tools />
        <YourSection /> {/* Add here */}
        <About />
      </main>
      <Footer />
    </>
  );
}
```

## 🎨 Styling Guidelines

### Tailwind CSS

Use Tailwind utility classes for styling:

```tsx
<div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
  Content
</div>
```

### Custom Colors

Use the defined color palette:
- `primary-*`: Main green color
- `accent-*`: Secondary green color
- `gray-*`: Neutral colors

### Responsive Design

Use Tailwind responsive prefixes:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

Example:
```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

## 🧪 Testing Changes

### Local Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Test on different screen sizes using browser DevTools

### Build Test

Before deploying, test the production build:

```bash
npm run build
npm start
```

### Checklist

- [ ] Page loads without errors
- [ ] All tools are displayed correctly
- [ ] Links work properly
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Animations work smoothly
- [ ] SEO metadata is correct

## 📝 Code Style

### TypeScript

- Use TypeScript for type safety
- Define interfaces for complex objects
- Use proper type annotations

### Component Structure

```tsx
/**
 * Component Name
 *
 * Brief description of what this component does
 *
 * @param props - Description of props if any
 */
export default function ComponentName({ prop }: Props) {
  // Component logic

  return (
    // JSX
  );
}
```

### File Naming

- Components: PascalCase (e.g., `ToolCard.tsx`)
- Utilities: kebab-case (e.g., `tools-data.ts`)
- Use `.tsx` for components with JSX
- Use `.ts` for utility files

## 🔍 SEO Best Practices

When making changes, maintain SEO optimization:

1. **Metadata**: Update relevant metadata in `app/layout.tsx`
2. **Structured Data**: Update JSON-LD in `lib/structured-data.ts`
3. **Semantic HTML**: Use proper HTML5 tags
4. **Alt Text**: Add descriptive alt text for images
5. **Links**: Use descriptive link text

## 🚀 Deployment

### Before Deploying

1. Test the production build locally
2. Check for console errors
3. Verify all links work
4. Test on multiple devices
5. Validate HTML and accessibility

### Deployment Steps

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

2. Deploy to Vercel (or your hosting platform)
3. Test the live site
4. Verify SEO metadata with tools like:
   - Google Search Console
   - Open Graph Debugger
   - Twitter Card Validator

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Check TypeScript errors: `npm run build`
- Verify all imports are correct
- Check for missing dependencies

**Styling Issues**
- Clear Tailwind cache: Delete `.next` folder
- Rebuild: `npm run build`

**Component Not Showing**
- Check imports in `app/page.tsx`
- Verify export statement in component file
- Check browser console for errors

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)

## ❓ Getting Help

If you need help:
1. Check this documentation
2. Review the code comments
3. Check Next.js documentation
4. Open an issue on GitHub

## 📄 License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Happy coding! 🎉

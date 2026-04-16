# VRX Learn Design System (Geist Inspired)

## Core Principles
- **Precision**: Every pixel matters. Use the defined shadow-border instead of standard borders.
- **Minimalism**: Reduce visual noise. Use white space and subtle elevation.
- **Typography-First**: Hierarchy is driven by font size and letter-spacing, not just weight.

## Design Tokens

### Colors
Use semantic classes only:
- `bg-bg-primary`: Main background (#ffffff)
- `bg-bg-secondary`: Subtle background (#fafafa)
- `text-text-primary`: Main text (#171717)
- `text-text-secondary`: Muted text (#4d4d4d)
- `border-border-subtle`: Subtle borders (rgba(0,0,0,0.08))
- `accent-accent-blue`: Primary action color (#0a72ef)

### Typography
- **Display**: `text-display tracking-tight-xl` (48px, -2.4px)
- **Section**: `text-section tracking-tight-lg` (40px, -1.28px)
- **Card Title**: `text-card-title tracking-tight-md` (24px, -0.96px)
- **Body**: `text-body` (16px)
- **Caption**: `text-caption` (12px)

### Shadows
- `shadow-border`: The standard 1px subtle border. Use this instead of `border`.
- `shadow-card`: Multi-layered shadow for cards and elevated elements.
- `shadow-focus`: The clean blue focus ring.

### Radius
- `rounded-button`: 6px (Buttons, Inputs)
- `rounded-card`: 8px (Cards, Modals)
- `rounded-image`: 12px (Images, Large containers)

## Rules Enforcement
1. **NEVER** use raw hex codes in components. Use Tailwind semantic classes.
2. **NEVER** use standard CSS `border`. Always use `shadow-border` or `border-border-subtle`.
3. **ONLY** use font weights 400 (normal), 500 (medium), and 600 (semibold).
4. **Letter-spacing** must follow the scale for headings.
5. **Container**: Use `container-vercel` for page layouts (max-width 1200px).
6. **Spacing**: Use `section-gap` for large vertical gaps between sections.

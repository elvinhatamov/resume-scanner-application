# 🎨 Resume Job Matcher - Design System Guide

## Color Palette

```
Primary Gradient: #6366f1 (Indigo) → #a855f7 (Purple) → #ec4899 (Pink)

Component Colors:
├─ Indigo (#6366f1) - Primary actions, headers, important elements
├─ Purple (#a855f7) - Secondary actions, gradients
├─ Pink (#ec4899) - Accents, highlights
├─ Cyan (#06b6d4) - Information, insights
├─ Green (#10b981) - Success, positive status
├─ Orange (#f59e0b) - Warnings, alerts
└─ Red (#ef4444) - Danger, destructive actions
```

## Component Styles

### Buttons
- **Primary CTA**: Gradient background (indigo-purple-pink) → white text → scale-105 hover
- **Secondary**: Border style → colored text → background fill on hover
- **Danger**: Red gradient → white text
- **Disabled**: Gray background → reduced opacity

### Cards
- **Content Cards**: White background → top gradient border → shadow
- **Info Cards**: Light background matching color → left colored border → matching colored icon
- **Match Cards**: White → gradient top border → colored skill badges

### Headers
- **Page Headers**: Full gradient background (indigo-purple-pink) → white text
- **Section Headers**: Gradient text effect (clip-text)

### Badges & Tags
- **Skills**: Light background with colored text
- **Status**: Inline badges with background color matching status
- **Alerts**: Left-bordered containers matching alert type

### Inputs
- **Text Inputs**: Gray border → indigo focus ring → rounded
- **File Upload**: Dashed border → highlight on file present

## Typography Scale

```
Display (Headlines): 3xl-5xl font-black/bold
Section Titles: 2xl-3xl font-bold
Subsections: lg-xl font-bold
Body Text: base text-gray-900
Supporting: sm-xs text-gray-600
```

## Spacing System

```
xs: 0.5rem (4px)
sm: 1rem (8px)
md: 1.5rem (12px)
lg: 2rem (16px)
xl: 3rem (24px)
```

## Elevation (Shadows)

```
sm: box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
md: box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg: box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl: box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

## Animation Effects

- **Pulse**: Icon animations (logo, status indicators)
- **Scale**: Button hover effects (transform: scale(1.05))
- **Gradient**: Animated gradient backgrounds
- **Spin**: Loading indicators
- **Fade**: Transitions between states

## Layout Patterns

### Full-Width Gradient Header
```jsx
<div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
  {/* content */}
</div>
```

### Colorful Info Card
```jsx
<div className="p-4 rounded-lg border-l-4 border-indigo-500 bg-indigo-50">
  <label className="text-xs font-bold text-indigo-600 uppercase">Label</label>
  <p className="text-lg font-bold text-gray-900">{content}</p>
</div>
```

### Match Card Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Gradient border cards */}
</div>
```

## Responsive Breakpoints

```
Mobile: < 768px (1 column layouts)
Tablet: 768px - 1024px (2 column layouts)
Desktop: > 1024px (3 column layouts)
```

## Accessibility Features

- High contrast ratios (WCAG AA compliant)
- Clear focus states on interactive elements
- Semantic HTML structure
- Icon + text labels
- Descriptive button text

## Implementation Notes

### CSS Classes Used
- Tailwind CSS utilities (bg-gradient-to-r, from-*, via-*, to-*)
- Bootstrap utilities (d-grid, d-flex, grid-cols-*)
- Custom CSS variables (in style.css)
- lucide-react icons

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

### Performance
- CSS gradients (no images)
- GPU-accelerated transforms
- Minimal JavaScript animations
- Optimized icon library

---

**Last Updated**: 2025
**Design Version**: 1.0
**Status**: ✅ Production Ready

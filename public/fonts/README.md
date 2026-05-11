# Custom Fonts

Place your custom font files in this directory.

## Supported Font Formats
- `.woff2` (recommended - best compression)
- `.woff` (good browser support)
- `.ttf` (TrueType)
- `.otf` (OpenType)

## How to Use Fonts

1. Add your font files to this folder
2. Update `src/styles.css` to include your custom fonts using `@font-face`
3. Reference the fonts in your CSS

Example:
```css
@font-face {
  font-family: 'MyCustomFont';
  src: url('/fonts/my-font.woff2') format('woff2'),
       url('/fonts/my-font.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
```

## Current Custom Fonts
(Add your fonts here)

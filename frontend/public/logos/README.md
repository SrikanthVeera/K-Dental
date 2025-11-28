# Brand Logos Directory

This directory contains local brand logo files to avoid network/DNS errors.

## Required Logo Files

Place the following logo files in this directory:

- `3m.png` - 3M ESPE logo
- `angelus.png` - Angelus logo
- `bisco.png` - Bisco Dental logo
- `colgate.png` - Colgate Professional logo
- `coltene.png` - Coltene logo
- `dentsply.png` - Dentsply Sirona logo
- `gc.png` - GC Corporation logo
- `hu-friedy.png` - Hu-Friedy logo
- `ivoclar.png` - Ivoclar Vivadent logo
- `kerr.png` - Kerr Dental logo
- `miltex.png` - Miltex logo
- `nobel.png` - Nobel Biocare logo
- `nsk.png` - NSK logo
- `oral-b.png` - Oral-B Professional logo
- `septodont.png` - Septodont logo
- `shofu.png` - Shofu Dental logo
- `straumann.png` - Straumann logo
- `ultradent.png` - Ultradent logo
- `woodpecker.png` - Woodpecker logo
- `zimmer.png` - Zimmer Biomet logo

## Recommended Specifications

- Format: PNG with transparent background
- Size: 200x100px or 200x200px
- File size: < 50KB each
- Quality: High resolution for retina displays

## Fallback Behavior

If a logo file is missing, the system will automatically show a fallback placeholder:
`https://dummyimage.com/200x200/ffffff/000000&text=No+Logo`

## Usage

The `BrandLogo` component and `getBrandLogo()` utility automatically handle:
- Loading local logos
- Fallback on error
- Case-insensitive brand name matching
- Lazy loading for performance

## Adding New Brands

1. Add the logo file to this directory
2. Update `frontend/src/utils/brandLogos.ts` with the mapping
3. The logo will be automatically available throughout the app

# Boulder Shoes - Project Instructions

## CODE QUALITY RULES
- Keep components small and single-purpose (under 150 lines each)
- No duplicated logic — extract shared code into utility functions
- Keep data (shoe database, sizing charts) in separate data files, not mixed into components
- Use clear, descriptive variable and function names
- Add brief comments explaining WHY, not WHAT
- Type everything properly with TypeScript
- Keep the folder structure organized: components/, data/, lib/, utils/

## PROJECT CONTEXT
- This is a climbing shoe recommendation website built with Next.js
- Users input their foot details and existing shoes to get recommendations
- Supports US, UK, EU, and Korean (mm) sizing systems
- Shows top 3 recommendations with downsize guidance and where to buy

## WHEN MAKING CHANGES
- Always run the build before committing to catch errors
- Keep files under 150 lines - split if they get larger
- Test that the site works locally before deploying to Vercel

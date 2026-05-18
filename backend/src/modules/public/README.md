# Public Module (Backend Dev 2)

## Owner: Backend Dev 2

## Files to create:
- `public.controller.js` — Route handler functions
- `public.routes.js` — Express router (NO auth required)

## Routes (all public, no authentication):
```
GET /api/public/sites/:siteSlug                      → Load published site info + homepage
GET /api/public/sites/:siteSlug/pages/:pageSlug      → Load a specific published page
GET /api/public/sites/:siteSlug/navigation           → Load published navigation
```

## Critical Rules:
- ONLY return `publishedContent`, NEVER `draftContent`
- Return 404 for unpublished sites/pages
- No authentication required on these routes

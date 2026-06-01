# Pages Module (Backend Dev 2)

## Owner: Backend Dev 2

## Files to create:

- `page.model.js` — Mongoose schema for pages ✅
- `page.controller.js` — Route handler functions (CRUD + publish)
- `page.routes.js` — Express router

## Routes:

```
GET    /api/sites/:siteId/pages               → List all pages for a site
POST   /api/sites/:siteId/pages               → Create a new page
GET    /api/sites/:siteId/pages/:pageId       → Get a page (draft content)
PUT    /api/sites/:siteId/pages/:pageId       → Save/update draft content
DELETE /api/sites/:siteId/pages/:pageId       → Delete page
POST   /api/sites/:siteId/pages/:pageId/publish → Publish page
```

## Schema Fields:

```
_id
siteId           — ObjectId, ref 'Site', required
title            — String, required
slug             — String, required
status           — String, enum ['draft', 'published'], default 'draft'
isHomePage       — Boolean, default false
draftContent     — Mixed (JSON page structure from builder)
publishedContent — Mixed (snapshot at publish time)
seoTitle         — String
seoDescription   — String
createdAt        — Date
updatedAt        — Date
publishedAt      — Date
```

## Notes

- Uses `timestamps: true` (auto `createdAt` + `updatedAt`).
- Enforces uniqueness per site via index: `{ siteId, slug }` (unique).

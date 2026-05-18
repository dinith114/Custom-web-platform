# Sites Module (Backend Dev 1)

## Owner: Backend Dev 1

## Files to create:
- `site.model.js` — Mongoose schema for sites
- `site.controller.js` — Route handler functions (CRUD)
- `site.routes.js` — Express router with route definitions

## Routes:
```
GET    /api/sites             → List all sites owned by current user
POST   /api/sites             → Create a new site
GET    /api/sites/:siteId     → Get site details
PUT    /api/sites/:siteId     → Update site settings
DELETE /api/sites/:siteId     → Delete site (owner only)
```

## Schema Fields:
```
_id
ownerId       — ObjectId, ref 'User', required
name          — String, required
slug          — String, required, unique
status        — String, enum ['draft', 'published'], default 'draft'
subdomain     — String, unique
customDomain  — String
templateId    — ObjectId, ref 'Template'
createdAt     — Date
updatedAt     — Date
publishedAt   — Date
```

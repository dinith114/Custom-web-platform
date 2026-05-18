# Templates Module (Backend Dev 2 — Week 3, if needed)

## Owner: Backend Dev 2

## Files to create:
- `template.model.js` — Mongoose schema for templates
- `template.controller.js` — Route handler functions
- `template.routes.js` — Express router

## Routes:
```
GET /api/templates              → List available templates
GET /api/templates/:templateId  → Get template details
```

## Schema Fields:
```
_id
name              — String, required
thumbnail         — String (preview image URL)
category          — String, enum ['business', 'portfolio', 'ecommerce', 'blog', 'landing']
defaultPages      — Array (pre-built page structures)
defaultNavigation — Object (pre-built nav structure)
isActive          — Boolean, default true
createdAt         — Date
updatedAt         — Date
```

## Note:
This module is NOT part of the core MVP flow. Build it only after Pages, Media, and Public API are complete.

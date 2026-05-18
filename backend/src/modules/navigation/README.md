# Navigation Module (Backend Dev 1)

## Owner: Backend Dev 1

## Files to create:
- `navigation.model.js` — Mongoose schema for navigation
- `navigation.controller.js` — Route handler functions
- `navigation.routes.js` — Express router

## Routes:
```
GET  /api/sites/:siteId/navigation       → Get full navigation structure
PUT  /api/sites/:siteId/navigation       → Save/update navigation
```

## Schema Fields:
```
_id
siteId        — ObjectId, ref 'Site', required, unique
items         — Array of navigation items
updatedAt     — Date
```

Each navigation item:
```
id            — String
label         — String
pageId        — ObjectId, ref 'Page'
url           — String (external link or internal slug)
order         — Number
isVisible     — Boolean, default true
children      — Array (nested items for dropdowns)
```

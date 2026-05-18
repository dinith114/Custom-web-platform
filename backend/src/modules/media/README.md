# Media Module (Backend Dev 2)

## Owner: Backend Dev 2

## Files to create:
- `media.model.js` — Mongoose schema for media
- `media.controller.js` — Route handler functions (upload, list, delete)
- `media.routes.js` — Express router

## Routes:
```
GET    /api/sites/:siteId/media           → List all media for a site
POST   /api/sites/:siteId/media/upload    → Upload a file
DELETE /api/sites/:siteId/media/:mediaId  → Delete a file
```

## Schema Fields:
```
_id
siteId      — ObjectId, ref 'Site', required
uploadedBy  — ObjectId, ref 'User', required
fileName    — String, required
fileType    — String, required (MIME type)
fileSize    — Number, required (bytes)
fileUrl     — String, required (CDN URL)
storageKey  — String, required (S3 key or Cloudinary public_id)
uploadedAt  — Date
```

## Upload Flow:
1. Frontend sends file via multipart/form-data
2. Backend validates file type and size
3. Backend uploads to Cloudinary / S3
4. Storage service returns file URL
5. Backend saves metadata in MongoDB

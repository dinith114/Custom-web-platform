# Users Module (Backend Dev 1)

## Owner: Backend Dev 1

## Files to create:
- `user.model.js` — Mongoose schema for users

## Schema Fields:
```
_id
name          — String, required
email         — String, required, unique
passwordHash  — String, required
role          — String, enum ['admin', 'user'], default 'user'
status        — String, enum ['active', 'suspended'], default 'active'
avatarUrl     — String
createdAt     — Date
updatedAt     — Date
```

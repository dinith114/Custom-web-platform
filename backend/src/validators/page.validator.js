const { body } = require("express-validator");

/**
 * Validation rules for POST /api/sites/:siteId/pages
 */
const createPageRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Page title is required.")
    .isLength({ max: 200 })
    .withMessage("Page title cannot exceed 200 characters."),

  body("slug")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Page slug cannot exceed 200 characters."),

  body("isHomePage")
    .optional()
    .isBoolean()
    .withMessage("isHomePage must be a boolean."),

  body("draftContent").optional(),

  body("seoTitle")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 200 })
    .withMessage("SEO title cannot exceed 200 characters."),

  body("seoDescription")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("SEO description cannot exceed 500 characters."),
];

/**
 * Validation rules for PUT /api/sites/:siteId/pages/:pageId
 */
const updatePageRules = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Page title must be between 1 and 200 characters."),

  body("slug")
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Page slug must be between 1 and 200 characters."),

  body("isHomePage")
    .optional()
    .isBoolean()
    .withMessage("isHomePage must be a boolean."),

  body("draftContent").optional(),

  body("seoTitle")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 200 })
    .withMessage("SEO title cannot exceed 200 characters."),

  body("seoDescription")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("SEO description cannot exceed 500 characters."),
];

module.exports = { createPageRules, updatePageRules };

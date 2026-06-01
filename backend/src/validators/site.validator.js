const { body } = require("express-validator");

/**
 * Validation rules for POST /api/sites
 */
const createSiteRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Site name is required.")
    .isLength({ min: 2, max: 150 })
    .withMessage("Site name must be between 2 and 150 characters."),

  body("templateId")
    .optional()
    .isMongoId()
    .withMessage("Template ID must be a valid MongoDB ID."),
];

/**
 * Validation rules for PUT /api/sites/:siteId
 */
const updateSiteRules = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("Site name must be between 2 and 150 characters."),

  body("customDomain")
    .optional({ nullable: true })
    .customSanitizer((value) => (value === "" ? null : value))
    .custom((value) => value === null || typeof value === "string")
    .withMessage("Custom domain must be a string or null.")
    .customSanitizer((value) =>
      typeof value === "string" ? value.trim().toLowerCase() : value,
    )
    .custom(
      (value) => value === null || (value.length >= 3 && value.length <= 255),
    )
    .withMessage("Custom domain must be between 3 and 255 characters."),

  body("templateId")
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage("Template ID must be a valid MongoDB ID."),

  body("status")
    .optional()
    .isIn(["draft", "published"])
    .withMessage("Status must be either draft or published."),
];

module.exports = { createSiteRules, updateSiteRules };

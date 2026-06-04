const Template = require("./template.model");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");

const getTemplates = async (req, res) => {
  const { category } = req.query;

  const filter = { isActive: true };
  if (typeof category === "string" && category.trim()) {
    filter.category = category.trim().toLowerCase();
  }

  const templates = await Template.find(filter).sort({ category: 1, name: 1 });

  return res.json(
    successResponse(templates, "Templates retrieved successfully."),
  );
};

const getTemplateById = async (req, res) => {
  const { templateId } = req.params;

  const template = await Template.findOne({ _id: templateId, isActive: true });
  if (!template) {
    return res.status(404).json(errorResponse("Template not found."));
  }

  return res.json(
    successResponse(template, "Template retrieved successfully."),
  );
};

module.exports = {
  getTemplates,
  getTemplateById,
};

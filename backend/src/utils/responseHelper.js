/**
 * Standard API response helper
 *
 * Usage:
 *   res.status(200).json(successResponse(data, 'Message'));
 *   res.status(400).json(errorResponse('Error message'));
 */

const successResponse = (data = null, message = 'Success') => ({
  success: true,
  message,
  data,
});

const errorResponse = (message = 'Something went wrong', errors = null) => ({
  success: false,
  message,
  ...(errors && { errors }),
});

module.exports = { successResponse, errorResponse };

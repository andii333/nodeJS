const Joi = require("joi");

const productType = ["food", "clothing", "furniture"];
const currency = ["USD", "EUR", "GBP", "UAH"];
const objectIdPattern = /^[a-zA-Z0-9]*$/;

const orderSchema = Joi.object({
  productId: Joi.string().pattern(objectIdPattern).required(),
  productName: Joi.string().min(1).required(),
  productType: Joi.string()
    .valid(...productType)
    .required(),
  quantity: Joi.number().integer().positive().required(),
  currency: Joi.string()
    .valid(...currency)
    .required(),
  orderedAt: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/)
    .required(),
  hasDiscount: Joi.boolean().required(),
  userId: Joi.string().uuid().required(),
});

const validateOrder = (req, res, next) => {
  const { error } = orderSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports = { validateOrder };

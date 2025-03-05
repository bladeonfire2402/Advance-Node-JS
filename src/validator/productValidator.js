import Joi from 'joi'

const productValidator = Joi.object({
    productName:Joi.string().min(3).max(255).required(),
    price:Joi.number().required(),
    productName:Joi.string().min(3).max(255).required(),
    categoryId:Joi.string().required()
})

export default productValidator
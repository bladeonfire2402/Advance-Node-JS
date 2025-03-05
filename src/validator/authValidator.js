import Joi from "joi";

const signUpValidiator = Joi.object({
    userName:Joi.string().required().min(6).max(255),
    email:Joi.string().required().email(),
    pwd:Joi.string().required().min(8).max(255),
    confirmPassword:Joi.string().required().valid(Joi.ref("pwd")),
    role:Joi.string
})

const signInValidator = Joi.object({
    userName:Joi.string().required().min(6).max(255),
    pwd:Joi.string().required().min(8).max(255)
})

export { signUpValidiator,signInValidator}
import joi from 'joi';

const entryValidation = {
    validation(schema) {
        const entry = {
        entryTitle: joi.string().required().min(3).max(50).trim(),
        posted: joi.boolean().required(),
        viewed: joi.boolean().required(),
        entryContent: joi.string().required().min(20).trim()
        };
        return joi.validate(schema, entry);
    }
};
const userValidation = {
    validation(schema) {
        const user = {
        firstname: joi.string().required().min(3).max(50).trim(),
        lastname: joi.string().required().min(3).max(50).trim(),
        email: joi.string().required().min(5).max(100).trim(),
        password: joi.string().required().alphanum().min(8).trim()
        };
        return joi.validate(schema, user);
    }
};
const signinValidation = {
    validation(schema) {
        const signIn = {
            email: joi.string().required().min(5).max(100).trim(),
            password: joi.string().required().alphanum().min(8).trim()
        };
        return joi.validate(schema, signIn);
    }
};
export { entryValidation, userValidation, signinValidation };

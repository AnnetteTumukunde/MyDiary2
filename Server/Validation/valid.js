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
export default entryValidation;

import Joi from 'joi';

const entryadd = Joi.object().keys({
    entryTitle: Joi.string().required().alphanum().min(3)
    .max(50),
    posted: Joi.boolean().required(),
    viewed: Joi.boolean().required(),
    entryContent: Joi.string().required().alphanum().min(20)
});
const validData = {
    entryTitle: 'Always do good to others',
    posted: true,
    viewed: false,
    entryContent: 'If only everyone does good, that is when we will live a better life.'
};
const result = Joi.validate(validData, entryadd);

export default result;

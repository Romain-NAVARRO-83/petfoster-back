import Joi from 'joi';

export const createAnimalSchema = Joi.object({
  name: Joi.string().min(1),
  date_of_birth: Joi.date().iso().required(),
  sexe: Joi.string().min(1),
  race: Joi.string().allow(''),
  short_story: Joi.string().allow(''),
  long_story: Joi.string().allow(''),
  health: Joi.string().allow(''),
  species_id: Joi.number().integer().greater(0).required(),
  creator_id: Joi.number().integer().greater(0).required(),
});

export const updateAnimalSchema = Joi.object({
  name: Joi.string().min(1),
  date_of_birth: Joi.date().iso().required(),
  sexe: Joi.string().min(1),
  race: Joi.string().allow(''),
  short_story: Joi.string().allow(''),
  long_story: Joi.string().allow(''),
  health: Joi.string().allow(''),
  species_id: Joi.number().integer().greater(0).required(),
});

export const createMessageSchema = Joi.object({
  sender_id: Joi.number().integer().required(),
  receiver_id: Joi.number().integer().required(),
  content: Joi.string().min(1),
});

export const createProfileSchema = Joi.object({
  species_id: Joi.number().integer().greater(0).required(),
  quantity: Joi.number().integer().greater(0).required(),
  users_id: Joi.number().integer().greater(0).required(),
  age: Joi.string().allow(''),
  sexe: Joi.string().allow(''),
  search_area: Joi.number().integer().min(10),
});

export const updateProfileSchema = Joi.object({
  species_id: Joi.number().integer().greater(0).required(),
  quantity: Joi.number().integer().greater(0).required(),
  users_id: Joi.number().integer().greater(0).required(),
  age: Joi.number().integer().greater(0).allow(),
  sexe: Joi.string().allow(''),
  search_area: Joi.number().integer().min(10),
});

export const createRequestSchema = Joi.object({
  request_status: Joi.string()
    .valid('pending', 'approved', 'rejected')
    .required(),
  animals_id: Joi.number().integer().greater(0).required(),
  users_id: Joi.number().integer().greater(0).required(),
  content_request: Joi.string().allow(''),
});

export const updateRequestSchema = Joi.object({
  request_status: Joi.string()
    .valid('pending', 'approved', 'rejected')
    .required(),
});

export const createUserSchema = Joi.object({
  type_user: Joi.string().min(1),
  name: Joi.string().min(1),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required(),
  password: Joi.string().min(12).required(),
  country: Joi.string().min(1),
  zip: Joi.number().integer().greater(0).required(),
  city: Joi.string().min(1),
  description: Joi.string().allow(''),
  longitude: Joi.number().less(180).precision(7).required(),
  latitude: Joi.number().less(90).precision(7).required(),
  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/^(\+?\d{1,4})?([ .-]?\(?\d{1,4}\)?)?([ .-]?\d{1,4}){1,4}$/)
    .allow(''),
  address: Joi.string().allow(''),
  website: Joi.string().uri().allow(null),
});

export const updateUserSchema = Joi.object({
  // type_user: Joi.string().min(1),
  name: Joi.string().min(1),
  // email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }),
  // password: Joi.string().min(12),
  country: Joi.string().min(1),
  zip: Joi.number().integer().greater(0).required(),
  city: Joi.string().min(1),
  description: Joi.string().allow(''),
  longitude: Joi.number().less(180).precision(7).required(),
  latitude: Joi.number().less(90).precision(7).required(),
  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/^(\+?\d{1,4})?([ .-]?\(?\d{1,4}\)?)?([ .-]?\d{1,4}){1,4}$/)
    .allow(''),
  address: Joi.string().allow(''),
  website: Joi.string(),
  // website: Joi.string().pattern(
  //   /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}([\/\w .-]*)*\/?$/
  // ),
});

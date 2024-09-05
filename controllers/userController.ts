import Joi from 'joi';
import { User } from '../models/index.js';

export async function getAllUsers(req: any, res: any) {
  const users = await User.findAll({
    order: [
      ['id', 'ASC'], // Trier par l'ID des users en ordre croissant
    ],
  });
 
  res.status(200).json(users);
}


export async function getOneUser(req: any, res:any) {
  // Validation de l'ID
  const { error } = Joi.number().integer().greater(0).validate(req.params.id);
  if (error) {
    return res.status(404).json({ error: `User not found. Verify the provided ID. ${error.message}` });
  }
  
  // Récupérer un utilisateur en BDD
  const user = await User.findByPk(req.params.id);

  // Si l'utilisateur n'existe pas
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  
  // Envoyer une réponse
  res.status(200).json(user);
}


export async function createUser(req:any, res:any) {
  const createUserSchema = Joi.object({
    type_user: Joi.string().min(1).required(),
    name: Joi.string().min(1).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(12).required(),
    country: Joi.string().min(1).required,
    zip: Joi.number().integer().greater(0).required(), 
    city: Joi.string().min(1).required(),
    description:Joi.string().min(1),
    longitude: Joi.number().less(180).precision(7).required(),
    latitude: Joi.number().less(90).precision(7).required(),
    phone: Joi.string().min(10).max(15),
    address: Joi.string().min(1).allow(''),
    website: Joi.string().uri()
  });
  
  // Validation de la requête
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // On déstructure le req.body et on crée l'utilisateur
  const { type_user, name, email, password, country, zip, city, description, longitude, latitude, phone, address, website } = req.body;
  const createdUser = await User.create({ type_user, name, email, password, country, zip, city, description, longitude, latitude, phone, address, website });

  res.status(201).json(createdUser);
}



export async function updateUser(req:any, res:any) {
  const userId = parseInt(req.params.id);
  if (! Number.isInteger(userId)) {
    return res.status(404).json({ error: "User not found." });
  }

  const updateUserSchema = Joi.object({
    type_user: Joi.string().min(1).required(),
    name: Joi.string().min(1).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(12).required(),
    country: Joi.string().min(1).required,
    zip: Joi.number().integer().greater(0).required(), 
    city: Joi.string().min(1).required(),
    description:Joi.string().min(1),
    longitude: Joi.number().less(180).precision(7).required(),
    latitude: Joi.number().less(90).precision(7).required(),
    phone: Joi.string().min(10).max(15),
    address: Joi.string().min(1).allow(''),
    website: Joi.string().uri()
  })

  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  
  const user = await User.findByPk(userId);
  if (! user) {
    return res.status(404).json({ error: "User not found." });
  }
  
  const { type_user, name, email, password, country, zip, city, description, longitude, latitude, phone, address, website } = req.body;
  const updatedUser = await user.update({
    name: name,
    type_user: type_user,
    email: email,
    password: password,
    country: country,
    zip:zip,
    city: city,
    description: description,
    longitude: longitude,
    latitude:latitude,
    phone: phone,
    address: address,
    website:website

  });

  res.status(200).json(updatedUser);
}



export async function deleteUser(req:any, res:any) {
  const userId = parseInt(req.params.id);
  if (! Number.isInteger(userId)) {
    return res.status(404).json({ error: "User not found." });
  }

  const user = await User.findByPk(userId);
  if (! user) {
    return res.status(404).json({ error: "User not found." });
  }

  await user.destroy();

  res.status(204).end();
}


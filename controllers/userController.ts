import Joi from 'joi';
import * as argon2i from 'argon2';
import { Op } from 'sequelize';
import * as emailValidator from 'email-validator';
import passwordValidator from 'password-validator';
import jwt from 'jsonwebtoken';
import geolib from 'geolib';

// On importe Request et Response pour typer les objets req et res venant d'Express.
import { Request, Response } from 'express';
import {
  User,
  AnimalsHasUsers,
  Animal,
  UsersPicture,
  FosterlingProfile,
  FosterlingRequest,
} from '../models/index.js';

//! A SUPPRIMER A TERME
export async function loginUser(req: Request, res: Response) {
  console.log('>> POST /login', req.body);
  const { email, password } = req.body;

  // authentication
  const user = await User.findOne({
    where: { [Op.and]: [{ email: email }, { password: password }] },
  });

  console.log(user);

  // http response
  if (user) {
    const jwtPayload = {
      userId: user.id,
      userName: user.name,
      userType: user.type_user,
    };
    const jwtOptions = {
      expiresIn: '3h',
    };
    console.log('<< 200', user.name);
    res.json({
      logged: true,
      pseudo: user.name,
      token: jwt.sign(jwtPayload, process.env.JWTSECRET as string, jwtOptions),
    });
  } else {
    console.log('<< 401 UNAUTHORIZED');
    res.sendStatus(401);
  }
}

export async function loginhUser(req: Request, res: Response) {
  console.log('>> POST /login', req.body);
  const { email, password } = req.body;

  // authentication
  const user = await User.findOne({
    where: { email: email },
  });
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  try {
    if (await argon2i.verify(user.password, password)) {
      // password match
    } else {
      return res.status(401).json({ error: 'Wrong password' });
    }
  } catch (err) {
    return res.status(404).json({ error: 'Something went wrong' });
  }

  console.log(user);

  // http response
  if (user) {
    const jwtPayload = {
      userId: user.id,
      userName: user.name,
      userType: user.type_user,
    };
    const jwtOptions = {
      expiresIn: '3h',
    };
    console.log('<< 200', user.name);
    res.json({
      logged: true,
      pseudo: user.name,
      token: jwt.sign(jwtPayload, process.env.JWTSECRET as string, jwtOptions),
    });
  } else {
    console.log('<< 401 UNAUTHORIZED');
    res.sendStatus(401);
  }
}

export async function getAllUsers(req: Request, res: Response) {
  // const pointDepart = { latitude: 44.2, longitude: 0.633333 }; // Agen // ! Pour test, variable à supprimer à terme
  // const perimetre = 100000; // ! Pour test, variable à supprimer à terme

  const pointDepart = {
    latitude: parseFloat(req.query.latitude as string),
    longitude: parseFloat(req.query.longitude as string),
  };
  const perimetre = parseInt(req.query.perimeter as string);

  console.log(pointDepart);
  console.log(perimetre);

  // On récupère tous les utilisateurs en BDD
  const users = await User.findAll({
    include: [
      {
        model: AnimalsHasUsers,
        as: 'userAnimals',
        include: [
          {
            model: Animal,
            as: 'animal',
          },
        ],
      },
    ],
    order: [
      ['id', 'ASC'], // Trier par l'ID des users en ordre croissant
    ],
  });

  if (pointDepart.latitude && pointDepart.longitude && perimetre) {
    const usersInDistance = users.filter(
      (user) =>
        geolib.getDistance(pointDepart, {
          latitude: user.latitude,
          longitude: user.longitude,
        }) <= perimetre
    );
    res.status(200).json(usersInDistance);
  } else {
    res.status(200).json(users);
  }
}

export async function getOneUser(req: Request, res: Response) {
  // Validation de l'ID
  const { error } = Joi.number().integer().greater(0).validate(req.params.id);
  if (error) {
    return res.status(404).json({
      error: `User not found. Verify the provided ID. ${error.message}`,
    });
  }

  // Récupérer un utilisateur en BDD
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: AnimalsHasUsers,
        as: 'userAnimals',
        include: [
          {
            model: Animal,
            as: 'animal',
          },
        ],
      },
      { model: UsersPicture, as: 'pictures' },
      { model: FosterlingProfile, as: 'fosterlingProfiles' },
      { model: FosterlingRequest, as: 'fosterlingRequests' },
      { model: Animal, as: 'createdAnimals' },
    ],
  });

  // Si l'utilisateur n'existe pas
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  // Envoyer une réponse
  res.status(200).json(user);
}

export async function createUser(req: Request, res: Response) {
  const createUserSchema = Joi.object({
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

  // On valide le req.body
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // On valide le format de l'email
  if (!emailValidator.validate(req.body.email)) {
    return res.status(400).json({ error: "Format d'email invalide." });
  }

  // Valider la force du mdp
  const schema = new passwordValidator()
    .is()
    .min(12)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .not()
    .spaces();

  if (!schema.validate(req.body.password)) {
    return res.status(400).json({ error: 'Format de mot de passe invalide.' });
  }

  const email = req.body.email;

  // On vérifie si le mail n'est pas déjà pris
  const alreadyExistingUser = await User.findOne({ where: { email } });
  if (alreadyExistingUser) {
    return res.status(409).json({ error: 'Cet email est déjà utiisé.' });
  }

  // On hash le mot de passe avec l'outil Argon2i
  const hashedPassword = await argon2i.hash(req.body.password);

  delete req.body.password;
  const createdUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  res.status(201).json(createdUser);
}

export async function updateUser(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  if (!Number.isInteger(userId)) {
    return res.status(404).json({ error: 'User not found.' });
  }

  //On valide le body avec l'outil Joi
  // ==> On définie ce à quoi le body que nous envoie le client doit ressembler
  // ==> On valide le body
  const updateUserSchema = Joi.object({
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
    website: Joi.string().uri(),
  });

  const { error } = updateUserSchema.validate(req.body); // Si error, alors cela signifie que le body ne passe pas la validation
  if (error) {
    return res.status(400).json({ error: error.message }); // Le message d'erreur est généré automatiquement par Joi
  }

  // On récupére l'id de la l'utilisateur à update
  const user = await User.findByPk(userId);
  // Valider l'ID du user
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  // On hash le mot de passe
  const hashedPassword = await argon2i.hash(req.body.password);

  // On update l'utilisateur avec le mot de passe hashé
  delete req.body.password;
  const updatedUser = await user.update({
    ...req.body,
    password: hashedPassword,
  });

  // On renvoie l'utilisateur updated au client
  res.status(200).json(updatedUser);
}

export async function deleteUser(req: Request, res: Response) {
  // On récupère l'ID de l'utilisateur à supprimer
  const userId = parseInt(req.params.id);
  //On vérifie que l'ID est valide
  if (!Number.isInteger(userId)) {
    return res.status(404).json({ error: 'User not found.' });
  }

  // On récupère l'utilisateur à supprimer en BDD
  const user = await User.findByPk(userId);
  // S'il n'existe pas, on renvoie une erreur 404
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  // On supprime l'utilisateur
  await user.destroy();

  // On renvoie une 204 (No content)
  res.status(204).end(); // (end: Pour répondre à une requête sans y mettre de body)
}

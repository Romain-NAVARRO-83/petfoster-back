import Joi from 'joi';
import * as joischema from '../utils/joi';
import * as argon2id from 'argon2';
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
  Species,
  AnimalsPictures,
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
    return res.status(400).json({ error: 'Utilisateur non trouvé.' });
  }

  try {
    if (await argon2id.verify(user.password, password)) {
      // password match
    } else {
      return res.status(401).json({ error: 'Mauvais login ou mot de passe.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur' });
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
      { model: Animal, as: 'createdAnimals' },
      { model: FosterlingProfile, as: 'fosterlingProfiles' },
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
      { model: UsersPicture, as: 'pictures' },
      {
        model: AnimalsHasUsers,
        as: 'userAnimals',
        include: [
          {
            model: Animal,
            as: 'animal',
          },
        ],
        order: [['created_at', 'ASC']], // Tri par date de création (du plus ancien au plus récent)
      },
      {
        model: FosterlingProfile,
        as: 'fosterlingProfiles',
        include: [
          {
            model: Species,
            as: 'species',
          },
        ],
      },
      { model: FosterlingRequest, as: 'fosterlingRequests' },
      {
        model: Animal,
        as: 'createdAnimals',
        include: [
          {
            model: AnimalsHasUsers,
            as: 'animalOwners',
            where: { date_end: null },
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
        order: [['created_at', 'ASC']],
      },
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
  const createUserSchema = joischema.createUserSchema;

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

  // On hash le mot de passe avec l'outil Argon2id
  const hashedPassword = await argon2id.hash(req.body.password);

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
  const updateUserSchema = joischema.updateUserSchema;

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

  // On update l'utilisateur avec le mot de passe hashé
  delete req.body.password;
  const updatedUser = await user.update({
    ...req.body,
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

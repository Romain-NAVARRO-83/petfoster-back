import Joi from 'joi';
import { Request, Response } from 'express';
import FosterlingProfile from '../models/FosterlingProfile';
import { profile } from 'console';

export async function getAllProfiles(req: Request, res: Response) {
  const profiles = await FosterlingProfile.findAll();
  console.log('FosterlingProfiles fetched');
  res.status(200).json(profiles);
}

export async function getOneProfile(req: Request, res: Response) {
  // Validation de l'ID
  const { error } = Joi.number().integer().greater(0).validate(req.params.id);
  if (error) {
    return res.status(404).json({
      error: `Profile not found. Verify the provided ID. ${error.message}`,
    });
  }

  // Récupérer le profil en BDD
  const profile = await FosterlingProfile.findByPk(req.params.id);

  // Si le profil n'existe pas
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found.' });
  }

  // Envoyer une réponse
  res.status(200).json(profile);
}

export async function createFosterlingProfile(req: Request, res: Response) {
  const createProfileSchema = Joi.object({
    species_id: Joi.number().integer().greater(0).required(),
    quantity: Joi.number().integer().greater(0).required(),
    users_id: Joi.number().integer().greater(0).required(),
    age: Joi.number().integer().greater(0).allow(),
    sexe: Joi.string().allow(''),
    search_area: Joi.string().allow(''),
  });

  // Validation de la requête
  const { error } = createProfileSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  //On déstructure le req.body et on crée le profil d'accueil
  const { species_id, quantity, users_id, age, sexe, search_area } = req.body;
  const createdFosterlingProfile = await FosterlingProfile.create({
    species_id,
    quantity,
    users_id,
    age,
    sexe,
    search_area,
  });

  res.status(201).json(createdFosterlingProfile);
}

export async function updateProfile(req: Request, res: Response) {
  const profileId = parseInt(req.params.id);
  if (!Number.isInteger(FosterlingProfile)) {
    return res.status(404).json({ error: 'Profile not found.' });
  }

  const updateProfileSchema = Joi.object({
    species_id: Joi.number().integer().greater(0).required(),
    quantity: Joi.number().integer().greater(0).required(),
    users_id: Joi.number().integer().greater(0).required(),
    age: Joi.number().integer().greater(0).allow(),
    sexe: Joi.string().allow(''),
    search_area: Joi.string().allow(''),
  });

  const { error } = updateProfileSchema.validate(req.body);
  if (error) {
    return res.status(404).json({ error: 'Profile not found.' });
  }

  const profile = await FosterlingProfile.findByPk(req.params.id);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found.' });
  }

  const { species_id, quantity, users_id, age, sexe, search_area } = req.body;
  const updatedProfile = await profile.update({
    species_id: species_id,
    quantity: quantity,
    users_id: users_id,
    age: age,
    sexe: sexe,
    search_area: search_area,
  });

  res.status(200).json(updatedProfile);
}

export async function deleteProfile(req: Request, res: Response) {
  const profileId = parseInt(req.params.id);
  if (!Number.isInteger(profileId)) {
    return res.status(404).json({ error: 'Profile not found.' });
  }

  const profile = await FosterlingProfile.findByPk(profileId);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  await profile.destroy();

  res.status(204).end();
}

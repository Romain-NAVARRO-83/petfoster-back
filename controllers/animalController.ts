import Joi from 'joi';
import { Request, Response } from 'express';
import { Animal } from '../models/index.js';

export async function getAllAnimals(req: Request, res: Response) {
  const animals = await Animal.findAll({
    include: 'creator',
    order: [
      ['id', 'ASC'], // Trier par l'ID des Animaux en ordre croissant
    ],
  });

  res.status(200).json(animals);
}

export async function getOneAnimal(req: Request, res: Response) {
  // Validation de l'ID
  const { error } = Joi.number().integer().greater(0).validate(req.params.id);
  if (error) {
    return res.status(404).json({
      error: `Animal not found. Verify the provided ID. ${error.message}`,
    });
  }

  // Récupérer l'animal en BDD
  const animal = await Animal.findByPk(req.params.id, {
    include: 'creator',
    order: [
      ['id', 'ASC'], // Trier par l'ID des Animaux en ordre croissant
    ],
  });

  // Si l'animal n'existe pas
  if (!animal) {
    return res.status(404).json({ error: 'Animal not found.' });
  }

  // Envoyer une réponse
  res.status(200).json(animal);
}

export async function createAnimal(req: Request, res: Response) {
  const createAnimalSchema = Joi.object({
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

  // Validation de la requête
  const { error } = createAnimalSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // On déstructure le req.body et on crée l'animal
  const {
    name,
    date_of_birth,
    sexe,
    race,
    short_story,
    long_story,
    health,
    species_id,
    creator_id,
  } = req.body;
  const createdAnimal = await Animal.create({
    name,
    date_of_birth,
    sexe,
    race,
    short_story,
    long_story,
    health,
    species_id,
    creator_id,
  });

  res.status(201).json(createdAnimal);
}

export async function updateAnimal(req: Request, res: Response) {
  const animalId = parseInt(req.params.id);
  if (!Number.isInteger(animalId)) {
    return res.status(404).json({ error: 'Animal not found.' });
  }

  const updateAnimalSchema = Joi.object({
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

  const { error } = updateAnimalSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const animal = await Animal.findByPk(animalId);
  if (!animal) {
    return res.status(404).json({ error: 'Animal not found.' });
  }

  const {
    name,
    date_of_birth,
    sexe,
    race,
    short_story,
    long_story,
    health,
    species_id,
    creator_id,
  } = req.body;
  const updatedAnimal = await animal.update({
    name: name,
    date_of_birth: date_of_birth,
    sexe: sexe,
    race: race,
    short_story: short_story,
    long_story: long_story,
    health: health,
    species_id: species_id,
    creator_id: creator_id,
  });

  res.status(200).json(updatedAnimal);
}

export async function deleteAnimal(req: Request, res: Response) {
  const animalId = parseInt(req.params.id);
  if (!Number.isInteger(animalId)) {
    return res.status(404).json({ error: 'Animal not found.' });
  }

  const animal = await Animal.findByPk(animalId);
  if (!animal) {
    return res.status(404).json({ error: 'Animal not found.' });
  }

  await animal.destroy();

  res.status(204).end();
}

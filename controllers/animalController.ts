import Joi from 'joi';
import * as joischema from '../utils/joi';
import { Request, Response } from 'express';
import { upload, handleImageUpload } from '../utils/uploadMiddleware';
import path from 'path';
import {
  Animal,
  User,
  Species,
  AnimalsPictures,
  AnimalsHasUsers,
} from '../models/index.js';

export async function getAllAnimals(req: Request, res: Response) {
  const animals = await Animal.findAll({
    include: [
      { model: User, as: 'creator' },
      { model: Species, as: 'species' },
      {
        model: AnimalsHasUsers,
        as: 'animalOwners',
        include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
      },
    ],
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
      error: `Animal not found. Verify the provided ID. `,
    });
  }

  // Récupérer l'animal en BDD
  const animal = await Animal.findByPk(req.params.id, {
    include: [
      {
        model: AnimalsHasUsers,
        as: 'animalOwners',
        include: [
          {
            model: User,
            as: 'user',
          },
        ],
      },
      { model: User, as: 'creator' },
      { model: Species, as: 'species' },
      { model: AnimalsPictures, as: 'pictures' },
    ],
    order: [[{ model: AnimalsHasUsers, as: 'animalOwners' }, 'id', 'DESC']],
  });

  // Si l'animal n'existe pas
  if (!animal) {
    return res.status(404).json({ error: 'Animal not found.' });
  }

  // Envoyer une réponse
  res.status(200).json(animal);
}

export async function createAnimal(req: Request, res: Response) {
  const createAnimalSchema = joischema.createAnimalSchema;

  // Validation de la requête
  const { error } = createAnimalSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const createdAnimal = await Animal.create({
    ...req.body,
  });

  await AnimalsHasUsers.create({
    animals_id: createdAnimal.id,
    users_id: createdAnimal.creator_id,
    date_start: createdAnimal.created_at,
  });

  res.status(201).json(createdAnimal);
}

export async function updateAnimal(req: Request, res: Response) {
  const animalId = parseInt(req.params.id);
  if (!Number.isInteger(animalId)) {
    return res.status(404).json({ error: 'Animal not found.' });
  }

  const updateAnimalSchema = joischema.updateAnimalSchema;

  const { error } = updateAnimalSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const animal = await Animal.findByPk(animalId);
  if (!animal) {
    return res.status(404).json({ error: 'Animal not found.' });
  }

  const updatedAnimal = await animal.update({
    ...req.body,
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
// Route pour l'upload d'image
export const uploadPicture = [
  upload.single('image'), // Multer middleware pour gérer le téléchargement du fichier
  handleImageUpload('animaux/img750'), // Middleware pour convertir et enregistrer l'image
  async (req: Request, res: Response) => {
    try {
      const profileId = parseInt(req.params.id);
      console.log(`Profile ID: ${profileId}`);

      if (!req.file) {
        return res.status(400).json({ error: 'Aucun fichier téléchargé' });
      }

      const fileName = path.basename(req.filePath);
      // Enregistrement en base de données
      await AnimalsPictures.create({
        animals_id: profileId,
        URL_picture: fileName,
      });

      // Réponse de succès
      res.status(200).json({
        message: 'Image téléchargée avec succès',
        filePath: req.filePath,
      });
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image:", error);
      res
        .status(500)
        .json({ error: "Erreur lors du téléchargement de l'image" });
    }
  },
];

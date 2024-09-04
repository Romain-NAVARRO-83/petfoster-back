import Joi from 'joi';
import { Animal } from '../models/index.js';

export async function getAllAnimals(req: any, res: any) {
  const animals = await Animal.findAll({
    include: 'creator',
    order: [
      ['id', 'ASC'], // Trier par l'ID des Animaux en ordre croissant
    ],
  });
  console.log('Animals fetched');
  res.status(200).json(animals);
}


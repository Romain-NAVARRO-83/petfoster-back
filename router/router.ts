import { Router } from 'express';
import * as animalControler from '../controllers/animalControler';

export const router = Router();

// Routes des Animaux
router.get('/animals', animalControler.getAllAnimals);

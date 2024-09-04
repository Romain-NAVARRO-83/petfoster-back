import { Router } from 'express';
import * as animalControler from '../controllers/animalControler';
import { controllerWrapper as cw } from '../utils/controllerWrapper';

export const router = Router();

// Routes des Animaux
router.get('/animals', cw(animalControler.getAllAnimals));

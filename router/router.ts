import { Router } from 'express';
import * as animalControler from '../controllers/animalControler';
import { controllerWrapper as cw } from '../utils/controllerWrapper';

export const router = Router();

// Routes des Animaux
router.get('/animals', cw(animalControler.getAllAnimals));
router.get('/animals/:id', cw(animalControler.getOneAnimal));
router.post('/animals', cw(animalControler.createAnimal));
router.patch('/animals/:id', cw(animalControler.updateAnimal));
router.delete('/animals/:id', cw(animalControler.deleteAnimal));

// Routes des Users
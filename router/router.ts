import { Router } from 'express';
import * as animalController from '../controllers/animalController';
import * as userController from '../controllers/userController';
import * as profileController from '../controllers/profileController';
import { controllerWrapper as cw } from '../utils/controllerWrapper';

export const router = Router();

// Routes des Animaux
router.get('/animals', cw(animalController.getAllAnimals));
router.get('/animals/:id', cw(animalController.getOneAnimal));
router.post('/animals', cw(animalController.createAnimal));
router.put('/animals/:id', cw(animalController.updateAnimal));
router.delete('/animals/:id', cw(animalController.deleteAnimal));

// Routes des Users
router.get('/users', cw(userController.getAllUsers));
router.get('/users/:id', cw(userController.getOneUser));
router.post('/users', cw(userController.createUser));
router.put('/users/:id', cw(userController.updateUser));
router.delete('/users/:id', cw(userController.deleteUser));

// Route des Profils
router.get('profiles', cw(profileController.getAllProfiles));
router.get('profiles/:id', cw(profileController.getOneProfile));
router.post('profiles', cw(profileController.createFosterlingProfile));
router.put('profiles/:id', cw(profileController.updateProfile));
router.delete('profiles/:id', cw(profileController.deleteProfile));

import { Router } from 'express';
import { rateLimit } from 'express-rate-limit'
import * as animalController from '../controllers/animalController';
import * as userController from '../controllers/userController';
import * as profileController from '../controllers/profileController';
import * as requestController from '../controllers/requestController';
import { controllerWrapper as cw } from '../utils/controllerWrapper';

// Middleware pour limiter le nombre de requêtes par IP sur les routes critiques afin de prévenir les attaques DDOS
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	limit: 10, // Limite chaque IP à 10 requêtes max par minute
  message: { error: 'Too many requests from this IP, please try again after a minute.' }
})
  
export const router = Router();

// Routes des Animaux
router.get('/animals', cw(animalController.getAllAnimals));
router.get('/animals/:id', cw(animalController.getOneAnimal));
router.post('/animals', cw(animalController.createAnimal));
router.put('/animals/:id', cw(animalController.updateAnimal));
router.delete('/animals/:id', cw(animalController.deleteAnimal));

//Route Auth
router.post('/login', cw(userController.loginUser));
router.post('/loginh', limiter, cw(userController.loginhUser));

// Routes des Users
router.get('/users', cw(userController.getAllUsers));
router.get('/users/:id', cw(userController.getOneUser));
router.post('/users', cw(userController.createUser));
router.put('/users/:id', cw(userController.updateUser));
router.delete('/users/:id', cw(userController.deleteUser));

// Routes des Profils
router.get('/profiles', cw(profileController.getAllProfiles));
router.get('/profiles/:id', cw(profileController.getOneProfile));
router.post('/profiles', cw(profileController.createFosterlingProfile));
router.put('/profiles/:id', cw(profileController.updateProfile));
router.delete('/profiles/:id', cw(profileController.deleteProfile));

// Routes des Requests
router.get('requests', cw(requestController.getAllRequests));
router.get('requests/:id', cw(requestController.getOneRequest));
router.post('requests', cw(requestController.createFosterlingRequest));
router.put('requests/:id', cw(requestController.updateRequest));
router.delete('requests/:id', cw(requestController.deleteRequest));

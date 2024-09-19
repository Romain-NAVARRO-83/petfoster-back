import Joi from 'joi';
import * as joischema from '../utils/joi';
import { Request, Response } from 'express';
import FosterlingProfile from '../models/FosterlingProfile';
import { upload, handleImageUpload } from '../utils/uploadMiddleware';
import path from 'path';
import multer from 'multer';
// import { UsersPicture } from 'models';
import UsersPictures from '../models/UsersPicture';

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

// Upload d'image
const uploadProfilePicture = [
  upload.single('image'),
  handleImageUpload('utilisateurs'),
  (req: Request, res: Response) => {
    const profileId = parseInt(req.params.id);
    console.log(profileId);
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Aucun fichier téléchargé' });
      }

      res.status(200).json({
        message: 'Image téléchargée avec succès',
        filePath: req.filePath,
      });
      const fileName = path.basename(req.filePath);
      // Enregistrement en BDD
      UsersPictures.create({ users_id: profileId, URL_picture: fileName });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors du téléchargement de l'image" });
    }
  },
];

export { uploadProfilePicture };

export async function createFosterlingProfile(req: Request, res: Response) {
  const createProfileSchema = joischema.createProfileSchema;

  // Validation de la requête
  const { error } = createProfileSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  //On déstructure le req.body et on crée le profil d'accueil
  const createdFosterlingProfile = await FosterlingProfile.create({
    ...req.body,
  });

  res.status(201).json(createdFosterlingProfile);
}

export async function updateProfile(req: Request, res: Response) {
  const profileId = parseInt(req.params.id);
  if (!Number.isInteger(profileId)) {
    return res.status(404).json({ error: 'Bad request.' });
  }

  const updateProfileSchema = joischema.updateProfileSchema;

  const { error } = updateProfileSchema.validate(req.body);
  if (error) {
    return res.status(404).json({ error: 'Bad request.' });
  }

  const profile = await FosterlingProfile.findByPk(req.params.id);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found.' });
  }

  const updatedProfile = await profile.update({
    ...req.body,
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

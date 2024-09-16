import Joi from 'joi';
import * as joischema from '../utils/joi';
import { Request, Response } from 'express';
import {
  FosterlingRequest,
  Animal,
  AnimalsPictures,
  User,
  AnimalsHasUsers,
} from '../models/index.js';
import { Op } from 'sequelize';

export async function getAllRequests(req: Request, res: Response) {
  // On récupère toutes les demandes en BDD
  const requests = await FosterlingRequest.findAll({
    include: [
      {
        model: Animal,
        as: 'animal',
        attributes: ['name'],
        include: [
          {
            model: AnimalsPictures,
            as: 'pictures',
          },
        ],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name'],
      },
    ],
    order: [
      ['id', 'ASC'],
      [
        { model: Animal, as: 'animal' },
        { model: AnimalsPictures, as: 'pictures' },
        'id',
        'ASC',
      ], // Trier par l'ID des demandes en ordre croissant
    ],
  });

  res.status(200).json(requests);
}

export async function getOneRequest(req: Request, res: Response) {
  // Validation de l'ID
  const { error } = Joi.number().integer().greater(0).validate(req.params.id);
  if (error) {
    return res.status(404).json({
      error: `Request not found. Verify the provided ID. ${error.message}`,
    });
  }

  // Récupérer une demande en BDD
  const request = await FosterlingRequest.findByPk(req.params.id, {
    include: [
      {
        model: Animal,
        as: 'animal',
        attributes: ['name'],
        include: [
          {
            model: AnimalsPictures,
            as: 'pictures',
          },
        ],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name'],
      },
    ],
    order: [
      [
        { model: Animal, as: 'animal' },
        { model: AnimalsPictures, as: 'pictures' },
        'id',
        'ASC',
      ], // Trier par l'ID des demandes en ordre croissant
    ],
  });

  // Si la demande n'existe pas
  if (!request) {
    return res.status(404).json({ error: 'Request not found.' });
  }

  // Envoyer une réponse
  res.status(200).json(request);
}

export async function createFosterlingRequest(req: Request, res: Response) {
  const createRequestSchema = joischema.createRequestSchema;

  // On valide le req.body
  const { error } = createRequestSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // On déstructure le req.body et on crée la demande
  const createdFosterlingRequest = await FosterlingRequest.create({
    ...req.body,
  });

  res.status(201).json(createdFosterlingRequest);
}

export async function updateRequest(req: Request, res: Response) {
  const requestId = parseInt(req.params.id);
  if (!Number.isInteger(requestId)) {
    return res.status(404).json({ error: 'Request not found.' });
  }

  //On valide le body avec l'outil Joi
  // ==> On définie ce à quoi le body que nous envoie le client doit ressembler
  // ==> On valide le body avec cet outil
  const updateRequestSchema = joischema.updateRequestSchema;

  const { error } = updateRequestSchema.validate(req.body); // Si error, alors cela signifie que le body ne passe pas la validation
  if (error) {
    return res.status(400).json({ error: error.message }); // Le message d'erreur est généré automatiquement par Joi
  }

  // On récupére l'id de la demande à update
  const request = await FosterlingRequest.findByPk(requestId);
  // Valider l'ID de la demande
  if (!request) {
    return res.status(404).json({ error: 'Request not found.' });
  }

  // On update l'utilisateur avec le mot de passe hashé
  const updatedRequest = await request.update({
    ...req.body,
  });

  if (updatedRequest && req.body.request_status === 'approved') {
    try {
      const newFosterling = await AnimalsHasUsers.create({
        animals_id: updatedRequest.animals_id,
        users_id: updatedRequest.users_id,
        date_start: updatedRequest.created_at,
      });

      const lastFosterling = await AnimalsHasUsers.findOne({
        where: {
          [Op.and]: [
            { date_end: null },
            { animals_id: updatedRequest.animals_id },
          ],
        },
      });

      if (lastFosterling) {
        const updatedLastFosterling = await lastFosterling.update({
          date_end: updatedRequest.created_at,
        });

        // On renvoie la demande updated au client
        res
          .status(200)
          .json([updatedRequest, newFosterling, updatedLastFosterling]);
      }
    } catch (error) {
      res.status(400).json({ error: "Erreur lors du transfert d'animal" });
    }
  }
}

export async function deleteRequest(req: Request, res: Response) {
  // On récupère l'ID de la demande à supprimer
  const requestId = parseInt(req.params.id);
  //On vérifie que l'ID est valide
  if (!Number.isInteger(requestId)) {
    return res.status(404).json({ error: 'Request not found.' });
  }

  // On récupère la demande à supprimer en BDD
  const request = await FosterlingRequest.findByPk(requestId);
  // S'il n'existe pas, on renvoie une erreur 404
  if (!request) {
    return res.status(404).json({ error: 'Request not found.' });
  }

  // On supprime la demande
  await request.destroy();

  // On renvoie une 204 (No content)
  res.status(204).end(); // (end: Pour répondre à une requête sans y mettre de body)
}

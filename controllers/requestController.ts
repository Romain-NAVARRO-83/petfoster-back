import Joi from 'joi';
import { Request, Response } from 'express';
import FosterlingRequest from '../models/FosterlingRequest';

export async function getAllRequests(req: Request, res: Response) {
  // On récupère toutes les demandes en BDD
  const requests = await FosterlingRequest.findAll({
    order: [
      ['id', 'ASC'], // Trier par l'ID des demandes en ordre croissant
    ],
  });
 
  res.status(200).json(requests);
}



export async function getOneRequest(req: Request, res:Response) {
  // Validation de l'ID
  const { error } = Joi.number().integer().greater(0).validate(req.params.id);
  if (error) {
    return res.status(404).json({ error: `Request not found. Verify the provided ID. ${error.message}` });
  }
  
  // Récupérer une demande en BDD
  const request = await FosterlingRequest.findByPk(req.params.id);

  // Si la demande n'existe pas
  if (!request) {
    return res.status(404).json({ error: "Request not found." });
  }
  
  // Envoyer une réponse
  res.status(200).json(request);
}




export async function createFosterlingRequest(req:Request, res:Response) {
  const createRequestSchema = Joi.object({
    request_status: Joi.string().valid('pending', 'approved', 'rejected').required(),
    animals_id: Joi.number().integer().greater(0).required(), 
    users_id: Joi.number().integer().greater(0).required(), 
    content_request: Joi.string().allow('')
  });
  
  // On valide le req.body
  const { error } = createRequestSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // On déstructure le req.body et on crée la demande
  const { 
    request_status,
    animals_id,
    users_id,
    content_request
  } = req.body;

  const createdFosterlingRequest = await FosterlingRequest.create({ 
    request_status,
    animals_id,
    users_id,
    content_request
  });

  res.status(201).json(createdFosterlingRequest);
}



export async function updateRequest(req:Request, res:Response) {
  const requestId = parseInt(req.params.id);
  if (! Number.isInteger(requestId)) {
    return res.status(404).json({ error: "Request not found." });
  }

  //On valide le body avec l'outil Joi
  // ==> On définie ce à quoi le body que nous envoie le client doit ressembler
  // ==> On valide le body avec cet outil pratique !
  const updateRequestSchema = Joi.object({
    request_status: Joi.string().valid('pending', 'approved', 'rejected').required(),
    animals_id: Joi.number().integer().greater(0).required(), 
    users_id: Joi.number().integer().greater(0).required(), 
    content_request: Joi.string().allow('')
  })

  const { error } = updateRequestSchema.validate(req.body); // Si error, alors cela signifie que le body ne passe pas la validation
  if (error) {
    return res.status(400).json({ error: error.message }); // Le message d'erreur est généré automatiquement par Joi
  }
  
  // On récupére l'id de la demande à update
  const request = await FosterlingRequest.findByPk(requestId);
  // Valider l'ID de la demande
  if (! request) {
    return res.status(404).json({ error: "Request not found." });
  }

  // On déstructure le req.body
  const { 
    request_status,
    animals_id,
    users_id,
    content_request
  } = req.body;
  
  // On update l'utilisateur avec le mot de passe hashé
  const updatedUser = await request.update({
    request_status,
    animals_id,
    users_id,
    content_request
  });
   
  // On renvoie la demande updated au client
  res.status(200).json(updatedUser);
}



export async function deleteRequest(req:Request, res:Response) {
  // On récupère l'ID de la demande à supprimer
  const requestId = parseInt(req.params.id);
  //On vérifie que l'ID est valide
  if (! Number.isInteger(requestId)) {
    return res.status(404).json({ error: "Request not found." });
  }

  // On récupère la demande à supprimer en BDD
  const request = await FosterlingRequest.findByPk(requestId);
  // S'il n'existe pas, on renvoie une erreur 404
  if (! request) {
    return res.status(404).json({ error: "Request not found." });
  }

  // On supprime la demande
  await request.destroy();

  // On renvoie une 204 (No content)
  res.status(204).end();  // (end: Pour répondre à une requête sans y mettre de body)
}










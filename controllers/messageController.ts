import Joi from 'joi';
import { Request, Response } from 'express';
import { Message } from '../models';
import { Op } from 'sequelize';

// Récupérer tous les messages
export async function getAllMessages(req: Request, res: Response) {
  // On récupère tous les messages de l'utilisateur connecté en BDD
  const messages = await Message.findAll({
    where: {
      [Op.or]: [{ sender_id: req.params.id }, { receiver_id: req.params.id }],
    },
  });

  res.status(200).json(messages);
}

// On crée un schéma Joi pour les messsages
export async function writeMessage(req: Request, res: Response) {
  const createMessageSchema = Joi.object({
    sender_id: Joi.number().integer().required(),
    receiver_id: Joi.number().integer().required(),
    content: Joi.string().min(1),
  });

  // On valide le req.body
  const { error } = createMessageSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // On crée le message en déstrucurant le req.body
  const { sender_id, receiver_id, content } = req.body;

  const newMessage = await Message.create({
    sender_id,
    receiver_id,
    content,
  });

  // On renvoie la réponse, le nouveau message
  res.status(200).json(newMessage);
}

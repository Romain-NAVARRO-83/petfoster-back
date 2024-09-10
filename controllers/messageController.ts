import Joi from 'joi';
import { Request, Response } from 'express';
import { Message, User } from '../models';
import { Op } from 'sequelize';
import csrf from 'csrf';
const csrfProtection = new csrf();

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

// Récupérer tous les échanges entre deux utilisateurs
export async function getAllTalks(req: Request, res: Response) {
  // On récupère tous les échanges de deux utilisateurs connectés en BDD
  const messages = await Message.findAll({
    where: {
      [Op.and]: [{ sender_id: 1 }, { receiver_id: 2 }],
    },
  });

  res.status(200).json(messages);
}

// Fonction pour marquer un message comme "lu"
export async function markAsRead(req: Request, res: Response) {
  const messageId = parseInt(req.params.id);

  // Vérifiez que l'ID du message est valide
  if (!Number.isInteger(messageId)) {
    return res.status(400).json({ error: 'Invalid message ID.' });
  }

  try {
    // Trouver le message par son ID
    const message = await Message.findByPk(messageId);

    // Si le message n'existe pas
    if (!message) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    // Mettre à jour le statut is_read à true
    await message.update({ is_read: true });

    // Réponse au client
    res.status(200).json({ message: 'Message marked as read successfully.' });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the message status.' });
  }
}

// On crée un schéma Joi pour les messsages
export async function writeMessage(req: Request, res: Response) {
  // Validate the CSRF token in requests
  const csrfToken = req.headers['x-xsrf-token'];
  if (
    !csrfProtection.verify(
      process.env.CSRF_SECRET as string,
      csrfToken as string
    )
  ) {
    return res.status(403).send('Invalid CSRF token');
  }
  // Continue processing the request...

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
  const { sender_id, receiver_id, content, is_read } = req.body;

  const newMessage = await Message.create({
    sender_id,
    receiver_id,
    content,
    is_read,
  });

  // On renvoie la réponse, le nouveau message
  res.status(200).json(newMessage);
}

export async function deleteMessage(req: Request, res: Response) {
  // On récupère l'ID du message à supprimer
  const messageId = parseInt(req.params.id);
  // On vérifie que l'ID est valide
  if (!Number.isInteger(messageId)) {
    return res.status(404).json({ error: 'Message not found.' });
  }

  // On récupère le message à supprimer en BDD
  const message = await Message.findByPk(messageId);
  // S'il n'existe pas, on renvoie une erreur 404
  if (!message) {
    return res.status(404).json({ error: 'Message not found.' });
  }
  // On supprime le message
  await message.destroy();
  // On renvoie une erreur 204 (no content)
  res.status(204).end(); // (end: Pour répondre à une requête sans y mettre de body)
}

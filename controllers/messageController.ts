import Joi from 'joi';
import { Request, Response } from 'express';
import { Message, User } from '../models';
import { Op } from 'sequelize';

// On récupère tous les échanges entre deux utilisateurs
export async function getAllTalks(req: Request, res: Response) {
  // On récupère tous les échanges de deux utilisateurs connectés en BDD
  const messages = await Message.findAll({
    where: {
      [Op.and]: [
        {
          sender_id: {
            [Op.or]: [req.params.userId, req.params.interlocutorId],
          },
        },
        {
          receiver_id: {
            [Op.or]: [req.params.userId, req.params.interlocutorId],
          },
        },
      ],
    },
    order: [['created_at', 'ASC']],
  });
  res.status(200).json(messages);
}

export async function getAllInterlocutors(req: Request, res: Response) {
  const userId = parseInt(req.params.id);

  try {
    // On récupère tous les messages où l'utilisateur est soit l'expéditeur, soit le destinataire
    const messages = await Message.findAll({
      where: {
        [Op.or]: [{ sender_id: userId }, { receiver_id: userId }],
      },
      attributes: ['sender_id', 'receiver_id'], // On récupère seulement les IDs nécessaires
    });

    // On crée un ensemble pour stocker les IDs uniques des interlocuteurs
    const interlocutorIds = new Set<number>();

    // Parcourir les messages et ajouter les IDs des interlocuteurs à l'ensemble
    messages.forEach((message) => {
      if (message.sender_id !== userId) {
        interlocutorIds.add(message.sender_id);
      }
      if (message.receiver_id !== userId) {
        interlocutorIds.add(message.receiver_id);
      }
    });

    const uniqueInterlocutorIds = Array.from(interlocutorIds);

    const lastMessages = await Promise.all(
      uniqueInterlocutorIds.map(async (interlocutor) => {
        // Requête pour récupérer le dernier message entre l'utlisateur et son interlocuteur
        const lastMessage = await Message.findOne({
          where: {
            [Op.or]: [
              { sender_id: userId, receiver_id: interlocutor },
              { sender_id: interlocutor, receiver_id: userId },
            ],
          },
          order: [['created_at', 'DESC']], // Tri par date de création (du plus ancien au plus récent)
          limit: 1, // Limite à 1 seul message, le dernier
        });
        return lastMessage;
      })
    );
    console.log(lastMessages);
    res.status(200).json(lastMessages);
  } catch (error) {
    console.error('Error fetching interlocutors:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching interlocutors.' });
  }
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
  const newMessage = await Message.create({
    ...req.body,
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

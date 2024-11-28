// Controller Wrapper
export function controllerWrapper(mdw: any) {
  return async (req: any, res: any, next: any) => {
    try {
      await mdw(req, res, next);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'Unexpected server error. Please try again later.' });
      // Stack leaking : on envoie au client une réponse 500 générique afin de ne pas faire fuiter d'information concernant notre stack technique !
      // Par exemple, si erreur Sequelize, alors : l'erreur Sequelize qui a eu lieu est affichée côté backend avec le console.log, mais le client n'en sait rien
    }
  };
}

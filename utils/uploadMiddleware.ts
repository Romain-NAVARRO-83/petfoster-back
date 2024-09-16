import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Définir le stockage temporaire avec Multer
const upload = multer({
  dest: 'temp/', // Stockage temporaire avant la conversion
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite à 5 Mo
});

// Middleware pour convertir et enregistrer l'image en WebP
const handleImageUpload = (folder: string) => {
  return async (req: any, res: any, next: any) => {
    if (!req.file) {
      return res.status(400).send('Aucun fichier envoyé.');
    }

    const tempPath = req.file.path; // Chemin temporaire du fichier téléchargé
    const outputFolder = path.join(__dirname, '..', 'public', 'img', folder);
    const outputFileName = `${Date.now()}.webp`;
    const outputPath = path.join(outputFolder, outputFileName);

    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    try {
      // Conversion de l'image en WebP et enregistrement dans le bon dossier
      await sharp(tempPath)
        .webp()
        .toFile(outputPath);

      // Supprimer le fichier temporaire
      fs.unlinkSync(tempPath);

      // Ajouter le chemin de l'image à la requête pour l'utiliser plus tard
      req.filePath = outputPath;
      next();
    } catch (error) {
      console.error('Erreur lors de la conversion de l\'image:', error);
      res.status(500).send('Erreur lors de la conversion de l\'image.');
    }
  };
};

export { upload, handleImageUpload };

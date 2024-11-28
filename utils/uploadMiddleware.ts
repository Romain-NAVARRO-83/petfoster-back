import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { extname } from 'path';
import { Request, Response, NextFunction } from 'express';

interface MulterFile extends Express.Multer.File {
  path: string;
}

// Configuration de Multer pour le stockage temporaire et le contrôle du format
const upload = multer({
  dest: 'temp/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (
    req: Request,
    file: MulterFile,
    cb: FileFilterCallback
  ): void => {
    const allowedFormats = ['.jpg', '.jpeg', '.png'];
    const fileExt = extname(file.originalname).toLowerCase();

    if (allowedFormats.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Format de fichier non supporté. Seuls .jpg, .jpeg, et .png sont acceptés.'
        )
      );
    }
  },
});

// Middleware pour convertir et enregistrer l'image en WebP
const handleImageUpload = (folder: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(400).send('Aucun fichier envoyé.');
    }

    const tempPath = (req.file as MulterFile).path;
    const outputFolder = new URL(`../public/img/${folder}/`, import.meta.url)
      .pathname;
    const outputFileName = `${Date.now()}.webp`;
    const outputPath = path.join(outputFolder, outputFileName);

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    try {
      await sharp(tempPath).webp().toFile(outputPath);

      // Supprimer le fichier temporaire
      fs.unlinkSync(tempPath);
      (req as any).filePath = outputPath;
      next();
    } catch (error) {
      console.error("Erreur lors de la conversion de l'image :", error);
      res.status(500).send("Erreur lors de la conversion de l'image.");
    }
  };
};

export { upload, handleImageUpload };

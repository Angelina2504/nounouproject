const multer = require('multer');
const path = require('path');
const userRepository = require('../models/userRepository');

// Configuration du stockage
const storage = multer.diskStorage({
 
    //destination: path.join(__dirname, '../uploads/' + userDir),
    destination: async (req, file, cb) => {
        const userId = req.session.user.id;

        // TODO construire le userdir
        try {
          // Read the user in the database
          const user = await userRepository.read(userId);

       //   user.firstname (here!!!!!!!!!!!)
          let userDir = '';
          
          cb(null, path.join(__dirname, '../uploads/' + userDir)); // Dossier où les fichiers seront stockés
      } catch (err) {
          // In case of an error, log it and return an error response
          console.error("Error during editing user:", err);
         // res.status(500).json({ success: false, message: "Internal server error" });
      }        
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nom unique pour chaque fichier
    },
});

// Filtre pour les types autorisés
const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

const fileFilter = (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Seuls les fichiers JPEG, PNG et PDF sont autorisés.'));
    }
    cb(null, true);
  };
  
  // Configuration Multer
const uploadHandler = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille : 5 Mo
  });
  
  module.exports = uploadHandler;
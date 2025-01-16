const fs = require('fs');
const multer = require('multer');
const path = require('path');
const userRepository = require('../models/userRepository');

// Storage Config
const storage = multer.diskStorage({
 
    destination: async (req, file, cb) => {
        const userId = req.session.user.id;

        try {
          // Read the user in the database
        const user = await userRepository.read(userId);
        const userDir = `${user.lastname?.toUpperCase()} ${user.firstname} - ${userId}`;
        const uploadPath = path.join(__dirname, '../uploads', userDir);
      
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
          if (err) {
              console.error("Erreur lors de la création du dossier :", err);
              return cb(err); // error if Mkdir fail
          }
          cb(null, uploadPath); // Pass the path once the folder is created
      });
  } catch (err) {
      console.error("Erreur dans la fonction destination :", err);
      cb(err); // Returns an error if a problem occurs
  }
},
    // Config for file name
filename: (req, file, cb) => {
  const uniqueSuffix = `${Date.now()}`; // Generate a unique timestamp
  const extension = path.extname(file.originalname); // Get the file extension
  const baseName = path.basename(file.originalname, extension); // Get the file without extension

  cb(null, `${baseName}-${uniqueSuffix}${extension}`); // Constructs the final file name
},
});

// Filter for allowed types
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

const fileFilter = (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Seuls les fichiers JPEG, PNG et PDF sont autorisés.'));
    }
    cb(null, true);
  };
  
  // Config Multer
const uploadHandler = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // size limit : 5 Mo
  });
  
  module.exports = uploadHandler;
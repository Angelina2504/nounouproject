const express = require("express");
const router = express.Router();
const uploadHandler = require('../config/multerConfig');

// Route pour uploader un fichier
router.post('/', uploadHandler.single('file'), (req, res) => {
    res.json({
      message: 'Fichier uploadé avec succès !',
      file: req.file,
    });
  }); 
  
  // Route pour uploader plusieurs fichiers
 /*  router.post('/', uploadHandler.array('files', 5), (req, res) => {
    res.json({
      message: 'Fichiers uploadés avec succès !',
      files: req.files,
    });
  }); */

  router.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath); // Force le téléchargement
  });
module.exports = router;

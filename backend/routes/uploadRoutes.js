const express = require("express");
const router = express.Router();
const uploadHandler = require('../config/multerConfig');
const checkSession = require('../services/checkSession');

// Route to upload a file
router.post('/', checkSession, uploadHandler.single('file'), (req, res) => {
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

  router.get('/uploads/:filename', checkSession, (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath); // Force download
  });
module.exports = router;

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads';
    console.log('Multer destination path:', uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    console.log('Multer filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Yalnızca şəkil faylları (jpeg, jpg, png, webp) icazəlidir!'));
  }
});

module.exports = upload;

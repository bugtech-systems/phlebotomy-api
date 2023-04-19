require('dotenv').config()
const fs = require('fs');
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    console.log(file.originalname);
    console.log(process.env.UPLOAD_PATH)
    const dir = path.join(process.env.UPLOAD_PATH, 'uploads') || '/uploads';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const csvFilter = (_req, file, cb) => {
  console.log('Reading file in middleware', file.originalname);
  if (file == undefined) {
    cb('Please upload a file to proceed.', false);
  } else if (file.mimetype.includes('csv')) {
    cb(null, true);
  } else {
    cb('Please upload only csv file as only CSV is supported for now.', false);
  }
};


module.exports = multer({
    storage: storage,
    fileFilter: csvFilter
});
import { config } from "dotenv";
import multer from "multer";
import path from "path";
import { v4 as uuidV4 } from "uuid";
import { existsSync, mkdirSync } from "fs";

config();
// Mongodb URL
export const mongoURI = process.env.MONGODB_URI;

const storageEngine = (destPath) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const fileDest = `./public/images/${destPath}`;
      mkdirSync(fileDest, { recursive: true });
      cb(null, fileDest);
    },
    filename: (req, file, cb) => {
      const fileName = uuidV4();
      cb(null, fileName + path.extname(file.originalname));
    },
  });

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

export const upload = (path) =>
  multer({
    storage: storageEngine(path),
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  });

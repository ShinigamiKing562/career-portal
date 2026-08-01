import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/resumes";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },

  filename(req, file, cb) {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;

    req.savedFilename = filename;

    cb(null, filename);
  },
});

export default multer({ storage });

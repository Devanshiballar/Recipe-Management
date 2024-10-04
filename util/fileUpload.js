const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "recipe_image") {
      cb(null, "./uploads");
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "recipe_image") {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});
function checkFileType(file, cb) {
  if (file.fieldname === "recipe_image") {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/svg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
}

// const upload = multer({ storage: storage })
module.exports = upload;

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

function imageUploadMiddleware(config = {}) {
  const { single, maxCount } = config;
  const upload = multer({ storage });

  return function (req, res, next) {
    if (single) {
      upload.single(single)(req, res, function (err) {
        handleUploadError(err, res, next);
      });
    } else if (maxCount) {
      upload.array(undefined, maxCount)(req, res, function (err) {
        handleUploadError(err, res, next);
      });
    } else {
      // Default to upload.any() if no specific configuration is provided
      upload.any()(req, res, function (err) {
        handleUploadError(err, res, next);
      });
    }
  };
}

function handleUploadError(err, res, next) {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    return res.status(400).json({ error: "Multer error" });
  } else if (err) {
    // An unknown error occurred when uploading.
    return res.status(500).json({ error: "Internal server error" });
  }

  // Continue to the next middleware or route handler.
  next();
}

module.exports = imageUploadMiddleware;

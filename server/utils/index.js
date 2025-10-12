const fs = require("fs").promises;

module.exports.createPublicFolder = async (path) => {
  await fs.mkdir(path, {
    recursive: true,
  });
};

module.exports.deleteImageFromDisk = async (imageName) => {
  try {
    await fs.unlink(path.join(STATIC_PATH, "/images", imageName));
  } catch (error) {
    console.log(error);
  }
};

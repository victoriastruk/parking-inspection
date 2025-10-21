const { Image } = require("../models");
const createHttpError = require("http-errors");
const { deleteImageFromDisk } = require("../utils");

module.exports.getProtocolImages = async (req, res, next) => {
  try {
    const {
      params: { protocolId },
    } = req;
    const images = await Image.findAll({
      where: { protocolId },
    });

    return res.status(200).send({ data: images });
  } catch (error) {
    next(error);
  }
};

module.exports.addProtocolImages = async (req, res, next) => {
  try {
    const {
      params: { protocolId },
      files,
    } = req;
    const images = files.map((file) => ({ path: file.filename, protocolId }));

    const imagesFromDB = await Image.bulkCreate(images, { returning: true });

    return res.status(201).send({ data: imagesFromDB });
  } catch (error) {
    next(error);
  }
};

module.exports.getImageByID = async (req, res, next) => {
  try {
    const {
      params: { protocolId, imageId },
    } = req;

    const image = await Image.findOne({
      where: { protocolId, id: imageId },
    });

    if (!image) {
      return next(createHttpError(404, "Image not found"));
    }

    return res.status(200).send({ data: image });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteImageByID = async (req, res, next) => {
  try {
    const {
      params: { protocolId, imageId },
    } = req;
    const image = await Image.findOne({
      where: { protocolId, id: imageId },
    });

    if (!image) {
      return next(createHttpError(404, "Image not found"));
    }

    await deleteImageFromDisk(image.path);
    await image.destroy();

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

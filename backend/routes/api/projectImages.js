const express = require('express');
const { ProjectImage } = require('../../db/models');

const router = express.Router();

//Edit Image
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { url } = req.body;

    try {
        const image = await ProjectImage.findByPk(id);

        if(!image) {
            return res.status(400).json({ message: "Image not found" });
        }

        image.url = url;

        await image.save();

        return res.status(200).json(image);
    } catch(error) {
        console.log("Unable to update picture: ", error);
        return res.status(500).json({ message: "Internal server error" })
    }
})


//Get Image
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const currentImage = await ProjectImage.findByPk(id);

        if(!currentImage) {
            return res.status(400).json({ message: "Image not found" });
        }

        return res.status(200).json(currentImage)
    } catch(error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;
var express = require('express');
var router = express.Router();
var Recette = require('../models/recettes');
const User = require('../models/user')
const uniqid = require('uniqid');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

function isInList(element, list) {
    for (let el of list) {
        if (el === element) {
            return true;
        }
    }
    return false;
}

function removeFromList(element, list) {
    const newList = [];

    for (let el of list) {
        if (el !== element) {
            newList.push(el);
        }
    }

    return newList;
}

router.post('/add', async (req, res) => {
    try
    {
        const etapes = (JSON.parse(req.body.etapes)).map((etape) => etape.text);
        const dressages = (JSON.parse(req.body.dressages)).map((dressage) => dressage.text);
        const ingredients = JSON.parse(req.body.ingredients);
        const tags = JSON.parse(req.body.tags);
        const id = (await User.findOne({ token: req.headers.token})).id;

        const photoPath = `./tmp/${uniqid()}.jpg`;
        const resultMove = await req.files.img.mv(photoPath);
            

        if (!resultMove)
        {
            const resultCloudinary = await cloudinary.uploader.upload(photoPath);
            fs.unlinkSync(photoPath);
            const img = resultCloudinary.secure_url;

            const newRecette = new Recette({
                img: img,
                title: req.body.title,
                description: req.body.description,
                temps_de_preparation: req.body.temps_de_preparation,
                temps_de_cuisson: req.body.temps_de_cuisson,
                difficulte: req.body.difficulte,
                tags: tags,
                ingredients: ingredients,
                etapes: etapes,
                dressages: dressages,
                notes: req.body.notes,
                user_id: id,
                favorite: false,
            });
            await newRecette.save();
            res.json({result: true});
        }
        else
        {
            res.json({result: false, error: resultMove})
        }
    }
    catch (error)
    {
        res.json({result: false, error: error.message});
    }
})

router.get('/get', async (req, res) => {
    try
    {
        const id = (await User.findOne({ token: req.headers.token})).id;
        const recettes = await Recette.find({ user_id:id });
        res.json({result: true, recette:recettes});
    }
    catch (error)
    {
        res.json({result: false, error: error.message});
    }
})

router.post('/get_by_id', async (req, res) => {
    try
    {
        const user = await User.findOne({ token: req.headers.token });

        if (!user)
        {
            return res.json({ result: false, error: "Utilisateur non trouvé" });
        }

        const recette = await Recette.findOne({ _id: req.body.id, user_id:user._id });

        if (!recette)
        {
            return res.json({ result: false, error: "Recette non trouvée" });
        }

        res.json({ result: true, recette: recette });
    }
    catch (error)
    {
        res.json({ result: false, error: error.message });
    }
});

router.put('/update_favorite', async (req, res) => {
    try
    {
        const user = await User.findOne({ token: req.headers.token });

        if (!user)
        {
            return res.json({ result: false, error: "Utilisateur non trouvé" });
        }

        const recette = await Recette.findOne({ _id: req.body.id, user_id:user._id });

        if (!recette)
        {
            return res.json({ result: false, error: "Recette non trouvée" });
        }

        recette.favorite = !recette.favorite;
        await recette.save();
        res.json({ result: true, recette: recette });
    }
    catch (error)
    {
        res.json({ result: false, error: error.message });
    }
})

router.delete('/delete', async (req, res) => {
    try
    {
        const user = await User.findOne({ token: req.headers.token });

        if (!user)
        {
            return res.json({ result: false, error: "Utilisateur non trouvé" });
        }

        const recette = await Recette.deleteOne({ _id: req.body.id, user_id:user._id });

        if (recette.deletedCount === 0)
        {
            return res.json({ result: false, error: "Recette non trouvée" });
        }

        res.json({ result: true })
    }
    catch (error)
    {
        res.json({ result: false, error: error.message });
    }
})

module.exports = router;
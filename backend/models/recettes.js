const mongoose = require('mongoose');

const recetteSchema = mongoose.Schema({
    img: String,
    title: String,
    description: String,
    temps_de_preparation: String,
    temps_de_cuisson: String,
    difficulte: {
        type: String,
        enum: ["facile", "moyen", "difficile"]
    },
    tags: [String],
    ingredients: [{
        quantity: Number,
        el: String,
        unite: String
    }],
    etapes: [String],
    dressages: [String],
    notes: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    favorite: Boolean,
});

const Recette = mongoose.model('recettes', recetteSchema);

module.exports = Recette;
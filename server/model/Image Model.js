const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    imageUrl: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;

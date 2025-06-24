import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
    en: String,
    es: String,
    fr: String,
    it: String
});

const currencySchema = new mongoose.Schema({
    usd: String,
    gel: String,
    gbp: String
});

const ProductsSchema = new mongoose.Schema({
    title: translationSchema,
    image: String,
    price: currencySchema,
    rating: String
},
    {timestamps: true}
)

export default mongoose.model('Products', ProductsSchema);

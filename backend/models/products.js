import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: String
    },
    rating: {
        type: String
    }
},
    {timestamps: true}
)

export default mongoose.model('Products', ProductsSchema);

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  rating: Number,
  category: String,
  brand: String,
});

const customerSchema = new mongoose.Schema({
  name: String,
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
});

const Product = mongoose.model('Product', productSchema);
const Customer = mongoose.model('Customer', customerSchema);

export { Product, Customer };


require('dotenv').config()
const path = require('path');
const express = require('express')
const mongoose = require('mongoose');

const app = express()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)
    .then((result) => {
        console.log('Conexion exitosa');
        const PORT = process.env.PORT || 4000

        app.listen(PORT, () => {
            console.log(`Iniciando en el puerto ${PORT}`);
        })
    })
    .catch(err => console.log)

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: Number
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema, 'Products')

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.post('/api/v1/productos', (req, res) => {

    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    })

    newProduct.save()
        .then(() => {
            res.status(201).json({ ok: true })
        })
        .catch(err => console.log)

})


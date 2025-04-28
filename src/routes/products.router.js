import express from 'express'
import ProductManager from '../productManager.js'
import uploader from '../utils/uploader.js'

const productsRouter = express.Router()
const productManager = new ProductManager()

productsRouter.post('/', uploader.single("file"), async (req,res) =>{
    if(!req.file) return res.status(401).json({ message: "falta adjuntar una imagen" })

    const title = req.body.title
    const description = req.body.description
    const code = req.body.code
    const price = parseInt (req.body.price)
    const status = req.body.status
    const stock = parseInt (req.body.stock)
    const category = req.body.category
    const thumbnail = "/img/" + req.file.filename

    await productManager.addProduct({title,description,code, price, status, stock, category, thumbnail})
    res.redirect('/')
})


export default productsRouter
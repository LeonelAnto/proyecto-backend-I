import express from 'express'
import Product from '../models/product.model.js'

const productsRouter = express.Router()


productsRouter.post('/', async (req,res) =>{
    try {
        
       const { title, description, code, price, status, stock, category, thumbnail } = req.body

        const product = new Product({title, description, code, price, status, stock, category, thumbnail})

        

        await product.save()

        res.status(201).json({status: "success", payload: product})
    
        

    } catch (error) {
        res.status(500).json({status: "error", message: "Error al crear un nuevo producto"})
    }
})

productsRouter.get('/', async (req, res) => {
    try {
        const { limit = 8, page = 1 } = req.query 
        const products = await Product.paginate({}, { limit, page })
        res.status(200).json({status: "success", payload: products})
        

    } catch (error) {
        res.status(500).json({status: "error", message: "Error al recuperar los productos"})
    }
})

productsRouter.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        const product = await Product.findById(pid)
        
        res.status(200).json({status: "success", payload: product})
        

    } catch (error) {
        res.status(500).json({status: "error", message: "Error al recuperar los productos"})
    }
})

productsRouter.put("/:pid", async (req, res) =>{
    try {
        const pid = req.params.pid
        const updateData = req.body

        const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true })
        if(!updatedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" })

        res.status(200).json({status: "success", payload: updatedProduct})
        
    } catch (error) {
        res.status(500).json({status: "error", message: "Error al editar el producto"})
    }

})

productsRouter.delete("/:pid", async (req, res)=>{
    try {
        const pid = req.params.pid

        const deletedProduct = await Product.findByIdAndDelete(pid)
        if(!deletedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" })

        res.status(200).json({status: "success", payload: deletedProduct})
        
    } catch (error) {
        res.status(500).json({status: "error", message: "Error al eliminar el producto"})
    }

} )


export default productsRouter
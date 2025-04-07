import express from "express";
import ProductManager from "./productManager.js"
import CartManager from "./cartManager.js";

const app = express();
app.use( express.json() )

const productManager = new ProductManager()
const cartManager = new CartManager()

//endpoints-rutas

app.get('/', (req, res)=>{
    res.send("Hola Mundo")
})

app.get('/api/products', async (req , res)=>{
    const products = await productManager.getProducts()
    res.json({ products: products, message: "lista de productos"})
} )

app.get('/api/products/:id', async (req , res)=>{
    const productId = req.params.id
    const products = await productManager.getProductById(productId)
    res.json({ products: products, message: "producto especificado"})
} )


app.delete('/api/products/:id', async (req, res)=>{ 
    const productId = req.params.id
    const products = await productManager.deleteProductById(productId)
    res.json({products: products, message: "producto eliminado"})

 })

 app.post('/api/products', async (req, res)=>{
    const newProduct = req.body
    const products = await productManager.addProduct(newProduct)
    res.json({ products: products, message: "nuevo producto creado" })

 })

 app.put('/api/products/:id', async (req, res)=>{
    const productId = req.params.id
    const updatedData = req.body
    const products = await productManager.updateProductById(productId, updatedData)
    res.json({ products: products, message: "producto actualizado" })

 })

app.post('/api/cart', async (req, res)=>{
    const newCart = req.body
    const carts = await cartManager.createCart(newCart)
    res.json({ carts: carts, message: "Carrito creado" })
})

app.post('/api/:cid/product/:pid', async (req ,res)=>{
    const cartId = req.params.cid
    const productId = req.params.pid
    const cart = await cartManager.addProductToCart(cartId, productId)
    res.json({ carts: cart, message: "objeto agregado correctamente" })

})


app.get('/api/cart', async (req , res)=>{
    const carts = await cartManager.getAllCarts()
    res.json({ carts: carts, message: "todos los carritos"})
} )

app.get('/api/cart/:cid', async (req ,res)=>{
    const cartId = req.params.cid
    const carts = await cartManager.getCartById(cartId)
    res.json({ carts: carts, message: "carrito encontrado por id" })

})


app.listen(8080, ()=>{
    console.log("servidor iniciado en puerto 8080")
} )
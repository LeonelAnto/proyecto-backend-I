import express from "express";
import ProductManager from "./productManager.js"
import CartManager from "./cartManager.js";
import { engine } from "express-handlebars"
import viewsRouter from "./routes/view.router.js";
import productsRouter from "./routes/products.router.js";
import http from 'http'
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app)

const io = new Server(server)

app.use( express.json() )
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

const productManager = new ProductManager()
const cartManager = new CartManager()

//endpoint 

app.use('/', viewsRouter)
app.use('/', viewsRouter)

app.use('/api/products', productsRouter)
//endpoints-rutas

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

app.post('/api/cart/:cid/product/:pid', async (req ,res)=>{
    const cartId = req.params.cid
    const productId = req.params.pid
    const quantity = req.body
    const cart = await cartManager.addProductToCart(cartId, productId, quantity)
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

const productos = []
//websocket-servidor
io.on('connection', (socket)=>{
    console.log("un nuevo usuario se conecto")

    socket.emit('products history', productos)


    socket.on('product', async (dataProduct)=>{
        console.log(dataProduct);
        
        const newProduct = await productManager.addProduct(dataProduct)

        io.emit('new product', dataProduct)
        
    })

    socket.on('productId', (id)=>{
        console.log(id);
        
        
    })

})



const PORT = 8080

//app.listen(PORT, ()=>{
//    console.log("servidor iniciado en puerto ", PORT)
//})

server.listen(PORT, ()=>{
    console.log("servidor iniciado en el puerto ", PORT)
})
import express from "express";
import { engine } from "express-handlebars"
import viewsRouter from "./routes/view.router.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import http from 'http'
import { Server } from "socket.io";
import connectMongoDB from "./config/db.js";
import dotenv from "dotenv";

//variables de entorno
dotenv.config()

const app = express();
const server = http.createServer(app)

const io = new Server(server)

app.use( express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')



connectMongoDB()


//endpoint 

app.use('/', viewsRouter)

app.use('/api/products', productsRouter)

app.use('/api/carts', cartRouter)

const productos = []
//websocket-servidor
io.on('connection', (socket)=>{
    console.log("un nuevo usuario se conecto")

    socket.emit('products history', productos)


    socket.on('product', async (dataProduct)=>{
        console.log(dataProduct);
        
        const newProduct = await dataProduct.save()

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
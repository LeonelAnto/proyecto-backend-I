import express from "express"
import Product from "../models/product.model.js"


const viewsRouter = express.Router()

//endpoints-rutas handlebars
viewsRouter.get('/', async (req, res) => {
    try {
        const { limit = 8, page = 1 } = req.query 
        //dejo comentada la parte del paginate debido a un error "handlebars: access has been denied to resolve the property "...", esto ocurrio cuando cambie la persistencia de archivo a la nube
        //por lo que estuve investigando y lo que me funciono fue agregar el .lean() al final sin embargo solo funciona con find() por lo que para la vista del producto individual tambien tuve ese problema de "access denied"
        //otra posible solucion es usar una version de handlebars anterior, luego de subir los cambios a github voy a cambiar la version de mi handlebars, por lo que si funciona este texto explicativo sera eliminado

        const products = await Product.find().lean()
        // const products = await Product.paginate({}, { limit, page })

        //en consecuencia del mismo error el console log muestra que solamente se mandan 8 productos, sin embargo debido a que no puede acceder a la informacion debido al error de "access has be denied" decide renderizar 10
        // console.log(products);
        
        
        
        res.render('home', {products})
        

    } catch (error) {
        res.status(500).json({status: "error", message: "Error al recuperar los productos"})
    }
})

viewsRouter.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        //lo mismo pasa con este endpoint, ya que el lean() no funciona con otro que no sea find() handlebars tira el error de "access has been denied"
        //usando find() y #each en handlebars se ve que este endpoint funciona
        // si luego de cambiar la version de handlebars se soluciona el problema este mensaje sera eliminado
        const product = await Product.findById(pid).lean()
        console.log(product);
        

        res.render('product', {product})

    } catch (error) {
        res.status(500).json({status: "error", message: "Error al encontrar el producto"})
    }

})

viewsRouter.get('/realtimeproducts', async (req, res)=>{
try {
    const products = await Product.find().lean()
    res.render("realTimeProducts", { products })
    
} catch (error) {
    res.status(500).json({status: "error", message: "Error al recuperar los productos"})
}
})
    

export default viewsRouter
import { log } from 'console';
import fs from 'fs'

class CartManager{

    constructor(){
        this.path = './src/cart.json'
    } 


// cuando intento usar .lenght tira undefined
    generateId = (products)=>{
        console.log(products.lenght)
        if(products.lenght > 0) {
            return products[products.lenght - 1].id + 1;
        } else {
            return 1;
        }
    }

    createCart = async(newCart)=>{
            const cartJson= await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(cartJson)
            const id = this.generateId(carts)
            carts.push({ id, ...newCart })
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
    
            return carts
        }

    getAllCarts = async()=>{
            const cartJson= await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(cartJson);
            return carts
        }    

    getCartById = async (cartId)=>{
        const cartJson= await fs.promises.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartJson);
        const cart = carts.find((cartData)=>cartData.id == cartId)
        return cart

    } 


    addProductToCart = async (cid, pid)=>{
        const cartJson= await fs.promises.readFile(this.path, 'utf-8')
        const carts = JSON.parse(cartJson);
        const productId = pid
        const cart = carts.find((cartData)=>cartData.id == cid)

        //investigue por mi cuenta pero no encontre manera de acceder a quantity ni productId dentro de products por lo que estos dos valores de momento dan null
        const quantity = cart.products.quantity
        const idProductInCart = cart.products.productId
        
        //por lo mismo que explique de quantity y productId este if siempre tiende al else, para corroborar que el if funciona recomiendo hardcodear la igualdad
        if(idProductInCart == pid){

        const index = carts.findIndex(product => product.id == productId )
        const quantitycounter = quantity + 1
        cart.products[index] = { quantity: quantitycounter }
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')

        } else {
            cart.products.push({productId, quantity})
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
        }
        
        
        return cart

    }




}

export default CartManager
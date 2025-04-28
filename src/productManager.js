import fs from 'fs'

class ProductManager{

    constructor(){
        this.path = './src/products.json'
    } 

    // cuando intento usar .lenght tira undefined
    generateId = (products)=>{
        if(products.length > 0) {
            return products[products.length - 1].id + 1;
        } else {
            return 1;
        }
    }

    getProducts = async()=>{
        const productJson= await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(productJson);
        return products
    }

    // checkear funcionalidad

    getProductById = async (productId)=>{
        const productJson= await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(productJson);
        const product = products.find((productData)=> productData.id == productId )
        return product

    }

    addProduct = async(newProduct)=>{
        const productJson= await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(productJson);
        const id = this.generateId(products)
        products.push({ id, ...newProduct })
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8')

        return products
    }

    updateProductById = async (productId, updatedData)=>{
        const productJson= await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(productJson);
        const index = products.findIndex(product => product.id == productId )
        products[index] = { ...products[index], ...updatedData }
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8')

        return products

    }

    deleteProductById = async (productId)=>{
        const productJson= await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(productJson);
        const productFilter = products.filter((productData)=> productData.id != productId )
        await fs.promises.writeFile(this.path, JSON.stringify(productFilter, null, 2), 'utf-8')
        return productFilter

    }


}

export default ProductManager
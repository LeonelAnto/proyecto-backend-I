
//websocket-cliente
const socket = io()


const main = ()=>{
   
    //form crear producto

    const formCreateProduct = document.getElementById('formCreateProduct') 
    const inputTitle = document.getElementById('inputTitle')
    const deleteButton = document.getElementById('delete')

    deleteButton.addEventListener('click', (event)=>{
        event.preventDefault()
        console.log("holahola");
        

        socket.emit('productId', "hola")
    } )

    formCreateProduct.addEventListener('submit', (event)=>{
        event.preventDefault()

        const title = inputTitle.value
        const description = inputDescription.value
        const code = inputCode.value
        const price =  parseInt (inputPrice.value)
        const status = inputStatus.value
        const stock = parseInt (inputStock.value)
        const category = inputCategory.value
        const thumbnail = "/img/" + inputFile.value


        socket.emit('product', { title, description, code, price, status, stock, category, thumbnail })

    })

    socket.on('new product', (newProduct)=>{
        const productCard = document.getElementById('productCard')
        productCard.innerHTML += `<h2>${newProduct.title}</h2> <h3>${newProduct.description}</h3> <p>${newProduct.price}</p> <button id="delete">Eliminar</button>`
    })

    socket.on('products history', (productos)=>{
        const productCard = document.getElementById('productCard')
        productos.forEach((dataProduct)=>{
            productCard.innerHTML += `<h2>${dataProduct.title}</h2> <h3>${dataProduct.description}</h3> <p>${dataProduct.price}</p> <button id="delete">Eliminar</button>`
        })
    })

}

main()
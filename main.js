const fs = require('fs');

class ProductManager{
    constructor(path){
        this.path = path
    }

    // obtener los productos del archivo si es que existen 
    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const info = await fs.promises.readFile(this.path,'utf-8')
                return JSON.parse(info)
            }else{
                return []
            }
        } catch (error) {
            return(error)
        }
    }

    // crear los productos recibiendo un objeto
    async createProduct(obj){
        try {
            // traemos todo el arreglo con los productos
            const products = await this.getProducts()
            // generamos el id auto incrementable
            let id
            if(!products.length){
                id = 1
            }else{
                id = products[products.length-1].id+1
            }
            // pusheamos el id mas todo el contendio del obj
            products.push({id,...obj})
            // escribimos el archivo con los datos
            await fs.promises.writeFile(this.path,JSON.stringify(products))
        } catch (error) {
            return error
        }
    }

    // traer un prodcuto por ID
    async getProductById(productId){
        try {
            // traemos todo el arreglo con los productos
            const products = await this.getProducts()
            const productoBuscado = products.find(p=>p.id === productId)
            if(productoBuscado){
                return productoBuscado
            }else{
                return 'el producto solicitado no existe'
            }
        } catch (error) {
            return error
        }
    }

    // eliminar un producto por ID
    async deleteProduct(productId){
        try {
            // traemos todo el arreglo con los productos
            const products = await this.getProducts()
            const newArrayProducts = products.filter(p=>p.id!==productId)
            // sobre escribimos el archivo con los datos exepto el que coincide con el solicitado en el filtrado y asi se elimina el producto del array
            await fs.promises.writeFile(this.path,JSON.stringify(newArrayProducts))

        } catch (error) {
            return error
        }
    }

    async updateProduct(productId, updateValue){
        try{
            // Buscar el producto a actualizar por su ID
            let product = await this.getProductById(productId);
        
            product = { ...product, ...updateValue, id: productId};

            //traemos todos los productos nuevamente
            const products = await this.getProducts();
    
            // buscamos el index(posicionamiento) del producto en el arreglo
            const productIndex = products.findIndex(p => p.id === productId);    
    
            // Creamos un nuevo array con el producto actualizado
            const productoNuevo = products.map((prod, index) => {
                // verificamos que sea el producto correcto
                if (index === productIndex) {
                    return product;
                } else {                    
                    return prod;
                }
            });
    
            // Sobreescribimos el archivo con el producto modificado
            await fs.promises.writeFile(this.path, JSON.stringify(productoNuevo));
    
        }catch (error) {
            return error;
        }
     
    }
}

const product1 = {
    name:'coca-cola',
    description: 'bevida',
    price: 600,
    thumbnail:'img-coca' ,
    code: '|| || |||',
    stock: 100
}

const product2 = {
    name: 'sprite',
    description: 'bevida',
    price: 600,
    thumbnail: 'img-sprite',
    code: '||| || |',
    stock: 100
}

const product3 = {
    name: 'fanta',
    description: 'bevida',
    price: 600,
    thumbnail: 'img-fanta',
    code: '||| ||| |||',
    stock: 100
}

const product4 = {
    name: 'coca-zero',
    description: 'bevida',
    price: 600,
    thumbnail: 'img-cocaz',
    code: '| | ||',
    stock:100
}
const product5 = {
    name: 'coca-life',
    description: 'bevida',
    price: 600,
    thumbnail: 'img-cocalf',
    code: '|||| || ||',
    stock:100
}

const manager = new ProductManager('Productos.json')

// hacemos una funcion asyncronica para poder manejar el CreateProcut

async function creandoProductos(){
    await manager.createProduct(product1)
    await manager.createProduct(product2)
    await manager.createProduct(product3)
    await manager.createProduct(product4)
    await manager.createProduct(product5)

}

async function mostrarProdutos(){
    // mostramos los productos que se contienen en el archivo
    const productos = await manager.getProducts()
    console.log(productos);
}


async function traerProducto(){
    const prodcuto = await manager.getProductById(5)
    console.log(prodcuto);
}

async function borrarProducto(){
    // eliminamos el producto con ID:3
    await manager.deleteProduct(3)

    // traemos nuevamente el arreglocon los objetos para corroborar su eliminacion
    const productos = await manager.getProducts()
    console.log(productos);

}

async function actualizarProducto(){
    // llamamos al metodo de la clase le pasamos los parametros y dentro del segundo parametro que es el Update value le anviamos {keyAModificar: NewValue}
    await manager.updateProduct(5,{price: 450})

    // traemos  el prducto para corroborar su actualizacion
    const prodcuto = await manager.getProductById(5)
    console.log(prodcuto);
}

/*-------- llamamos a las funciones para ejecutar el bloque de codigo --------*/

/* --------------------------------------- IMPORTANTE --------------------------------------- */

// DESCOMENTAR DE A UNA FUNCION Y CORRER EL PROGRAMA
// PASOS A SEGUIR
// 1 descomentar creandoProductos() correr programa y luego volver a comentar la funcion
// 2 descomentar mostrarProdutos() correr programa y luego volver a comentar la funcion
// 3 descomentar traerProducto() correr programa y luego volver a comentar la funcion
// 4 descomentar borrarProducto() correr programa y luego volver a comentar la funcion
// 5 descomentar actualizarProducto() correr programa y luego volver a comentar la funcion
// 5.1 descomentar mostrarProdutos() LINEA:225 correr programa y luego volver a comentar la funcion

/*------------------------------------------------------------------------------------------- */


// creando productos ...
// creandoProductos()

// mostrando productos contenidos en el JSON
// mostrarProdutos()

//obteniendo producto solicitado ...
// traerProducto()

//eliminando producto indicado...
// borrarProducto()

// actualizando el producto solicitado
// actualizarProducto()

// mostrarProdutos()
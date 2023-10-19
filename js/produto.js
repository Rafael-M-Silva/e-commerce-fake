// Maneira que eu fiz
/* const url = window.location.search
const parametro = url.replace('?id=', '') */

// Maneira correta
const urlParams = new URLSearchParams(window.location.search);
const params = urlParams.get('id');

const API = `https://fakestoreapi.com/products/${params}`

fetch(API)
.then((res)=> res.json())
.then(data => {
    displayProduct(data)
})

const displayProduct = (data)=> {
    const products = document.querySelector('.products')
    const { title, price, image, description } = data
    const productDiv = document.createElement('div')
    productDiv.classList.add('product-solo')
    
        productDiv.innerHTML = `
            <img src="${image}" alt="">
            <div class='sobre'>
                <div>
                <h1 class="id-produto">${title}</h1>
                <p class='description'>${description}</p> 
                <span>R$${price}</span>
                </div>
                <button>Comprar</button>
            </div>
        `
        products.appendChild(productDiv)
        
    ;
}
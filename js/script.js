const API = `https://fakestoreapi.com/products`

fetch(API)
.then((res)=> res.json())
.then(data => {
    displayProduct(data)
})

const displayProduct = (data)=> {
    const products = document.querySelector('.products')
    
    data.forEach((data) => {
        const { title, price, image } = data
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        
        productDiv.innerHTML = `
            <img src="${image}" alt="">
            <p>${title}</p>
            <span>R$${price}</span>
            <div class="btn">
            <button>Comprar</button>
            <button class='btn-produto'>Ver mais</button>
        `
        products.appendChild(productDiv)
    });
}

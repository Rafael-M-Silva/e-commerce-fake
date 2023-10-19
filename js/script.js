const API = `https://fakestoreapi.com/products`

fetch(API)
.then((res)=> res.json())
.then(data => {
    displayProduct(data)
})

const displayProduct = (data)=> {
    const products = document.querySelector('.products')
    
    data.forEach((data) => {
        const { title, price, image, id } = data
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        
        productDiv.innerHTML = `
            <img src="${image}" alt="">
            <p class="id-produto" id=${id}>${title}</p>
            <span>R$${price}</span>
            <div class="btn">
            <button>Comprar</button>
            <button class='btn-produto'>Ver mais</button>
        `
        products.appendChild(productDiv)
        const btnViewMore = document.querySelectorAll('.btn-produto')
        for(var i = 0; i < btnViewMore.length; i++) {
            btnViewMore[i].addEventListener('click', viewMore)
        }        
    });
}

const viewMore = (event) => {
    const product = event.target.parentElement.parentElement
    const productId = product.querySelector('.id-produto')
    console.log(productId.id);

    window.location.href = `./produto.html?id=${productId.id}`
}

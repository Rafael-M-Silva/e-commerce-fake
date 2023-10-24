const home = () => {
    document.querySelector('.products').innerHTML = ''
    document.querySelector('.title h1').innerHTML = `PRODUCTS`
    let API = `https://fakestoreapi.com/products`

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
    
}
home()

const viewMore = (event) => {
    const product = event.target.parentElement.parentElement
    const productId = product.querySelector('.id-produto')

    window.location.href = `./produto.html?id=${productId.id}`
}

const buscarCategoria = (event) => {
    let categorie = event.target.innerHTML
    let linkCategorie = `/category/${categorie}`
    document.querySelector('.title h1').innerHTML = `${categorie}`

    const API = `https://fakestoreapi.com/products${linkCategorie}`
    
    fetch(API)
    .then((res)=> res.json())
    .then(data => {
        displayProduct(data)
    })

const displayProduct = (data)=> {
    document.querySelector('.products').innerHTML = ''
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
}

const btnCategories = document.querySelectorAll('nav ul li a')
for(var i = 0; i < btnCategories.length; i++) {
    btnCategories[i].addEventListener('click', buscarCategoria)
}

const voltarHome = document.querySelector('.home')
voltarHome.addEventListener('click', home)















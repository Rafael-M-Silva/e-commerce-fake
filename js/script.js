let productParameter = '';

const eCommerceApi = () => {
  let api = `https://fakestoreapi.com/products${productParameter}`;
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      displayProduct(data);
    });
}
eCommerceApi()

const displayProduct = (data) => {
  const products = document.querySelector('.products');
  products.innerHTML = '';

  if (Array.isArray(data)) {
    data.forEach(data => {
      const { title, price, id, image } = data;
      const product = document.createElement('div');
      product.classList.add('product');

      product.innerHTML = `
        <img src="${image}" alt="">
        <p class="id-produto" id=${id}>${title}</p>
        <span>R$${price}</span>
        <div class="btn">
          <button>Comprar</button>
          <button class='btn-produto'>Ver mais</button>
        </div>
      `;
      products.appendChild(product);
    });

    const btnsVerMais = document.querySelectorAll('.btn-produto');
    btnsVerMais.forEach((btnVerMais) => {
      btnVerMais.addEventListener('click', getProductId);
    });
    
  } else {
    const { title, price, id, image } = data;
    const product = document.createElement('div');
    product.classList.add('product');

    product.innerHTML = `
      <img src="${image}" alt="">
      <p class="id-produto" id=${id}>${title}</p>
      <span>R$${price}</span>
      <div class="btn">
        <button>Comprar</button>
      </div>
    `;
    products.appendChild(product);
  }
}

const getProductId = (event) => {
  const product = event.target.closest('.product')
  const productId = product.querySelector('.id-produto').id

  productParameter = `/${productId}`
  eCommerceApi()
}

const getCategory = (event) => {
  const btn = event.target;
  const category = btn.innerHTML;
  document.querySelector('.title h1').innerHTML = `${category}`

  productParameter = `/category/${category}`;
  eCommerceApi();
}

const returnHome = () => {
  document.querySelector('.title h1').innerHTML = 'products'
  productParameter = ''
  eCommerceApi()
}

const categorys = document.querySelectorAll('header nav ul li a');
categorys.forEach((category) => {
  category.addEventListener('click', getCategory);
});

const logoTitle = document.querySelector('.logo-title')
logoTitle.addEventListener('click', returnHome)
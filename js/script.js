let productParameter = '';
let subTotal = 0

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
          <button class='comprar-item'>Comprar</button>
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
        <button class='comprar-item'>Comprar</button>
      </div>
    `;
    products.appendChild(product);
  }
  const btnsPurchase = document.querySelectorAll('.comprar-item')
  btnsPurchase.forEach((btnPurchase) => {
    btnPurchase.addEventListener('click', addCardBag)
  })
}

const addCardBag = (event) => {
  const btnProduct = event.target
  const productInfo = btnProduct.closest('.product')
  const productImage = productInfo.querySelector('img').src
  const productTitle = productInfo.querySelector('.id-produto').innerHTML
  const productPrice = productInfo.querySelector('span').innerHTML.replace('R$','')

  const productsCard = document.querySelector('.products-card')
  const product = document.createElement('div')
  product.classList.add('card')

  product.innerHTML = `
    <div class='lixeira'>
      <img src='./assets/lixeira.svg'>
    </div>
   <div class='produto-info'>
    <img src="${productImage}" alt="">
    <h3>${productTitle}</h3>
    <form>
      <input type="number" name="number" id="number" placeholder="qtd" value="1">
    </form>
    <p class='price'>R$ ${productPrice}</p>
   </div>
  `
  
  productsCard.appendChild(product)
  
  subTotal += parseFloat(productPrice)
  product.querySelector('.lixeira').addEventListener('click', removeProductBag)
  attSubTotal()
}

const attSubTotal = () => {
  document.querySelector('.summary p span').innerHTML = `R$ ${subTotal.toFixed(2).replace('.',',').replace('-','')}`
}

const removeProductBag = (event) => {
  event.target.closest('.card').remove()
  const card = event.target.closest('.card')
  const price = card.querySelector('.produto-info .price').innerHTML.replace('R$', '')
  
  subTotal -= price
  attSubTotal()
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

const openModalCheckOut = () => {
  const modal = document.querySelector('.modal-check')
  modal.classList.add('open')
}

const closedModal = () => {
  const modal = document.querySelector('.modal-check')
  modal.classList.remove('open')
}

const finalizarPedido = () => {
  if(subTotal == 0) {
    alert('Nenhum item no carrinho!')
    return
  }

  alert(`
  Compra Finaliza com sucesso!
 ______________________________ 
  Estado:
  Endereço:
  Rua:
 ______________________________
 Valor total: ${subTotal}
=================================
Volte sempre ;)
  `)

  window.location.href = './pedidofinalizado.html'
}

const categorys = document.querySelectorAll('header nav ul li a');
categorys.forEach((category) => {
  category.addEventListener('click', getCategory);
});

const logoTitle = document.querySelector('.logo-title')
logoTitle.addEventListener('click', returnHome)

const sacola = document.querySelector('.sacola')
sacola.addEventListener('click', openModalCheckOut)

const fecharSacola = document.querySelector('.closed')
fecharSacola.addEventListener('click', closedModal)

const botaoFinalizarCompra = document.querySelector('.summary button')
botaoFinalizarCompra.addEventListener('click', finalizarPedido)
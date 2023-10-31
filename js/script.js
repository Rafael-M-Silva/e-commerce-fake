const products = document.querySelector(".products");
const navbar = document.querySelector("header nav");
let productParameter = "";
let subTotal = 0;

const dadosCliente = {
  bairro: "",
  logradouro: "",
  localidade: "",
};

const viaCep = async () => {
  const cepInput = document.querySelector("#cep");
  const apiCep = cepInput.value;

  try {
    let response = await fetch(`https://viacep.com.br/ws/${apiCep}/json/`);
    let data = await response.json();
    pegarDadoCliente(data);
  } catch {
    document.querySelector(".dados-cep").innerHTML = `Cep Invalido`;
  }
};

const pegarDadoCliente = (data) => {
  const { bairro, logradouro, localidade } = data;
  dadosCliente.bairro = bairro;
  dadosCliente.logradouro = logradouro;
  dadosCliente.localidade = localidade;

  document.querySelector(".dados-cep").innerHTML = `
  <p><b>Bairro:</b> ${dadosCliente.bairro}</p>
  <p><b>Logradouro:</b> ${dadosCliente.logradouro}</p>
  <p><b>Localidade:</b> ${dadosCliente.localidade}</p>
  `;
};

const btnBuscarCep = document.querySelector(".buscar-cep");
btnBuscarCep.addEventListener("click", () => {
  viaCep();
});

const eCommerceApi = async () => {
  products.innerHTML = `<img src = './img/loading.gif'>`;
  const response = await fetch(
    `https://fakestoreapi.com/products${productParameter}`
  );
  const data = await response.json();
  displayProduct(data);
};
eCommerceApi();

const displayProduct = (data) => {
  products.innerHTML = "";

  if (Array.isArray(data)) {
    data.forEach((data) => {
      const { title, price, id, image } = data;
      const product = document.createElement("div");
      product.classList.add("product");

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

    const btnsVerMais = document.querySelectorAll(".btn-produto");
    btnsVerMais.forEach((btnVerMais) => {
      btnVerMais.addEventListener("click", getProductId);
    });
  } else {
    const { title, price, id, image, description } = data;
    const product = document.createElement("div");
    product.classList.add("product", "product-solo");

    product.innerHTML = `
      <img src="${image}" alt="">
      <h2 class="id-produto" id=${id}>${title}</h2>
      <i>${description}</i>
      <span>R$${price}</span>
      <div class="btn">
        <button class='comprar-item'>Comprar</button>
      </div>
    `;
    products.appendChild(product);
  }
  const btnsPurchase = document.querySelectorAll(".comprar-item");
  btnsPurchase.forEach((btnPurchase) => {
    btnPurchase.addEventListener("click", addCardBag);
  });
};

const attTotalShopping = () => {
  let total = 0;
  const priceProduct = document.querySelectorAll(".card .produto-info .price");
  for (var i = 0; i < priceProduct.length; i++) {
    const price = priceProduct[i].innerHTML.replace("R$", "");
    const qtd =
      priceProduct[i].parentElement.querySelector("form #number").value;

    total += price * qtd;
    subTotal = total;
  }

  document.querySelector(".summary span").innerHTML = `R$ ${total.toFixed(2)}`;
};

const addCardBag = (event) => {
  const btnProduct = event.target;
  const productInfo = btnProduct.closest(".product");
  const productImage = productInfo.querySelector("img").src;
  const productTitle = productInfo.querySelector(".id-produto").innerHTML;
  const productPrice = productInfo
    .querySelector("span")
    .innerHTML.replace("R$", "");

  const nameProducts = document.querySelectorAll(".card .produto-info h3");
  for (var i = 0; i < nameProducts.length; i++) {
    if (nameProducts[i].innerHTML === productTitle) {
      nameProducts[i].parentElement.parentElement.querySelector(
        ".card .produto-info form #number"
      ).value++;
      attTotalShopping();
      addPopUp();
      return;
    }
  }

  const productsCard = document.querySelector(".products-card");
  const product = document.createElement("div");
  product.classList.add("card");

  product.innerHTML = `
    <div class='lixeira'>
      <img src='./assets/lixeira.svg'>
    </div>
   <div class='produto-info'>
    <img src="${productImage}" alt="">
    <h3>${productTitle}</h3>
    <form>
      <input type="number" name="number" id="number" placeholder="qtd" value="1" min="1">
    </form>
    <p class='price'>R$ ${productPrice}</p>
   </div>
  `;
  productsCard.appendChild(product);

  product.querySelector(".lixeira").addEventListener("click", removeProductBag);
  product
    .querySelector(".produto-info form #number")
    .addEventListener("change", attTotalShopping);

  addPopUp();
  attTotalShopping();
};

const addPopUp = () => {
  const popUpDiv = document.querySelector(".pop-up");
  const popUp = document.createElement("p");

  popUp.innerHTML = `Item adicionado com sucesso!`;

  popUpDiv.appendChild(popUp);

  setInterval(() => {
    popUp.remove();
  }, 1000);
};

const removeProductBag = (event) => {
  event.target.closest(".card").remove();
  subTotal = 0;
  attTotalShopping();
};

const getProductId = (event) => {
  const product = event.target.closest(".product");
  const productId = product.querySelector(".id-produto").id;

  productParameter = `/${productId}`;
  eCommerceApi();
};

const getCategory = (event) => {
  const btn = event.target;
  const category = btn.innerHTML;
  document.querySelector(".title h1").innerHTML = `${category}`;

  productParameter = `/category/${category}`;
  navbar.classList.remove("menu-on");
  menu.classList.remove('menu-closed')
  eCommerceApi();
};

const returnHome = () => {
  document.querySelector(".title h1").innerHTML = "products";
  productParameter = "";
  eCommerceApi();
};

const openModalCheckOut = () => {
  const modal = document.querySelector(".modal-check");
  modal.classList.add("open");
};

const closedModal = () => {
  const modal = document.querySelector(".modal-check");
  modal.classList.remove("open");
};

const finalizarPedido = () => {
  if (subTotal == 0) {
    alert("Nenhum item no carrinho!");
  } else if (dadosCliente.bairro.length == 0) {
    alert("preencha o campo Cep");
  } else {
    alert(`
    Compra Finaliza com sucesso!
   ______________________________ 
    Estado: ${dadosCliente.localidade}
    Bairro: ${dadosCliente.bairro}
    Rua: ${dadosCliente.logradouro}
   ______________________________
   Valor total: ${subTotal.toFixed(2)}
  =================================
  Volte sempre ;)
    `);

    window.location.href = "./pedidofinalizado.html";
  }
};

const dropDownMenu = () => {
  navbar.classList.toggle("menu-on");
  menu.classList.toggle('menu-closed')
};

const categorys = document.querySelectorAll("header nav ul li a");
categorys.forEach((category) => {
  category.addEventListener("click", getCategory);
});

const logoTitle = document.querySelector(".logo-title");
logoTitle.addEventListener("click", returnHome);

const sacola = document.querySelector(".sacola");
sacola.addEventListener("click", openModalCheckOut);

const fecharSacola = document.querySelector(".closed");
fecharSacola.addEventListener("click", closedModal);

const botaoFinalizarCompra = document.querySelector(".summary button");
botaoFinalizarCompra.addEventListener("click", finalizarPedido);

const menu = document.querySelector(".menu");
menu.addEventListener("click", dropDownMenu);

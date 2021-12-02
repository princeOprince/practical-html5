function addDnDHandlers() {
  const coffeeImages = document.getElementsByClassName('productarticlewide');
  const shoppingCartDropZone = document.getElementById('shoppingcart');
  const shoppingcart = document.querySelector('#shoppingcart ul');

  class Coffee {
    constructor(id, price) {
      this.coffeeId = id;
      this.price = price;
    }
  }

  for (let i = 0; i < coffeeImages.length; i++) {
    coffeeImages[i].addEventListener('dragstart', function(event) {
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData('text', this.getAttribute('id'));
    });
  }

  class Cart {
    coffees = [];
  }
  
  let currentCart = null;
  currentCart = JSON.parse(localStorage.getItem('cart'));
  if (!currentCart)
    createEmptyCart();
  updateShoppingCartUI();

  function createEmptyCart() {
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(new Cart()));
    currentCart = JSON.parse(localStorage.getItem('cart'));
  }

  function updateShoppingCartUI() {
    shoppingcart.innerHTML = "";
    for (let i = 0; i < currentCart.coffees.length; i++) {
      const liElement = document.createElement('li');
      liElement.textContent = currentCart.coffees[i].coffeeId + " " + currentCart.coffees[i].price;
      shoppingcart.appendChild(liElement);
    }
  }

  currentCart.addCoffee = (coffee) => {
    currentCart.coffees.push(coffee);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  shoppingCartDropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  });

  shoppingCartDropZone.addEventListener('drop', (event) => {
    const coffeeId = event.dataTransfer.getData('text');
    const element = document.getElementById(coffeeId);
    addCoffeeToShoppingCart(element, coffeeId);
  });

  function addCoffeeToShoppingCart(item, id) {
    const price = item.dataset.price;
    const coffee = new Coffee(id, price);
    currentCart.addCoffee(coffee);
    updateShoppingCartUI();
  }
}
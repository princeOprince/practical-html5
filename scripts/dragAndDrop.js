function addDnDHandlers() {
  const coffeeImages = document.getElementsByClassName('productarticlewide');
  const shoppingCartDropZone = document.getElementById('shoppingcart');
  const shoppingcart = document.querySelectorAll('#shoppingcart ul')[0];

  for (let i = 0; i < coffeeImages.length; i++) {
    coffeeImages[i].addEventListener('dragstart', function(event) {
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData('text', this.getAttribute('id'));
    });
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
    const html = id + " " + item.dataset.price;
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    shoppingcart.appendChild(liElement);
  }
}
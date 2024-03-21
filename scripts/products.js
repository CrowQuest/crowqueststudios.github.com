function getProductData(productID) {
  var products = {
    DropHunter: {
      name: 'Drop Hunter',
      image: './img/DropHunter.png',
      description: 'Drop Hunter is an exciting 2D adventure game where you become an intrepid hunter facing monsters that descend from the sky. Your mission: collect items and weapons to improve your skills and increase your chances of survival. In this exciting challenge, every drop is an opportunity to get stronger and face the dangers that lurk from above. Get ready for an action-packed, adrenaline-pumping experience as you blast your way through hordes of enemies in Drop Hunter!',
      url:'DropHunter.html'
    },
    RandomDuels: {
      name: 'Random Duels',
      image: './img/RandomDuels.png',
      description: 'Random Duels is an exciting dueling code game between the player and the machine. The player has six bullets just like the machine, the objective is to defeat the opponent by shooting him before running out of bullets or being defeated.',
      url:'RandomDuels.html'
    }
  };

  return products[productID];
}

function openProductPanel(productID) {
  var panel = document.getElementById('productPanel');
  var productContent = document.getElementById('productContent');
  var productData = getProductData(productID);

  productContent.innerHTML = `
    <h2>${productData.name}</h2>
    <img src="${productData.image}" alt="${productData.name}">
    <p>Description: ${productData.description}</p>
    <a href="${productData.url}" target="_blank">Play</a>
  `;

  panel.style.display = 'block';
}

function closeProductPanel() {
  var panel = document.getElementById('productPanel');
  panel.style.display = 'none';
}

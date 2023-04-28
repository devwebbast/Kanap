const UrlApi = 'http://localhost:3000/api/products'
fetch(UrlApi)
  .then(response => response.json())
  .then(canape => {
    for (let i = 0; i < canape.length; i++){
      document.querySelector('#items').innerHTML += `<a href="./product.html?id=${canape[i]._id}">
      <article>
        <img src="${canape[i].imageUrl}" alt="${canape[i].altTxt}">
        <h3 class="productName">${canape[i].name}</h3>
        <p class="productDescription">${canape[i].description}</p>
      </article>
    </a>`
    }
  })
  .catch((e) => {
    console.log('Erreur de connexion avec le serveur : ', e)
    window.alert('Connexion serveur impossible')
  })



/* RECUPERATION DE l'ID DU PRODUIT DE LA PAGE COURANTE */
const urlParams = new URLSearchParams(document.location.href);
const id = urlParams.get('id');


async function getProduct(id) {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const product = await response.json();
    return product;
  }


async function main(){
    const url_string = document.location.href  // Récupération de l'URL de la page courante
    const url = new URL(url_string)
    const id = url.searchParams.get('id')
    const product = await getProduct(id);

    // AJOUT DES INFORMATION DES PRODUITS
    // Ajout de l'image 
    const productImage = document.createElement('img')
    productImage.setAttribute('src', product.imageUrl)
    productImage.setAttribute('alt', product.altTxt)
    document.querySelector('.item__img').appendChild(productImage)

    // PRIX - TITRE - DESCRIPTION 
    document.querySelector("#price").innerHTML = product.price
    document.querySelector('#title').textContent = product.name
    document.querySelector('#description').textContent = product.description
  
    // COULEURS OPTIONS 
    let options = ''
    for (let j = 0; j < product.colors.length; j++){
      options = options + `<option value="${product.colors[j]}">${product.colors[j]}</option>`
    }
    document.querySelector("#colors").innerHTML = options


    // Récupération des données sélectionnées par l'utilisateur et envoi au panier

    // Affichage du contenu du panier 
    const btnAddToCart = document.querySelector('#addToCart')
    btnAddToCart.addEventListener("click", () => {
      const addProductCart =  {
        id : id,
        quantity : document.querySelector("#quantity").value,
        color : document.querySelector("#colors").value
      }

      //---------------------------------- LOCAL STORAGE ----------------------------------
      // produit enregistré dans le localstorage
      let productToLocalStorage = JSON.parse(localStorage.getItem("productCart")) // converti les donnés au format JSON dans le localstorage en oject JS
      console.log(productToLocalStorage)

      // Popup pour indiqué qu'un élément a été ajouté au panier 
      const validateCart = () => {
        if (window.confirm(`${product.name} a bien été ajouté au panier
Allez au panier OK ou continuez vos achats ANNULER`)){
          window.location.href = "cart.html"
        }else{
          window.location.href = "index.html"
        }
      }

      // si il y a déjà des produit dans le local storage
      if(productToLocalStorage){
        productToLocalStorage.push(addProductCart)
        localStorage.setItem("productCart", JSON.stringify(productToLocalStorage))
        validateCart()
      }
      // si il n'y a pas de produit dans le localStorage
      else{
        productToLocalStorage = []
        productToLocalStorage.push(addProductCart)
        localStorage.setItem("productCart", JSON.stringify(productToLocalStorage))
        validateCart

      }
      })
  
  }
  
  main()
     






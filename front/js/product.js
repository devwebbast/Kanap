
/* RECUPERATION DE l'ID DU PRODUIT DE LA PAGE COURANTE */
const urlParams = new URLSearchParams(document.location.href);
const id = urlParams.get('id');


async function getProduct(id) {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const product = await response.json();
    return product;
  }


async function main(){
    const url_string = document.location.href  /* Récupération de l'URL de la page courante */
    const url = new URL(url_string)
    const id = url.searchParams.get('id')
    const product = await getProduct(id);
    // console.log(product)

    // AJOUT DES INFORMATION DES PRODUITS
    /* Ajout de l'image */
    const productImage = document.createElement('img')
    productImage.setAttribute('src', product.imageUrl)
    productImage.setAttribute('alt', product.altTxt)
    document.querySelector('.item__img').appendChild(productImage)

    /* PRIX - TITRE - DESCRIPTION */
    document.querySelector("#price").textContent = product.price
    document.querySelector('#title').textContent = product.name
    document.querySelector('#description').textContent = product.description
  
    /** COULEURS OPTIONS */
    let options = ''
    for (let i = 0; i < product.colors.length; i++){
      options = options + `<option value="${product.colors[i]}">${product.colors[i]}</option>`
    }
    document.querySelector("#colors").innerHTML = options

    
    
    
    
    
    
    // /* Produit AJOUTE AU PANIER */
    const addToCartEvent = document.querySelector('#addToCart')
    addToCartEvent.addEventListener('click',  () =>{
      alert('Produits ajoutés au panier')
    })
    

    /**Affichage du panier */
    const addToCart = document.querySelector('#addToCart')
    addToCart.addEventListener("click", () => {
      const addProduct =  {
        name : id,
        quantity : document.querySelector("#quantity").value,
        color : document.querySelector("#colors").value
      }


      /* LOCAL STORAGE A REVOIR -- PAS DE SAUVEGARDE POUR LE MOMENT */

      itemStorage = []
      if (localStorage.getItem("addToCart") ==null){
        itemStorage = JSON.parse(localStorage.getItem("addToCart"))
        itemStorage.push(addToCart)
        localStorage.setItem('addToCart', JSON.stringify(addToCart))
      }else{
        itemStorage.push(addProduct)
        localStorage.setItem('addToCart', JSON.stringify(itemStorage))
      }
    })
  }
  
  main()
     






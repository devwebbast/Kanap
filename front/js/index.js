
async function getCanapes(){
  const response = await fetch ('http://localhost:3000/api/products')
  const canapes = await response.json()
  return canapes
}

async function main (){
  const canapes = await getCanapes()
  console.log(canapes)
  const html = getHtmlListOfCanapes(canapes)
  document.querySelector('#items').innerHTML = html
}

function getHtmlListOfCanapes(listOfCanapes){
  let htmlList = ''
  for (let i = 0; i < listOfCanapes.length; i++){
    const canape = listOfCanapes[i]
    htmlList = htmlList + `<a href="./product.html?id=${canape._id}">
    <article>
      <img src="${canape.imageUrl}" alt="${canape.altTxt}">
      <h3 class="productName">${canape.name}</h3>
      <p class="productDescription">${canape.description}</p>
      <p class="price">${canape.price}</p>
    </article>
  </a>`
  }
return htmlList
}
main()



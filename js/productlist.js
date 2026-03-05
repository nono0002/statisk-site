const category = new URLSearchParams(window.location.search).get("category");
const heading = document.querySelector(".kategori_titel");
const container = document.querySelector(".produkt_liste");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}&limit=60`;

heading.textContent = category;

let allData = [];

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    showData(allData);
  });

// show produkter
function showData(products) {
  let markup = "";

  products.forEach((product) => {
    markup += `
      <article class="produkt_kort ${product.soldout ? "udsolgt" : ""}">
        
        ${product.discount ? `<span class="badge">Tilbud</span>` : ""}
        ${product.soldout ? `<span class="badge">Udsolgt</span>` : ""}

        <a class="produkt_link" href="productdetails.html?id=${product.id}">
          <img class="produkt_billede"
               src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
               alt="${product.productdisplayname}">
          <h2 class="produkt_navn">${product.productdisplayname}</h2>
        </a>

        <p class="produkt_brand">Brand: ${product.brandname}</p>

        ${
          product.discount
            ? `<p class="produkt_pris">
                <span class="gammel_pris">${product.price} kr</span>
                <span class="ny_pris">${Math.round(
                  product.price - (product.price * product.discount) / 100,
                )} kr</span>
              </p>
              <p class="rabat_procent">${product.discount}%</p>`
            : `<p class="produkt_pris">Pris: ${product.price} kr</p>`
        }
      </article>
    `;
  });

  container.innerHTML = markup;
}

// filter knapper
document
  .querySelectorAll(".filterbutton")
  .forEach((btn) => btn.addEventListener("click", filter));

function filter(e) {
  const valgt = e.target.textContent;

  if (valgt === "All") {
    showData(allData);
  } else {
    const filtered = allData.filter((p) => p.gender === valgt);
    showData(filtered);
  }
}

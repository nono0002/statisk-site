const category = new URLSearchParams(window.location.search).get("category");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}&limit=100`;
document.querySelector(".kategori_titel").textContent = category;

const container = document.querySelector(".produkt_liste");

let allData;
let currentData;

document
  .querySelectorAll(".filterbutton")
  .forEach((knap) => knap.addEventListener("click", filter));

document
  .querySelectorAll(".sortbutton")
  .forEach((knap) => knap.addEventListener("click", sorter));

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      allData = data;
      currentData = [...data]; // kopi af array
      showData(currentData);
    });
}

function filter(e) {
  const valgt = e.target.textContent;

  if (valgt === "All") {
    currentData = [...allData];
  } else {
    currentData = allData.filter((element) => element.gender == valgt);
  }

  showData(currentData);
}

function sorter(event) {
  let sorted = [...currentData]; // kopi før sort

  if (event.target.dataset.price) {
    const dir = event.target.dataset.price;

    if (dir == "asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else {
      sorted.sort((a, b) => b.price - a.price);
    }
  } else {
    const dir = event.target.dataset.text;

    if (dir == "az") {
      sorted.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      sorted.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }

  currentData = sorted;
  showData(currentData);
}

function showData(products) {
  let markup = "";

  products.forEach((product) => {
    markup += `
      <a href="produkt.html?id=${product.id}">
        <article class="produkt-pic ${product.soldout && "soldout"} ${product.discount && "sale"}">
          
          <div class="soldout">
            <img
              class="product-image"
              src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
              alt=""
            />

            ${
              product.soldout
                ? `<div class="sold-out-badge">Sold out</div>`
                : ""
            }
          </div>

          <h3>${product.productdisplayname}</h3>

          <p class="subtitle">
            ${product.articletype} | ${product.brandname}
          </p>

          <p class="price">
            DDK ${product.price},-
          </p>

          ${
            product.discount
              ? `<p class="sale">
                  Nu DDK ${Math.round(
                    product.price - (product.price * product.discount) / 100,
                  )},-
                </p>`
              : ""
          }

          ${
            product.discount ? `<p class="bgsale">${product.discount}%</p>` : ""
          }

        </article>
      </a>
    `;
  });

  container.innerHTML = markup;
}

getData();

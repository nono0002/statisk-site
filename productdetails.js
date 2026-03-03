const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

fetch(endpoint)
  .then((res) => res.json())
  .then((product) => {
    document.querySelector(".produkt_stort_billede").src =
      `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

    document.querySelector(".produkt_navn").textContent =
      product.productdisplayname;

    document.querySelector(".produkt_brand").textContent =
      `Brand: ${product.brandname}`;

    document.querySelector(".ny_pris").textContent = `${product.price} kr`;
  });

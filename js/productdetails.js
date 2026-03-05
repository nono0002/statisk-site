const id = new URLSearchParams(window.location.search).get("id");
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

    document.querySelector(".lagerstatus").textContent = product.soldout
      ? "Lagerstatus: Udsolgt"
      : "Lagerstatus: På lager";

    const oldPrice = document.querySelector(".gammel_pris");
    const newPrice = document.querySelector(".ny_pris");

    if (product.discount) {
      oldPrice.textContent = `${product.price} kr`;
      newPrice.textContent = `${Math.round(
        product.price - (product.price * product.discount) / 100,
      )} kr`;
    } else {
      oldPrice.textContent = "";
      newPrice.textContent = `${product.price} kr`;
    }
  });

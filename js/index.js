const container = document.querySelector(".kategori_liste");
const endpoint = "https://kea-alt-del.dk/t7/api/categories";

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    let markup = "";

    data.forEach((item) => {
      markup += `
        <a class="kategori_kort" href="productlist.html?category=${item.category}">
          ${item.category}
        </a>
      `;
    });

    container.innerHTML = markup;
  });

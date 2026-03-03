const endpoint = "https://kea-alt-del.dk/t7/api/categories";
const container = document.querySelector(".kategori_liste");

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData)
    .catch((err) => console.error("Fejl i categories fetch:", err));
}

function showData(data) {
  let markup = "";
  data.forEach((item) => {
    const cat = item.category;
    markup += `<a class="kategori_link" href="productlist.html?category=${encodeURIComponent(
      cat,
    )}">${cat}</a>`;
  });
  container.innerHTML = markup;
}

getData();

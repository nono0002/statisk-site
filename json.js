const endpoint = "https://kea-alt-del.dk/t7/api/categories";

const container = document.querySelector("#kategori_liste");

function getData() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then(showData);
}

function showData(data) {
  console.log(data);
  data.forEach((respons) => {
    container.innerHTML += `<a href="productlist.html">${respons.category}</a>`;
  });
}

getData();

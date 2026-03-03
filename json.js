const endpoint = "https://kea-alt-del.dk/t7/api/categories";

const container = document.querySelector(".kategori_liste");

function getData() {
  fetch(endpoint)
    .then((respons) => respons.json())
    .then(showData);
}

function showData(data) {
  console.log(data);
  let markup = "";
  data.forEach((respons) => {
    markup += `<a href="productlist.html">${respons.category}</a>`;
  });
  container.innerHTML = markup;
}

// function showData(json) {
//   console.log(json);
//   container.innerHTML;
// }

getData();

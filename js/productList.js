document.addEventListener("DOMContentLoaded", () => {
    let allProducts = [];

    async function fetchProducts() {
        const response = await axios.get("https://fakestoreapi.com/products");
        allProducts = response.data;
        console.log(allProducts);
        populateProducts(allProducts);
    }

    function populateProducts(products) {
        const productList = document.getElementById("productList");
        productList.innerHTML = ""; // Clear previous products
        products.forEach(product => {
            const productItem = document.createElement("a");
            productItem.target = "_blank";
            productItem.classList.add("product-item", "text-decoration-none", "d-inline-block");
            productItem.href = "productDetails.html";

            const productImage = document.createElement("div");
            const productName = document.createElement("div");
            const productPrice = document.createElement("div");

            productImage.classList.add("product-img");
            productName.classList.add("product-name", "text-center");
            productPrice.classList.add("product-price", "text-center");

            productName.textContent = product.title.substring(0, 12) + "...";
            productPrice.innerHTML = `&#8377; ${product.price}`;

            const imageInsideProductImage = document.createElement("img");
            imageInsideProductImage.src = product.image;

            // Append image to productImage div
            productImage.appendChild(imageInsideProductImage);

            // Append divs to productItem
            productItem.appendChild(productImage);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);

            productList.appendChild(productItem);
        });
    }

    fetchProducts();

    const filterSearch = document.getElementById("Search");
    filterSearch.addEventListener("click", () => {
        const minPrice = Number(document.getElementById("minPrice").value);
        const maxPrice = Number(document.getElementById("maxPrice").value);

        const filteredProducts = allProducts.filter(product => {
            return product.price >= minPrice && product.price <= maxPrice;
        });

        populateProducts(filteredProducts);
    });

    const resetFilter = document.getElementById("clear");
    resetFilter.addEventListener("click", () => {
        document.getElementById("minPrice").value = '';
        document.getElementById("maxPrice").value = '';
        populateProducts(allProducts);
    });
});

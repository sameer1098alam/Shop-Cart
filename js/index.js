console.log("index js loaded successfully");
async function fetchcategories(){

    //this function is marked as async because it is going to return a promise
    const response = await fetch('http://fakestoreapi.com/products/categories');
    const data = await response.json();
    return data;


}
async function populateCategories(){
    const categories=await fetchcategories();
    const categoryList=document.getElementById('categoryList');
    categories.forEach(category=>{
    const categoryHolder=document.createElement("div");
    const categoryLink=document.createElement("a");
    categoryLink.href="#";
    categoryLink.textContent=category;//setting the text content of the anchor tag
    categoryHolder.classList.add("category-item","d-flex","justify-content-center","align-items-center");
    categoryHolder.appendChild(categoryLink);
    categoryList.appendChild(categoryHolder);



    });

}
populateCategories();
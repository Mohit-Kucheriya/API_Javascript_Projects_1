let ACCESS_KEY_ = "KoQea8nqeuEx4TjnBa3R4JrGPRFZ0tyKnCRKqpqADXA";

const form = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imageContainer = document.querySelector(".image-container");
const addMoreBtn = document.querySelector(".addMoreBtn");

let page = 1;

// Function to fetch the images from Unsplash API
// here 2nd parameter is to load images from 2nd and more page
const fetchImages = async (query, pageNo) => {
    try {
        if (pageNo === 1) {
            imageContainer.innerHTML = "";
        }
        console.log(query);
        let URL = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${ACCESS_KEY_}`;

        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);

        if (data.results.length > 0) {
            data.results.forEach((photo) => {
                // created a new Div to add the image
                const imageDiv = document.createElement("div");
                imageDiv.classList.add("imgBox");
                imageDiv.innerHTML = `<img src="${photo.urls.regular}" >`;

                // Create overlayBox
                const overlayDiv = document.createElement("div");
                overlayDiv.classList.add("overlayBox");
                imageDiv.appendChild(overlayDiv);

                imageContainer.appendChild(imageDiv);
            });

            if (data.total_pages === pageNo) {
                addMoreBtn.style.display = "none";
            } else {
                addMoreBtn.style.display = "block";
            }
        } else {
            imageContainer.innerHTML = `<h2>Sorry no images found.</h2>`;
        }
    } catch (error) {
        imageContainer.innerHTML = `<h2>Failed to fetch the images. Please try again later,</h2>`;
    }
};

// Adding Listeners
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInputText = searchInput.value.trim();
    if (searchInputText !== "") {
        page = 1;
        fetchImages(searchInputText, page);
    } else {
        imageContainer.innerHTML = `<h2>Please enter a Valid query.</h2>`;
    }
});

// Adding eventListeners to addMoreBtn to load more images
addMoreBtn.addEventListener("click", () => {
    const searchInputText = searchInput.value.trim();
    fetchImages(searchInputText, ++page);
});

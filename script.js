const searchParam = location.search.split('=').pop();


 const access_key = "r-FJi44zZ7Me3dKmyKIfwk8iS14P8XHqmvXTNW52D4A";

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`;

const gallary = document.querySelector(".gallary");

let currentImage = 0;
let allImages; //this will store all the images

const getImages = () => {
  fetch(random_photo_url)
    .then((res) => res.json())
    .then((data) => {
        allImages = data;
        makeImages(allImages);
    });
};

//search result fetching here and showing to user
const searchImage = () => {
    fetch(search_photo_url)
      .then((res) => res.json())
      .then((data) => {
          allImages = data.results;
          makeImages(allImages);
      });
  };




const makeImages = (data) =>{
    data.forEach((item,index) => {
        // console.log(item);

        //make image element to pass all images and show it to user
        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = 'gallary_img';

        //appending the images to gallary
        gallary.appendChild(img);


        //popup image after clicking on image
        img.addEventListener('click',()=>{
            currentImage = index;
            showPopup(item);
        })
    });
}


const showPopup = (item) =>{
    let popup = document.querySelector('.image_popup');
    const downloadBtn = document.querySelector('.download_btn');
    const closeBtn = document.querySelector('.close_btn');
    const image = document.querySelector('.popup_img');

    popup.classList.remove('hide');
    downloadBtn.href = item.links.html;
    image.src = item.urls.regular;


    closeBtn.addEventListener('click',()=>{
        popup.classList.add('hide');
    });
}

// getImages();

if(searchParam == ''){
    getImages();
}else{
    searchImage();
}

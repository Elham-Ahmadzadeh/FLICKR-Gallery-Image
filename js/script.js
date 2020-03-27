
  
  
  
  //  ImageLinks for slide show

let imageLink = [],
 time = 5000, //slide changes every 5 seconds 

    i = 0;

   
/* 6 slide shows images from unsplash.com */
    
    imageLink [0] =
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

    imageLink [1] =
      "https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80";

    imageLink [2] =
      "https://images.unsplash.com/photo-1521938739809-0f40f1cfd90c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80";

    imageLink [3] =
      "https://images.unsplash.com/photo-1570229609952-b0de2a0b45bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

    imageLink [4] =
      "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80";

    imageLink [5] =
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1023&q=80";

    imageLink [6] =
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80";
 
      //change image
 let changeImg = function() {
   
   document.slideShow.src = imageLink[i];

   //check if index is under max
   if (i < imageLink.length - 1) {

     //add one
     i++;

   } else {

     //reset
     i = 0;

   }

   setTimeout("changeImg()", time);
 }; 

    // run function when page loads
    window.onload = changeImg 

//selecting the HTML tags LIke search input and search button

    let searchKey = document.querySelector('.search2');  /* GO BUTTON */

    const searchInput = document.getElementById("search-input");

    const searchBtn = document.getElementById("search-btn");
    
    /* search button expands and closes while the user clicks */

    const expand = () => {

      searchBtn.classList.toggle("close");

      searchInput.classList.toggle("square");
     
    
    };  

    searchBtn.addEventListener("click", expand); 


/* AT THE BEGINING OF THE FLICKR */

searchKey.addEventListener('click',async () => {  ///firing the go button 

 let text = document.querySelector('#search-input').value;   //search input

//get images
 let data = await getImages(text);

 //upadeUI
 updateUi(data)


})



//API ADDRESS

async function getImages(text){

  const baseUrl = 'https://api.flickr.com/services/rest';

  const apiKey = '19d3e6e0acfe9c438f368e2c2bab1c5d';

  const method = 'flickr.photos.search';

  let max = 40; /* max 40 images on one page  if you want to add number of images you can add in url */ 

  let url =`${baseUrl}?api_key=${apiKey}&per_page=${max}&method=${method}&text=${text}&format=json&nojsoncallback=1`;

  let resp = await fetch(url);

  let data = await resp.json();

  return data.photos;
 
}

//update UI
function updateUi(data) {
  //clear photos
  document.querySelector('#photos').innerHTML = ''; //not to makes it empty everytime

  data.photo.forEach(img => {

   let elem = document.createElement('img');

   elem.setAttribute('src',  imgUrl(img, 'q'));

   elem.addEventListener('click', () => {

    enlarge(img);

   });

   document.querySelector('#photos').appendChild(elem);
  
  });

 const images = document.querySelectorAll('img');


 images.forEach(image => {


   image.addEventListener('click', e => {

     lightBox.classList.add('active')

     const img = document.createElement('img')

     img.src = image.src  //it is important to write scr

     lightBox.appendChild(img)

    });

 });

}



//ELARGE  O MEANS ORIGINAL SIZE

function enLarge(img) {

  imgUrl(img, 'o')

}



//construct image 

function imgUrl(img, size) {

  return `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${size}.jpg`;

}

///creating article with lightbox ID

const lightBox = document.createElement('article')

lightBox.id = 'lightBox';

document.body.appendChild(lightBox);  
    
  


const lightbox = document.createElement('article');

lightbox.id = 'lightbox';

document.body.appendChild(lightbox);


    

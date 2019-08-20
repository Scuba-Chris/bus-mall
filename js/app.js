
'use strict';

var pictures = [];
var choosen = [];
var randomImages = [];
var previous = [];

function ProductPicture( name, url ){
  this.name = name;
  this.src = url;
  this.timesChosen = [];
  this.timesShown = [];
  pictures.push(this);
}

new ProductPicture('bag', '/assets/bag.jpg');
new ProductPicture('banana', '/assets/banana.jpg');
new ProductPicture('bathroom','/assets/bathroom.jpg');
new ProductPicture('boots','/assets/boots.jpg');
new ProductPicture('breakfast','/assets/breakfast.jpg');
new ProductPicture('bubblegum','/bubblegum.jpg');
new ProductPicture('chair','/assets/chair.jpg');
new ProductPicture('cthulhu', '/assets/cthulhu.jpg');
new ProductPicture('dog_duck','/assets/dog-duck.jpg');
new ProductPicture('dragon','/assets/dragon.jpg');
new ProductPicture('pen', '/assets/pen.jpg');
new ProductPicture('pet_sweep','/assets/pet-sweep.jpg');
new ProductPicture('scissors','/assets/scissors.jpg');
new ProductPicture('shark','/assets/shark.jpg');
new ProductPicture('sweep','/assets/sweep.png');
new ProductPicture('tauntaun','/assets/tauntaun.jpg');
new ProductPicture('unicorn','/assets/unicorn.jpg');
new ProductPicture('usb','/assets/usb.gif');
new ProductPicture('water_can','/assets/water-can.jpg');
new ProductPicture('wine_glass','/assets/wine-glass.jpg');

// chosing random cards

function choosingRandom(){ 
  
  for (var i = 0; i < 3; ){
    var randomIndex = Math.floor((Math.random() * 20 ));
    if (randomImages.includes(randomIndex) && !previous.includes(randomIndex)){
      randomImages.push(randomIndex);
      randomIndex[i].push(previous);
      // while(randomImages.length < 3){


      // }
    }
  }
}
choosingRandom();

console.log("Current Random Images: " +randomImages);
console.log("Previous " +previous);

// function populateRandomImages() {
//   for ( var i = 0; i < randomImages.length; i++){
//   console.log(pictures[i]);
// }
// }
// populateRandomImages();


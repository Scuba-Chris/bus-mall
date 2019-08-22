'use strict';

var container = document.getElementById('image-container');
var pictures = [];
var thisSet = {};
var previousSet = {};
var picked = 0;

function ProductPicture( name, url ){
  this.name = name;
  this.src = url;
  this.timesChosen = 0;
  this.timesShown = 0;
  pictures.push(this);
}



new ProductPicture('bag', '/assets/bag.jpg');
new ProductPicture('banana', '/assets/banana.jpg');
new ProductPicture('bathroom','/assets/bathroom.jpg');
new ProductPicture('boots','/assets/boots.jpg');
new ProductPicture('breakfast','/assets/breakfast.jpg');
new ProductPicture('bubblegum','/assets/bubblegum.jpg');
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

function setLocalDataBackUp(){
  var getData = localStorage.getItem('data');
  var backToObject = JSON.parse(getData);

  for( var i = 0; i < backToObject.length; i++){
    pictures[i].timesChosen += backToObject[i];
  }

}
setLocalDataBackUp();


//adds to timesSeen count
ProductPicture.prototype.updateViews = function(){
  this.timesShown++;
};

//adds to timesChoosen count
ProductPicture.prototype.updateChosen = function(){
  this.timesChosen++;
};

//sets up all of the img containers and creates an img tag for them in the DOM
//pulled the pics from the assets folder
function setupImageContainer(){
  container.innerHTML = '';
  for(var i = 0; i < 3 ;i++){
    var currentPicture = getRandomUniqueImage();
    var img = document.createElement('img');
    img.alt = currentPicture.name;
    img.src = currentPicture.src;
    container.appendChild(img);
  }
}

//creates the event listener to run other functions
function setupListener(){
  container.addEventListener('click', clickHandler);
}

function removeListener(){
  container.removeEventListener('click', clickHandler);
}

//uses the event to know what img has been 'click'ed on and increases the number in the updateChoosen object
function clickHandler(event){
  console.log(event.target);
  var imageName = event.target.alt;
  for( var i = 0; i < pictures.length; i++){
    if(pictures[i].name === imageName){
      pictures[i].updateChosen();
      picked++;
    }
  }

  if( picked === 25 ){
    removeListener();
    chartData();
    showResults();
    var dataAsString = JSON.stringify(pictureData);
    localStorage.setItem('data', dataAsString);
    var nameAsString = JSON.stringify(labels);
    localStorage.setItem('pictures', nameAsString);
  }

  previousSet = thisSet;
  thisSet = {};
  setupImageContainer();
}

function getRandomUniqueImage(){
  var found = false;

  while(!found){
    var n = Math.floor(Math.random() * pictures.length);
    if (!thisSet[n] && !previousSet[n]){
      found = pictures[n];
      pictures[n].updateViews();
      thisSet[n] = true;
    }
  }

  return found;
}


setupImageContainer(3);
setupListener();
getRandomUniqueImage();

var pictureData = [];
var labels = [];
var backgroundColor = [];

function chartData(){
  for( var i = 0; i < pictures.length; i++){
    pictureData.push(pictures[i].timesChosen);
    labels.push(pictures[i].name);
    backgroundColor.push('#0000FF');
  }

}



function showResults(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'product Votes',
        data: pictureData,
        backgroundColor: backgroundColor

        ,
        borderColor: [ '#0000FF',

        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}





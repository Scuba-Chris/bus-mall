'use strict';

var container = document.getElementById('image-container');
var pictures = [];
var thisSet = {};
var previousSet = {};
var picked = 0;

function ProductPicture( name, url ){
  this.name = name;
  this.src = url;
  this.timesChoosen = 0;
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


//adds to timesSeen count
ProductPicture.prototype.updateViews = function(){
  this.timesShown++;
};

//adds to timesChoosen count
ProductPicture.prototype.updateChoosen = function(){
  this.timesChoosen++;
};

//sets up all of the img containers and creates an img tag for them in the DOM
//pulled the pics from the assets folder
function setupImageContainer(){
  container.innerHTML = '';
  for(var i = 0; i < 3 ;i++){
    var currentPicture = getRandomUniqueImage();
    var img = document.createElement('img');
    img.id = currentPicture.name;
    img.src = currentPicture.src;
    container.appendChild(img);
  }
}

//creates the event listener to run other functions
function setupListener(){
  container.addEventListener('click', clickHandler);
}

//uses the event to know what img has been 'click'ed on and increases the number in the updateChoosen object
function clickHandler(event){
  console.log(event.target);
  var imageName = event.target.id;
  for( var i = 0; i < pictures.length; i++){
    if(pictures[i].name === imageName){
      pictures[i].updateChoosen();
      picked++;
    }
  }

  if( picked === 25 ){
    showResults();
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
  console.log(thisSet);
  console.log(previousSet);
  return found;
}


setupImageContainer(3);
setupListener();
getRandomUniqueImage();

function showResults(){
  container.removeEventListener('click', clickHandler);
 
  var ctx = document.getElementById('myChart').getContext('2d');
  container.appendChild(myChart);
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pictures.name,
      datasets: [{
        label: 'product Votes',
        data: pictures.timesChoosen,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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




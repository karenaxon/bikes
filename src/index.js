import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeInterface from './js/bikeInterface.js';
import ManufacturerService from './js/manufacturer-service.js';

let percentManuList;
let manus = [];
let location;
function getElements(response) {
  if (response.bikes) {
    $('#output').append(`<h3 class="resultsHead">The stolen bikes in ${location}: </h3>`);

    response.bikes.forEach(function(bike){
      manus.push(bike.manufacturer_name);
    });

    let index =0;
    response.bikes.forEach(function(bike) {
      $('#output').append(`<div class="result" id="${index}"></div>`);
      $(`#${index}`).append(`<p>Bike title: ${bike.title}</p>`);
      $(`#${index}`).append(`<p>Bike manufacturer is ${bike.manufacturer_name}</p>`);
      $(`#${index}`).append(`<p>Bike colors: ${bike.frame_colors.join(", ")}</p>`);
      index++;
    });

  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(location) {
  const response = await BikeInterface.getBikes(location);
  getElements(response);
}

$(document).ready(function(){
  $("#formOne").submit(function(event){
    event.preventDefault();
    location = $('#location').val();
    makeApiCall(location);
  });
  $('#findStatistics').on("click", function(){
    if(manus){
      percentManuList=ManufacturerService.findPercentage(manus);
      Object.keys(percentManuList).forEach(function(key){
        // let a = typeof percentManuList[key];
        // alert(a);
        let string= key+": "+((percentManuList[key])*10)+"%";
        $("#stats").append(`<p>${string}</p>`);
      });
    }
  });
});


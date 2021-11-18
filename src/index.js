import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeInterface from './js/bikeInterface.js';
import ManufacturerService from './js/manufacturer-service.js';

let percentManuList;
let manus;
let location;
function getElements(response) {
  if (response.bikes) {
    manus = [];
    $(".resultsHead").text(`The stolen bikes in ${location}:`);
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
  let response = await BikeInterface.getBikes(location);
  getElements(response);
}

$(document).ready(function(){
  $("#formOne").submit(function(event){
    event.preventDefault();
    $("#output").empty();
    $("#stats").hide();
    $(".statsHead").hide();
  
    location = $('#location').val();
    $("#location").val("");
    makeApiCall(location);
  });
  
  $('#findStatistics').on("click", function(){
    $("#stats").empty();
    $("#stats").show();
    $(".statsHead").hide();
    if(manus){
      percentManuList={};
      percentManuList=ManufacturerService.findPercentage(manus);
      $(".statsHead").text("The stats on manufacturers: ");
      $(".statsHead").show();
      Object.keys(percentManuList).forEach(function(key){
      let string= key+": "+((percentManuList[key])*10)+"%";
      $("#stats").append(`<p>${string}</p>`);
      });
    }
  });
});


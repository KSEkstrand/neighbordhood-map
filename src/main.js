import * as ko from 'knockout';
import * as kop from './knockout-projections.js';
import {MapLocationModel} from './viewmodels/MapLocationModel.js';
import * as $ from 'jquery';
import * as toastr from 'toastr';
import './../node_modules/toastr/build/toastr.css';
import './content/app.css';


//util function to help push data to an array
var pushData = function(data){
  var mapData = [];
  $.each(data.responseJSON, function(index,value){
    var singleMapData = new MapLocationModel(value, index);
    mapData.push(singleMapData);
  });
  return mapData;
};

function SideNavViewModel(){
  var self = this;
  self.mapData = ko.observableArray([]);
  self.mapFilter = ko.observable();
  self.greatestIndex = ko.observable();
  self.filterMapData = self.mapData.filter(function(mapData){
    var regEx = new RegExp(self.mapFilter());

    //this will always iterate over all items, and we only want to call clearMarkers once
    if(mapData.id === "mapId" + 0){
      clearMarkers();
    }
    if(!self.mapFilter() || regEx.exec(mapData.business_name.toLowerCase())){
      addMarker(mapData);
      if(mapData.id === "mapId" + self.greatestIndex){
        renderMap();
      }
      return true;
    }
  });


  //fetch location data on initial page load
  $(document).ready(function() {
    var data = $.getJSON('https://data.muni.org/resource/mdfi-bspc.json', function(data){
    })
    .done(function(){
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr.success("","Successful GET of muni data");
      self.mapData(pushData(data));
      self.greatestIndex = data.length;
    })
    .fail(function(jqXHR, status, error){
      console.log('fail');
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
      toastr.error(error, "Error calling Muni Data");
    });
  });
}

ko.applyBindings(new SideNavViewModel());

$(document).ready(function() {
  $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });
});

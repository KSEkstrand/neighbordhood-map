import * as ko from 'knockout';
import * as kop from './knockout-projections.js';
import {MapLocationModel} from './viewmodels/MapLocationModel.js';
import * as $ from 'jquery';
import * as toastr from 'toastr';
import './../node_modules/toastr/build/toastr.css';
import './content/app.css';

(function(){
  $.ajaxSetup({ cache:false });
})();

//util function to help push data to an array
var pushData = function(data){
  var mapData = [];
  var indexDropper = 0;
  $.each(data.responseJSON, function(index,value){

    //drop the index by x value if a location will be omitted
    if(!value.location){
      indexDropper++;
    }

    //remove anything without a location tag
    if(value.location){
      var singleMapData = new MapLocationModel(value, index-indexDropper);
      addMarker(singleMapData);
      mapData.push(singleMapData);
    }
  });
  return mapData;
};

function SideNavViewModel(){
  var self = this;
  self.mapData = ko.observableArray([]);
  self.mapFilter = ko.observable();
  self.greatestIndex = ko.observable();
  var filterCap = 0;
  self.filterMapData = self.mapData.filter(function(singleMapData){
    var regEx = new RegExp(self.mapFilter());

    //this will always iterate over all items, and we only want to call clearMarkers once
    if(singleMapData.id === 0){
      clearMarkers();
    }
    //limit to filter cap amount - 50 seems like enough.
    //User should use filter options to filter the side bar
    if(filterCap < 50){
      if(!self.mapFilter() || regEx.exec(singleMapData.business_name.toLowerCase())){
        filterCap++;
        showMarker(singleMapData.id);
        return true;
      }
    }
    if(singleMapData.id === self.mapData().length-1){
      //reset filter cap after all values have been filtered
      filterCap = 0;
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

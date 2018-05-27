import * as ko from 'knockout';
import {MapLocationViewModel} from './viewmodels/MapLocationViewModel.js';
import './content/app.css';
import * as $ from 'jquery';

function AppViewModel() {
    this.firstName = ko.observable("Bert");
    this.lastName = ko.observable("Bertington");
    // this.mapLocationViewModel = new MapLocationViewModel();

    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

//handle sidebar collapse
$(document).ready(function() {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

//fetch location data
$(document).ready(function() {
  var data = $.getJSON('https://data.muni.org/resource/mdfi-bspc.json', function(data){
    var abcd = [];
    console.log("asdf");
    $.each(data, function(count){
      // console.log(data[count]);
      abcd.push(new MapLocationViewModel(data[count]));
      if(count<2)
      console.log(new MapLocationViewModel(data[count]));
    });
  });
});

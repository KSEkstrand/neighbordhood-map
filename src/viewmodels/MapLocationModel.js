import {LocationViewModel} from './LocationViewModel.js';
import * as ko from 'knockout';
import * as $ from 'jquery';

//Since I already have external API access to anchorage muni data, yelp data is a nice to have
//Leave this unused for now
 function buildYelpReviewData(phone){
  var url = 'https://api.yelp.com/v3/businesses/search/phone?phone=' + '+1' + phone;
  var data = $.getJSON(url, function(data){})
  .done(function(){
    var reviewUrl = 'https://api.yelp.com/v3/businesses/' + data.id;
    var reviewData = $.getJSON(url, function(innerData){})
    .done(function(){
      return innerData.rating;
    })
    .fail(function(){

    });
  })
  .fail(function(){

  });
}

var buildInfoWindowText = function(data){
  var dateSubstring = data.inspection_date.substring(0,data.inspection_date.lastIndexOf('T'));
  var violationDescription = "";
  if(data.violation_description)  {
    violationDescription = '<p> Violation(s): ' + data.violation_description + '</p>';
  }

  // var yelpReview = "No Yelp Review";
  // if(data.business_phone_number){
  //   yelpReview = buildYelpReviewData(data.business_phone_number);
  // }
  var infoWindow =
  '<div class="infoWindow">' +
  '<p><b>'+ data.business_name +'</b></p>' +
  '<p> Inspection Type: ' + data.inspection_type + '</p>' +
  '<p> Inspection Date: ' + dateSubstring + '</p>' +
  violationDescription +
  '<p> Business Address:<br>' + data.business_address + ', '+  data.location_city + ' ' + data.location_state +'</p>' +
  // '<p> Yelp Score: ' + yelpReview +
  '</div>';
  return infoWindow;
};

var buildInspectionDate = function(date){

  return substring;
};

function MapLocationModel(data,index) {
    this.business_address = data.business_address;
    this.business_id = data.business_id;
    this.business_name = data.business_name;
    this.business_phone_number = data.business_phone_number;
    this.business_postal_code = data.business_postal_code;
    this.business_state = data.business_state;
    this.inspection_date = data.inspection_date;
    this.inspection_type = data.inspection_type;
    this.location = new LocationViewModel(data.location);
    this.location_address = data.location_address;
    this.location_city = data.location_city;
    this.location_state = data.location_state;
    this.location_zip = data.location_zip;
    this.violation_description = data.violation_description;
    this.id = index;
    this.infoWindow = buildInfoWindowText(data);
    this.selectMapMarker = function(){
      google.maps.event.trigger(markers[this.id], 'click');
    };
}

export { MapLocationModel };

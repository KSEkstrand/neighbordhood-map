import {LocationViewModel} from './LocationViewModel.js';
import * as ko from 'knockout';
import * as komapper from 'knockout-mapping';

function MapLocationViewModel(data) {
    // this.business_address = data.businessAddress;
    // this.business_id = data.business_id;
    // this.business_phone_number = data.business_phone_number;
    // this.business_postal_code = data.business_postal_code;
    // this.business_state = data.business_state;
    // this.inspection_date = data.inspection_date;
    // this.inspection_type = data.inspection_type;
    // if(data.location!=='undefined' && data.location!==null){
    //   this.location = new LocationViewModel(data.location);
    // }
    // this.location_address = data.location_address;
    // this.location_city = data.location_city;
    // this.location_state = data.location_state;
    // this.location_zip = data.location_zip;
    // this.checkVisibility = ko.computed(function(){
    //
    // });
    var that = this;
    that = ko.mapping.fromJS(data);
}




export { MapLocationViewModel };

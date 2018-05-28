import {LocationViewModel} from './LocationViewModel.js';
import * as ko from 'knockout';

function MapLocationModel(data,index) {
    this.business_address = data.business_address;
    this.business_id = data.business_id;
    this.business_name = data.business_name;
    this.business_phone_number = data.business_phone_number;
    this.business_postal_code = data.business_postal_code;
    this.business_state = data.business_state;
    this.inspection_date = data.inspection_date;
    this.inspection_type = data.inspection_type;
    if(data.location){
      this.location = new LocationViewModel(data.location);
    }
    this.location_address = data.location_address;
    this.location_city = data.location_city;
    this.location_state = data.location_state;
    this.location_zip = data.location_zip;
    this.id = "mapId" + index;


}

export { MapLocationModel };

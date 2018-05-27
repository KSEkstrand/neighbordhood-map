import {LatLngViewModel} from './LatLngViewModel.js';

function LocationViewModel(data){
  if(data!==null && data!=='undefined')  {
    this.type = data.type;
    this.coordinates = data.coordinates;
  }
  else {
    this.type = null;
    this.coordinates = null;
  }
}

export { LocationViewModel };

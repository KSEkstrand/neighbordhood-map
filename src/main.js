import * as ko from 'knockout';
import {MapLocationViewModel} from './models/MapLocationModel.js';
import './content/app.css';

function AppViewModel() {
    this.firstName = ko.observable("Bert");
    this.lastName = ko.observable("Bertington");
    this.mapLocationViewModel = new MapLocationViewModel();

    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

/**
 * Interface for the Google Maps API V3
 *
 * @module simple-google-maps
 * @author tom@0x101.com
 * @see https://developers.google.com/maps/documentation/javascript/reference
 *
 * License
 * Public Domain.
 * No warranty expressed or implied. Use at your own risk.
 */

/*jslint browser: true*/
/*global google, SimpleGoogleMaps */

/**
 * @namespace SimpleGoogleMaps
 */
window.SimpleGoogleMaps = window.SimpleGoogleMaps || {};

/**
 * @author tom@0x101.com
 * @class Map
 */
SimpleGoogleMaps.Map = function(options) {

  this._map = null;
  this._geoCoder = null;

  this.DEFAULT_ZOOM = 5;
  this.DEFAULT_MAP = google.maps.MapTypeId.ROADMAP;

  // Initialize the options
  this._options = options || {};

  // Default values
  if (typeof this._options.zoom === 'undefined') {
    this._options.zoom = this.DEFAULT_ZOOM;
  }

  if (typeof this._options.mapType === 'undefined') {
    this._options.mapType = this.DEFAULT_MAP;
  }

  // If we are passing the HTMLElement, then we can
  // render directly the map
  if (typeof this._options.div !== 'undefined') {
    this.render(this._options.div);
  }

};

SimpleGoogleMaps.Map.prototype = {

  /**
   * @param {HTMLElement} element
   */
  render: function(element) {
    if (!this.hasMap()) {
      this._map = new google.maps.Map(element, {
        zoom: this._options.zoom,
        mapTypeId: this._options.mapType
      });
    }
  },

  /**
   * Centers the map based on the address.
   * @param {String} address e.g. 'Madrid'
   */
  center: function(address) {
    if (this.hasMap()) {
      var self = this;
      this.searchByAddress(address, function(location) {
        self._map.setCenter(location);
      });
    }
  },

  /**
   * It only returns the first result.
   * @param {String} address
   * @param {Function} callback
   */
  searchByAddress: function(address, callback) {
    var geocoder = this.getGeoCoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        callback(results[0].geometry.location);
      }
    });
  },

  /**
   * @return {Boolean} hasMap True if a map has been initialized.
   */
  hasMap: function() {
    return this._map !== null;
  },

  /**
   * @return {Geocoder} geocoder
   */
  getGeoCoder: function() {
    if (this._geoCoder === null) {
      this._geoCoder = new google.maps.Geocoder();
    }
    return this._geoCoder;
  },

  /**
   * @param {LatLng} position
   * @param {Boolean} visible
   * @param {String} icon
   * @return {Marker} marker
   */
  addMarker: function(position, visible, icon) {
    var marker = null;
    if (this.hasMap()) {
      visible = visible || true;

      var properties = {
        position: position,
        map: this._map,
        visible: visible
      };

      if (typeof icon !== 'undefined') {
        properties.icon = {
          path: icon,
          scale: 10
        };
      }

      marker = new google.maps.Marker(properties);
    }
    return marker;
  },

  /**
   * @param {Object} position
   * @param {String} text
   * @param {String} id
   * @return {Label} label
   */
  addLabel: function(position, text, id) {
    var label = null;
    if (this.hasMap()) {
      label = new SimpleGoogleMaps.Label({
        map: this._map,
        position: position,
        text: text,
        id: id
      });
    }
    return label;
  },

  /**
   * @param {Float} lat
   * @param {Float} lng
   * @return {LatLng} position
   */
  getPosition: function(lat, lng) {
    return new google.maps.LatLng(lat, lng);
  },

  /**
   * @return {google.maps.Map}
   */
  getGoogleMap: function() {
    return this._map;
  }
};

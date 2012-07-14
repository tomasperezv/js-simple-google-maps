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


/**
 * @author tom@0x101.com
 * @class SimpleGoogleMaps
 */
function SimpleGoogleMaps(options) {

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

}

SimpleGoogleMaps.prototype = {

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
			if (status == google.maps.GeocoderStatus.OK) {
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
	 * @return {Marker} marker
	 */
	createMarker: function(position, visible) {
		var marker = null;
		if (this.hasMap()) {
			var visible = visible || true;
			marker = new google.maps.Marker({
				position: position,
				map: this._map,
				visible: visible
			});
		}
		return marker;
	},

	/**
	 * @param {String} content
	 * @return {Label} label
	 */
	createLabel: function(content) {
		var label = null;
		if (this.hasMap()) {
			label = new Label({
				map: this._map,
				content: content
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
	 * @return {Map}
	 */
	getGoogleMap: function() {
		return this._map;
	}
};


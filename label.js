/**
 * @namespace SimpleGoogleMaps
 */
var SimpleGoogleMaps = SimpleGoogleMaps || {};

/**
 * @class Label
 * @see http://blog.mridey.com/2009/09/label-overlay-example-for-google-maps.html
 */
SimpleGoogleMaps.Label = (function() {

	var Label = function(options) {
		// Store the options and set the values
		this.options = options;
		this.setValues(this.options);
		this.div_ = _createDiv();
	};
	
	Label.prototype = new google.maps.OverlayView;

	var _createDiv = function() {
		var div = document.createElement('div');
		div.style.cssText = 'position: absolute; display: none';
		return div;
	};

	var buildContent = function(div, position, text, id) {

		var content = '<div class="infowindow"';
		if (typeof id !== 'undefined') {
			content += ' id="' + id + '"';
		}

		content += '>' + text + '</div>';

		div.style.left = position.x + 'px';
		div.style.top = position.y + 'px';
		div.style.display = 'block';
		div.innerHTML = content;
		return div;
	}
	
	/**
	 * Implement onAdd
	 */
	Label.prototype.onAdd = function() {
		var pane = this.getPanes().overlayLayer;
		pane.appendChild(this.div_);
		this.draw();
	};
	
	/**
	 * Implement onRemove
	 */
	Label.prototype.onRemove = function() {
		this.div_.parentNode.removeChild(this.div_);
	};
	
	/**
	 * Draw the label in the current overlay's position.
	 */
	Label.prototype.draw = function() {
		var projection = this.getProjection(),
			position = projection.fromLatLngToDivPixel(this.get('position'));
		this.div_ = buildContent(this.div_, position, this.options.text, this.options.id);
	};

	return Label;

})();

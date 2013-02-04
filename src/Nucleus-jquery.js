define(["Nucleus"], function (Nucleus) {

	if (typeof $.fn !== "object") {
		throw new Error("Please make sure that jQuery is loaded prior to using Nucleus-jquery");
	}

	$.fn.nucleus = function nucleus(options) {
		// Create a new nucleus
		var nucleus = new Nucleus();
		// Add the plugins
		nucleus.addAll(options);
		// For each selected element...
		this.each(function () {
			//... apply nucleus
			nucleus.apply(this);
		});
	};

	return $;

});

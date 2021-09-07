sap.ui.define([
	"sap/ui/core/mvc/Controller"

], function (Controller) {
	"use strict";

	return Controller.extend("invent.clientes.controller.BaseController", {

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		attachRoute: function (routeName, func) {
			const router = this.getRouter();

			if (!!routeName) {
				router
					.getRoute(routeName)
					.attachPatternMatched(func, this);
			} else {
				router
					.attachRouteMatched(func, this);
			}
		}

	});
});
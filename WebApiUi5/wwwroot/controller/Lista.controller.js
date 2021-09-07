sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"

], function (BaseController, History, Filter, FilterOperator, JSONModel) {
	"use strict";

	return BaseController.extend("invent.clientes.controller.Lista", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			this.attachRoute("listaName", this.aoConcidirRota);
		},

		aoConcidirRota: function () {
			fetch("api/Cliente")
				.then(response => response.json())
				.then(jsonFromServer => {
					let model = new JSONModel(jsonFromServer)
					this.getView().setModel(model, "cliente");
				});
        },

		inserirCadastroNovo: function() {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("cadastroDeCliente");
		},

		navegarParaDetalhes: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				id: oItem.getBindingContext("cliente").getObject().id
			});
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		},

		filtroDeContatos : function (oEvent) {
			let aFilter = [];
			let sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Nome", FilterOperator.Contains, sQuery));
			}
			let oList = this.byId("listaDeContatos");
			let oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onSearch : function(oEvent)
        {
            let filterTable = new Filter("Nome", sap.ui.model.FilterOperator.Contains, oEvent.getSource().getValue());
            oEvent.getSource().getParent().getParent().getBinding("items").filter(filterTable);
        },
	});
});
sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/model/json/JSONModel"

], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("invent.clientes.controller.Lista", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			this.attachRoute("listaName", this.aoConcidirRota);
		},

		aoConcidirRota: function () {
			this.exibirProgresso(x => {
				var fetchPamans = this.getFetchParamns();
				return fetch("api/Cliente", fetchPamans)
					.then(response => response.json())
					.then(jsonFromServer => {
						let model = new JSONModel(jsonFromServer)
						this.getView().setModel(model, "cliente");
						return true;
					});
			});
			this.exibirUsuarioLogado();
		},

		inserirCadastroNovo: function () {
			this.exibirProgresso(() => {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("cadastroDeCliente");
			})

		},

		navegarParaDetalhes: function (oEvent) {
			this.exibirProgresso(() => {
				var oItem = oEvent.getSource();
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("detail", {
					id: oItem.getBindingContext("cliente").getObject().id
				});
			})
		},

		onNavBack: function () {
			this.exibirProgresso(() => {

				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			})
		},

		buscarNoServidor: async function () {
			const dados = await fetch(`/api/Cliente`);
			const cliente = await dados.json();
			const oModel = new JSONModel(cliente)
			this.getView().setModel(oModel, "cliente");
		},

		buscarCliente: async function (oEvent) {

			var sQuery = oEvent.getSource().getValue();
			if (sQuery != "") {
				var fetchPamans = this.getFetchParamns();
				const dados = await fetch(`/api/Cliente/pesquizar/${sQuery}`, fetchPamans);
				const cliente = await dados.json();
				const oModel = new JSONModel(cliente)
				this.getView().setModel(oModel, "cliente");

				if (cliente.length == 0) {
					MessageToast.show("Cliente não esncontrado!");
				}
			} else {
				this.buscarNoServidor();
			}
		}
	});
});
sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Overview", {
		
		onInit: function () {
			this.attachRoute("overview", this.aoConcidirRota);
			
        },

		aoConcidirRota: function () {
			fetch("api/Cliente/numeroDeClientes")
				.then(response => response.json())
				.then(jsonFromServer => {
					let numeroDeClientes = {
						cont: jsonFromServer,
					};
					let model = new JSONModel(numeroDeClientes)
					console.log(jsonFromServer)
					console.log(numeroDeClientes)
					this.getView().setModel(model, "NumeroDeCliente");
				});
		},

		navegarParaLista : function (){
			var oRouter = this.getOwnerComponent().getRouter();
				 oRouter.navTo("listaName");
		},

		inserirCadastroNovo: function() {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("cadastroDeCliente");
		}

	});
	
});
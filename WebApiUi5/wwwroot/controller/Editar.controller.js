sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function (BaseController, History, MessageBox, JSONModel) {
	"use strict";

	return BaseController.extend("invent.clientes.controller.Editar", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			let cliente = {
			};
			this.setUserModel(cliente);
			this.attachRoute("editarCadastro", this.aoConcidirRota);
		},

		aoConcidirRota: function (rota) {
			this.exibirProgresso(x => {
				this.Id = rota.getParameter("arguments").id;
				var fetchPamans = this.getFetchParamns();
				fetch(`api/Cliente/${this.Id}`, fetchPamans)
					.then(response => response.json())
					.then(jsonFromServer => {
						let model = new JSONModel(jsonFromServer)
						this.getView().setModel(model, "cliente");
					});
			});
			this.exibirUsuarioLogado();
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

		voltarParaInicio: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("voltarParaInicio");
		},

		buscarEndereco: async function () {

			try {

				let cliente = this.getClienteModel();
				const url = `https://viacep.com.br/ws/${cliente.cep}/json/`;
				const dados = await fetch(url);
				const endereco = await dados.json();
				cliente.rua = endereco.logradouro;
				cliente.numero = endereco.gia;
				cliente.bairro = endereco.bairro;
				cliente.cidade = endereco.localidade;
				cliente.estado = endereco.uf;
				this.setClienteModel(cliente);

			} catch (error) {
				MessageBox.error(`Erro ao fazer consulta! ${error}`);
			}

		},

		aoClicarNoBotaoSalvar: function () {
			var modelDoCliente = this.getUserModel();
			var oRouter = this.getOwnerComponent().getRouter();
			var paramsDoFecth = this.getPutFetchParamns(modelDoCliente);

			fetch("api/Cliente", paramsDoFecth)
				.then(x => {
					if (x.ok) {
						return x.json();

					}
					return Promise.reject(x)
				})
				.then(x => {
					const message = `Cliente ${x.id} alterado com sucesso !!`;
					MessageBox.alert(message, {
						onClose: function () {
							oRouter.navTo("listaName", {}, true);
						}
					});
				})
				.catch(x => {
					MessageBox.error("Houve um erro " + x)
				});
		},
	});
});
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Inserir", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			let cliente = {
			};
			this.setClienteModel(cliente);
		},

		setClienteModel: function (data) {
			var oModel = new JSONModel(data);
			this.getView().setModel(oModel, "cliente");
		},

		getClienteModel: function () {
			return this.getView().getModel("cliente").getData();
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

				cliente.Rua = endereco.logradouro;
				cliente.Numero = endereco.gia;
				cliente.Bairro = endereco.bairro;
				cliente.Cidade = endereco.localidade;
				cliente.Estado = endereco.uf;
				this.setClienteModel(cliente);

			} catch (error) {
				MessageBox.error(`Erro ao fazer consulta! ${error}`);
			}
		},

		aoClicarNoBotaoSalvar: function () {
			 
			var modelDoCliente = this.verificarSeCamposEstaoVasios(this.getClienteModel());
			if (!modelDoCliente) {
				MessageBox.warning("Preencha todos os campos");
				return;
            }

			var paramsDoFecth = {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(modelDoCliente)
			}

			fetch("api/Cliente", paramsDoFecth)
				.then(x => {
					if (x.ok) {
						return x.json();

					}
					return Promise.reject(x)
				})
				.then(x => {
					const message = `Cliente ${x.id} salvo com sucesso !!`;
					var oRouter = this.getOwnerComponent().getRouter();
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

		verificarSeCamposEstaoVasios: function (ClienteModel) {
			let cliente = ClienteModel
			if (cliente.nome != undefined && cliente.CPF != undefined) {
				return cliente;
			}
			return null;

        }
	});
});
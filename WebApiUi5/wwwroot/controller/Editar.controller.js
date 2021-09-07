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
			this.setClienteModel(cliente);
			this.attachRoute("editarCadastro", this.aoConcidirRota);
		},

		setClienteModel: function (data) {
			var oModel = new JSONModel(data);
			this.getView().setModel(oModel, "cliente");
		},

		getClienteModel: function (data) {
			var oModel = new JSONModel(data);
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
			var modelDoCliente = this.getClienteModel();
			modelDoCliente.DataDeNascimento = moment(modelDoCliente.DataDeNascimento).format("YYYY-MM-DDTHH:mm:ss");
			console.log(modelDoCliente)
			var paramsDoFecth = {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'PUT',
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
					MessageBox.alert(message);
				})
				.catch(x => {
					MessageBox.error("Houve um erro " + x)
				});
		},

		aoConcidirRota: function (rota) {
			this.Id = rota.getParameter("arguments").id;
			console.log(this.Id)
			fetch(`api/Cliente/${this.Id}`)

				.then(response => response.json())
				.then(jsonFromServer => {
					let model = new JSONModel(jsonFromServer)
					this.getView().setModel(model, "cliente");
				});
		},
	});
});
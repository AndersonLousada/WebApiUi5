sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox",
], function (BaseController, History, MessageBox) {
	"use strict";

	return BaseController.extend("invent.clientes.controller.Inserir", {

		onInit: function () {
			this.exibirProgresso(() => {
				this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
				this.attachRoute("cadastroDeCliente", this.aoConcidirRota);
			})
		},

		aoConcidirRota: function () {
			let cliente = {
			};
			this.setUserModel(cliente);
			this.setCurrentUserModel();
		},

		onNavBack: function () {

			this.exibirProgresso(() => {

				var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = this.getOwnerComponent().getRouter();
					oRouter.navTo("overview", {}, true);
				}
			})
		},

		voltarParaInicio: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("voltarParaInicio");
		},

		buscarEndereco: async function () {

			try {

				let cliente = this.getUserModel();
				const url = `https://viacep.com.br/ws/${cliente.cep}/json/`;
				const dados = await fetch(url);
				const endereco = await dados.json();
				cliente.rua = endereco.logradouro;
				cliente.numero = endereco.gia;
				cliente.bairro = endereco.bairro;
				cliente.cidade = endereco.localidade;
				cliente.estado = endereco.uf;
				this.setUserModel(cliente);

			} catch (error) {
				MessageBox.error(`Erro ao fazer consulta! ${error}`);
			}

		},

		verificarCampos: function () {
			var cliente = this.getUserModel()

			if (!cliente.nome) {
				throw ("Preencha o campo nome");
			}
			if (!cliente.cpf) {
				throw ("Preencha o campo CPF");
			}
			if (!cliente.dataDeNascimento) {
				throw ("Preencha o campo Data De Nascimento");
			}
			if (!cliente.cnh) {
				throw ("Preencha o campo CNH");
			}
			if (!cliente.categoria) {
				throw ("Preencha o campo Categoria");
			}
			if (!cliente.naturalidade) {
				throw ("Preencha o campo Naturalidade");
			}
			if (!cliente.cep) {
				throw ("Preencha o campo CEP");
			}
			if (!cliente.numero) {
				throw ("Preencha o campo Numero");
			}
			if (!cliente.bairro) {
				throw new Exception("Preencha o campo Bairro");
			}
			if (!cliente.complemento) {
				throw ("Preencha o campo Complemento");
			}
			if (!cliente.cidade) {
				throw ("Preencha o campo Cidade");
			}
			if (!cliente.estado) {
				throw ("Preencha o campo Estado");
			}
			if (!cliente.telefoneCelular) {
				throw ("Preencha o campo Telefone celular");
			}
			if (!cliente.telefoneFixo) {
				throw ("Preencha o campo Telefone Fixo");
			}
			if (!cliente.email) {
				throw ("Preencha o campo Email");
			}
		},

		aoClicarNoBotaoSalvar: function () {
			this.exibirProgresso(() => {
				try {
					this.verificarCampos();
					var modelDoCliente = this.getView().getModel("cliente").getData();
					var oRouter = this.getOwnerComponent().getRouter();
					var paramsDoFecth = this.getPostFetchParamns(modelDoCliente);

					fetch("api/Cliente", paramsDoFecth)
						.then(x => {
							if (x.ok) {
								return x.json();
							}
							return Promise.reject(x)
						})

						.then(x => {
							const message = `Cliente ${x.id} salvo com sucesso !!`;
							MessageBox.alert(message, {
								onClose: function () {
									oRouter.navTo("listaName", {}, true);
								}
							});
						})
						.catch(x => {
							MessageBox.error("Preencha todos os campos. ")
						});

				} catch (e) {
					MessageBox.error(e)
				}

			});

		}
	});
});
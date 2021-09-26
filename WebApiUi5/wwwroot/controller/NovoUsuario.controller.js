sap.ui.define([
    "invent/clientes/controller/BaseController",
    "sap/ui/core/routing/History",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (BaseController, History, MessageBox, JSONModel) {
    "use strict";

    return BaseController.extend("invent.clientes.controller.NovoUsuario", {

        onInit: function () {
            this.exibirProgresso(() => {
                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
                this.attachRoute("inserirNovo", this.aoConcidirRota);
            })
        },

        aoConcidirRota: function () {
            let usuario = {
            };
            this.setLoginModel(usuario);
            this.setCurrentUserModel();
        },

        setLoginModel: function (data) {
            var oModel = new JSONModel(data);
            this.getView().setModel(oModel, "login");
        },

        getLoginModel: function () {
            return this.getView().getModel("login").getData();
        },

        navegarParaLogin: function () {
            this.exibirProgresso(() => {

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("login");

            });
        },

        verificarCampos: function () {
            var login = this.getLoginModel();

            if (!login.Nome) {
                throw ("Preencha o campo Nome");
            }
            if (!login.userName) {
                throw ("Preencha o campo Usuário");
            }
            if (!login.password) {
                throw ("Preencha o campo Senha");
            }
            if (!login.ConfirmPassword) {
                throw ("Preencha o campo Confirmar Senha");
            }
        },

        aoClicarEmSalvarNovo: function () {
            this.exibirProgresso(() => {
                try {
                    this.verificarCampos();
                    var modelDoUsuario = this.getView().getModel("login").getData();
                    var oRouter = this.getOwnerComponent().getRouter();
                    var paramsDoFecth = this.getPostFetchParamns(modelDoUsuario);

                    fetch("api/Usuario", paramsDoFecth)
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            }
                            return Promise.reject(response.json())
                        })
                        .then(data => {
                            const message = `Usuario ${data.userName} salvo com sucesso !!`;
                            MessageBox.alert(message, {
                                onClose: function () {
                                    oRouter.navTo("login", {}, true);
                                }
                            });
                        })
                        .catch(error => {
                            return error.then(data => {
                                MessageBox.error(data.message || "Erro sem descrição");
                            })
                        });
                } catch (e) {
                    MessageBox.error(e)
                }
            });
        }
    });
});
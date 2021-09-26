sap.ui.define([
    "invent/clientes/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel, MessageBox) {
    "use strict";

    return BaseController.extend("invent.clientes.controller.Login", {

        onInit: function () {
            this.exibirProgresso(() => {
                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
                this.attachRoute("login", this.aoConcidirRota);
            })
        },

        aoConcidirRota: function () {
            let login = {
            };
            this.setLoginModel(login);
        },

        setLoginModel: function (data) {
            var oModel = new JSONModel(data);
            this.getView().setModel(oModel, "login");
        },

        getLoginModel: function () {
            return this.getView().getModel("login").getData();
        },

        verificarCampos: function () {
            var login = this.getLoginModel();
            if (!login.userName) {
                throw ("Preencha o campo Usuário");
            }
            if (!login.password) {
                throw ("Preencha o campo Senha");
            }
        },

        aoClicarEmNovoCadastro: function () {
            this.exibirProgresso(() => {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("inserirNovo");
            });
        },

        navegarParaFaleConosco: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("faleConosco");

        },

        aoClicarNoLogin: function () {
            try {
                this.exibirProgresso(async () => {

                    var modelDoLogin = this.getLoginModel();
                    var oRouter = this.getOwnerComponent().getRouter();
                    this.verificarCampos();

                    var paramsDoFecth = {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(modelDoLogin)
                    }
                    var oRouter = this.getOwnerComponent().getRouter();
                    fetch("api/Login", paramsDoFecth)
                        .then(function (response) {
                            if (response.ok) {
                                return response.json();
                            }
                            throw new Error("Error ")
                        })
                        .then(data => {
                            this.setToken(data)
                            oRouter.navTo("overview");
                            return true;
                        })
                        .catch(x => {
                            MessageBox.error("Usuário ou senha inválido!")
                        });
                });

            } catch (e) {
                MessageBox.error(e)
            }
        }
    });
});
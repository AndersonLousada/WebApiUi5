sap.ui.define([
    "invent/clientes/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (BaseController, JSONModel, MessageBox) {
    "use strict";

    return BaseController.extend("invent.clientes.controller.Overview", {

        onInit: function () {
            this.exibirProgresso(() => {
                this.attachRoute("overview", this.aoConcidirRota);
            })
        },

        aoConcidirRota: function () {
            this.exibirProgresso(async () => {
                var fetchPamans = this.getFetchParamns();
                return fetch("api/Cliente/numeroDeClientes", fetchPamans)
                    .then(response => response.json())
                    .then(jsonFromServer => {
                        let numeroDeClientes = {
                            cont: jsonFromServer,
                        };
                        let model = new JSONModel(numeroDeClientes)
                        this.getView().setModel(model, "NumeroDeCliente");
                        return true
                    });

            });
            this.exibirUsuarioLogado();
        },

        navegarParaLista: function () {
            this.exibirProgresso(() => {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("listaName");
            })
        },

        inserirCadastroNovo: function () {
            this.exibirProgresso(() => {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("cadastroDeCliente");
            })
        },

        aoClicarNoBotaoSair: function () {
            this.exibirProgresso(() => {

                MessageBox.confirm("Deseja realmente sair?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: (sAction) => {
                        if (sAction === "OK") {
                            var oRouter = this.getOwnerComponent().getRouter();
                            oRouter.navTo("login");
                        } else {
                            console.log("Operação cancelada")
                        }
                    }

                });
            })
        },

    });

});
sap.ui.define([
    "invent/clientes/controller/BaseController",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"

], function (BaseController, History, JSONModel, MessageBox, MessageToast) {
    "use strict";

    return BaseController.extend("invent.clientes.controller.Detail", {

        onInit: function () {
            this.attachRoute("detail", this.aoConcidirRota);
        },

        aoConcidirRota: function (rota) {
            this.exibirProgresso(x => {
                var fetchPamans = this.getFetchParamns();

                this.Id = rota.getParameter("arguments").id;

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

        editarCadastro: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            var cliente = this.getView().getModel("cliente").getData();
            oRouter.navTo("editarCadastro", {
                id: window.encodeURIComponent(cliente.id)
            });
        },

        aoClicarDeletarCadastro: function () {

            var modelDoCliente = this.getView().getModel("cliente").getData();
            var oRouter = this.getOwnerComponent().getRouter();
            var paramsDoFecth = this.getDeleteFetchParamns(modelDoCliente);


            var oRouter = this.getOwnerComponent().getRouter();
            MessageBox.warning("Deseja realmente deletar cliente?.", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose: async function (sAction) {
                    if (sAction === "OK") {

                        fetch("api/Cliente", paramsDoFecth)
                            .then(x => {
                                if (x.ok) {
                                    return x.json();

                                }
                                return Promise.reject(x)
                            })
                            .then(x => {
                                const message = `Cliente ${x.id} deletado com sucesso !!`;

                                MessageBox.alert(message, {
                                    onClose: function () {
                                        oRouter.navTo("listaName", {}, true);
                                    }
                                });
                            })
                            .catch(x => {
                                MessageBox.error("Houve um erro " + x)
                            });

                    } else {
                        MessageToast.show("Operação cancelada");
                    }
                }
            });
        }
    });
}); 
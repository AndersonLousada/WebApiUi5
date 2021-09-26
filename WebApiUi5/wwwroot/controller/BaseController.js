sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/util/Storage",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageBox, Storage, JSONModel) {
	"use strict";

	return Controller.extend("invent.clientes.controller.BaseController", {

		SbolocalStorage: new Storage(Storage.Type.session, "my_prefix"),

		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		attachRoute: function (routeName, func) {
			const router = this.getRouter();

			if (!!routeName) {
				router
					.getRoute(routeName)
					.attachPatternMatched(func, this);
			} else {
				router
					.attachRouteMatched(func, this);
			}
		},

		exibirMsgDeErro: function (error) {
			MessageBox.error(`Erro ao fazer consulta! ${error}`);
		},

		setLoadingIndicator: function (isBusy, busyControl) {
			busyControl = busyControl || this.getView();

			if (typeof busyControl.setBusyIndicatorDelay == "function") {
				busyControl.setBusyIndicatorDelay(0);
			}

			busyControl.setBusy(isBusy);
		},

		exibirProgresso: function (funcaoExecucao, busyControl) {

			try {
				this.setLoadingIndicator(true, busyControl);
				return funcaoExecucao()
					.catch(x => this.exibirMsgDeErro(x))
					.finally(() => this.setLoadingIndicator(false, busyControl));

			} catch (e) {
				this.setLoadingIndicator(false, busyControl);
			}
		},

		setToken(response) {
			localStorage.setItem('currentUser', JSON.stringify(response));
		},

		getTOken() {
			let user = JSON.parse(localStorage.getItem('currentUser'));
			console.log(user)
			return user.token;
		},

		setUserModel: function (data) {
			var oModel = new JSONModel(data);
			this.getView().setModel(oModel, "cliente");
		},

		getUserModel: function () {
			return this.getView().getModel("cliente").getData();
		},

		setCurrentUserModel() {
			var user = this.getUser();
			let model = new JSONModel(user)
			this.getView().setModel(model, "user");
		},

		exibirUsuarioLogado() {
			let user = {
			};
			this.setUserModel(user);
			this.setCurrentUserModel();
		},

		getUser() {
			let user = JSON.parse(localStorage.getItem('currentUser'));
			console.log(user)
			return user.user;
		},

		getFetchParamns() {
			var fetchPamans = {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.getTOken()}`
				}
			};
			return fetchPamans;
		},

		postFetchParamns() {
			var fetchPamans = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Authorization': `Bearer ${this.getTOken()}`
				}
			};
			return fetchPamans;
		},

		getPutFetchParamns(body) {
			var fetchPamans = this.getFetchParamns();
			fetchPamans.method = 'PUT';
			fetchPamans.body = JSON.stringify(body);
			return fetchPamans;
		},

		getDeleteFetchParamns(body) {
			var fetchPamans = this.getFetchParamns();
			fetchPamans.method = 'DELETE';
			fetchPamans.body = JSON.stringify(body);
			return fetchPamans;
		},

		getPostFetchParamns(body) {
			var fetchPamans = this.getFetchParamns();
			fetchPamans.method = 'POST';
			fetchPamans.body = JSON.stringify(body);
			return fetchPamans;
		},

	});
});
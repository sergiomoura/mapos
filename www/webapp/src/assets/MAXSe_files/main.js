(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_components/dash/dash.component.html":
/*!******************************************************!*\
  !*** ./src/app/_components/dash/dash.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  dash works!\n</p>\n"

/***/ }),

/***/ "./src/app/_components/dash/dash.component.scss":
/*!******************************************************!*\
  !*** ./src/app/_components/dash/dash.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/_components/dash/dash.component.ts":
/*!****************************************************!*\
  !*** ./src/app/_components/dash/dash.component.ts ***!
  \****************************************************/
/*! exports provided: DashComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashComponent", function() { return DashComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashComponent = /** @class */ (function () {
    function DashComponent() {
    }
    DashComponent.prototype.ngOnInit = function () {
    };
    DashComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dash',
            template: __webpack_require__(/*! ./dash.component.html */ "./src/app/_components/dash/dash.component.html"),
            styles: [__webpack_require__(/*! ./dash.component.scss */ "./src/app/_components/dash/dash.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], DashComponent);
    return DashComponent;
}());



/***/ }),

/***/ "./src/app/_components/edit-movimento/edit-movimento.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/_components/edit-movimento/edit-movimento.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form #form=\"ngForm\">\n\t<div class=\"campos\">\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" disabled placeholder=\"Produto\" value=\"{{movimento.produto.nome}}\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" disabled placeholder=\"Tipo\" value=\"{{ (movimento.tipo == 1 ? 'Entrada' : 'Saída') }}\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" disabled placeholder=\"Data/Hora\" value=\"{{movimento.dh.toLocaleString()}}\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"number\" step=\"0.01\" name=\"qtde\" min=\"0\" [(ngModel)]=\"movimento.qtde\"  placeholder=\"Quantidade ({{movimento.produto.unidade}})\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"number\" step=\"0.01\" name=\"valor_unit\" min=\"0\" [(ngModel)]=\"movimento.valor_unit\"  placeholder=\"Valor Unit (R$)\">\n\t\t</mat-form-field>\n\t</div>\n\t\n\t<div class=\"controles\">\n\t\t<button mat-raised-button color=\"accent\" (click)=\"onCancelarClick()\">Cancelar</button>\n\t\t<button mat-raised-button color=\"warn\" (click)=\"onRemoverClick()\">Remover Movimento</button>\n\t\t<button mat-raised-button color=\"primary\" (click)=\"onSalvarClick()\" [disabled]=\"!form.valid\">Salvar</button>\n\t</div>\n</form>"

/***/ }),

/***/ "./src/app/_components/edit-movimento/edit-movimento.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/_components/edit-movimento/edit-movimento.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".campos mat-form-field {\n  display: block; }\n\n.controles {\n  display: flex;\n  justify-content: space-between; }\n"

/***/ }),

/***/ "./src/app/_components/edit-movimento/edit-movimento.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/_components/edit-movimento/edit-movimento.component.ts ***!
  \************************************************************************/
/*! exports provided: EditMovimentoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMovimentoComponent", function() { return EditMovimentoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_movimentos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/movimentos.service */ "./src/app/_services/movimentos.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var EditMovimentoComponent = /** @class */ (function () {
    function EditMovimentoComponent(dialogRef, data, movService, snackBar) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.movService = movService;
        this.snackBar = snackBar;
        this.movimento = Object.assign({}, data.movimento);
    }
    EditMovimentoComponent.prototype.ngOnInit = function () {
    };
    EditMovimentoComponent.prototype.onCancelarClick = function () {
        this.dialogRef.close(0);
    };
    EditMovimentoComponent.prototype.onRemoverClick = function () {
        var _this = this;
        var pergunta = "Tem certeza que deseja excluir a movimentação?";
        if (window.confirm(pergunta)) {
            this.movService.delete(this.movimento.id).subscribe(function (res) {
                // Exibindo snackbar de sucesso
                _this.snackBar.open('Movimento excluído com sucesso', undefined, {
                    panelClass: ['snackbar-ok'],
                });
                // Fechando o diálogo
                _this.dialogRef.close(1);
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar excluir movimento', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
                // Imprime erro no console
                console.dir(err);
            });
        }
    };
    EditMovimentoComponent.prototype.onSalvarClick = function () {
        var _this = this;
        var pergunta = "Tem certeza que deseja alterar a movimentação?";
        if (window.confirm(pergunta)) {
            this.movService.update(this.movimento).subscribe(function (res) {
                // Exibindo snackbar de sucesso
                _this.snackBar.open('Movimentação alterada com sucesso', undefined, {
                    panelClass: ['snackbar-ok'],
                });
                // Fechando o diálogo
                _this.dialogRef.close(1);
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar alterar movimentação', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
                // Imprime erro no console
                console.dir(err);
            });
        }
    };
    EditMovimentoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-movimento',
            template: __webpack_require__(/*! ./edit-movimento.component.html */ "./src/app/_components/edit-movimento/edit-movimento.component.html"),
            styles: [__webpack_require__(/*! ./edit-movimento.component.scss */ "./src/app/_components/edit-movimento/edit-movimento.component.scss")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _services_movimentos_service__WEBPACK_IMPORTED_MODULE_2__["MovimentosService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], EditMovimentoComponent);
    return EditMovimentoComponent;
}());



/***/ }),

/***/ "./src/app/_components/edit-produto/edit-produto.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/_components/edit-produto/edit-produto.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form #form=\"ngForm\">\n\t<mat-form-field>\n\t\t<input (keyup.enter)=\"onEnterKeyup($event)\" matInput required [(ngModel)]=\"produto.nome\"  type=\"text\" name=\"nome\" placeholder=\"Nome\">\n\t</mat-form-field>\n\t<mat-form-field>\n\t\t<input (keyup.enter)=\"onEnterKeyup($event)\" matInput required [(ngModel)]=\"produto.unidade\"  type=\"text\" name=\"unidade\" placeholder=\"Unidade\">\n\t</mat-form-field>\n\t<mat-form-field>\n\t\t<input matInput [(ngModel)]=\"produto.qtde\"  type=\"number\" step=\"0.01\" disabled name=\"qtde\" placeholder=\"Quantidade\">\n\t</mat-form-field>\n\t<mat-form-field>\n\t\t<input (keyup.enter)=\"onEnterKeyup($event)\" matInput required [(ngModel)]=\"produto.qtde_min\"  type=\"number\" step=\"0.01\" name=\"qtde_min\" placeholder=\"Qtde Mínima\">\n\t</mat-form-field>\n\t<mat-form-field>\n\t\t<input (keyup.enter)=\"onEnterKeyup($event)\" matInput [(ngModel)]=\"produto.qtde_max\"  type=\"number\" step=\"0.01\" name=\"qtde_max\" placeholder=\"Qtde Máxima\">\n\t</mat-form-field>\n\t<div class=\"controles\">\n\t\t<button mat-raised-button color=\"accent\" (click)=\"onCancelarClick()\">Cancelar</button>\n\t\t<button mat-raised-button color=\"primary\" (click)=\"onSalvarClick()\" [disabled]=\"!form.valid\">Salvar</button>\n\t</div>\n</form>"

/***/ }),

/***/ "./src/app/_components/edit-produto/edit-produto.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/_components/edit-produto/edit-produto.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-form-field {\n  width: 100%; }\n\n.controles {\n  display: flex;\n  justify-content: space-between; }\n"

/***/ }),

/***/ "./src/app/_components/edit-produto/edit-produto.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/_components/edit-produto/edit-produto.component.ts ***!
  \********************************************************************/
/*! exports provided: EditProdutoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditProdutoComponent", function() { return EditProdutoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_produtos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/produtos.service */ "./src/app/_services/produtos.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var EditProdutoComponent = /** @class */ (function () {
    function EditProdutoComponent(dialogRef, data, prodService, snackBar) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.prodService = prodService;
        this.snackBar = snackBar;
        this.produto = Object.assign({}, data.produto);
    }
    EditProdutoComponent.prototype.ngOnInit = function () {
    };
    EditProdutoComponent.prototype.onCancelarClick = function () {
        this.dialogRef.close(0);
    };
    EditProdutoComponent.prototype.onSalvarClick = function () {
        var _this = this;
        if (this.produto.id == 0) {
            this.prodService.create(this.produto).subscribe(function (res) {
                _this.dialogRef.close(1);
                // Exibindo snackbar de sucesso
                _this.snackBar.open('Produto adicionado com sucesso!', undefined, {
                    panelClass: ['snackbar-ok'],
                });
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar adicionar produto.', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
            });
        }
        else {
            this.prodService.update(this.produto).subscribe(function (res) {
                _this.dialogRef.close(1);
                // Exibindo snackbar de sucesso
                _this.snackBar.open('Produto alterado com sucesso!', undefined, {
                    panelClass: ['snackbar-ok'],
                });
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar alterar produto.', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
            });
        }
    };
    EditProdutoComponent.prototype.onEnterKeyup = function (evt) {
        if (this.form.valid) {
            this.onSalvarClick();
        }
        else {
            // Exibindo snackbar de erro
            this.snackBar
                .open('Formulário inválido. Campos preenchidos incorretamente', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgForm"])
    ], EditProdutoComponent.prototype, "form", void 0);
    EditProdutoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edit-produto',
            template: __webpack_require__(/*! ./edit-produto.component.html */ "./src/app/_components/edit-produto/edit-produto.component.html"),
            styles: [__webpack_require__(/*! ./edit-produto.component.scss */ "./src/app/_components/edit-produto/edit-produto.component.scss")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _services_produtos_service__WEBPACK_IMPORTED_MODULE_2__["ProdutosService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], EditProdutoComponent);
    return EditProdutoComponent;
}());



/***/ }),

/***/ "./src/app/_components/equipe/equipe.component.html":
/*!**********************************************************!*\
  !*** ./src/app/_components/equipe/equipe.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-80 top-gap padding\">\n\t<form #equipeForm=\"ngForm\">\n\t\t<mat-form-field>\n\t\t\t<input [(ngModel)]=\"equipe.nome\" matInput placeholder=\"Nome\" name=\"nome\" required>\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input [(ngModel)]=\"equipe.sigla\" maxlength=\"4\" matInput placeholder=\"Sigla\" name=\"sigla\" required>\n\t\t\t<mat-hint align=\"end\">{{equipe.sigla.length}} / 4</mat-hint>\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<mat-select [(ngModel)]=\"equipe.tipo\" placeholder=\"Tipo de Equipe\" name=\"tipo\" required>\n\t\t\t\t<mat-option *ngFor=\"let tipo of tiposDeEquipe\" [value]=\"tipo\">\n\t\t\t\t\t{{tipo.nome}}\n\t\t\t\t</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\n\t\t<div class=\"membros-container\">\n\t\t\t<div class=\"label\">Membros</div>\n\t\t\t<button class=\"add-button\" mat-mini-fab (click)=\"onAddMemberClick()\"><mat-icon>add</mat-icon></button>\n\t\t\t<table>\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Nome</td>\n\t\t\t\t\t\t<td>E-mail</td>\n\t\t\t\t\t\t<td>Salário (R$)</td>\n\t\t\t\t\t\t<td>Líder</td>\n\t\t\t\t\t\t<td>Login</td>\n\t\t\t\t\t\t<td>Senha</td>\n\t\t\t\t\t\t<td>APP</td>\n\t\t\t\t\t\t<td>WEB</td>\n\t\t\t\t\t\t<td></td>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr *ngFor=\"let m of equipe.membros; let i = index\">\n\t\t\t\t\t\t<td><input required [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"m.nome\" type=\"text\"></td>\n\t\t\t\t\t\t<td><input required [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"m.email\" type=\"text\"></td>\n\t\t\t\t\t\t<td><input [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"m.salario\" type=\"number\" step=\"0.01\"></td>\n\t\t\t\t\t\t<td><mat-checkbox (click)=\"onLiderClick(m.id)\" color=\"primary\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"m.lider\"></mat-checkbox></td>\n\t\t\t\t\t\t<td><input [required]=\"m.lider\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"m.username\" type=\"text\" [disabled]=\"!m.lider\"></td>\n\t\t\t\t\t\t<td><input [required]=\"m.lider\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"m.senha\" type=\"password\" [disabled]=\"!m.lider\"></td>\n\t\t\t\t\t\t<td><mat-checkbox color=\"primary\" [ngModelOptions]=\"{standalone: true}\"  value=\"2\" [(ngModel)]=\"m.acessoApp\" [disabled]=\"!m.lider\"></mat-checkbox></td>\n\t\t\t\t\t\t<td><mat-checkbox color=\"primary\" [ngModelOptions]=\"{standalone: true}\" [(ngModel)]=\"m.acessoWeb\" [disabled]=\"!m.lider\"></mat-checkbox></td>\n\t\t\t\t\t\t<td><button (click)=\"onRemoveButtonClick(i)\" mat-icon-button><mat-icon>remove_circle</mat-icon></button></td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>\n\t\t\t\t\n\t\t<mat-checkbox [(ngModel)]=\"equipe.ativa\" color=\"primary\" name=\"ativa\">Ativa</mat-checkbox>\n\t\t\t\n\t\t<div class=\"controles\">\n\t\t\t<button mat-raised-button (click)=\"onCancelarClick()\" color=\"accent\">Cancelar</button>\n\t\t\t<span class=\"spacer\"></span>\n\t\t\t<button mat-raised-button (click)=\"onSalvarClick()\" color=\"primary\" class=\"salvar\" [disabled]=\"equipeForm.invalid\">Salvar</button>\n\t\t</div>\n\n\t</form>\n</div>"

/***/ }),

/***/ "./src/app/_components/equipe/equipe.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/_components/equipe/equipe.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n * @param target Which kind of high contrast setting to target. Defaults to `active`, can be\n *    `white-on-black` or `black-on-white`.\n */\n/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n:host() > div {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  background-color: #FFF;\n  padding: 40px;\n  position: relative;\n  left: -40px; }\n:host() > div mat-form-field {\n    width: 100%;\n    margin-bottom: 10px; }\n:host() > div mat-checkbox {\n    width: 100%; }\n:host() > div .membros-container {\n    padding: 10px;\n    border: 1px solid #DEDEDE;\n    margin-bottom: 20px;\n    position: relative; }\n:host() > div .membros-container .add-button {\n      position: absolute;\n      right: 10px;\n      top: 10px; }\n:host() > div .membros-container table {\n      border-collapse: collapse;\n      width: 100%; }\n:host() > div .membros-container table td {\n        padding: 2px; }\n:host() > div .membros-container table input {\n        width: calc(100% - 10px);\n        padding: 3px; }\n:host() > div .membros-container table td:nth-child(3) {\n        width: 100px; }\n:host() > div .membros-container table td:nth-child(4) {\n        width: 50px;\n        text-align: center; }\n:host() > div .membros-container table td:nth-child(5) {\n        width: 120px; }\n:host() > div .membros-container table td:nth-child(6) {\n        width: 120px; }\n:host() > div .membros-container table td:nth-child(7) {\n        width: 50px;\n        text-align: center; }\n:host() > div .membros-container table td:nth-child(8) {\n        width: 50px;\n        text-align: center; }\n:host() > div .membros-container table thead td {\n        font-size: 12px;\n        color: #838383; }\n:host() > div .controles {\n    margin-top: 30px;\n    display: flex; }\n"

/***/ }),

/***/ "./src/app/_components/equipe/equipe.component.ts":
/*!********************************************************!*\
  !*** ./src/app/_components/equipe/equipe.component.ts ***!
  \********************************************************/
/*! exports provided: EquipeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipeComponent", function() { return EquipeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_equipes_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/equipes.service */ "./src/app/_services/equipes.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EquipeComponent = /** @class */ (function () {
    function EquipeComponent(snackBar, router, route, equipesService) {
        this.snackBar = snackBar;
        this.router = router;
        this.route = route;
        this.equipesService = equipesService;
        this.equipe = {
            id: 0,
            nome: '',
            sigla: '',
            tipo: undefined,
            ativa: true,
            membros: []
        };
    }
    EquipeComponent.prototype.ngOnInit = function () {
        this.getTiposDeEquipe();
        this.getEquipe();
    };
    EquipeComponent.prototype.getEquipe = function () {
        var _this = this;
        // Capturando o id da equipe na url
        var id = this.route.snapshot.paramMap.get('id');
        // Verificando se id é zero
        if (id != '0') {
            // Chamando serviço para carregar a equipe
            this.equipesService.getEquipeById(id).subscribe(function (res) {
                // Salvando o id do membro lider atual
                _this.id_lider_atual = res.id_membro_lider;
                // Verificando se carregou tipos de equipe e usuarios
                if (_this.tiposDeEquipe != undefined) {
                    // Carregou tiposDeEquipe e usuarios. Parsing
                    _this.equipe = _this.parseEquipe(res);
                }
                else {
                    // Não carregou. Guardando response para processar depois
                    _this.tmp_equipe = res;
                }
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar carregar equipe.', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
                // Imprimindo erro no console
                console.warn(err);
            });
        }
        else {
            // Inserindo membro vazio na equipe
            this.equipe.membros.push({
                nome: '',
                email: '',
                salario: 0,
                lider: true,
                username: '',
                senha: ''
            });
        }
    };
    EquipeComponent.prototype.getTiposDeEquipe = function () {
        var _this = this;
        this.equipesService.getTiposDeEquipe().subscribe(function (res) {
            // Copiando os tipos de equipe para sua variável
            _this.tiposDeEquipe = res;
            // Verificando se equipe e usuarios já foram carregados
            if (_this.tmp_equipe != undefined) {
                // Tudo carregado. Parsing
                _this.equipe = _this.parseEquipe(_this.tmp_equipe);
            }
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar os tipos de equipe', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    EquipeComponent.prototype.parseEquipe = function (tmp_equipe) {
        // Atribuindo tipo de equipe à equipe
        tmp_equipe.tipo = this.tiposDeEquipe.find(function (e) { return e.id == tmp_equipe.id_tipo; });
        delete tmp_equipe.id_tipo;
        // Parsing membros das equipes
        for (var i = 0; i < tmp_equipe.membros.length; i++) {
            var membro = tmp_equipe.membros[i];
            if (membro.id == tmp_equipe.id_membro_lider) {
                membro.lider = true;
                membro.username = tmp_equipe.usuario_lider.username;
                membro.acessoWeb = tmp_equipe.usuario_lider.acessoWeb == '1';
                membro.acessoApp = tmp_equipe.usuario_lider.acessoApp == '0' ? 0 : 2;
            }
            else {
                membro.lider = false;
                membro.username = null;
                membro.acessoWeb = false;
                membro.acessoApp = false;
            }
        }
        delete tmp_equipe.username_lider;
        delete tmp_equipe.id_membro_lider;
        tmp_equipe.ativa = tmp_equipe.ativa == '1';
        return tmp_equipe;
    };
    EquipeComponent.prototype.onLiderClick = function (id) {
        for (var i = 0; i < this.equipe.membros.length; i++) {
            var m = this.equipe.membros[i];
            m.lider = false;
            m.username = '';
            m.senha = '';
        }
    };
    EquipeComponent.prototype.onAddMemberClick = function () {
        this.equipe.membros.push({
            nome: '',
            email: '',
            salario: 0.00,
            lider: false,
            username: '',
            senha: '',
        });
    };
    EquipeComponent.prototype.onRemoveButtonClick = function (i) {
        this.equipe.membros.splice(i, 1);
    };
    EquipeComponent.prototype.onCancelarClick = function () {
        this.router.navigateByUrl('/home/equipes');
    };
    EquipeComponent.prototype.onSalvarClick = function () {
        var _this = this;
        if (this.equipe.id == 0) {
            this.equipesService.create(this.equipe).subscribe(function (res) {
                // Exibindo snackbar de sucesso
                _this.snackBar.open('Equipe adicionada com sucesso!', undefined, {
                    panelClass: ['snackbar-ok'],
                });
                // navegando para a tela de equipes
                _this.router.navigateByUrl('/home/equipes');
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao adicionar equipe', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
                // Imprimindo erro no console
                console.warn(err);
            });
        }
        else {
            // recuperando o id do líder marcado
            var id_lider_marcado = this.equipe.membros.find(function (m) { return m.lider; }).id;
            var data = { 'equipe': this.equipe, 'liderMudou': (this.id_lider_atual != id_lider_marcado) };
            this.equipesService.update(data).subscribe(function (res) {
                // Exibindo snackbar de sucesso
                _this.snackBar.open('Equipe alterada com sucesso!', undefined, {
                    panelClass: ['snackbar-ok'],
                });
                // Navegando para tela de equipes
                _this.router.navigateByUrl('/home/equipes');
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar alterar equipe', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error']
                });
                // Imprimindo erro no console
                console.warn(err);
            });
        }
    };
    EquipeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-equipe',
            template: __webpack_require__(/*! ./equipe.component.html */ "./src/app/_components/equipe/equipe.component.html"),
            styles: [__webpack_require__(/*! ./equipe.component.scss */ "./src/app/_components/equipe/equipe.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_equipes_service__WEBPACK_IMPORTED_MODULE_2__["EquipesService"]])
    ], EquipeComponent);
    return EquipeComponent;
}());



/***/ }),

/***/ "./src/app/_components/equipes/equipes.component.html":
/*!************************************************************!*\
  !*** ./src/app/_components/equipes/equipes.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-80 top-gap padding\">\n\t<div class=\"controles\">\n\t\t\t<span class=\"spacer\"></span>\n\t\t\t<button mat-raised-button color=\"primary\" (click)=\"onNovaEquipeClick()\">\n\t\t\t\tCadastrar Nova Equipe\n\t\t\t</button>\n\t</div>\n\t<mat-list>\n\t\t<mat-list-item *ngFor=\"let equipe of equipes\" [ngClass]=\"{'inativo': equipe.ativa==0}\" (click)=\"onEquipeClick(equipe.id)\">\n\t\t\t<mat-icon matListIcon>group</mat-icon>\n\t\t\t<h2 matLine>[{{equipe.sigla}}] {{equipe.nome}}</h2>\n\t\t\t<p matLine>\n\t\t\t\t<span>{{equipe.tipo?equipe.tipo.nome:''}}</span>\n\t\t\t</p>\n\t\t\t<mat-icon>keyboard_arrow_right</mat-icon>\n\t\t</mat-list-item>\n\t</mat-list>\n</div>"

/***/ }),

/***/ "./src/app/_components/equipes/equipes.component.scss":
/*!************************************************************!*\
  !*** ./src/app/_components/equipes/equipes.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n * @param target Which kind of high contrast setting to target. Defaults to `active`, can be\n *    `white-on-black` or `black-on-white`.\n */\n/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n:host() > div .controles {\n  margin-bottom: 40px;\n  display: flex; }\n:host() > div .controles mat-checkbox {\n    position: relative;\n    top: 9px; }\n:host() > div mat-list {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  padding-top: 0; }\n:host() > div mat-list mat-list-item {\n    background-color: #FFF;\n    border-bottom: 1px solid #CCC;\n    cursor: pointer; }\n:host() > div mat-list mat-list-item:last-child {\n      border-bottom: none; }\n:host() > div mat-list mat-list-item:hover {\n      background-color: #F0F0F0; }\n:host() > div mat-list .inativo {\n    color: #CCC; }\n"

/***/ }),

/***/ "./src/app/_components/equipes/equipes.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/_components/equipes/equipes.component.ts ***!
  \**********************************************************/
/*! exports provided: EquipesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipesComponent", function() { return EquipesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_equipes_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/equipes.service */ "./src/app/_services/equipes.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EquipesComponent = /** @class */ (function () {
    function EquipesComponent(snackBar, equipesService, router) {
        this.snackBar = snackBar;
        this.equipesService = equipesService;
        this.router = router;
    }
    EquipesComponent.prototype.ngOnInit = function () {
        this.getTiposDeEquipe();
        this.getEquipes();
    };
    EquipesComponent.prototype.getTiposDeEquipe = function () {
        var _this = this;
        this.equipesService.getTiposDeEquipe().subscribe(function (res) {
            // Copiando os tipos de equipe para sua variável
            _this.tiposDeEquipe = res;
            // Verificando se as equiqpes já foram carregadas
            if (_this.tmp_equipes != undefined) {
                // Equipes já foram carregadas. Parsing
                _this.equipes = _this.parseEquipes(_this.tmp_equipes);
                // Removendo tmp_equipes;
                delete _this.tmp_equipes;
            }
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar os tipos de equipe', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom'
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    EquipesComponent.prototype.getEquipes = function () {
        var _this = this;
        this.equipesService.getEquipes().subscribe(function (res) {
            // Verificando se tipos de equipe já foi carregado
            if (_this.tiposDeEquipe != undefined) {
                // Tipos de Equipe já foi carregado. Parsing
                _this.equipes = _this.parseEquipes(res);
            }
            else {
                // Tipos de Equipe ainda não foi carregado
                // Salvando equipes para parsing futuro
                _this.tmp_equipes = res;
            }
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar equipes. Entre em contato com o suporte.', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom'
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    EquipesComponent.prototype.parseEquipes = function (equipes) {
        var _loop_1 = function (i) {
            equipes[i].tipo = this_1.tiposDeEquipe.find(function (e) { return e.id == equipes[i].id_tipo; });
            delete equipes[i].id_tipo;
        };
        var this_1 = this;
        for (var i = 0; i < equipes.length; i++) {
            _loop_1(i);
        }
        return equipes;
    };
    EquipesComponent.prototype.onEquipeClick = function (id) {
        this.router.navigateByUrl('/home/equipes/' + id);
    };
    EquipesComponent.prototype.onNovaEquipeClick = function () {
        this.router.navigateByUrl('/home/equipes/0');
    };
    EquipesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-equipes',
            template: __webpack_require__(/*! ./equipes.component.html */ "./src/app/_components/equipes/equipes.component.html"),
            styles: [__webpack_require__(/*! ./equipes.component.scss */ "./src/app/_components/equipes/equipes.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"],
            _services_equipes_service__WEBPACK_IMPORTED_MODULE_1__["EquipesService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], EquipesComponent);
    return EquipesComponent;
}());



/***/ }),

/***/ "./src/app/_components/estoque/estoque.component.html":
/*!************************************************************!*\
  !*** ./src/app/_components/estoque/estoque.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"accent\">\n\t<mat-toolbar-row>\n\t\t<button mat-button (click)=\"onMovimentacaoClick()\">\n\t\t\tMovimentação\n\t\t</button>\n\t\t<button mat-button (click)=\"onProdutosClick()\">\n\t\t\tProdutos\n\t\t</button>\n\t</mat-toolbar-row>\n</mat-toolbar>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/_components/estoque/estoque.component.scss":
/*!************************************************************!*\
  !*** ./src/app/_components/estoque/estoque.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-toolbar button {\n  position: relative;\n  top: 4px; }\n"

/***/ }),

/***/ "./src/app/_components/estoque/estoque.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/_components/estoque/estoque.component.ts ***!
  \**********************************************************/
/*! exports provided: EstoqueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstoqueComponent", function() { return EstoqueComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EstoqueComponent = /** @class */ (function () {
    function EstoqueComponent(router) {
        this.router = router;
    }
    EstoqueComponent.prototype.ngOnInit = function () {
    };
    EstoqueComponent.prototype.onProdutosClick = function () {
        this.router.navigateByUrl('home/estoque/produtos');
    };
    EstoqueComponent.prototype.onMovimentacaoClick = function () {
        this.router.navigateByUrl('home/estoque/movimentos');
    };
    EstoqueComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-estoque',
            template: __webpack_require__(/*! ./estoque.component.html */ "./src/app/_components/estoque/estoque.component.html"),
            styles: [__webpack_require__(/*! ./estoque.component.scss */ "./src/app/_components/estoque/estoque.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], EstoqueComponent);
    return EstoqueComponent;
}());



/***/ }),

/***/ "./src/app/_components/finalizar-sse/finalizar-sse.component.html":
/*!************************************************************************!*\
  !*** ./src/app/_components/finalizar-sse/finalizar-sse.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n\t<p>A tarefa foi finalizada por completo?</p>\n\t\n\t<mat-radio-group [(ngModel)]=\"tipoDeFinalizacao\" >\n\t\t<mat-radio-button value=\"total\">Finalização Total</mat-radio-button>\n\t\t<mat-radio-button value=\"parcial\">Finalizar parcialmente</mat-radio-button>\n\t</mat-radio-group>\n\t\n\t<mat-form-field>\n\t\t<input matInput [min]=\"min_data_devolucao\" [(ngModel)]=\"data_devolucao\" [matDatepicker]=\"picker\" placeholder=\"Data da devolução\">\n\t\t<mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n\t\t<mat-datepicker #picker></mat-datepicker>\n\t</mat-form-field>\n\n\t<div class=\"controles\">\n\t\t<button mat-raised-button color=\"accent\" (click)=\"onCancelarClick()\">Cancelar</button>\n\t\t<button mat-raised-button color=\"primary\" (click)=\"onSalvarClick()\" [disabled]=\"!data_devolucao\">Salvar</button>\n\t</div>\n\n</div>"

/***/ }),

/***/ "./src/app/_components/finalizar-sse/finalizar-sse.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/_components/finalizar-sse/finalizar-sse.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "p {\n  font-weight: bold;\n  font-size: 18px; }\n\nmat-radio-button {\n  display: block; }\n\n.controles {\n  margin: 20px 0 0 0;\n  display: flex;\n  justify-content: space-between; }\n"

/***/ }),

/***/ "./src/app/_components/finalizar-sse/finalizar-sse.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/_components/finalizar-sse/finalizar-sse.component.ts ***!
  \**********************************************************************/
/*! exports provided: FinalizarSseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FinalizarSseComponent", function() { return FinalizarSseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_sses_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/sses.service */ "./src/app/_services/sses.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var FinalizarSseComponent = /** @class */ (function () {
    function FinalizarSseComponent(dialogRef, data, sseService, snackBar) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.sseService = sseService;
        this.snackBar = snackBar;
        this.tipoDeFinalizacao = 'total';
        this.data_devolucao = undefined;
        this.min_data_devolucao = undefined;
        this.min_data_devolucao = new Date(data.data_conclusao);
    }
    FinalizarSseComponent.prototype.onSalvarClick = function () {
        var _this = this;
        this.sseService.setFinalizada(this.data.id_sse, this.tipoDeFinalizacao, this.data_devolucao)
            .subscribe(function () {
            _this.dialogRef.close(1);
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao tentar finalizar SSE', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
        });
    };
    FinalizarSseComponent.prototype.onCancelarClick = function () {
        this.dialogRef.close(0);
    };
    FinalizarSseComponent.prototype.ngOnInit = function () {
    };
    FinalizarSseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-finalizar-sse',
            template: __webpack_require__(/*! ./finalizar-sse.component.html */ "./src/app/_components/finalizar-sse/finalizar-sse.component.html"),
            styles: [__webpack_require__(/*! ./finalizar-sse.component.scss */ "./src/app/_components/finalizar-sse/finalizar-sse.component.scss")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _services_sses_service__WEBPACK_IMPORTED_MODULE_2__["SsesService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], FinalizarSseComponent);
    return FinalizarSseComponent;
}());



/***/ }),

/***/ "./src/app/_components/home/home.component.html":
/*!******************************************************!*\
  !*** ./src/app/_components/home/home.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n\t<mat-toolbar-row>\n\t\t<button mat-icon-button (click)=\"toggleSideNav()\"><mat-icon>menu</mat-icon></button>\n\t\t\n\t\t<span class=\"spacer\"></span>\n\n\t\t<button mat-icon-button [matMenuTriggerFor]=\"menu\">\n\t\t\t<mat-icon>more_vert</mat-icon>\n\t\t</button>\n\n\t\t<mat-menu #menu=\"matMenu\">\n\t\t\t<button mat-menu-item>\n\t\t\t\t<mat-icon>person</mat-icon>\n\t\t\t\t<span>Configurações Pessoais</span>\n\t\t\t</button>\n\t\t\t<button mat-menu-item>\n\t\t\t\t<mat-icon>help</mat-icon>\n\t\t\t\t<span>Ajuda</span>\n\t\t\t</button>\n\t\t\t<button mat-menu-item [routerLink]=\"['/login']\">\n\t\t\t\t<mat-icon>power_settings_new</mat-icon>\n\t\t\t\t<span>Sair</span>\n\t\t\t</button>\n\t\t</mat-menu>\n\t\t\n\t</mat-toolbar-row>\n</mat-toolbar>\n\n<mat-sidenav-container (backdropClick)=\"closeSideNav()\">\n\t<mat-sidenav\n\t\t#sidenav\n\t\t(keydown.escape)=\"closeSideNav()\"\n\t\t[fixedInViewport]=\"true\"\n\t\t[fixedTopGap]=\"56\"\n\t\t[fixedBottomGap]=\"0\"\n\t\t>\n\t\t<mat-nav-list>\n\t\t\t\t<a mat-list-item routerLink=\"/home/sses\" (click)=\"closeSideNav()\"><mat-icon matListIcon>av_timer</mat-icon>SSEs</a>\n\t\t\t\t<a mat-list-item routerLink=\"/home/usuarios\" (click)=\"closeSideNav()\"><mat-icon matListIcon>person</mat-icon>Usuarios</a>\n\t\t\t\t<a mat-list-item routerLink=\"/home/equipes\" (click)=\"closeSideNav()\"><mat-icon matListIcon>group</mat-icon>Equipes</a>\n\t\t\t\t<a mat-list-item routerLink=\"/home/estoque\" (click)=\"closeSideNav()\"><mat-icon matListIcon>store</mat-icon>Estoque</a>\n\t\t</mat-nav-list>\n\t</mat-sidenav>\n\n\t<mat-sidenav-content>\n\t\t\t<router-outlet></router-outlet>\n\t</mat-sidenav-content>\n\n</mat-sidenav-container>\n\n"

/***/ }),

/***/ "./src/app/_components/home/home.component.scss":
/*!******************************************************!*\
  !*** ./src/app/_components/home/home.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-toolbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 2; }\n\nmat-sidenav-container {\n  margin-top: 56px; }\n\nmat-sidenav-container mat-sidenav mat-nav-list a {\n    display: block;\n    color: #666;\n    padding-left: 0px;\n    padding-right: 20px; }\n\nmat-sidenav-container mat-sidenav mat-nav-list a:hover {\n      background-color: #E0E0E0;\n      color: #000; }\n\nmat-sidenav-container mat-sidenav mat-nav-list a mat-icon {\n      margin-right: 10px; }\n\nmat-sidenav-container mat-sidenav-content {\n    background-color: inherit;\n    overflow-y: hidden; }\n\n.mat-drawer-container {\n  background-color: inherit; }\n"

/***/ }),

/***/ "./src/app/_components/home/home.component.ts":
/*!****************************************************!*\
  !*** ./src/app/_components/home/home.component.ts ***!
  \****************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_produtos_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/produtos.service */ "./src/app/_services/produtos.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomeComponent = /** @class */ (function () {
    function HomeComponent(authService, prodService, router) {
        this.authService = authService;
        this.prodService = prodService;
        this.router = router;
        this.IRDT = 1 * 60 * 1000; // Intervalo de Renovação Do Token (5 MINUTOS)
        this.IDCE = 1 * 60 * 1000; // Intervalo de Checagem do Estoque (5 MINUTOS)
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Iniciando o timer que atualiza o token a cada IRDT microsegundos
        this.timerId = window.setInterval(function () { _this.authService.refresh(); }, this.IRDT);
        // Iniciando o timer que checa o estoque a cada IDCE + aleatório microsegundos
        this.checkStockTimerId = window.setInterval(function () {
            window.setTimeout(function () {
                _this.prodService.get().subscribe(function (estoque) {
                    _this.checkStock(estoque);
                }, function (err) {
                    // Em caso de falha, imprime no console
                    console.warn(err);
                });
            }, Math.round(Math.random() * 10000 + 5000));
        }, this.IDCE);
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        // Interrompendo o timer que atualiza o token
        window.clearInterval(this.timerId);
        // Interrompendo o timer que checa o estoque
        window.clearInterval(this.checkStockTimerId);
    };
    HomeComponent.prototype.toggleSideNav = function () {
        if (this.sidenav.opened) {
            this.sidenav.close();
        }
        else {
            this.sidenav.open();
        }
    };
    HomeComponent.prototype.closeSideNav = function () {
        this.sidenav.close();
    };
    HomeComponent.prototype.checkStock = function (produtos) {
        var alertar = false;
        var verEstoque;
        for (var i = 0; i < produtos.length; i++) {
            alertar = (alertar || produtos[i].qtde < produtos[i].qtde_min);
        }
        if (alertar) {
            var pergunta = "Existem itens no estoque que estão abaixo do limite mínimo. Deseja conferir agora?";
            if (window.confirm(pergunta)) {
                this.router.navigateByUrl('home/estoque/produtos');
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sidenav'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenav"])
    ], HomeComponent.prototype, "sidenav", void 0);
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/_components/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/_components/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _services_produtos_service__WEBPACK_IMPORTED_MODULE_1__["ProdutosService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/_components/lancar-nota/lancar-nota.component.html":
/*!********************************************************************!*\
  !*** ./src/app/_components/lancar-nota/lancar-nota.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form #form=\"ngForm\">\n\t<div class=\"nf-head\">\n\t\t<mat-form-field>\n\t\t\t<input matInput [(ngModel)]=\"nf.numero\"  required type=\"number\" name=\"numero\" placeholder=\"Número\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t\t<input matInput [(ngModel)]=\"nf.data\" name=\"data\"  [matDatepicker]=\"picker\" placeholder=\"Data\">\n\t\t\t\t<mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n\t\t\t\t<mat-datepicker #picker></mat-datepicker>\n\t\t</mat-form-field>\n\t</div>\n\n\t<div class=\"nf-body\">\n\t\t<div class=\"movimento\" *ngFor=\"let mov of nf.movimentos;let i=index\">\n\t\t\t<mat-form-field>\n\t\t\t\t<mat-select required [(ngModel)]=\"mov.produto\" name=\"produto_{{i}}\" placeholder=\"Produto\">\n\t\t\t\t\t<mat-option *ngFor=\"let p of data.produtos\" [value]=\"p\">\n\t\t\t\t\t\t{{p.nome}}\n\t\t\t\t\t</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t</mat-form-field>\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput required [(ngModel)]=\"mov.qtde\"  type=\"number\" step=\"0.01\" name=\"qtde_{{i}}\" placeholder=\"Quantidade {{mov.produto? '(' + mov.produto.unidade + ')' : ''}}\">\n\t\t\t</mat-form-field>\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput required [(ngModel)]=\"mov.valor_unit\"  type=\"number\" step=\"0.01\" name=\"valor_unit_{{i}}\" placeholder=\"Valor Unit(R$)\">\n\t\t\t</mat-form-field>\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput required value=\"{{mov.valor_unit * mov.qtde}}\"  type=\"number\" step=\"0.01\" name=\"valor_{{i}}\" placeholder=\"Valor Tot(R$)\">\n\t\t\t</mat-form-field>\n\t\t\t<button mat-icon-button (click)=onDeleteClick(i)><mat-icon>delete</mat-icon></button>\n\t\t</div>\n\t</div>\n\n\t<div class=\"controles\">\n\t\t<button mat-raised-button color=\"accent\" (click)=\"onCancelarClick()\">Cancelar</button>\n\t\t<button mat-raised-button color=\"primary\" (click)=\"onSalvarClick()\" [disabled]=\"!form.valid\">Salvar</button>\n\t</div>\n\n\t<button (click)=\"onAddClick()\" class=\"addButton\" mat-fab color=\"primary\">\n\t\t<mat-icon>add</mat-icon>\n\t</button>\n</form>\n"

/***/ }),

/***/ "./src/app/_components/lancar-nota/lancar-nota.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/_components/lancar-nota/lancar-nota.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "form {\n  position: relative; }\n  form .nf-head mat-form-field {\n    width: 150px;\n    margin-right: 20px; }\n  form .nf-body {\n    border: 1px solid #CCC;\n    margin-bottom: 22px;\n    padding: 10px 20px 5px 20px;\n    background-color: #F0F0F0; }\n  form .nf-body .movimento {\n      display: flex;\n      justify-content: space-between; }\n  form .nf-body .movimento mat-form-field {\n        width: calc(25% - 20px); }\n  form .nf-body .movimento button {\n        position: relative;\n        top: 15px; }\n  form .controles {\n    display: flex;\n    justify-content: space-between; }\n  form .addButton {\n    position: absolute;\n    top: 20px;\n    right: 0px; }\n"

/***/ }),

/***/ "./src/app/_components/lancar-nota/lancar-nota.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/_components/lancar-nota/lancar-nota.component.ts ***!
  \******************************************************************/
/*! exports provided: LancarNotaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LancarNotaComponent", function() { return LancarNotaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_movimentos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/movimentos.service */ "./src/app/_services/movimentos.service.ts");
/* harmony import */ var _models_nf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_models/nf */ "./src/app/_models/nf.ts");
/* harmony import */ var _models_movimento__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_models/movimento */ "./src/app/_models/movimento.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var LancarNotaComponent = /** @class */ (function () {
    function LancarNotaComponent(data, snackBar, dialogRef, movService) {
        this.data = data;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.movService = movService;
        this.nf = new _models_nf__WEBPACK_IMPORTED_MODULE_3__["NF"]();
        this.nf.numero = null;
        this.nf.data = null;
        this.nf.movimentos = [];
        this.addMovimento();
    }
    LancarNotaComponent.prototype.ngOnInit = function () {
    };
    LancarNotaComponent.prototype.addMovimento = function () {
        var m = new _models_movimento__WEBPACK_IMPORTED_MODULE_4__["Movimento"]();
        this.nf.movimentos.push(m);
    };
    LancarNotaComponent.prototype.onAddClick = function () {
        this.addMovimento();
    };
    LancarNotaComponent.prototype.onDeleteClick = function (i) {
        this.nf.movimentos.splice(i, 1);
    };
    LancarNotaComponent.prototype.onCancelarClick = function () {
        this.dialogRef.close(0);
    };
    LancarNotaComponent.prototype.onSalvarClick = function () {
        var _this = this;
        this.movService.createNf(this.nf).subscribe(function (res) {
            // Exibindo snackbar de sucesso
            _this.snackBar.open('Lançou nota com sucesso', undefined, {
                panelClass: ['snackbar-ok'],
            });
            // Fechando dialog
            _this.dialogRef.close(1);
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao tentar lançar nota.', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    LancarNotaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-lancar-nota',
            template: __webpack_require__(/*! ./lancar-nota.component.html */ "./src/app/_components/lancar-nota/lancar-nota.component.html"),
            styles: [__webpack_require__(/*! ./lancar-nota.component.scss */ "./src/app/_components/lancar-nota/lancar-nota.component.scss")]
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [Object, _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"],
            _services_movimentos_service__WEBPACK_IMPORTED_MODULE_2__["MovimentosService"]])
    ], LancarNotaComponent);
    return LancarNotaComponent;
}());



/***/ }),

/***/ "./src/app/_components/login/login.component.html":
/*!********************************************************!*\
  !*** ./src/app/_components/login/login.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<img src=\"assets/logo.svg\" alt=\"CASAMAX\">\n<mat-form-field>\n  <input [(ngModel)]=\"loginData.u\" matInput placeholder=\"Login\" (keyup.enter)=\"onEnterKeyUp()\" focus>\n</mat-form-field>\n<mat-form-field>\n  <input [(ngModel)]=\"loginData.p\" matInput placeholder=\"Senha\" type=\"password\" (keyup.enter)=\"onEnterKeyUp()\">\n</mat-form-field>\n<div class=\"erro\" *ngIf=\"loginFalhou\">Login ou senha incorretos</div>\n<button class=\"esqueci\" mat-button color=\"primary\" (click)=\"onEsqueciClick()\">Esqueci minha senha</button>\n<button class=\"entrar\" mat-raised-button color=\"primary\" (click)=\"onEntrarClick()\">ENTRAR</button>"

/***/ }),

/***/ "./src/app/_components/login/login.component.scss":
/*!********************************************************!*\
  !*** ./src/app/_components/login/login.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n * @param target Which kind of high contrast setting to target. Defaults to `active`, can be\n *    `white-on-black` or `black-on-white`.\n */\n/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n * @param target Which kind of high contrast setting to target. Defaults to `active`, can be\n *    `white-on-black` or `black-on-white`.\n */\n/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n.mat-elevation-z0 {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z1 {\n  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z2 {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z3 {\n  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z4 {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z5 {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z6 {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z7 {\n  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z8 {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z9 {\n  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.2), 0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z10 {\n  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z11 {\n  box-shadow: 0px 6px 7px -4px rgba(0, 0, 0, 0.2), 0px 11px 15px 1px rgba(0, 0, 0, 0.14), 0px 4px 20px 3px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z12 {\n  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z13 {\n  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z14 {\n  box-shadow: 0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z15 {\n  box-shadow: 0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z16 {\n  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z17 {\n  box-shadow: 0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z18 {\n  box-shadow: 0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z19 {\n  box-shadow: 0px 9px 12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z20 {\n  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z21 {\n  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z22 {\n  box-shadow: 0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z23 {\n  box-shadow: 0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12); }\n.mat-elevation-z24 {\n  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12); }\n.mat-badge-content {\n  font-weight: 600;\n  font-size: 12px;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-badge-small .mat-badge-content {\n  font-size: 6px; }\n.mat-badge-large .mat-badge-content {\n  font-size: 24px; }\n.mat-h1, .mat-headline, .mat-typography h1 {\n  font: 400 24px/32px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px; }\n.mat-h2, .mat-title, .mat-typography h2 {\n  font: 500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px; }\n.mat-h3, .mat-subheading-2, .mat-typography h3 {\n  font: 400 16px/28px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px; }\n.mat-h4, .mat-subheading-1, .mat-typography h4 {\n  font: 400 15px/24px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px; }\n.mat-h5, .mat-typography h5 {\n  font: 400 11.62px/20px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 12px; }\n.mat-h6, .mat-typography h6 {\n  font: 400 9.38px/20px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 12px; }\n.mat-body-strong, .mat-body-2 {\n  font: 500 14px/24px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-body, .mat-body-1, .mat-typography {\n  font: 400 14px/20px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-body p, .mat-body-1 p, .mat-typography p {\n    margin: 0 0 12px; }\n.mat-small, .mat-caption {\n  font: 400 12px/20px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-display-4, .mat-typography .mat-display-4 {\n  font: 300 112px/112px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 56px;\n  letter-spacing: -0.05em; }\n.mat-display-3, .mat-typography .mat-display-3 {\n  font: 400 56px/56px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 64px;\n  letter-spacing: -0.02em; }\n.mat-display-2, .mat-typography .mat-display-2 {\n  font: 400 45px/48px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 64px;\n  letter-spacing: -0.005em; }\n.mat-display-1, .mat-typography .mat-display-1 {\n  font: 400 34px/40px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 64px; }\n.mat-bottom-sheet-container {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 16px;\n  font-weight: 400; }\n.mat-button, .mat-raised-button, .mat-icon-button, .mat-stroked-button,\n.mat-flat-button, .mat-fab, .mat-mini-fab {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500; }\n.mat-button-toggle {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-card {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-card-title {\n  font-size: 24px;\n  font-weight: 400; }\n.mat-card-subtitle,\n.mat-card-content,\n.mat-card-header .mat-card-title {\n  font-size: 14px; }\n.mat-checkbox {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-checkbox-layout .mat-checkbox-label {\n  line-height: 24px; }\n.mat-chip {\n  font-size: 13px;\n  line-height: 18px; }\n.mat-chip .mat-chip-trailing-icon.mat-icon,\n  .mat-chip .mat-chip-remove.mat-icon {\n    font-size: 18px; }\n.mat-table {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-header-cell {\n  font-size: 12px;\n  font-weight: 500; }\n.mat-cell, .mat-footer-cell {\n  font-size: 14px; }\n.mat-calendar {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-calendar-body {\n  font-size: 13px; }\n.mat-calendar-body-label,\n.mat-calendar-period-button {\n  font-size: 14px;\n  font-weight: 500; }\n.mat-calendar-table-header th {\n  font-size: 11px;\n  font-weight: 400; }\n.mat-dialog-title {\n  font: 500 20px/32px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-expansion-panel-header {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 15px;\n  font-weight: 400; }\n.mat-expansion-panel-content {\n  font: 400 14px/20px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-form-field {\n  font-size: inherit;\n  font-weight: 400;\n  line-height: 1.125;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-form-field-wrapper {\n  padding-bottom: 1.34375em; }\n.mat-form-field-prefix .mat-icon,\n.mat-form-field-suffix .mat-icon {\n  font-size: 150%;\n  line-height: 1.125; }\n.mat-form-field-prefix .mat-icon-button,\n.mat-form-field-suffix .mat-icon-button {\n  height: 1.5em;\n  width: 1.5em; }\n.mat-form-field-prefix .mat-icon-button .mat-icon,\n  .mat-form-field-suffix .mat-icon-button .mat-icon {\n    height: 1.125em;\n    line-height: 1.125; }\n.mat-form-field-infix {\n  padding: 0.5em 0;\n  border-top: 0.84375em solid transparent; }\n.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.34375em) scale(0.75);\n          transform: translateY(-1.34375em) scale(0.75);\n  width: 133.33333333%; }\n.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper\n.mat-form-field-label {\n  -webkit-transform: translateY(-1.34374em) scale(0.75);\n          transform: translateY(-1.34374em) scale(0.75);\n  width: 133.33334333%; }\n.mat-form-field-label-wrapper {\n  top: -0.84375em;\n  padding-top: 0.84375em; }\n.mat-form-field-label {\n  top: 1.34375em; }\n.mat-form-field-underline {\n  bottom: 1.34375em; }\n.mat-form-field-subscript-wrapper {\n  font-size: 75%;\n  margin-top: 0.66666667em;\n  top: calc(100% - 1.79166667em); }\n.mat-form-field-appearance-legacy .mat-form-field-wrapper {\n  padding-bottom: 1.25em; }\n.mat-form-field-appearance-legacy .mat-form-field-infix {\n  padding: 0.4375em 0; }\n.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.001px);\n          transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.001px);\n  -ms-transform: translateY(-1.28125em) scale(0.75);\n  width: 133.33333333%; }\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill + .mat-form-field-label-wrapper\n.mat-form-field-label {\n  -webkit-transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00101px);\n          transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00101px);\n  -ms-transform: translateY(-1.28124em) scale(0.75);\n  width: 133.33334333%; }\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper\n.mat-form-field-label {\n  -webkit-transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00102px);\n          transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00102px);\n  -ms-transform: translateY(-1.28123em) scale(0.75);\n  width: 133.33335333%; }\n.mat-form-field-appearance-legacy .mat-form-field-label {\n  top: 1.28125em; }\n.mat-form-field-appearance-legacy .mat-form-field-underline {\n  bottom: 1.25em; }\n.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper {\n  margin-top: 0.54166667em;\n  top: calc(100% - 1.66666667em); }\n.mat-form-field-appearance-fill .mat-form-field-infix {\n  padding: 0.25em 0 0.75em 0; }\n.mat-form-field-appearance-fill .mat-form-field-label {\n  top: 1.09375em;\n  margin-top: -0.5em; }\n.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-0.59375em) scale(0.75);\n          transform: translateY(-0.59375em) scale(0.75);\n  width: 133.33333333%; }\n.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper\n.mat-form-field-label {\n  -webkit-transform: translateY(-0.59374em) scale(0.75);\n          transform: translateY(-0.59374em) scale(0.75);\n  width: 133.33334333%; }\n.mat-form-field-appearance-outline .mat-form-field-infix {\n  padding: 1em 0 1em 0; }\n.mat-form-field-appearance-outline .mat-form-field-label {\n  top: 1.84375em;\n  margin-top: -0.25em; }\n.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.59375em) scale(0.75);\n          transform: translateY(-1.59375em) scale(0.75);\n  width: 133.33333333%; }\n.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper\n.mat-form-field-label {\n  -webkit-transform: translateY(-1.59374em) scale(0.75);\n          transform: translateY(-1.59374em) scale(0.75);\n  width: 133.33334333%; }\n.mat-grid-tile-header,\n.mat-grid-tile-footer {\n  font-size: 14px; }\n.mat-grid-tile-header .mat-line,\n  .mat-grid-tile-footer .mat-line {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    box-sizing: border-box; }\n.mat-grid-tile-header .mat-line:nth-child(n+2),\n    .mat-grid-tile-footer .mat-line:nth-child(n+2) {\n      font-size: 12px; }\ninput.mat-input-element {\n  margin-top: -0.0625em; }\n.mat-menu-item {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 16px;\n  font-weight: 400; }\n.mat-paginator,\n.mat-paginator-page-size .mat-select-trigger {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px; }\n.mat-radio-button {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-select {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-select-trigger {\n  height: 1.125em; }\n.mat-slide-toggle-content {\n  font: 400 14px/20px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-slider-thumb-label-text {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px;\n  font-weight: 500; }\n.mat-stepper-vertical, .mat-stepper-horizontal {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-step-label {\n  font-size: 14px;\n  font-weight: 400; }\n.mat-step-label-selected {\n  font-size: 14px;\n  font-weight: 500; }\n.mat-tab-group {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-tab-label, .mat-tab-link {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500; }\n.mat-toolbar,\n.mat-toolbar h1,\n.mat-toolbar h2,\n.mat-toolbar h3,\n.mat-toolbar h4,\n.mat-toolbar h5,\n.mat-toolbar h6 {\n  font: 500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0; }\n.mat-tooltip {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 10px;\n  padding-top: 6px;\n  padding-bottom: 6px; }\n.mat-tooltip-handset {\n  font-size: 14px;\n  padding-top: 9px;\n  padding-bottom: 9px; }\n.mat-list-item {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-list-option {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-list .mat-list-item, .mat-nav-list .mat-list-item, .mat-selection-list .mat-list-item {\n  font-size: 16px; }\n.mat-list .mat-list-item .mat-line, .mat-nav-list .mat-list-item .mat-line, .mat-selection-list .mat-list-item .mat-line {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    box-sizing: border-box; }\n.mat-list .mat-list-item .mat-line:nth-child(n+2), .mat-nav-list .mat-list-item .mat-line:nth-child(n+2), .mat-selection-list .mat-list-item .mat-line:nth-child(n+2) {\n      font-size: 14px; }\n.mat-list .mat-list-option, .mat-nav-list .mat-list-option, .mat-selection-list .mat-list-option {\n  font-size: 16px; }\n.mat-list .mat-list-option .mat-line, .mat-nav-list .mat-list-option .mat-line, .mat-selection-list .mat-list-option .mat-line {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    box-sizing: border-box; }\n.mat-list .mat-list-option .mat-line:nth-child(n+2), .mat-nav-list .mat-list-option .mat-line:nth-child(n+2), .mat-selection-list .mat-list-option .mat-line:nth-child(n+2) {\n      font-size: 14px; }\n.mat-list .mat-subheader, .mat-nav-list .mat-subheader, .mat-selection-list .mat-subheader {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500; }\n.mat-list[dense] .mat-list-item, .mat-nav-list[dense] .mat-list-item, .mat-selection-list[dense] .mat-list-item {\n  font-size: 12px; }\n.mat-list[dense] .mat-list-item .mat-line, .mat-nav-list[dense] .mat-list-item .mat-line, .mat-selection-list[dense] .mat-list-item .mat-line {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    box-sizing: border-box; }\n.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2), .mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2), .mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2) {\n      font-size: 12px; }\n.mat-list[dense] .mat-list-option, .mat-nav-list[dense] .mat-list-option, .mat-selection-list[dense] .mat-list-option {\n  font-size: 12px; }\n.mat-list[dense] .mat-list-option .mat-line, .mat-nav-list[dense] .mat-list-option .mat-line, .mat-selection-list[dense] .mat-list-option .mat-line {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    box-sizing: border-box; }\n.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2), .mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2), .mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2) {\n      font-size: 12px; }\n.mat-list[dense] .mat-subheader, .mat-nav-list[dense] .mat-subheader, .mat-selection-list[dense] .mat-subheader {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px;\n  font-weight: 500; }\n.mat-option {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 16px; }\n.mat-optgroup-label {\n  font: 500 14px/24px Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-simple-snackbar {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px; }\n.mat-simple-snackbar-action {\n  line-height: 1;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: 500; }\n.mat-tree {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif; }\n.mat-tree-node {\n  font-weight: 400;\n  font-size: 14px; }\n.mat-ripple {\n  overflow: hidden; }\n@media screen and (-ms-high-contrast: active) {\n    .mat-ripple {\n      display: none; } }\n.mat-ripple.mat-ripple-unbounded {\n  overflow: visible; }\n.mat-ripple-element {\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: opacity, -webkit-transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  -webkit-transform: scale(0);\n          transform: scale(0); }\n.cdk-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none; }\n.cdk-overlay-container, .cdk-global-overlay-wrapper {\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%; }\n.cdk-overlay-container {\n  position: fixed;\n  z-index: 1000; }\n.cdk-overlay-container:empty {\n    display: none; }\n.cdk-global-overlay-wrapper {\n  display: flex;\n  position: absolute;\n  z-index: 1000; }\n.cdk-overlay-pane {\n  position: absolute;\n  pointer-events: auto;\n  box-sizing: border-box;\n  z-index: 1000;\n  display: flex;\n  max-width: 100%;\n  max-height: 100%; }\n.cdk-overlay-backdrop {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n  pointer-events: auto;\n  -webkit-tap-highlight-color: transparent;\n  transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n  opacity: 0; }\n.cdk-overlay-backdrop.cdk-overlay-backdrop-showing {\n    opacity: 1; }\n@media screen and (-ms-high-contrast: active) {\n      .cdk-overlay-backdrop.cdk-overlay-backdrop-showing {\n        opacity: 0.6; } }\n.cdk-overlay-dark-backdrop {\n  background: rgba(0, 0, 0, 0.288); }\n.cdk-overlay-transparent-backdrop, .cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing {\n  opacity: 0; }\n.cdk-overlay-connected-position-bounding-box {\n  position: absolute;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  min-width: 1px;\n  min-height: 1px; }\n.cdk-global-scrollblock {\n  position: fixed;\n  width: 100%;\n  overflow-y: scroll; }\n@-webkit-keyframes cdk-text-field-autofill-start {}\n@keyframes cdk-text-field-autofill-start {}\n@-webkit-keyframes cdk-text-field-autofill-end {}\n@keyframes cdk-text-field-autofill-end {}\n.cdk-text-field-autofill-monitored:-webkit-autofill {\n  -webkit-animation-name: cdk-text-field-autofill-start;\n          animation-name: cdk-text-field-autofill-start; }\n.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {\n  -webkit-animation-name: cdk-text-field-autofill-end;\n          animation-name: cdk-text-field-autofill-end; }\ntextarea.cdk-textarea-autosize {\n  resize: none; }\ntextarea.cdk-textarea-autosize-measuring {\n  height: auto !important;\n  overflow: hidden !important;\n  padding: 2px 0 !important;\n  box-sizing: content-box !important; }\n.mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1); }\n.mat-option {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-option:hover:not(.mat-option-disabled), .mat-option:focus:not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {\n    background: rgba(0, 0, 0, 0.04); }\n.mat-option.mat-active {\n    background: rgba(0, 0, 0, 0.04);\n    color: rgba(0, 0, 0, 0.87); }\n.mat-option.mat-option-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #212121; }\n.mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #fdd835; }\n.mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #c62828; }\n.mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-optgroup-disabled .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-pseudo-checkbox {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-pseudo-checkbox::after {\n    color: #fafafa; }\n.mat-pseudo-checkbox-checked,\n.mat-pseudo-checkbox-indeterminate,\n.mat-accent .mat-pseudo-checkbox-checked,\n.mat-accent .mat-pseudo-checkbox-indeterminate {\n  background: #fdd835; }\n.mat-primary .mat-pseudo-checkbox-checked,\n.mat-primary .mat-pseudo-checkbox-indeterminate {\n  background: #212121; }\n.mat-warn .mat-pseudo-checkbox-checked,\n.mat-warn .mat-pseudo-checkbox-indeterminate {\n  background: #c62828; }\n.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,\n.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background: #b0b0b0; }\n.mat-app-background {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-theme-loaded-marker {\n  display: none; }\n.mat-autocomplete-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {\n    background: white; }\n.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {\n      color: rgba(0, 0, 0, 0.87); }\n.mat-badge-content {\n  color: white;\n  background: #212121; }\n.mat-badge-accent .mat-badge-content {\n  background: #fdd835;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-badge-warn .mat-badge-content {\n  color: white;\n  background: #c62828; }\n.mat-badge {\n  position: relative; }\n.mat-badge-hidden .mat-badge-content {\n  display: none; }\n.mat-badge-content {\n  position: absolute;\n  text-align: center;\n  display: inline-block;\n  border-radius: 50%;\n  transition: -webkit-transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out;\n  transition: transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;\n  -webkit-transform: scale(0.6);\n          transform: scale(0.6);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none; }\n.mat-badge-content.mat-badge-active {\n  -webkit-transform: none;\n          transform: none; }\n.mat-badge-small .mat-badge-content {\n  width: 16px;\n  height: 16px;\n  line-height: 16px; }\n@media screen and (-ms-high-contrast: active) {\n    .mat-badge-small .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.mat-badge-small.mat-badge-above .mat-badge-content {\n  top: -8px; }\n.mat-badge-small.mat-badge-below .mat-badge-content {\n  bottom: -8px; }\n.mat-badge-small.mat-badge-before .mat-badge-content {\n  left: -16px; }\n[dir='rtl'] .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -16px; }\n.mat-badge-small.mat-badge-after .mat-badge-content {\n  right: -16px; }\n[dir='rtl'] .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -16px; }\n.mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -8px; }\n[dir='rtl'] .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -8px; }\n.mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -8px; }\n[dir='rtl'] .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -8px; }\n.mat-badge-medium .mat-badge-content {\n  width: 22px;\n  height: 22px;\n  line-height: 22px; }\n@media screen and (-ms-high-contrast: active) {\n    .mat-badge-medium .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.mat-badge-medium.mat-badge-above .mat-badge-content {\n  top: -11px; }\n.mat-badge-medium.mat-badge-below .mat-badge-content {\n  bottom: -11px; }\n.mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: -22px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -22px; }\n.mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: -22px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -22px; }\n.mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -11px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -11px; }\n.mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -11px; }\n[dir='rtl'] .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -11px; }\n.mat-badge-large .mat-badge-content {\n  width: 28px;\n  height: 28px;\n  line-height: 28px; }\n@media screen and (-ms-high-contrast: active) {\n    .mat-badge-large .mat-badge-content {\n      outline: solid 1px;\n      border-radius: 0; } }\n.mat-badge-large.mat-badge-above .mat-badge-content {\n  top: -14px; }\n.mat-badge-large.mat-badge-below .mat-badge-content {\n  bottom: -14px; }\n.mat-badge-large.mat-badge-before .mat-badge-content {\n  left: -28px; }\n[dir='rtl'] .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -28px; }\n.mat-badge-large.mat-badge-after .mat-badge-content {\n  right: -28px; }\n[dir='rtl'] .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -28px; }\n.mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -14px; }\n[dir='rtl'] .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -14px; }\n.mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -14px; }\n[dir='rtl'] .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -14px; }\n.mat-bottom-sheet-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-button, .mat-icon-button, .mat-stroked-button {\n  color: inherit;\n  background: transparent; }\n.mat-button.mat-primary, .mat-icon-button.mat-primary, .mat-stroked-button.mat-primary {\n    color: #212121; }\n.mat-button.mat-accent, .mat-icon-button.mat-accent, .mat-stroked-button.mat-accent {\n    color: #fdd835; }\n.mat-button.mat-warn, .mat-icon-button.mat-warn, .mat-stroked-button.mat-warn {\n    color: #c62828; }\n.mat-button.mat-primary[disabled], .mat-button.mat-accent[disabled], .mat-button.mat-warn[disabled], .mat-button[disabled][disabled], .mat-icon-button.mat-primary[disabled], .mat-icon-button.mat-accent[disabled], .mat-icon-button.mat-warn[disabled], .mat-icon-button[disabled][disabled], .mat-stroked-button.mat-primary[disabled], .mat-stroked-button.mat-accent[disabled], .mat-stroked-button.mat-warn[disabled], .mat-stroked-button[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.mat-button.mat-primary .mat-button-focus-overlay, .mat-icon-button.mat-primary .mat-button-focus-overlay, .mat-stroked-button.mat-primary .mat-button-focus-overlay {\n    background-color: rgba(33, 33, 33, 0.12); }\n.mat-button.mat-accent .mat-button-focus-overlay, .mat-icon-button.mat-accent .mat-button-focus-overlay, .mat-stroked-button.mat-accent .mat-button-focus-overlay {\n    background-color: rgba(253, 216, 53, 0.12); }\n.mat-button.mat-warn .mat-button-focus-overlay, .mat-icon-button.mat-warn .mat-button-focus-overlay, .mat-stroked-button.mat-warn .mat-button-focus-overlay {\n    background-color: rgba(198, 40, 40, 0.12); }\n.mat-button[disabled] .mat-button-focus-overlay, .mat-icon-button[disabled] .mat-button-focus-overlay, .mat-stroked-button[disabled] .mat-button-focus-overlay {\n    background-color: transparent; }\n.mat-button.mat-primary .mat-ripple-element, .mat-icon-button.mat-primary .mat-ripple-element, .mat-stroked-button.mat-primary .mat-ripple-element {\n    background-color: rgba(33, 33, 33, 0.1); }\n.mat-button.mat-accent .mat-ripple-element, .mat-icon-button.mat-accent .mat-ripple-element, .mat-stroked-button.mat-accent .mat-ripple-element {\n    background-color: rgba(253, 216, 53, 0.1); }\n.mat-button.mat-warn .mat-ripple-element, .mat-icon-button.mat-warn .mat-ripple-element, .mat-stroked-button.mat-warn .mat-ripple-element {\n    background-color: rgba(198, 40, 40, 0.1); }\n.mat-flat-button, .mat-raised-button, .mat-fab, .mat-mini-fab {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white; }\n.mat-flat-button.mat-primary, .mat-raised-button.mat-primary, .mat-fab.mat-primary, .mat-mini-fab.mat-primary {\n    color: white; }\n.mat-flat-button.mat-accent, .mat-raised-button.mat-accent, .mat-fab.mat-accent, .mat-mini-fab.mat-accent {\n    color: rgba(0, 0, 0, 0.87); }\n.mat-flat-button.mat-warn, .mat-raised-button.mat-warn, .mat-fab.mat-warn, .mat-mini-fab.mat-warn {\n    color: white; }\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-accent[disabled], .mat-flat-button.mat-warn[disabled], .mat-flat-button[disabled][disabled], .mat-raised-button.mat-primary[disabled], .mat-raised-button.mat-accent[disabled], .mat-raised-button.mat-warn[disabled], .mat-raised-button[disabled][disabled], .mat-fab.mat-primary[disabled], .mat-fab.mat-accent[disabled], .mat-fab.mat-warn[disabled], .mat-fab[disabled][disabled], .mat-mini-fab.mat-primary[disabled], .mat-mini-fab.mat-accent[disabled], .mat-mini-fab.mat-warn[disabled], .mat-mini-fab[disabled][disabled] {\n    color: rgba(0, 0, 0, 0.26); }\n.mat-flat-button.mat-primary, .mat-raised-button.mat-primary, .mat-fab.mat-primary, .mat-mini-fab.mat-primary {\n    background-color: #212121; }\n.mat-flat-button.mat-accent, .mat-raised-button.mat-accent, .mat-fab.mat-accent, .mat-mini-fab.mat-accent {\n    background-color: #fdd835; }\n.mat-flat-button.mat-warn, .mat-raised-button.mat-warn, .mat-fab.mat-warn, .mat-mini-fab.mat-warn {\n    background-color: #c62828; }\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-accent[disabled], .mat-flat-button.mat-warn[disabled], .mat-flat-button[disabled][disabled], .mat-raised-button.mat-primary[disabled], .mat-raised-button.mat-accent[disabled], .mat-raised-button.mat-warn[disabled], .mat-raised-button[disabled][disabled], .mat-fab.mat-primary[disabled], .mat-fab.mat-accent[disabled], .mat-fab.mat-warn[disabled], .mat-fab[disabled][disabled], .mat-mini-fab.mat-primary[disabled], .mat-mini-fab.mat-accent[disabled], .mat-mini-fab.mat-warn[disabled], .mat-mini-fab[disabled][disabled] {\n    background-color: rgba(0, 0, 0, 0.12); }\n.mat-flat-button.mat-primary .mat-ripple-element, .mat-raised-button.mat-primary .mat-ripple-element, .mat-fab.mat-primary .mat-ripple-element, .mat-mini-fab.mat-primary .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.mat-flat-button.mat-accent .mat-ripple-element, .mat-raised-button.mat-accent .mat-ripple-element, .mat-fab.mat-accent .mat-ripple-element, .mat-mini-fab.mat-accent .mat-ripple-element {\n    background-color: rgba(0, 0, 0, 0.1); }\n.mat-flat-button.mat-warn .mat-ripple-element, .mat-raised-button.mat-warn .mat-ripple-element, .mat-fab.mat-warn .mat-ripple-element, .mat-mini-fab.mat-warn .mat-ripple-element {\n    background-color: rgba(255, 255, 255, 0.1); }\n.mat-icon-button.mat-primary .mat-ripple-element {\n  background-color: rgba(33, 33, 33, 0.2); }\n.mat-icon-button.mat-accent .mat-ripple-element {\n  background-color: rgba(253, 216, 53, 0.2); }\n.mat-icon-button.mat-warn .mat-ripple-element {\n  background-color: rgba(198, 40, 40, 0.2); }\n.mat-button-toggle {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-button-toggle .mat-button-toggle-focus-overlay {\n    background-color: rgba(0, 0, 0, 0.12); }\n.mat-button-toggle-checked {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.54); }\n.mat-button-toggle-disabled {\n  background-color: #eeeeee;\n  color: rgba(0, 0, 0, 0.26); }\n.mat-button-toggle-disabled.mat-button-toggle-checked {\n    background-color: #bdbdbd; }\n.mat-card {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-card-subtitle {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-checkbox-frame {\n  border-color: rgba(0, 0, 0, 0.54); }\n.mat-checkbox-checkmark {\n  fill: #fafafa; }\n.mat-checkbox-checkmark-path {\n  stroke: #fafafa !important; }\n@media screen and (-ms-high-contrast: black-on-white) {\n    .mat-checkbox-checkmark-path {\n      stroke: #000 !important; } }\n.mat-checkbox-mixedmark {\n  background-color: #fafafa; }\n.mat-checkbox-indeterminate.mat-primary .mat-checkbox-background, .mat-checkbox-checked.mat-primary .mat-checkbox-background {\n  background-color: #212121; }\n.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .mat-checkbox-checked.mat-accent .mat-checkbox-background {\n  background-color: #fdd835; }\n.mat-checkbox-indeterminate.mat-warn .mat-checkbox-background, .mat-checkbox-checked.mat-warn .mat-checkbox-background {\n  background-color: #c62828; }\n.mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {\n  background-color: #b0b0b0; }\n.mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {\n  border-color: #b0b0b0; }\n.mat-checkbox-disabled .mat-checkbox-label {\n  color: #b0b0b0; }\n@media screen and (-ms-high-contrast: active) {\n  .mat-checkbox-disabled {\n    opacity: 0.5; } }\n@media screen and (-ms-high-contrast: active) {\n  .mat-checkbox-background {\n    background: none; } }\n.mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(33, 33, 33, 0.26); }\n.mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(253, 216, 53, 0.26); }\n.mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element {\n  background-color: rgba(198, 40, 40, 0.26); }\n.mat-chip.mat-standard-chip {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-chip.mat-standard-chip .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {\n  background-color: #212121;\n  color: white; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {\n  background-color: #c62828;\n  color: white; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {\n    color: white;\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {\n  background-color: #fdd835;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {\n    color: rgba(0, 0, 0, 0.87);\n    opacity: 0.4; }\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover {\n    opacity: 0.54; }\n.mat-table {\n  background: white; }\n.mat-table thead, .mat-table tbody, .mat-table tfoot,\nmat-header-row, mat-row, mat-footer-row,\n[mat-header-row], [mat-row], [mat-footer-row],\n.mat-table-sticky {\n  background: inherit; }\nmat-row, mat-header-row, mat-footer-row,\nth.mat-header-cell, td.mat-cell, td.mat-footer-cell {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n.mat-header-cell {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-cell, .mat-footer-cell {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-calendar-arrow {\n  border-top-color: rgba(0, 0, 0, 0.54); }\n.mat-datepicker-toggle,\n.mat-datepicker-content .mat-calendar-next-button,\n.mat-datepicker-content .mat-calendar-previous-button {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-calendar-table-header {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-calendar-table-header-divider::after {\n  background: rgba(0, 0, 0, 0.12); }\n.mat-calendar-body-label {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-calendar-body-cell-content {\n  color: rgba(0, 0, 0, 0.87);\n  border-color: transparent; }\n.mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected),\n.cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected) {\n  background-color: rgba(0, 0, 0, 0.04); }\n.mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected) {\n  border-color: rgba(0, 0, 0, 0.18); }\n.mat-calendar-body-selected {\n  background-color: #212121;\n  color: white; }\n.mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(33, 33, 33, 0.4); }\n.mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px white; }\n.mat-datepicker-content {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-datepicker-content.mat-accent .mat-calendar-body-selected {\n    background-color: #fdd835;\n    color: rgba(0, 0, 0, 0.87); }\n.mat-datepicker-content.mat-accent .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(253, 216, 53, 0.4); }\n.mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.87); }\n.mat-datepicker-content.mat-warn .mat-calendar-body-selected {\n    background-color: #c62828;\n    color: white; }\n.mat-datepicker-content.mat-warn .mat-calendar-body-disabled > .mat-calendar-body-selected {\n    background-color: rgba(198, 40, 40, 0.4); }\n.mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {\n    box-shadow: inset 0 0 0 1px white; }\n.mat-datepicker-toggle-active {\n  color: #212121; }\n.mat-datepicker-toggle-active.mat-accent {\n    color: #fdd835; }\n.mat-datepicker-toggle-active.mat-warn {\n    color: #c62828; }\n.mat-dialog-container {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-divider {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.mat-divider-vertical {\n  border-right-color: rgba(0, 0, 0, 0.12); }\n.mat-expansion-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-action-row {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused, .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused, .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover {\n  background: rgba(0, 0, 0, 0.04); }\n.mat-expansion-panel-header-title {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-expansion-panel-header-description,\n.mat-expansion-indicator::after {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-expansion-panel-header[aria-disabled='true'] {\n  color: rgba(0, 0, 0, 0.26); }\n.mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,\n  .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description {\n    color: inherit; }\n.mat-form-field-label {\n  color: rgba(0, 0, 0, 0.6); }\n.mat-hint {\n  color: rgba(0, 0, 0, 0.6); }\n.mat-form-field.mat-focused .mat-form-field-label {\n  color: #212121; }\n.mat-form-field.mat-focused .mat-form-field-label.mat-accent {\n    color: #fdd835; }\n.mat-form-field.mat-focused .mat-form-field-label.mat-warn {\n    color: #c62828; }\n.mat-focused .mat-form-field-required-marker {\n  color: #fdd835; }\n.mat-form-field-ripple {\n  background-color: rgba(0, 0, 0, 0.87); }\n.mat-form-field.mat-focused .mat-form-field-ripple {\n  background-color: #212121; }\n.mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {\n    background-color: #fdd835; }\n.mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {\n    background-color: #c62828; }\n.mat-form-field.mat-form-field-invalid .mat-form-field-label {\n  color: #c62828; }\n.mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,\n  .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {\n    color: #c62828; }\n.mat-form-field.mat-form-field-invalid .mat-form-field-ripple,\n.mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {\n  background-color: #c62828; }\n.mat-error {\n  color: #c62828; }\n.mat-form-field-appearance-legacy .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-form-field-appearance-legacy .mat-hint {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-form-field-appearance-legacy .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.mat-form-field-appearance-standard .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42); }\n.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x; }\n.mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.04); }\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.02); }\n.mat-form-field-appearance-fill .mat-form-field-underline::before {\n  background-color: rgba(0, 0, 0, 0.42); }\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {\n  background-color: transparent; }\n.mat-form-field-appearance-outline .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.12); }\n.mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {\n  color: #212121; }\n.mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {\n  color: #fdd835; }\n.mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {\n  color: #c62828; }\n.mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {\n  color: #c62828; }\n.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.06); }\n.mat-icon.mat-primary {\n  color: #212121; }\n.mat-icon.mat-accent {\n  color: #fdd835; }\n.mat-icon.mat-warn {\n  color: #c62828; }\n.mat-input-element:disabled {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-input-element {\n  caret-color: #212121; }\n.mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::-moz-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element::-webkit-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-input-element:-ms-input-placeholder {\n    color: rgba(0, 0, 0, 0.42); }\n.mat-accent .mat-input-element {\n  caret-color: #fdd835; }\n.mat-warn .mat-input-element,\n.mat-form-field-invalid .mat-input-element {\n  caret-color: #c62828; }\n.mat-list .mat-list-item, .mat-nav-list .mat-list-item, .mat-selection-list .mat-list-item {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-list .mat-list-option, .mat-nav-list .mat-list-option, .mat-selection-list .mat-list-option {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-list .mat-subheader, .mat-nav-list .mat-subheader, .mat-selection-list .mat-subheader {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-list-item-disabled {\n  background-color: #eeeeee; }\n.mat-list-option:hover, .mat-list-option.mat-list-item-focus,\n.mat-nav-list .mat-list-item:hover,\n.mat-nav-list .mat-list-item.mat-list-item-focus {\n  background: rgba(0, 0, 0, 0.04); }\n.mat-menu-panel {\n  background: white; }\n.mat-menu-item {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-menu-item[disabled], .mat-menu-item[disabled]::after {\n    color: rgba(0, 0, 0, 0.38); }\n.mat-menu-item .mat-icon:not([color]),\n.mat-menu-item-submenu-trigger::after {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-menu-item:hover:not([disabled]),\n.mat-menu-item.cdk-program-focused:not([disabled]),\n.mat-menu-item.cdk-keyboard-focused:not([disabled]),\n.mat-menu-item-highlighted:not([disabled]) {\n  background: rgba(0, 0, 0, 0.04); }\n.mat-paginator {\n  background: white; }\n.mat-paginator,\n.mat-paginator-page-size .mat-select-trigger {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-paginator-decrement,\n.mat-paginator-increment {\n  border-top: 2px solid rgba(0, 0, 0, 0.54);\n  border-right: 2px solid rgba(0, 0, 0, 0.54); }\n.mat-paginator-first,\n.mat-paginator-last {\n  border-top: 2px solid rgba(0, 0, 0, 0.54); }\n.mat-icon-button[disabled] .mat-paginator-decrement,\n.mat-icon-button[disabled] .mat-paginator-increment,\n.mat-icon-button[disabled] .mat-paginator-first,\n.mat-icon-button[disabled] .mat-paginator-last {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-progress-bar-background {\n  fill: #616161; }\n.mat-progress-bar-buffer {\n  background-color: #616161; }\n.mat-progress-bar-fill::after {\n  background-color: #212121; }\n.mat-progress-bar.mat-accent .mat-progress-bar-background {\n  fill: #fff176; }\n.mat-progress-bar.mat-accent .mat-progress-bar-buffer {\n  background-color: #fff176; }\n.mat-progress-bar.mat-accent .mat-progress-bar-fill::after {\n  background-color: #fdd835; }\n.mat-progress-bar.mat-warn .mat-progress-bar-background {\n  fill: #ffcdd2; }\n.mat-progress-bar.mat-warn .mat-progress-bar-buffer {\n  background-color: #ffcdd2; }\n.mat-progress-bar.mat-warn .mat-progress-bar-fill::after {\n  background-color: #c62828; }\n.mat-progress-spinner circle, .mat-spinner circle {\n  stroke: #212121; }\n.mat-progress-spinner.mat-accent circle, .mat-spinner.mat-accent circle {\n  stroke: #fdd835; }\n.mat-progress-spinner.mat-warn circle, .mat-spinner.mat-warn circle {\n  stroke: #c62828; }\n.mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.54); }\n.mat-radio-disabled .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-radio-disabled .mat-radio-ripple .mat-ripple-element, .mat-radio-disabled .mat-radio-inner-circle {\n  background-color: rgba(0, 0, 0, 0.38); }\n.mat-radio-disabled .mat-radio-label-content {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #212121; }\n.mat-radio-button.mat-primary .mat-radio-inner-circle {\n  background-color: #212121; }\n.mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(33, 33, 33, 0.26); }\n.mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #fdd835; }\n.mat-radio-button.mat-accent .mat-radio-inner-circle {\n  background-color: #fdd835; }\n.mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(253, 216, 53, 0.26); }\n.mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #c62828; }\n.mat-radio-button.mat-warn .mat-radio-inner-circle {\n  background-color: #c62828; }\n.mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element {\n  background-color: rgba(198, 40, 40, 0.26); }\n.mat-select-content, .mat-select-panel-done-animating {\n  background: white; }\n.mat-select-value {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-select-placeholder {\n  color: rgba(0, 0, 0, 0.42); }\n.mat-select-disabled .mat-select-value {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-select-arrow {\n  color: rgba(0, 0, 0, 0.54); }\n.mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: rgba(0, 0, 0, 0.12); }\n.mat-form-field.mat-focused.mat-primary .mat-select-arrow {\n  color: #212121; }\n.mat-form-field.mat-focused.mat-accent .mat-select-arrow {\n  color: #fdd835; }\n.mat-form-field.mat-focused.mat-warn .mat-select-arrow {\n  color: #c62828; }\n.mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {\n  color: #c62828; }\n.mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-drawer {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-drawer.mat-drawer-push {\n    background-color: white; }\n.mat-drawer-backdrop.mat-drawer-shown {\n  background-color: rgba(0, 0, 0, 0.6); }\n.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #ffeb3b; }\n.mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(255, 235, 59, 0.5); }\n.mat-slide-toggle:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.mat-slide-toggle .mat-ripple-element {\n  background-color: rgba(255, 235, 59, 0.12); }\n.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #9e9e9e; }\n.mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(158, 158, 158, 0.5); }\n.mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.mat-slide-toggle.mat-primary .mat-ripple-element {\n  background-color: rgba(158, 158, 158, 0.12); }\n.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb {\n  background-color: #f44336; }\n.mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar {\n  background-color: rgba(244, 67, 54, 0.5); }\n.mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.06); }\n.mat-slide-toggle.mat-warn .mat-ripple-element {\n  background-color: rgba(244, 67, 54, 0.12); }\n.mat-disabled .mat-slide-toggle-thumb {\n  background-color: #bdbdbd; }\n.mat-disabled .mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.1); }\n.mat-slide-toggle-thumb {\n  background-color: #fafafa; }\n.mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.38); }\n.mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-primary .mat-slider-track-fill,\n.mat-primary .mat-slider-thumb,\n.mat-primary .mat-slider-thumb-label {\n  background-color: #212121; }\n.mat-primary .mat-slider-thumb-label-text {\n  color: white; }\n.mat-accent .mat-slider-track-fill,\n.mat-accent .mat-slider-thumb,\n.mat-accent .mat-slider-thumb-label {\n  background-color: #fdd835; }\n.mat-accent .mat-slider-thumb-label-text {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-warn .mat-slider-track-fill,\n.mat-warn .mat-slider-thumb,\n.mat-warn .mat-slider-thumb-label {\n  background-color: #c62828; }\n.mat-warn .mat-slider-thumb-label-text {\n  color: white; }\n.mat-slider-focus-ring {\n  background-color: rgba(253, 216, 53, 0.2); }\n.mat-slider:hover .mat-slider-track-background,\n.cdk-focused .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.38); }\n.mat-slider-disabled .mat-slider-track-background,\n.mat-slider-disabled .mat-slider-track-fill,\n.mat-slider-disabled .mat-slider-thumb {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-disabled:hover .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-min-value .mat-slider-focus-ring {\n  background-color: rgba(0, 0, 0, 0.12); }\n.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,\n.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.87); }\n.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,\n.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26);\n  background-color: transparent; }\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb, .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb, .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26); }\n.mat-slider-has-ticks .mat-slider-wrapper::after {\n  border-color: rgba(0, 0, 0, 0.7); }\n.mat-slider-horizontal .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n  background-image: -moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.mat-slider-vertical .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent); }\n.mat-step-header.cdk-keyboard-focused, .mat-step-header.cdk-program-focused, .mat-step-header:hover {\n  background-color: rgba(0, 0, 0, 0.04); }\n.mat-step-header .mat-step-label,\n.mat-step-header .mat-step-optional {\n  color: rgba(0, 0, 0, 0.38); }\n.mat-step-header .mat-step-icon {\n  background-color: #212121;\n  color: white; }\n.mat-step-header .mat-step-icon-not-touched {\n  background-color: rgba(0, 0, 0, 0.38);\n  color: white; }\n.mat-step-header .mat-step-label.mat-step-label-active {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-stepper-horizontal, .mat-stepper-vertical {\n  background-color: white; }\n.mat-stepper-vertical-line::before {\n  border-left-color: rgba(0, 0, 0, 0.12); }\n.mat-stepper-horizontal-line {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n.mat-sort-header-arrow {\n  color: #757575; }\n.mat-tab-nav-bar,\n.mat-tab-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n.mat-tab-group-inverted-header .mat-tab-nav-bar,\n.mat-tab-group-inverted-header .mat-tab-header {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  border-bottom: none; }\n.mat-tab-label, .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-tab-label.mat-tab-disabled, .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.38); }\n.mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.38); }\n.mat-tab-group[class*='mat-background-'] .mat-tab-header,\n.mat-tab-nav-bar[class*='mat-background-'] {\n  border-bottom: none;\n  border-top: none; }\n.mat-tab-group.mat-primary .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-group.mat-primary .mat-tab-link:not(.mat-tab-disabled):focus, .mat-tab-nav-bar.mat-primary .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-nav-bar.mat-primary .mat-tab-link:not(.mat-tab-disabled):focus {\n  background-color: rgba(97, 97, 97, 0.3); }\n.mat-tab-group.mat-primary .mat-ink-bar, .mat-tab-nav-bar.mat-primary .mat-ink-bar {\n  background-color: #212121; }\n.mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar, .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar {\n  background-color: white; }\n.mat-tab-group.mat-accent .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-group.mat-accent .mat-tab-link:not(.mat-tab-disabled):focus, .mat-tab-nav-bar.mat-accent .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-nav-bar.mat-accent .mat-tab-link:not(.mat-tab-disabled):focus {\n  background-color: rgba(255, 241, 118, 0.3); }\n.mat-tab-group.mat-accent .mat-ink-bar, .mat-tab-nav-bar.mat-accent .mat-ink-bar {\n  background-color: #fdd835; }\n.mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar, .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar {\n  background-color: rgba(0, 0, 0, 0.87); }\n.mat-tab-group.mat-warn .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-group.mat-warn .mat-tab-link:not(.mat-tab-disabled):focus, .mat-tab-nav-bar.mat-warn .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-nav-bar.mat-warn .mat-tab-link:not(.mat-tab-disabled):focus {\n  background-color: rgba(255, 205, 210, 0.3); }\n.mat-tab-group.mat-warn .mat-ink-bar, .mat-tab-nav-bar.mat-warn .mat-ink-bar {\n  background-color: #c62828; }\n.mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar, .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar {\n  background-color: white; }\n.mat-tab-group.mat-background-primary .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-group.mat-background-primary .mat-tab-link:not(.mat-tab-disabled):focus, .mat-tab-nav-bar.mat-background-primary .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-nav-bar.mat-background-primary .mat-tab-link:not(.mat-tab-disabled):focus {\n  background-color: rgba(97, 97, 97, 0.3); }\n.mat-tab-group.mat-background-primary .mat-tab-header, .mat-tab-group.mat-background-primary .mat-tab-links, .mat-tab-nav-bar.mat-background-primary .mat-tab-header, .mat-tab-nav-bar.mat-background-primary .mat-tab-links {\n  background-color: #212121; }\n.mat-tab-group.mat-background-primary .mat-tab-label, .mat-tab-group.mat-background-primary .mat-tab-link, .mat-tab-nav-bar.mat-background-primary .mat-tab-label, .mat-tab-nav-bar.mat-background-primary .mat-tab-link {\n  color: white; }\n.mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-primary .mat-ripple-element, .mat-tab-nav-bar.mat-background-primary .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.mat-tab-group.mat-background-accent .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-group.mat-background-accent .mat-tab-link:not(.mat-tab-disabled):focus, .mat-tab-nav-bar.mat-background-accent .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-nav-bar.mat-background-accent .mat-tab-link:not(.mat-tab-disabled):focus {\n  background-color: rgba(255, 241, 118, 0.3); }\n.mat-tab-group.mat-background-accent .mat-tab-header, .mat-tab-group.mat-background-accent .mat-tab-links, .mat-tab-nav-bar.mat-background-accent .mat-tab-header, .mat-tab-nav-bar.mat-background-accent .mat-tab-links {\n  background-color: #fdd835; }\n.mat-tab-group.mat-background-accent .mat-tab-label, .mat-tab-group.mat-background-accent .mat-tab-link, .mat-tab-nav-bar.mat-background-accent .mat-tab-label, .mat-tab-nav-bar.mat-background-accent .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled {\n    color: rgba(0, 0, 0, 0.4); }\n.mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87); }\n.mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.4); }\n.mat-tab-group.mat-background-accent .mat-ripple-element, .mat-tab-nav-bar.mat-background-accent .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.12); }\n.mat-tab-group.mat-background-warn .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-group.mat-background-warn .mat-tab-link:not(.mat-tab-disabled):focus, .mat-tab-nav-bar.mat-background-warn .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-nav-bar.mat-background-warn .mat-tab-link:not(.mat-tab-disabled):focus {\n  background-color: rgba(255, 205, 210, 0.3); }\n.mat-tab-group.mat-background-warn .mat-tab-header, .mat-tab-group.mat-background-warn .mat-tab-links, .mat-tab-nav-bar.mat-background-warn .mat-tab-header, .mat-tab-nav-bar.mat-background-warn .mat-tab-links {\n  background-color: #c62828; }\n.mat-tab-group.mat-background-warn .mat-tab-label, .mat-tab-group.mat-background-warn .mat-tab-link, .mat-tab-nav-bar.mat-background-warn .mat-tab-label, .mat-tab-nav-bar.mat-background-warn .mat-tab-link {\n  color: white; }\n.mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled {\n    color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron {\n  border-color: white; }\n.mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(255, 255, 255, 0.4); }\n.mat-tab-group.mat-background-warn .mat-ripple-element, .mat-tab-nav-bar.mat-background-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.12); }\n.mat-toolbar {\n  background: whitesmoke;\n  color: rgba(0, 0, 0, 0.87); }\n.mat-toolbar.mat-primary {\n    background: #212121;\n    color: white; }\n.mat-toolbar.mat-accent {\n    background: #fdd835;\n    color: rgba(0, 0, 0, 0.87); }\n.mat-toolbar.mat-warn {\n    background: #c62828;\n    color: white; }\n.mat-toolbar .mat-form-field-underline,\n  .mat-toolbar .mat-form-field-ripple,\n  .mat-toolbar .mat-focused .mat-form-field-ripple {\n    background-color: currentColor; }\n.mat-toolbar .mat-form-field-label,\n  .mat-toolbar .mat-focused .mat-form-field-label,\n  .mat-toolbar .mat-select-value,\n  .mat-toolbar .mat-select-arrow,\n  .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n    color: inherit; }\n.mat-toolbar .mat-input-element {\n    caret-color: currentColor; }\n.mat-tooltip {\n  background: rgba(97, 97, 97, 0.9); }\n.mat-tree {\n  background: white; }\n.mat-tree-node {\n  color: rgba(0, 0, 0, 0.87); }\n.mat-snack-bar-container {\n  background: #323232;\n  color: white; }\n.mat-simple-snackbar-action {\n  color: #fdd835; }\n:host() {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  display: block;\n  width: 360px;\n  height: 270px;\n  padding: 40px 40px 100px 40px;\n  background-color: #FFF;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin: -215px auto auto -220px; }\n:host() * {\n    display: inline; }\n:host() .entrar {\n    position: absolute;\n    right: 40px;\n    bottom: 40px;\n    width: 160px; }\n:host() .esqueci {\n    position: absolute;\n    left: 40px;\n    bottom: 40px;\n    font-size: 12px;\n    width: 160px; }\n:host() img {\n    width: 100%; }\n:host() .erro {\n    text-align: center;\n    font-size: 12px;\n    display: block;\n    position: relative;\n    top: -10px;\n    color: #c62828; }\n"

/***/ }),

/***/ "./src/app/_components/login/login.component.ts":
/*!******************************************************!*\
  !*** ./src/app/_components/login/login.component.ts ***!
  \******************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, router, authService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.loginData = { u: '', p: '', f: 'web' };
        this.loginFalhou = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authService.login(this.loginData.u, this.loginData.p, this.loginData.f)
            .subscribe(function (res) {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // Guara dados do usuário logado no localStorage do browser
                localStorage.setItem('currentUser', JSON.stringify(res));
                // Ir para a página home
                _this.router.navigateByUrl('/home');
            }
        }, function (err) {
            // Falha no login
            _this.loginFalhou = true;
        });
    };
    LoginComponent.prototype.onEntrarClick = function () {
        this.login();
    };
    LoginComponent.prototype.onEnterKeyUp = function () {
        this.login();
    };
    LoginComponent.prototype.onEsqueciClick = function () {
        console.log(this.loginData);
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/_components/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/_components/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/_components/movimentos/movimentos.component.html":
/*!******************************************************************!*\
  !*** ./src/app/_components/movimentos/movimentos.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"controles\">\n\t<button mat-raised-button color=\"primary\" (click)=\"onLancarClick()\">Lançar Nota de Entrada</button>\n</div>\n<table>\n\t<thead>\n\t\t<tr>\n\t\t\t<td>Id</td>\n\t\t\t<td>Produto</td>\n\t\t\t<td>Data/Hora</td>\n\t\t\t<td>Entrada</td>\n\t\t\t<td>Saída</td>\n\t\t\t<td>Valor Unit</td>\n\t\t\t<td>Referência</td>\n\t\t\t<td></td>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr *ngFor=\"let m of movimentos\">\n\t\t\t<td>{{m.id}}</td>\n\t\t\t<td>{{m.produto.nome}}</td>\n\t\t\t<td>{{m.dh.toLocaleString()}}</td>\n\t\t\t<td><span *ngIf=\"m.tipo ==  1\">{{m.qtde | number:'1.0-2' | numeroBr}} {{m.produto.unidade}}</span></td>\n\t\t\t<td><span *ngIf=\"m.tipo == -1\">{{m.qtde | number:'1.0-2' | numeroBr}} {{m.produto.unidade}}</span></td>\n\t\t\t<td>{{m.valor_unit | currency:'BRL':symbol:'1.2-2' | moedaBrasil}}</td>\n\t\t\t<td>\n\t\t\t\t<a *ngIf=\"m.tipo == -1\" (click)=\"abrirTarefa()\">S {{m.id_referencia}}</a>\n\t\t\t\t<a *ngIf=\"m.tipo ==  1\" (click)=\"abrirNf()\">E {{m.id_referencia}}</a>\n\t\t\t</td>\n\t\t\t<td>\n\t\t\t\t<button mat-icon-button (click)=\"onEditClick(m)\">\n\t\t\t\t\t<mat-icon>edit</mat-icon>\n\t\t\t\t</button>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>"

/***/ }),

/***/ "./src/app/_components/movimentos/movimentos.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/_components/movimentos/movimentos.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".controles {\n  width: 80%;\n  position: relative;\n  left: 10%;\n  text-align: right;\n  margin-top: 25px; }\n\ntable {\n  width: 80%;\n  position: relative;\n  left: 10%;\n  margin-top: 25px;\n  border-collapse: collapse; }\n\ntable td {\n    padding: 10px;\n    border-bottom: 1px solid #CCC;\n    text-align: center; }\n\ntable thead td {\n    font-size: 12px;\n    color: #666; }\n\ntable tbody td:nth-child(4) {\n    color: blue;\n    text-align: right; }\n\ntable tbody td:nth-child(5) {\n    color: red;\n    text-align: right; }\n\ntable tbody td:nth-child(6) {\n    text-align: right; }\n\ntable tbody tr:last-child td {\n    border-bottom: none; }\n"

/***/ }),

/***/ "./src/app/_components/movimentos/movimentos.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/_components/movimentos/movimentos.component.ts ***!
  \****************************************************************/
/*! exports provided: MovimentosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovimentosComponent", function() { return MovimentosComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_movimentos_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/movimentos.service */ "./src/app/_services/movimentos.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_produtos_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/produtos.service */ "./src/app/_services/produtos.service.ts");
/* harmony import */ var _lancar_nota_lancar_nota_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lancar-nota/lancar-nota.component */ "./src/app/_components/lancar-nota/lancar-nota.component.ts");
/* harmony import */ var _edit_movimento_edit_movimento_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../edit-movimento/edit-movimento.component */ "./src/app/_components/edit-movimento/edit-movimento.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MovimentosComponent = /** @class */ (function () {
    function MovimentosComponent(movService, prodService, snackBar, dialog) {
        this.movService = movService;
        this.prodService = prodService;
        this.snackBar = snackBar;
        this.dialog = dialog;
    }
    MovimentosComponent.prototype.ngOnInit = function () {
        this.getProdutos();
        this.getMovimentos();
    };
    MovimentosComponent.prototype.getMovimentos = function () {
        var _this = this;
        this.movService.get().subscribe(function (res) {
            _this.tmpMovimentos = res;
            _this.parseMovimentos();
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao tentar carregar movimentos', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    MovimentosComponent.prototype.getProdutos = function () {
        var _this = this;
        this.prodService.get().subscribe(function (res) {
            _this.produtos = res;
            _this.parseMovimentos();
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao tentar carregar produtos', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    MovimentosComponent.prototype.parseMovimentos = function () {
        if (this.tmpMovimentos && this.produtos) {
            var _loop_1 = function (i) {
                var mov = this_1.tmpMovimentos[i];
                // Parsing produto
                mov.produto = this_1.produtos.find(function (prod) {
                    return prod.id == mov.id_produto;
                });
                delete mov.id_produto;
                // Parsing dates
                mov.dh = new Date(mov.dh);
            };
            var this_1 = this;
            for (var i = 0; i < this.tmpMovimentos.length; i++) {
                _loop_1(i);
            }
            this.movimentos = this.tmpMovimentos;
        }
    };
    MovimentosComponent.prototype.onLancarClick = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_lancar_nota_lancar_nota_component__WEBPACK_IMPORTED_MODULE_4__["LancarNotaComponent"], {
            width: '700px',
            data: {
                'produtos': this.produtos
            },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == 1) {
                _this.getMovimentos();
            }
        });
    };
    MovimentosComponent.prototype.onEditClick = function (movimento) {
        var _this = this;
        var dialogRef = this.dialog.open(_edit_movimento_edit_movimento_component__WEBPACK_IMPORTED_MODULE_5__["EditMovimentoComponent"], {
            width: '500px',
            data: {
                'movimento': movimento
            },
            disableClose: false
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == 1) {
                _this.getMovimentos();
            }
        });
    };
    MovimentosComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-movimentos',
            template: __webpack_require__(/*! ./movimentos.component.html */ "./src/app/_components/movimentos/movimentos.component.html"),
            styles: [__webpack_require__(/*! ./movimentos.component.scss */ "./src/app/_components/movimentos/movimentos.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_movimentos_service__WEBPACK_IMPORTED_MODULE_1__["MovimentosService"],
            _services_produtos_service__WEBPACK_IMPORTED_MODULE_3__["ProdutosService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], MovimentosComponent);
    return MovimentosComponent;
}());



/***/ }),

/***/ "./src/app/_components/nova-tarefa/nova-tarefa.component.html":
/*!********************************************************************!*\
  !*** ./src/app/_components/nova-tarefa/nova-tarefa.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n\t<div class=\"sse-container\">\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" disabled placeholder=\"SSE Número\" value=\"{{sse.numero}}\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" disabled placeholder=\"Endereço\" value=\"{{sse.endereco}}\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" disabled placeholder=\"Solicitação\" value=\"{{'RG' + sse.tipoDeServicoPrev.codigo + '-' + sse.tipoDeServicoPrev.descricao}}\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" disabled placeholder=\"Recebida em\" value=\"{{sse.dh_recebido.toLocaleString()}}\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" disabled placeholder=\"Prazo de Entrega\" value=\"{{sse.prazoFinal.toLocaleString()}}\">\n\t\t</mat-form-field>\n\t</div>\n\n\t<div class=\"tarefa-container\">\n\t\t<form #formNovaTarefa=\"ngForm\">\n\t\t\t<mat-form-field>\n\t\t\t\t<mat-select required placeholder=\"Equipe\" name=\"equipe\" [(ngModel)]=\"tarefa.equipe\" >\n\t\t\t\t\t<mat-option [value]=\"equipe\" *ngFor=\"let equipe of equipes\" >[{{equipe?.sigla}}] - {{equipe?.nome}}</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field>\n\t\t\t\t<mat-select placeholder=\"Equipe de Apoio\" name=\"apoio\" [(ngModel)]=\"tarefa.apoio\">\n\t\t\t\t\t<mat-option [value]=\"null\">Nenhuma equipe de apoio</mat-option>\n\t\t\t\t\t<mat-option [value]=\"apoio\" *ngFor=\"let apoio of equipes\" >[{{apoio.sigla}}] - {{apoio.nome}}</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field>\n\t\t\t\t<input\n\t\t\t\t\tmatInput\n\t\t\t\t\trequired\n\t\t\t\t\ttype=\"datetime-local\"\n\t\t\t\t\tname=\"inicio_p\"\n\t\t\t\t\t[min]=\"agora\"\n\t\t\t\t\t[(ngModel)]=\"tarefa.inicio_p\"\n\t\t\t\t\tplaceholder=\"Início Previsto\">\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field>\n\t\t\t\t<input\n\t\t\t\t\tmatInput\n\t\t\t\t\trequired\n\t\t\t\t\ttype=\"datetime-local\"\n\t\t\t\t\tname=\"final_p\"\n\t\t\t\t\t[(ngModel)]=\"tarefa.final_p\"\n\t\t\t\t\tplaceholder=\"Final Previsto\">\n\t\t\t</mat-form-field>\n\n\t\t\t<div class=\"controles\">\n\t\t\t\t<button mat-raised-button color=\"accent\" (click)=\"onCancelarClick()\">Cancelar</button>\n\t\t\t\t\n\t\t\t\t<button\n\t\t\t\t\t[disabled]=\"!formNovaTarefa.valid || tarefa.final_p <= tarefa.inicio_p || tarefa.inicio_p < agora\"\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"primary\"\n\t\t\t\t\t(click)=\"onSalvarClick()\">Salvar</button>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</div>"

/***/ }),

/***/ "./src/app/_components/nova-tarefa/nova-tarefa.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/_components/nova-tarefa/nova-tarefa.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  display: flex; }\n  .container mat-form-field {\n    width: 100%; }\n  .container .sse-container {\n    width: 50%;\n    border-right: 1px solid #CCC;\n    padding: 20px 20px 0 20px; }\n  .container .tarefa-container {\n    width: 50%;\n    padding: 20px 20px 0 20px; }\n  .container .tarefa-container .controles {\n      display: flex;\n      justify-content: space-between; }\n"

/***/ }),

/***/ "./src/app/_components/nova-tarefa/nova-tarefa.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/_components/nova-tarefa/nova-tarefa.component.ts ***!
  \******************************************************************/
/*! exports provided: NovaTarefaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NovaTarefaComponent", function() { return NovaTarefaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _models_tarefa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_models/tarefa */ "./src/app/_models/tarefa.ts");
/* harmony import */ var _services_tarefa_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/tarefa.service */ "./src/app/_services/tarefa.service.ts");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var NovaTarefaComponent = /** @class */ (function () {
    function NovaTarefaComponent(dialogRef, data, tarefaService, snackBar) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.tarefaService = tarefaService;
        this.snackBar = snackBar;
        this.agora = Object(date_fns__WEBPACK_IMPORTED_MODULE_4__["format"])(new Date(), 'YYYY-MM-DDTHH:mm');
        this.sse = data.sse;
        if (data.id_tarefa) {
            this.tarefa = Object.assign({}, this.sse.tarefas.find(function (t) {
                return t.id == data.id_tarefa;
            }));
            this.tarefa.inicio_p = Object(date_fns__WEBPACK_IMPORTED_MODULE_4__["format"])(this.tarefa.inicio_p, 'YYYY-MM-DDTHH:mm');
            this.tarefa.final_p = Object(date_fns__WEBPACK_IMPORTED_MODULE_4__["format"])(this.tarefa.final_p, 'YYYY-MM-DDTHH:mm');
        }
        else {
            this.tarefa = this.tarefaVazia();
        }
        this.equipes = data.equipes;
    }
    NovaTarefaComponent.prototype.ngOnInit = function () {
    };
    NovaTarefaComponent.prototype.tarefaVazia = function () {
        var t = new _models_tarefa__WEBPACK_IMPORTED_MODULE_2__["Tarefa"];
        t.sse = this.sse;
        t.id = 0;
        t.divergente = false;
        t.inicio_p = '';
        t.final_p = '';
        return t;
    };
    NovaTarefaComponent.prototype.onCancelarClick = function () {
        this.dialogRef.close(0);
    };
    NovaTarefaComponent.prototype.onSalvarClick = function () {
        var _this = this;
        if (this.tarefa.id == 0) {
            this.tarefaService.create(this.tarefa).subscribe(function (res) {
                _this.dialogRef.close(1);
                // Exibindo snackbar de sucesso
                _this.snackBar.open('SSE agendada com sucesso!', undefined, {
                    panelClass: ['snackbar-ok'],
                });
            }, function (err) {
                // Selecionando mensagem de erro
                var msg;
                if (err == 'Gone') {
                    msg = 'Equipe já está agendada para este horário.';
                }
                else if (err = 'Request Entity Too Large') {
                    msg = 'Equipe já tem ou teve um agendamento para esta SSE.';
                }
                else {
                    msg = 'Falha ao agendar a SSE para a equipe.';
                }
                // Exibindo snackbar de erro
                _this.snackBar
                    .open(msg, 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
            });
        }
        else {
            this.tarefaService.update(this.tarefa).subscribe(function (res) {
                _this.dialogRef.close(1);
                // Exibindo snackbar de sucesso
                _this.snackBar.open('Agendamento alterado com sucesso!', undefined, {
                    panelClass: ['snackbar-ok'],
                });
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar alterar agendamento.', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
            });
        }
    };
    NovaTarefaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-nova-tarefa',
            template: __webpack_require__(/*! ./nova-tarefa.component.html */ "./src/app/_components/nova-tarefa/nova-tarefa.component.html"),
            styles: [__webpack_require__(/*! ./nova-tarefa.component.scss */ "./src/app/_components/nova-tarefa/nova-tarefa.component.scss")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _services_tarefa_service__WEBPACK_IMPORTED_MODULE_3__["TarefaService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], NovaTarefaComponent);
    return NovaTarefaComponent;
}());



/***/ }),

/***/ "./src/app/_components/produtos/produtos.component.html":
/*!**************************************************************!*\
  !*** ./src/app/_components/produtos/produtos.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"controles\">\n\t<button mat-raised-button color=\"primary\" (click)=\"onAdicionarClick()\">Adicionar Novo Produto</button>\n</div>\n<table>\n\t<thead>\n\t\t<tr>\n\t\t\t<td>Id</td>\n\t\t\t<td>Nome</td>\n\t\t\t<td>Qtde min</td>\n\t\t\t<td>Qtde max</td>\n\t\t\t<td>Qtde atual</td>\n\t\t\t<td>Unid</td>\n\t\t\t<td>Valor Unit</td>\n\t\t\t<td>Última Movimentação</td>\n\t\t\t<td>Ações</td>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr *ngFor=\"let produto of produtos\">\n\t\t\t<td>{{produto.id}}</td>\n\t\t\t<td>{{produto.nome}}</td>\n\t\t\t<td>{{produto.qtde_min | number:'1.0-2' | numeroBr}}</td>\n\t\t\t<td>{{produto.qtde_max | number:'1.0-2' | numeroBr}}</td>\n\t\t\t<td>{{produto.qtde | number:'1.0-2' | numeroBr}}</td>\n\t\t\t<td>{{produto.unidade}}</td>\n\t\t\t<td>{{produto.valor_unit| currency:'BRL':symbol:'1.2-2' | moedaBrasil}}</td>\n\t\t\t<td>{{produto.ultimo_movimento|date:'dd/MM/yyyy hh:mm'}}</td>\n\t\t\t<td>\n\t\t\t\t<button mat-icon-button (click)=\"onDeleteClick(produto.id)\">\n\t\t\t\t\t<mat-icon>delete</mat-icon>\n\t\t\t\t</button>\n\t\t\t\t<button mat-icon-button (click)=\"openEditProdutoDialog(produto)\">\n\t\t\t\t\t<mat-icon>edit</mat-icon>\n\t\t\t\t</button>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>"

/***/ }),

/***/ "./src/app/_components/produtos/produtos.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/_components/produtos/produtos.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".controles {\n  width: 80%;\n  position: relative;\n  left: 10%;\n  text-align: right;\n  margin-top: 25px; }\n\ntable {\n  width: 80%;\n  position: relative;\n  left: 10%;\n  margin-top: 25px;\n  border-collapse: collapse; }\n\ntable td {\n    padding: 10px;\n    border-bottom: 1px solid #CCC;\n    text-align: center; }\n\ntable td:nth-child(2) {\n    text-align: left; }\n\ntable td:nth-child(7) {\n    text-align: right; }\n\ntable thead td {\n    font-size: 12px;\n    color: #666; }\n\ntable tbody tr:last-child td {\n    border-bottom: none; }\n"

/***/ }),

/***/ "./src/app/_components/produtos/produtos.component.ts":
/*!************************************************************!*\
  !*** ./src/app/_components/produtos/produtos.component.ts ***!
  \************************************************************/
/*! exports provided: ProdutosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProdutosComponent", function() { return ProdutosComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_produtos_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/produtos.service */ "./src/app/_services/produtos.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _edit_produto_edit_produto_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../edit-produto/edit-produto.component */ "./src/app/_components/edit-produto/edit-produto.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProdutosComponent = /** @class */ (function () {
    function ProdutosComponent(prodService, snackBar, dialog) {
        this.prodService = prodService;
        this.snackBar = snackBar;
        this.dialog = dialog;
    }
    ProdutosComponent.prototype.ngOnInit = function () {
        this.getProdutos();
    };
    ProdutosComponent.prototype.getProdutos = function () {
        var _this = this;
        this.prodService.get().subscribe(function (res) {
            _this.produtos = res;
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao tentar carregar produtos', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
        });
    };
    ProdutosComponent.prototype.openEditProdutoDialog = function (produto) {
        var _this = this;
        var dialogRef = this.dialog.open(_edit_produto_edit_produto_component__WEBPACK_IMPORTED_MODULE_3__["EditProdutoComponent"], {
            width: '600px',
            data: {
                'produto': produto
            },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == 1) {
                _this.getProdutos();
            }
        });
    };
    ProdutosComponent.prototype.onAdicionarClick = function () {
        console.log('teste');
        // Criando o produto novo
        var produto = {
            id: 0,
            nome: '',
            qtde: 0,
            qtde_max: null,
            qtde_min: 0,
            unidade: ''
        };
        this.openEditProdutoDialog(produto);
    };
    ProdutosComponent.prototype.onDeleteClick = function (id_produto) {
        var _this = this;
        var pergunta = "Tem certeza que deseja remover o produto?";
        if (window.confirm(pergunta)) {
            this.prodService.delete(id_produto).subscribe(function (res) {
                // Recarregando produtos
                _this.getProdutos();
                // Exibindo snackbar de sucesso
                _this.snackBar.open('Produto removido com sucesso!', undefined, {
                    panelClass: ['snackbar-ok'],
                });
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar remover produto. Provavelmente ele possui movimentações.', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
            });
        }
    };
    ProdutosComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-produtos',
            template: __webpack_require__(/*! ./produtos.component.html */ "./src/app/_components/produtos/produtos.component.html"),
            styles: [__webpack_require__(/*! ./produtos.component.scss */ "./src/app/_components/produtos/produtos.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_produtos_service__WEBPACK_IMPORTED_MODULE_1__["ProdutosService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], ProdutosComponent);
    return ProdutosComponent;
}());



/***/ }),

/***/ "./src/app/_components/sse/sse.component.html":
/*!****************************************************!*\
  !*** ./src/app/_components/sse/sse.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-80 top-gap\">\n\t<form #sseForm=\"ngForm\">\n\t\t<div class=\"topo\">\n\t\t\t\n\t\t\t<div class=\"left\">\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<mat-select (selectionChange)=\"onDomasaChange()\" required name=\"domasa\" placeholder=\"DOMASA\" [(ngModel)]=\"domasaSelecionada\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t\t\t<mat-option [value]=\"domasa\" *ngFor=\"let domasa of domasas\">DOMASA {{domasa.id}}</mat-option>\n\t\t\t\t\t</mat-select>\n\t\t\t\t</mat-form-field>\n\t\t\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input\n\t\t\t\t\t\tpattern=\"[0-9]{7}\"\n\t\t\t\t\t\tmaxlength=\"7\"\n\t\t\t\t\t\t[required]=\"sse.urgencia!=2\"\n\t\t\t\t\t\t[disabled]=\"sse.urgencia!=2 && camposDeCadstroTravados\"\n\t\t\t\t\t\tname=\"numero\"\n\t\t\t\t\t\t[(ngModel)]=\"sse.numero\"\n\t\t\t\t\t\tmatInput\n\t\t\t\t\t\tplaceholder=\"SSE Número\">\n\t\t\t\t</mat-form-field>\n\t\t\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input required name=\"dh_recebido_dia\" [(ngModel)]=\"sse.dh_recebido\" matInput [matDatepicker]=\"dpRecebimento\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t\t<mat-datepicker-toggle matSuffix [for]=\"dpRecebimento\"></mat-datepicker-toggle>\n\t\t\t\t\t<mat-datepicker #dpRecebimento></mat-datepicker>\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t\t<div class=\"container-hora-recebida\">\n\t\t\t\t\t<mat-form-field>\n\t\t\t\t\t\t<input required name=\"dh_recebido_hora\" matInput placeholder=\"Hora\" type=\"time\" [(ngModel)]=\"timestring\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t<button (click)=\"setHora(10)\" mat-raised-button color=\"accent\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t\t\t10h?\n\t\t\t\t\t</button>\n\t\t\t\t\t<button (click)=\"setHora(15)\" mat-raised-button color=\"accent\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t\t\t15h?\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<img *ngIf=\"sse?.foto\" [src]=\"sse?.foto\" alt=\"{{ 'SSE ' + sse?.numero }}\" (click)=\"onImageClick(sse?.foto)\">\n\t\t\t<button disabled *ngIf=\"!sse?.foto\" class=\"noImageButton\">SSE sem foto</button>\n\t\t\t\n\t\t</div>\n\n\t\t<mat-form-field>\n\t\t\t<mat-select required (selectionChange)=\"onTipoDeServicoPrevChange()\" name=\"tds\" [(ngModel)]=\"sse.tipoDeServicoPrev\" placeholder=\"Solicitação\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t<mat-option [value]=\"tds\" *ngFor=\"let tds of tdss\">RG{{tds.codigo}} - {{tds.descricao}}</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\n\t\t<mat-form-field>\n\t\t\t<input required name=\"endereco\" [(ngModel)]=\"sse.endereco\" matInput placeholder=\"Endereço\" [disabled]=\"camposDeCadstroTravados\">\n\t\t</mat-form-field>\n\n\t\t<div class=\"container-bairro\">\n\t\t\t<label for=\"bairro\">Bairro *</label>\n\t\t\t<select name=\"bairro\" id=\"bairro\" [(ngModel)]=\"id_bairro_selecionado\" [disabled]=\"camposDeCadstroTravados\" required (change)=\"onBairrosChange()\">\n\t\t\t\t<option [value]=\"bairro.id\" *ngFor=\"let bairro of bairrosExibidos\">{{bairro.codigo}} - {{bairro.nome}}</option>\n\t\t\t</select>\n\t\t</div>\n\n\t\t<mat-form-field>\n\t\t\t<mat-select name=\"urgencia\" [(ngModel)]=\"sse.urgencia\" placeholder=\"Nível de Prioridade\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t<mat-option required [value]=\"0\">Normal</mat-option>\n\t\t\t\t<mat-option [value]=\"1\">Prioridade</mat-option>\n\t\t\t\t<mat-option [value]=\"2\">Urgente</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\n\t\t<mat-form-field>\n\t\t\t<textarea name=\"obs\" [(ngModel)]=\"sse.obs\" matInput placeholder=\"Observações\" [disabled]=\"camposDeCadstroTravados\"></textarea>\n\t\t</mat-form-field>\n\n\t\t<div class=\"container-medidas\">\n\t\t\t<div class=\"medidas previstas\">\n\t\t\t\t<div class=\"label\">Medidas Previstas\n\t\t\t\t\t<button mat-icon-button (click)=\"onAddMedidaPrevClick()\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t\t\t<mat-icon>add</mat-icon>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medidas-container\" *ngIf=\"sse.tipoDeServicoPrev?.medida=='a'\">\n\t\t\t\t\t<div class=\"medida\" *ngFor=\"let m of sse.medidas_area.prev;let i=index\">\n\t\t\t\t\t\t<input required (keyup)=\"onInputMedidaPrevChange()\" (click)=\"onInputMedidaPrevChange()\" type=\"number\" name=\"medida_al_{{i}}_p\" step=\"0.01\" [(ngModel)]=\"m.l\" [disabled]=\"camposDeCadstroTravados\"> x\n\t\t\t\t\t\t<input required (keyup)=\"onInputMedidaPrevChange()\" (click)=\"onInputMedidaPrevChange()\" type=\"number\" name=\"medida_ac_{{i}}_p\" step=\"0.01\" [(ngModel)]=\"m.c\" [disabled]=\"camposDeCadstroTravados\"> m²\n\t\t\t\t\t\t<button color=\"warn\" *ngIf=\"sse.medidas_area.prev.length>1\" mat-icon-button (click)=\"onRemoveMedidaPrevClick(i)\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t\t\t\t<mat-icon>remove_circle</mat-icon>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medidas-container\" *ngIf=\"sse.tipoDeServicoPrev?.medida=='l'\">\n\t\t\t\t\t<div class=\"medida\" *ngFor=\"let m of sse.medidas_linear.prev;let i=index\">\n\t\t\t\t\t\t<input required (keyup)=\"onInputMedidaPrevChange()\" (click)=\"onInputMedidaPrevChange()\" type=\"number\" name=\"medida_l_{{i}}_p\" step=\"0.01\" [(ngModel)]=\"m.v\" [disabled]=\"camposDeCadstroTravados\"> m\n\t\t\t\t\t\t<button color=\"warn\" *ngIf=\"sse.medidas_linear.prev.length>1\" mat-icon-button (click)=\"onRemoveMedidaPrevClick(i)\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t\t\t\t<mat-icon>remove_circle</mat-icon>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medidas-container\" *ngIf=\"sse.tipoDeServicoPrev?.medida=='u'\">\n\t\t\t\t\t<div class=\"medida\" *ngFor=\"let m of sse.medidas_unidades.prev;let i=index\">\n\t\t\t\t\t\t<input required (keyup)=\"onInputMedidaPrevChange()\" (click)=\"onInputMedidaPrevChange()\" type=\"number\" name=\"medida_u_{{i}}_p\" step=\"1\" [(ngModel)]=\"m.n\" [disabled]=\"camposDeCadstroTravados\"> unid\n\t\t\t\t\t\t<button color=\"warn\" *ngIf=\"sse.medidas_unidades.prev.length>1\" mat-icon-button (click)=\"onRemoveMedidaPrevClick(i)\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t\t\t\t<mat-icon>remove_circle</mat-icon>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<mat-select required (selectionChange)=\"onTipoDeServicoPrevChange()\" name=\"tds_p2\" [(ngModel)]=\"sse.tipoDeServicoPrev\" placeholder=\"Tipo de Serviço Previsto\" [disabled]=\"camposDeCadstroTravados\">\n\t\t\t\t\t\t<mat-option [value]=\"tds\" *ngFor=\"let tds of tdss\">RG{{tds.codigo}} - {{tds.descricao}}</mat-option>\n\t\t\t\t\t</mat-select>\n\t\t\t\t</mat-form-field>\n\t\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input type=\"text\" matInput [ngModelOptions]=\"{standalone: true}\" readonly placeholder=\"Total Previsto\" [(ngModel)]=\"medidaPrevTotal\">\n\t\t\t\t</mat-form-field>\n\t\t\t</div>\n\t\t\t<div class=\"medidas realizadas\" *ngIf=\"sse.tipoDeServicoReal\">\n\t\t\t\t<div class=\"label\">Medidas Realizadas\n\t\t\t\t\t<button mat-icon-button [disabled]=\"camposDeMedidasReaisTravados\">\n\t\t\t\t\t\t<mat-icon>add</mat-icon>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medidas-container\" *ngIf=\"sse.tipoDeServicoReal?.medida=='a'\">\n\t\t\t\t\t<div class=\"medida\" *ngFor=\"let m of sse.medidas_area.real;let i=index\">\n\t\t\t\t\t\t<input required (keyup)=\"onInputMedidaChange()\" (click)=\"onInputMedidaChange()\" type=\"number\" name=\"medida_al_{{i}}_r\" step=\"0.01\" [(ngModel)]=\"m.l\" [disabled]=\"camposDeMedidasReaisTravados\"> x\n\t\t\t\t\t\t<input required (keyup)=\"onInputMedidaChange()\" (click)=\"onInputMedidaChange()\" type=\"number\" name=\"medida_ac_{{i}}_r\" step=\"0.01\" [(ngModel)]=\"m.c\" [disabled]=\"camposDeMedidasReaisTravados\"> m²\n\t\t\t\t\t\t<button color=\"warn\" *ngIf=\"sse.medidas_area.real.length>1\" mat-icon-button (click)=\"onRemoveMedidaClick(i)\" [disabled]=\"camposDeMedidasReaisTravados\">\n\t\t\t\t\t\t\t<mat-icon>remove_circle</mat-icon>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medidas-container\" *ngIf=\"sse.tipoDeServicoReal?.medida=='l'\">\n\t\t\t\t\t<div class=\"medida\" *ngFor=\"let m of sse.medidas_linear.real;let i=index\">\n\t\t\t\t\t\t<input required (keyup)=\"onInputMedidaChange()\" (click)=\"onInputMedidaChange()\" type=\"number\" name=\"medida_l_{{i}}_r\" step=\"0.01\" [(ngModel)]=\"m.v\" [disabled]=\"camposDeMedidasReaisTravados\"> m\n\t\t\t\t\t\t<button color=\"warn\" *ngIf=\"sse.medidas_linear.real.length>1\" mat-icon-button (click)=\"onRemoveMedidaClick(i)\">\n\t\t\t\t\t\t\t<mat-icon>remove_circle</mat-icon>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medidas-container\" *ngIf=\"sse.tipoDeServicoReal?.medida=='u'\">\n\t\t\t\t\t<div class=\"medida\" *ngFor=\"let m of sse.medidas_unidades.real;let i=index\">\n\t\t\t\t\t\t<input required (keyup)=\"onInputMedidaChange()\" (click)=\"onInputMedidaChange()\" type=\"number\" name=\"medida_u_{{i}}_r\" step=\"1\" [(ngModel)]=\"m.n\" [disabled]=\"camposDeMedidasReaisTravados\"> unid\n\t\t\t\t\t\t<button color=\"warn\" *ngIf=\"sse.medidas_unidades.real.length>1\" mat-icon-button (click)=\"onRemoveMedidaClick(i)\" [disabled]=\"camposDeMedidasReaisTravados\">\n\t\t\t\t\t\t\t<mat-icon>remove_circle</mat-icon>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<mat-select name=\"tds2\" [(ngModel)]=\"sse.tipoDeServicoReal\" placeholder=\"Tipo de Serviço Realizado\" [disabled]=\"true\">\n\t\t\t\t\t\t<mat-option [value]=\"tds\" *ngFor=\"let tds of tdss\">RG{{tds.codigo}} - {{tds.descricao}}</mat-option>\n\t\t\t\t\t</mat-select>\n\t\t\t\t</mat-form-field>\n\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<input type=\"text\" matInput [ngModelOptions]=\"{standalone: true}\" readonly placeholder=\"Total Realizado\" [(ngModel)]=\"medidaRealTotal\" >\n\t\t\t\t</mat-form-field>\n\t\t\t\t\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"controles\">\n\t\t\t<button mat-raised-button disabled color=\"accent\">Cancelar</button>\n\t\t\t<button mat-raised-button color=\"primary\" [disabled]=\"!sseForm.valid || sseForm.pristine || id_bairro_selecionado==0\" (click)=\"onSalvarClick()\">Salvar Alterações</button>\n\t\t</div>\n\n\t</form>\n\t<div class=\"container-tarefas\" *ngIf=\"sse.tarefas.length > 0\">\n\t\t<h1>Serviços Realizados</h1>\n\t\n\t\t<div class=\"servico\">\n\t\t\t\n\t\t\t<table class=\"horarios\">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td></td>\n\t\t\t\t\t\t<td>Início</td>\n\t\t\t\t\t\t<td>Final</td>\n\t\t\t\t\t\t<td>Duração</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Previsto</td>\n\t\t\t\t\t\t<td>07/08/2018 às 14:00</td>\n\t\t\t\t\t\t<td>07/08/2018 às 16:00</td>\n\t\t\t\t\t\t<td>2h</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Realizado</td>\n\t\t\t\t\t\t<td>07/08/2018 às 14:15</td>\n\t\t\t\t\t\t<td>07/08/2018 às 15:30</td>\n\t\t\t\t\t\t<td>1h 15min</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t<div class=\"equipe\">Equipe: TBR1 - Tapa Buraco 1 (CAPA)</div>\n\t\t\t<div class=\"divergencia\">\n\t\t\t\tDivergência autorizada por <span>Sérgio Moura</span>\n\t\t\t</div>\n\t\t\t<div class=\"container-descricao\">\n\t\t\t\t<div class=\"descricao inicio\">\n\t\t\t\t\t<h3>Início</h3>\n\t\t\t\t\t<div class=\"obs\">Texto da observação do início</div>\n\t\t\t\t\t<div class=\"fotos\">\n\t\t\t\t\t\t<div>a</div>\n\t\t\t\t\t\t<div>b</div>\n\t\t\t\t\t\t<div>c</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"descricao fim\">\n\t\t\t\t\t<h3>Conclusão</h3>\n\t\t\t\t\t<div class=\"obs\">Texto da Observação da conclusão</div>\n\t\t\t\t\t<div class=\"fotos\">\n\t\t\t\t\t\t<div>a</div>\n\t\t\t\t\t\t<div>b</div>\n\t\t\t\t\t\t<div>c</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"servico\">\n\t\t\t<table class=\"horarios\">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td></td>\n\t\t\t\t\t\t<td>Início</td>\n\t\t\t\t\t\t<td>Final</td>\n\t\t\t\t\t\t<td>Duração</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Previsto</td>\n\t\t\t\t\t\t<td>07/08/2018 às 14:00</td>\n\t\t\t\t\t\t<td>07/08/2018 às 16:00</td>\n\t\t\t\t\t\t<td>2h</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Realizado</td>\n\t\t\t\t\t\t<td>07/08/2018 às 14:15</td>\n\t\t\t\t\t\t<td>07/08/2018 às 15:30</td>\n\t\t\t\t\t\t<td>1h 15min</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t<div class=\"equipe\">Equipe: TBR1 - Tapa Buraco 1 (CAPA)</div>\n\t\t\t<div class=\"divergencia\">\n\t\t\t\tDivergência autorizada por <span>Sérgio Moura</span>\n\t\t\t</div>\n\t\t\t<div class=\"container-descricao\">\n\t\t\t\t<div class=\"descricao inicio\">\n\t\t\t\t\t<h3>Início</h3>\n\t\t\t\t\t<div class=\"obs\">Texto da observação do início</div>\n\t\t\t\t\t<div class=\"fotos\">\n\t\t\t\t\t\t<div>a</div>\n\t\t\t\t\t\t<div>b</div>\n\t\t\t\t\t\t<div>c</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"descricao fim\">\n\t\t\t\t\t<h3>Conclusão</h3>\n\t\t\t\t\t<div class=\"obs\">Texto da Observação da conclusão</div>\n\t\t\t\t\t<div class=\"fotos\">\n\t\t\t\t\t\t<div>a</div>\n\t\t\t\t\t\t<div>b</div>\n\t\t\t\t\t\t<div>c</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\n\t</div>\n</div>"

/***/ }),

/***/ "./src/app/_components/sse/sse.component.scss":
/*!****************************************************!*\
  !*** ./src/app/_components/sse/sse.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n * @param target Which kind of high contrast setting to target. Defaults to `active`, can be\n *    `white-on-black` or `black-on-white`.\n */\n/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n:host() > div {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  padding-bottom: 0px;\n  margin-bottom: 50px; }\n:host() > div form {\n    padding: 20px;\n    width: calc(100% - 40px); }\n:host() > div form .topo {\n      display: flex;\n      justify-content: space-between; }\n:host() > div form .topo .left {\n        flex-grow: 1; }\n:host() > div form .topo img, :host() > div form .topo .noImageButton {\n        height: 247px;\n        margin-left: 20px;\n        border: 1px solid #DEDEDE;\n        background-color: #DEDEDE; }\n:host() > div form .topo .noImageButton {\n        width: 180px; }\n:host() > div form mat-form-field {\n      display: block; }\n:host() > div form .container-bairro {\n      margin-bottom: 36px; }\n:host() > div form .container-bairro label {\n        display: block;\n        color: #727273; }\n:host() > div form .container-bairro select {\n        display: block;\n        display: block;\n        width: 100%;\n        padding: 10px;\n        border: none;\n        border-bottom: 1px solid #8c8c8c;\n        background-color: transparent;\n        outline: none;\n        cursor: pointer;\n        font-size: 16px; }\n:host() > div form .container-bairro select option {\n          padding: 12px;\n          font-size: 18px; }\n:host() > div form .container-bairro select:focus {\n        border-bottom: 2px solid #212121; }\n:host() > div form .container-hora-recebida {\n      display: flex; }\n:host() > div form .container-hora-recebida mat-form-field {\n        flex-grow: 1;\n        display: inline-block; }\n:host() > div form .container-hora-recebida button {\n        min-width: 0;\n        width: 60px;\n        height: 35px;\n        margin-left: 10px;\n        position: relative;\n        top: 12px; }\n:host() > div form .controles {\n      display: flex;\n      justify-content: space-between; }\n:host() > div form .container-medidas {\n      display: flex; }\n:host() > div form .container-medidas .medidas {\n        position: relative;\n        margin-bottom: 20px;\n        width: 50%; }\n:host() > div form .container-medidas .medidas input {\n          width: 50px; }\n:host() > div form .container-medidas .medidas mat-form-field {\n          margin-top: 20px; }\n:host() > div form .container-medidas .previstas {\n        padding-right: 20px;\n        border-right: 1px solid #CCC; }\n:host() > div form .container-medidas .realizadas {\n        padding-left: 20px; }\n:host() > div .container-tarefas {\n    border-top: 1px solid #000;\n    margin: 20px 0 0 0;\n    padding: 20px; }\n:host() > div .container-tarefas .servico {\n      border: 1px solid #999999;\n      margin-bottom: 20px; }\n:host() > div .container-tarefas .servico:last-child {\n        margin-bottom: 0; }\n:host() > div .container-tarefas .servico .horarios {\n        width: 100%;\n        border-collapse: collapse;\n        text-align: center;\n        margin-bottom: 10px; }\n:host() > div .container-tarefas .servico .horarios td {\n          padding: 10px;\n          border: 1px solid #DEDEDE; }\n:host() > div .container-tarefas .servico .horarios thead td {\n          background-color: #DEDEDE; }\n:host() > div .container-tarefas .servico .equipe {\n        margin-bottom: 10px;\n        text-indent: 20px; }\n:host() > div .container-tarefas .servico .divergencia {\n        text-indent: 20px;\n        margin-bottom: 10px; }\n:host() > div .container-tarefas .servico .container-descricao {\n        display: flex; }\n:host() > div .container-tarefas .servico .container-descricao .descricao {\n          width: calc(50% - 10px);\n          padding: 20px; }\n:host() > div .container-tarefas .servico .container-descricao .inicio {\n          border-right: 1px solid #DEDEDE; }\n"

/***/ }),

/***/ "./src/app/_components/sse/sse.component.ts":
/*!**************************************************!*\
  !*** ./src/app/_components/sse/sse.component.ts ***!
  \**************************************************/
/*! exports provided: SseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SseComponent", function() { return SseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _models_sse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_models/sse */ "./src/app/_models/sse.ts");
/* harmony import */ var _services_sses_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/sses.service */ "./src/app/_services/sses.service.ts");
/* harmony import */ var _services_domasas_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/domasas.service */ "./src/app/_services/domasas.service.ts");
/* harmony import */ var _services_tipos_de_servico_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/tipos-de-servico.service */ "./src/app/_services/tipos-de-servico.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_9__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SseComponent = /** @class */ (function () {
    function SseComponent(route, ssesService, domasaService, tdsService, snackBar, sanitizer, router) {
        this.route = route;
        this.ssesService = ssesService;
        this.domasaService = domasaService;
        this.tdsService = tdsService;
        this.snackBar = snackBar;
        this.sanitizer = sanitizer;
        this.router = router;
        this.sse = {
            foto: null,
            numero: '',
        };
        this.bairros = [];
        this.bairrosExibidos = [];
        this.camposDeCadstroTravados = true;
        this.camposDeMedidasReaisTravados = true;
        this.id_bairro_selecionado = undefined;
        /** control for the selected bank */
        this.bankCtrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControl"]();
        /** control for the MatSelect filter keyword */
        this.bankFilterCtrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControl"]();
    }
    SseComponent.prototype.ngOnInit = function () {
        this.getDomasas();
        this.getTiposDeServico();
        this.getSse();
    };
    SseComponent.prototype.getSse = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        if (id != '0') {
            this.ssesService.getById(id).subscribe(function (res) {
                _this.sseResponse = res;
                _this.parseSse();
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar carregar SSE', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
                // Imprimindo erro no console
                console.log(err);
            });
        }
        else {
            this.sseVazia();
        }
    };
    SseComponent.prototype.getDomasas = function () {
        var _this = this;
        this.domasaService.get().subscribe(function (res) {
            _this.domasas = res;
            _this.parseSse();
            // Criando bairros
            for (var i = 0; i < _this.domasas.length; i++) {
                var domasa = _this.domasas[i];
                _this.bairros = _this.bairros.concat(domasa.bairros);
            }
            // Criando bairrosExibidos
            _this.bairrosExibidos = _this.bairros;
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar DOMASAS', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    SseComponent.prototype.getTiposDeServico = function () {
        var _this = this;
        this.tdsService.get().subscribe(function (res) {
            _this.tdss = res;
            _this.parseSse();
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar tipos de serviço', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    SseComponent.prototype.onCriarTarefaClick = function () {
        this.router.navigateByUrl('home/tarefas/0?idsse=' + this.sse.id);
    };
    SseComponent.prototype.onSalvarClick = function () {
        this.sse.dh_recebido.setHours(+this.timestring.substr(0, 2));
        this.sse.dh_recebido.setMinutes(+this.timestring.substr(3, 2));
        if (this.sse.id * 1 != 0) {
            this.updateSse();
        }
        else {
            this.createSse();
        }
    };
    SseComponent.prototype.updateSse = function () {
        var _this = this;
        return this.ssesService.update(this.sse).subscribe(function (res) {
            // Voltando para o mapa
            _this.router.navigateByUrl("/home/sses/map");
            // Exibindo snackbar de sucesso
            _this.snackBar.open('SSE alterada com sucesso!', undefined, {
                panelClass: ['snackbar-ok'],
            });
        }, function (err) {
            // Declarando mensagem a exibir no snackbar
            var msg;
            if (err == 'Service Unavailable') {
                msg = 'Falha ao recuperar coordenadas do endereço. Verifique o endereço ou tente mais tarde.';
            }
            else {
                msg = 'Falha ao tentar atualizar SSE: ' + err;
            }
            // Exibindo snackbar de erro
            _this.snackBar
                .open(msg, 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
        });
    };
    SseComponent.prototype.createSse = function () {
        var _this = this;
        return this.ssesService.create(this.sse).subscribe(function (res) {
            // Zerando campos
            _this.sseVazia();
            _this.domasaSelecionada = undefined;
            _this.form.reset();
            window.scrollTo(0, 0);
            // Exibindo snackbar de sucesso
            _this.snackBar.open('SSE cadastrada com sucesso', undefined, {
                panelClass: ['snackbar-ok'],
            });
        }, function (err) {
            // Declarando mensagem a exibir no snackbar
            var msg;
            if (err == 'Service Unavailable') {
                msg = 'Falha ao recuperar coordenadas do endereço. Verifique o endereço ou tente mais tarde.';
            }
            else {
                msg = 'Falha ao tentar atualizar SSE: ' + err;
            }
            // Exibindo snackbar de erro
            _this.snackBar
                .open(msg, 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
        });
    };
    SseComponent.prototype.sseVazia = function () {
        var sse = new _models_sse__WEBPACK_IMPORTED_MODULE_2__["SSE"]();
        sse.id = 0;
        sse.dh_recebido = new Date();
        sse.dh_recebido.setHours(10);
        sse.dh_recebido.setMinutes(0);
        this.timestring = Object(date_fns__WEBPACK_IMPORTED_MODULE_9__["format"])(sse.dh_recebido, 'HH:mm');
        sse.endereco = '';
        sse.tipoDeServicoPrev = undefined;
        sse.tipoDeServicoReal = undefined;
        sse.numero = '';
        sse.bairro = undefined;
        sse.foto = null;
        sse.medidas_area = { 'real': [], 'prev': [] };
        sse.medidas_linear = { 'real': [], 'prev': [] };
        sse.medidas_unidades = { 'real': [], 'prev': [] };
        sse.urgencia = 0;
        sse.status = 0;
        this.sseResponse = sse;
        this.parseSse();
    };
    SseComponent.prototype.setHora = function (s) {
        this.timestring = s + ':00';
    };
    SseComponent.prototype.parseSse = function () {
        var _this = this;
        if (this.sseResponse && this.domasas && this.tdss) {
            // Determinando se os campos devem ou não estar travados (somente para o status CADASTRADO)
            this.camposDeCadstroTravados = (this.sseResponse.status != "0");
            // Determinando se os campos de medida reais devem estar travados ou não
            this.camposDeMedidasReaisTravados = true;
            // Parsing escalares
            this.sseResponse.dh_recebido = new Date(this.sseResponse.dh_recebido);
            this.sseResponse.dh_registrado = new Date(this.sseResponse.dh_registrado);
            this.sseResponse.id *= 1;
            this.sseResponse.foto = (this.sseResponse.foto ? this.sanitizer.bypassSecurityTrustResourceUrl(this.sseResponse.foto) : null);
            this.sseResponse.urgencia *= 1;
            this.timestring = this.sseResponse.dh_recebido.toTimeString().substr(0, 2)
                + ':' +
                this.sseResponse.dh_recebido.toTimeString().substr(3, 2);
            // Parsing tipo de servico previsto
            this.sseResponse.tipoDeServicoPrev = this.tdss.find(function (t) {
                return 1 * t.id == 1 * _this.sseResponse.id_tipo_de_servico_p;
            });
            delete this.sseResponse.id_tipo_de_servico_p;
            // Parsing tipo de serviço real
            if (this.sseResponse.id_tipo_de_servico_r) {
                this.sseResponse.tipoDeServicoReal = this.tdss.find(function (t) {
                    return 1 * t.id == 1 * _this.sseResponse.id_tipo_de_servico_r;
                });
            }
            else {
                this.sseResponse.tipoDeServicoReal = null;
            }
            delete this.sseResponse.id_tipo_de_servico_r;
            // Procurando a domasa do bairro
            var i = 0;
            var achou = false;
            while (i < this.domasas.length && !achou) {
                this.sseResponse.bairro = this.domasas[i].bairros.find(function (bairro) {
                    return bairro.id == _this.sseResponse.id_bairro;
                });
                if (this.sseResponse.bairro) {
                    achou = true;
                    this.domasaSelecionada = this.domasas[i];
                }
                i++;
            }
            // Atualizando o id_bairro_selecionado para o select funcionar
            this.id_bairro_selecionado = this.sseResponse.id_bairro;
            delete this.sseResponse.id_bairro;
            this.sse = this.sseResponse;
            this.calculaMedidaPrevTotal();
            this.calculaMedidaRealTotal();
            // Colocando campo a mais caso um vetor de medidas esteja vazio
            if (this.sse.medidas_area.prev.length == 0) {
                this.sse.medidas_area.prev.push({ l: '', c: '' });
            }
            if (this.sse.medidas_linear.prev.length == 0) {
                this.sse.medidas_linear.prev.push({ v: '' });
            }
            if (this.sse.medidas_unidades.prev.length == 0) {
                this.sse.medidas_unidades.prev.push({ n: '' });
            }
            // parsing tarefas
            for (var i_1 = 0; i_1 < this.sse.tarefas.length; i_1++) {
                var tarefa = this.sse.tarefas[i_1];
                tarefa.inicio_p = new Date(tarefa.inicio_p);
                tarefa.final_p = new Date(tarefa.final_p);
            }
        }
    };
    SseComponent.prototype.onImageClick = function () {
    };
    SseComponent.prototype.onInputMedidaPrevChange = function () {
        this.calculaMedidaPrevTotal();
    };
    SseComponent.prototype.onTipoDeServicoPrevChange = function () {
        this.calculaMedidaPrevTotal();
    };
    SseComponent.prototype.onRemoveMedidaPrevClick = function (i) {
        switch (this.sse.tipoDeServicoPrev.medida) {
            case 'a':
                this.sse.medidas_area.prev.splice(i, 1);
                break;
            case 'l':
                this.sse.medidas_linear.prev.splice(i, 1);
                break;
            case 'u':
                this.sse.medidas_unidades.prev.splice(i, 1);
                break;
        }
        this.calculaMedidaPrevTotal();
    };
    SseComponent.prototype.onAddMedidaPrevClick = function () {
        switch (this.sse.tipoDeServicoPrev.medida) {
            case 'a':
                this.sse.medidas_area.prev.push({ l: '', c: '' });
                break;
            case 'l':
                this.sse.medidas_linear.prev.push({ v: '' });
                break;
            case 'u':
                this.sse.medidas_unidades.prev.push({ n: '' });
                break;
        }
    };
    SseComponent.prototype.onDomasaChange = function () {
        var _this = this;
        this.bairrosExibidos = Object.assign([], this.domasaSelecionada.bairros);
        this.bairrosExibidos.unshift({
            id: 0,
            nome: 'Selecione um bairro',
            codigo: '',
            domasa: this.domasaSelecionada.id
        });
        this.id_bairro_selecionado = this.bairrosExibidos[0].id;
        this.sse.bairro = this.bairros.find(function (b) {
            return b.id == _this.id_bairro_selecionado;
        });
    };
    SseComponent.prototype.onBairrosChange = function () {
        var _this = this;
        // Encontrando o bairro selecionado
        this.sse.bairro = this.bairros.find(function (b) {
            return b.id == _this.id_bairro_selecionado;
        });
        if (this.id_bairro_selecionado != 0) {
            // Buscando domasa do bairro
            var i = 0;
            var achou = false;
            var bairro = void 0;
            while (i < this.domasas.length && !achou) {
                bairro = this.domasas[i].bairros.find(function (b) {
                    return b.id == _this.sse.bairro.id;
                });
                achou = (bairro != undefined);
                if (achou) {
                    this.domasaSelecionada = this.domasas[i];
                }
                i++;
            }
        }
    };
    SseComponent.prototype.calculaMedidaPrevTotal = function () {
        var total = 0;
        if (this.sse.tipoDeServicoPrev) {
            if (this.sse.tipoDeServicoPrev.medida == 'a') {
                for (var i = 0; i < this.sse.medidas_area.prev.length; i++) {
                    total += (1 * this.sse.medidas_area.prev[i].l) * (1 * this.sse.medidas_area.prev[i].c);
                }
            }
            if (this.sse.tipoDeServicoPrev.medida == 'l') {
                for (var i = 0; i < this.sse.medidas_linear.prev.length; i++) {
                    total += (1 * this.sse.medidas_linear.prev[i].v);
                }
            }
            if (this.sse.tipoDeServicoPrev.medida == 'u') {
                for (var i = 0; i < this.sse.medidas_unidades.prev.length; i++) {
                    total += (1 * this.sse.medidas_unidades.prev[i].n);
                }
            }
            this.medidaPrevTotal = total;
        }
        else {
            this.medidaPrevTotal = 0;
        }
    };
    SseComponent.prototype.calculaMedidaRealTotal = function () {
        var total = 0;
        if (this.sse.tipoDeServicoReal) {
            if (this.sse.tipoDeServicoReal.medida == 'a') {
                for (var i = 0; i < this.sse.medidas_area.real.length; i++) {
                    total += (1 * this.sse.medidas_area.real[i].l) * (1 * this.sse.medidas_area.real[i].c);
                }
            }
            if (this.sse.tipoDeServicoReal.medida == 'l') {
                for (var i = 0; i < this.sse.medidas_linear.real.length; i++) {
                    total += (1 * this.sse.medidas_linear.real[i].v);
                }
            }
            if (this.sse.tipoDeServicoReal.medida == 'u') {
                for (var i = 0; i < this.sse.medidas_unidades.real.length; i++) {
                    total += (1 * this.sse.medidas_unidades.real[i].n);
                }
            }
            this.medidaRealTotal = total;
        }
        else {
            this.medidaRealTotal = 0;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sseForm'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgForm"])
    ], SseComponent.prototype, "form", void 0);
    SseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sse',
            template: __webpack_require__(/*! ./sse.component.html */ "./src/app/_components/sse/sse.component.html"),
            styles: [__webpack_require__(/*! ./sse.component.scss */ "./src/app/_components/sse/sse.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_sses_service__WEBPACK_IMPORTED_MODULE_3__["SsesService"],
            _services_domasas_service__WEBPACK_IMPORTED_MODULE_4__["DomasasService"],
            _services_tipos_de_servico_service__WEBPACK_IMPORTED_MODULE_5__["TiposDeServicoService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], SseComponent);
    return SseComponent;
}());



/***/ }),

/***/ "./src/app/_components/sses-grid/sses-grid.component.html":
/*!****************************************************************!*\
  !*** ./src/app/_components/sses-grid/sses-grid.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\n\t<mat-toolbar-row>\n\t\t<span class=\"spacer\"></span>\n\t\t<button  matTooltip=\"Atualizar Busca\" (click)=\"onBuscarClick()\">\n\t\t\t<mat-icon>replay</mat-icon>\n\t\t</button>\n\t\t<button  matTooltip=\"Nova SSE\" (click)=\"onNovaSSEButtonClick()\">\n\t\t\t<mat-icon>add</mat-icon>\n\t\t</button>\n\t\t<button  matTooltip=\"Mapa\" (click)=\"onMapButtonClick()\">\n\t\t\t<mat-icon>map</mat-icon>\n\t\t</button>\n\t</mat-toolbar-row>\n</mat-toolbar>\n<div class=\"container-80 top-gap padding\">\n\t<div class=\"container-filtro\">\n\t\t\n\t\t<div class=\"container-selects\">\n\t\t\t<mat-form-field>\n\t\t\t\t<mat-select [(ngModel)]=\"busca.equipes\"  placeholder=\"Equipes\" multiple>\n\t\t\t\t\t<mat-option *ngFor=\"let equipe of equipes\" [value]=\"equipe\">[{{equipe.sigla}}] {{equipe.nome}}</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t</mat-form-field>\n\t\n\t\t\t<mat-form-field>\n\t\t\t\t<mat-select [(ngModel)]=\"busca.status\"  placeholder=\"Status\" multiple>\n\t\t\t\t\t<mat-option value=\"CADASTRADA\">Cadastradas</mat-option>\n\t\t\t\t\t<mat-option value=\"AGENDADA\">Agendadas</mat-option>\n\t\t\t\t\t<mat-option value=\"EXECUTANDO\">Executando</mat-option>\n\t\t\t\t\t<mat-option value=\"PENDENTE\">Pendentes</mat-option>\n\t\t\t\t\t<mat-option value=\"FINALIZADA\">Finalizadas</mat-option>\n\t\t\t\t\t<mat-option value=\"DIVERGENTE\">Divergentes</mat-option>\n\t\t\t\t\t<mat-option value=\"CANCELADA\">Canceladas</mat-option>\n\t\t\t\t\t<mat-option value=\"RETRABALHO\">Retrabalho</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t</mat-form-field>\n\t\n\t\t\t<mat-form-field>\n\t\t\t\t<mat-select [(ngModel)]=\"busca.prioridades\"  placeholder=\"Nivel de Prioridade\" multiple>\n\t\t\t\t\t<mat-option [value]=\"0\">Normal</mat-option>\n\t\t\t\t\t<mat-option [value]=\"1\">Prioridade</mat-option>\n\t\t\t\t\t<mat-option [value]=\"2\">Urgente</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t</mat-form-field>\n\t\t</div>\n\n\t\t<div class=\"container-datas\">\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput [max]=\"busca.agendadas_ate\" [(ngModel)]=\"busca.agendadas_de\" [matDatepicker]=\"picker1\" placeholder=\"Agendados de\">\n\t\t\t\t<mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\n\t\t\t\t<mat-datepicker #picker1></mat-datepicker>\n\t\t\t</mat-form-field>\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput [min]=\"busca.agendadas_de\" [(ngModel)]=\"busca.agendadas_ate\" [matDatepicker]=\"picker2\" placeholder=\"Agendados até\">\n\t\t\t\t<mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\n\t\t\t\t<mat-datepicker #picker2></mat-datepicker>\n\t\t\t</mat-form-field>\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput [max]=\"busca.realizadas_ate\" [(ngModel)]=\"busca.realizadas_de\" [matDatepicker]=\"picker3\" placeholder=\"Realizados de\">\n\t\t\t\t<mat-datepicker-toggle matSuffix [for]=\"picker3\"></mat-datepicker-toggle>\n\t\t\t\t<mat-datepicker #picker3></mat-datepicker>\n\t\t\t</mat-form-field>\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput [min]=\"busca.realizadas_de\" [(ngModel)]=\"busca.realizadas_ate\" [matDatepicker]=\"picker4\" placeholder=\"Realizados até\">\n\t\t\t\t<mat-datepicker-toggle matSuffix [for]=\"picker4\"></mat-datepicker-toggle>\n\t\t\t\t<mat-datepicker #picker4></mat-datepicker>\n\t\t\t</mat-form-field>\n\t\t</div>\n\n\t\t<div class=\"controles\">\n\t\t\t<button mat-raised-button color=\"accent\" (click)=\"onResetCamposClick()\">Resetar Campos</button>\n\t\t\t<button mat-raised-button color=\"primary\" class=\"bt-buscar\" (click)=\"onBuscarClick()\">Buscar</button>\n\t\t</div>\n\n\t</div>\n</div>\n\n<div class=\"resultados-container\">\n\t<table class=\"tb-resultados\">\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<td>ID</td>\n\t\t\t\t<td>Status</td>\n\t\t\t\t<td>Nº SSE</td>\n\t\t\t\t<td>Data Recebimento SSE</td>\n\t\t\t\t<td>Nº Domasa</td>\n\t\t\t\t<td>Endereço</td>\n\t\t\t\t<td>ID Bairro</td>\n\t\t\t\t<td>Nome Bairro</td>\n\t\t\t\t<td>Obs</td>\n\t\t\t\t<td>Agendado para</td>\n\t\t\t\t<td>Realizado em</td>\n\t\t\t\t<td>Tot Medidas Prev</td>\n\t\t\t\t<td>Tot Medidas Real</td>\n\t\t\t\t<td>Dif. Medidas</td>\n\t\t\t\t<td>Divergência?</td>\n\t\t\t\t<td>TDS Prev</td>\n\t\t\t\t<td>TDS Real</td>\n\t\t\t\t<td>Dif. TDS</td>\n\t\t\t\t<td>Classificação</td>\n\t\t\t\t<td>Classificação (Alteração)</td>\n\t\t\t\t<td>Prioridade</td>\n\t\t\t\t<td>DL Execução</td>\n\t\t\t\t<td>Data Devolução</td>\n\t\t\t\t<td>DL Garantia</td>\n\t\t\t\t<td>Em Garantia?</td>\n\t\t\t\t<td>Cálculo Execução</td>\n\t\t\t\t<td>Valor da SSE</td>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody *ngFor=\"let sse of sses\">\n\t\t\t<tr>\n\t\t\t\t<td>{{sse.id}}</td>\n\t\t\t\t<td>{{sse.status}}</td>\n\t\t\t\t<td>{{sse.numero}}</td>\n\t\t\t\t<td>{{sse.dh_recebido | date:\"dd/MM/yyyy\"}}</td>\n\t\t\t\t<td>{{sse.bairro?.domasa}}</td>\n\t\t\t\t<td>{{sse.endereco}}</td>\n\t\t\t\t<td>{{sse.bairro?.codigo}}</td>\n\t\t\t\t<td>{{sse.bairro?.nome}}</td>\n\t\t\t\t<td>{{sse.obs}}</td>\n\t\t\t\t<td>{{sse.inicio_p | date:\"dd/MM/yyyy\"}}</td>\n\t\t\t\t<td>{{sse.final_r | date:\"dd/MM/yyyy\"}}</td>\n\t\t\t\t<td>{{sse.total_prev}} {{sse.unid_prev}}</td>\n\t\t\t\t<td>{{sse.total_real}} {{sse.unid_real}}</td>\n\t\t\t\t<td>{{sse.dif_medidas}}</td>\n\t\t\t\t<td>{{sse.label_divergencia}}</td>\n\t\t\t\t<td>{{sse.tipoDeServicoPrev?.codigo}}</td>\n\t\t\t\t<td>{{sse.tipoDeServicoReal?.codigo}}</td>\n\t\t\t\t<td>{{sse.label_dif_tds}}</td>\n\t\t\t\t<td>{{sse.faixaPrev?.label}} ({{sse.faixaPrev?.li}} < X {{ +sse.faixaPrev?.ls == infinito ? '' : '≤ ' + sse.faixaPrev?.ls}})</td>\n\t\t\t\t<td>{{sse.faixa_real_label}}</td>\n\t\t\t\t<td>{{sse.label_urgencia}}</td>\n\t\t\t\t<td>{{sse.prazoFinal | date:'dd/MM/yyyy'}}</td>\n\t\t\t\t<td>{{sse.label_data_devolucao}}</td>\n\t\t\t\t<td>{{sse.label_dl_garantia}}</td>\n\t\t\t\t<td>{{sse.label_em_garantia}}</td>\n\t\t\t\t<td>{{sse.calc_exec}}</td>\n\t\t\t\t<td>{{sse.valor_real | currency:'BRL':symbol:'1.2-2' | moedaBrasil}}</td>\n\t\t\t</tr>\n\t\t\t<!-- <tr>\n\t\t\t\t\n\t\t\t\t<td colspan=\"25\">\n\t\t\t\t\t<table class=\"tarefas\">\n\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t<td>Equipe</td>\n\t\t\t\t\t\t\t<td>Apoio</td>\n\t\t\t\t\t\t\t<td>Data Execução</td>\n\t\t\t\t\t\t\t<td>Consumo</td>\n\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t<td>EQP1 - Nome do Líder</td>\n\t\t\t\t\t\t\t<td>EQAP</td>\n\t\t\t\t\t\t\t<td>24/08/2018</td>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<div>Bica Corrida: 1000m³</div>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t<td>EQP1 - Nome do Líder</td>\n\t\t\t\t\t\t\t<td>EQAP</td>\n\t\t\t\t\t\t\t<td>24/08/2018</td>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<div>Bica Corrida: 1000m³</div>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tbody>\n\t\t\t\t\t</table>\n\t\t\t\t</td>\n\n\t\t\t</tr> -->\n\t\t</tbody>\n\t</table>\n</div>\n"

/***/ }),

/***/ "./src/app/_components/sses-grid/sses-grid.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/_components/sses-grid/sses-grid.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container-filtro .container-selects {\n  display: flex;\n  justify-content: space-between; }\n  .container-filtro .container-selects mat-form-field {\n    width: calc(33% - 20px); }\n  .container-filtro .container-datas {\n  display: flex;\n  justify-content: space-between; }\n  .container-filtro .container-datas mat-form-field {\n    width: calc(25% - 20px); }\n  .container-filtro .controles {\n  margin-top: 15px;\n  display: flex;\n  justify-content: space-between; }\n  .resultados-container {\n  width: -webkit-max-content;\n  width: -moz-max-content;\n  width: max-content;\n  padding: 20px 0 20px 0;\n  margin-top: 20px;\n  border-top: 1px solid #CCC; }\n  .resultados-container .tb-resultados {\n    border-collapse: collapse; }\n  .resultados-container .tb-resultados thead > tr > td {\n      background-color: #212121;\n      color: #FFF; }\n  .resultados-container .tb-resultados tbody td:nth-child(6) {\n      text-align: left; }\n  .resultados-container .tb-resultados td {\n      padding: 3px 5px;\n      border: 1px solid #000;\n      text-align: center; }\n  .resultados-container .tb-resultados > table {\n      border-bottom: 2px solid #000; }\n  mat-toolbar {\n  background-color: rgba(0, 0, 0, 0.5);\n  box-shadow: -2px 3px 7px rgba(0, 0, 0, 0.3); }\n  mat-toolbar button {\n    background-color: transparent;\n    border: none;\n    cursor: pointer;\n    position: relative;\n    top: 8px;\n    color: #E0E0E0;\n    outline: none; }\n  mat-toolbar button:hover {\n      color: #FFF; }\n"

/***/ }),

/***/ "./src/app/_components/sses-grid/sses-grid.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/_components/sses-grid/sses-grid.component.ts ***!
  \**************************************************************/
/*! exports provided: SsesGridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SsesGridComponent", function() { return SsesGridComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_sses_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/sses.service */ "./src/app/_services/sses.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_tipos_de_servico_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/tipos-de-servico.service */ "./src/app/_services/tipos-de-servico.service.ts");
/* harmony import */ var _services_equipes_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/equipes.service */ "./src/app/_services/equipes.service.ts");
/* harmony import */ var _services_domasas_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_services/domasas.service */ "./src/app/_services/domasas.service.ts");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_7__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SsesGridComponent = /** @class */ (function () {
    function SsesGridComponent(ssesService, snackBar, router, tdsService, equipesService, domasaSerive) {
        this.ssesService = ssesService;
        this.snackBar = snackBar;
        this.router = router;
        this.tdsService = tdsService;
        this.equipesService = equipesService;
        this.domasaSerive = domasaSerive;
        this.busca = {
            equipes: [],
            status: ['RETRABALHO', 'DIVERGENTE', 'CADASTRADA', 'AGENDADA', 'EXECUTANDO', 'PENDENTE', 'FINALIZADA'],
            prioridades: [0, 1, 2],
            agendadas_de: undefined,
            agendadas_ate: undefined,
            realizadas_de: undefined,
            realizadas_ate: undefined
        };
        this.buscaPadrao = {
            equipes: [],
            status: ['RETRABALHO', 'DIVERGENTE', 'CADASTRADA', 'AGENDADA', 'EXECUTANDO', 'PENDENTE'],
            prioridades: [0, 1, 2],
            agendadas_de: undefined,
            agendadas_ate: undefined,
            realizadas_de: undefined,
            realizadas_ate: undefined
        };
        this.infinito = 2000000000;
    }
    SsesGridComponent.prototype.ngOnInit = function () {
        this.getSses();
        this.getTiposDeServico();
        this.getEquipes();
        this.getBairros();
    };
    SsesGridComponent.prototype.onBuscarClick = function () {
        this.getSses();
    };
    SsesGridComponent.prototype.onResetCamposClick = function () {
        this.busca = this.buscaPadrao;
    };
    SsesGridComponent.prototype.getSses = function () {
        var _this = this;
        this.ssesService.getAll(this.busca).subscribe(function (res) {
            _this.tmpSses = res;
            _this.parseSses();
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao tentar carregar SSEs', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
        });
    };
    SsesGridComponent.prototype.getTiposDeServico = function () {
        var _this = this;
        this.tdsService.get().subscribe(function (res) {
            _this.tdss = res;
            _this.parseSses();
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar tipos de serviço', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    SsesGridComponent.prototype.getEquipes = function () {
        var _this = this;
        this.equipesService.getEquipes().subscribe(function (res) {
            _this.equipes = res;
            _this.parseSses();
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar Equipes', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    SsesGridComponent.prototype.getBairros = function () {
        var _this = this;
        this.domasaSerive.getFlat().subscribe(function (res) {
            _this.bairros = res;
            _this.parseSses();
        });
    };
    SsesGridComponent.prototype.parseSses = function () {
        if (this.tmpSses && this.tdss && this.equipes && this.bairros) {
            var _loop_1 = function (i) {
                // Lendo sse da vez
                var sse = this_1.tmpSses[i];
                // Parsing escalares
                sse.dh_registrado = new Date(sse.dh_registrado);
                sse.dh_recebido = new Date(sse.dh_recebido);
                sse.inicio_p = sse.inicio_p ? new Date(sse.inicio_p) : null;
                sse.final_p = sse.final_p ? new Date(sse.final_p) : null;
                sse.inicio_r = sse.inicio_r ? new Date(sse.inicio_r) : null;
                sse.final_r = sse.final_r ? new Date(sse.final_r) : null;
                // Paring Equipe
                sse.equipe = this_1.equipes.find(function (e) {
                    return +(e.id) == +(sse.id_equipe);
                });
                delete sse.id_equipe;
                // Parsing tipo de serviço previsto
                sse.tipoDeServicoPrev = this_1.tdss.find(function (tds) {
                    return +tds.id == +sse.id_tds_p;
                });
                delete sse.id_tds_p;
                // Parsing tipo de serviço real
                sse.tipoDeServicoReal = this_1.tdss.find(function (tds) {
                    return +tds.id == +sse.id_tds_r;
                });
                delete sse.id_tds_r;
                // Pargsing bairro
                sse.bairro = this_1.bairros.find(function (bairro) {
                    return +bairro.id == +sse.id_bairro;
                });
                delete sse.id_bairro;
                // Determinando o prazo final
                sse.prazoFinal = new Date(sse.prazo_final + 'T00:00:00');
                // Calculando o total das medidas previstas
                sse.total_prev = 0;
                sse.unid_prev = '';
                switch (sse.tipoDeServicoPrev.medida) {
                    case 'a':
                        for (var i_1 = 0; i_1 < sse.medidas_area.prev.length; i_1++) {
                            var m = sse.medidas_area.prev[i_1];
                            sse.total_prev += m.l * m.c;
                        }
                        sse.unid_prev = 'm²';
                        break;
                    case 'l':
                        for (var i_2 = 0; i_2 < sse.medidas_linear.prev.length; i_2++) {
                            var m = sse.medidas_linear.prev[i_2];
                            sse.total_prev += (1 * m.v);
                        }
                        sse.unid_prev = 'm';
                        break;
                    case 'u':
                        for (var i_3 = 0; i_3 < sse.medidas_unidades.prev.length; i_3++) {
                            var m = sse.medidas_unidades.prev[i_3];
                            sse.total_prev += (1 * m.n);
                        }
                        sse.unid_prev = 'unid';
                        break;
                    default:
                        break;
                }
                // Calculando o total das medidas reais
                if (sse.tipoDeServicoReal) {
                    sse.total_real = 0;
                    sse.unid_real = '';
                    switch (sse.tipoDeServicoReal.medida) {
                        case 'a':
                            for (var i_4 = 0; i_4 < sse.medidas_area.real.length; i_4++) {
                                var m = sse.medidas_area.real[i_4];
                                sse.total_real += m.l * m.c;
                            }
                            sse.unid_real = 'm²';
                            break;
                        case 'l':
                            for (var i_5 = 0; i_5 < sse.medidas_linear.real.length; i_5++) {
                                var m = sse.medidas_linear.real[i_5];
                                sse.total_real += (1 * m.v);
                            }
                            sse.unid_real = 'm';
                            break;
                        case 'u':
                            for (var i_6 = 0; i_6 < sse.medidas_unidades.real.length; i_6++) {
                                var m = sse.medidas_unidades.real[i_6];
                                sse.total_real += (1 * m.n);
                            }
                            sse.unid_real = 'unid';
                            break;
                        default:
                            break;
                    }
                }
                else {
                    sse.total_real = '';
                    sse.unid_real = '';
                }
                // Calculando dif_medidas
                sse.dif_medidas = sse.total_real == '' ? '' : (Math.round((sse.total_prev - sse.total_real) * 10000) / 10000);
                // Calculando se label divergencia
                if (sse.dif_medidas === '') {
                    sse.label_divergencia = '';
                }
                else if (+sse.dif_medidas === 0) {
                    sse.label_divergencia = 'Não';
                }
                else {
                    sse.label_divergencia = 'Sim';
                }
                // Calculando label dif tipo de servico
                if (!sse.tipoDeServicoReal) {
                    sse.label_dif_tds = '';
                }
                else if (sse.tipoDeServicoReal.id != sse.tipoDeServicoPrev.id) {
                    sse.label_dif_tds = 'Sim';
                }
                else {
                    sse.label_dif_tds = 'Não';
                }
                // Calculando label urgencia
                sse.label_urgencia = (sse.urgencia == 0 ? 'Normal' : (sse.urgencia == 1 ? 'Prioridade' : 'Urgência'));
                // Calculando a data da devolução e label_data_devolução				
                if (sse.data_devolucao) {
                    sse.dataDevolucao = new Date(sse.data_devolucao + 'T00:00:00');
                    sse.label_data_devolucao = Object(date_fns__WEBPACK_IMPORTED_MODULE_7__["format"])(sse.dataDevolucao, 'DD/MM/YYYY');
                }
                else {
                    sse.dataDevolucao = null;
                    sse.label_data_devolucao = '';
                }
                // Calculando data limite de garantia
                if (sse.dataDevolucao) {
                    sse.dlGarantia = Object(date_fns__WEBPACK_IMPORTED_MODULE_7__["addYears"])(sse.dataDevolucao, 1);
                    sse.label_dl_garantia = Object(date_fns__WEBPACK_IMPORTED_MODULE_7__["format"])(sse.dlGarantia, 'DD/MM/YYYY');
                    sse.label_em_garantia = Object(date_fns__WEBPACK_IMPORTED_MODULE_7__["isBefore"])(new Date(), sse.dlGarantia) ? 'Sim' : 'Não';
                }
                else {
                    sse.dlGarantia = null;
                    sse.label_dl_garantia = '';
                    sse.label_em_garantia = '';
                }
                // Calculando cálculo de execução dataDevolucao - prazoFinal
                if (sse.dataDevolucao) {
                    sse.calc_exec = Object(date_fns__WEBPACK_IMPORTED_MODULE_7__["differenceInDays"])(sse.dataDevolucao, sse.prazoFinal);
                }
                else {
                    sse.calc_exec = '';
                }
                // Calculando faixa de tipo de trabalho que esta sse se encontra (prev)
                sse.faixaPrev = sse.tipoDeServicoPrev.faixas.find(function (f) {
                    return sse.total_prev <= f.ls && sse.total_prev > f.li;
                });
                // Calculando faixa de tipo de trabalho que esta sse se encontra (real)
                if (sse.tipoDeServicoReal) {
                    sse.faixaReal = sse.tipoDeServicoReal.faixas.find(function (f) {
                        return sse.total_real <= f.ls && sse.total_real > f.li;
                    });
                    sse.faixa_real_label =
                        sse.faixaReal.label + ' (' +
                            (sse.faixaReal.ls == this_1.infinito ? sse.faixaReal.li + ' < X' : sse.faixaReal.li + ' < X ≤ ' + sse.faixaReal.ls) +
                            ')';
                }
                else {
                    sse.faixaReal = null;
                    sse.faixa_real_label = '';
                }
                var _loop_2 = function (i_7) {
                    // Separando tarefa a tratar
                    var tarefa = sse.tarefas[i_7];
                    // Parsing equipe encarregada pela tarefa
                    tarefa.equipe = this_1.equipes.find(function (e) {
                        return e.id == tarefa.id_equipe;
                    });
                    delete tarefa.id_equipe;
                    // Parsing apoio encarregado pela tarefa
                    tarefa.apoio = this_1.equipes.find(function (e) {
                        return e.id == tarefa.id_apoio;
                    });
                    delete tarefa.id_apoio;
                    // Parsing dates
                    tarefa.inicio_p = new Date(tarefa.inicio_p);
                    tarefa.final_p = new Date(tarefa.final_p);
                    tarefa.inicio_r = (tarefa.inicio_r == null ? null : new Date(tarefa.inicio_r));
                    tarefa.final_r = (tarefa.final_r == null ? null : new Date(tarefa.final_r));
                };
                // parsing equipes e apoios das tarefas 
                for (var i_7 = 0; i_7 < sse.tarefas.length; i_7++) {
                    _loop_2(i_7);
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.tmpSses.length; i++) {
                _loop_1(i);
            }
        }
        this.sses = this.tmpSses;
    };
    SsesGridComponent.prototype.onSseButtonClick = function (id) {
        this.router.navigateByUrl('/home/sse/' + id);
    };
    SsesGridComponent.prototype.onNovaSSEButtonClick = function () {
        this.router.navigateByUrl('home/sse/0');
    };
    SsesGridComponent.prototype.onMapButtonClick = function () {
        this.router.navigateByUrl('home/sses/map');
    };
    SsesGridComponent.prototype.parseSsesResponse = function (res) {
        for (var i = 0; i < res.length; i++) {
            res[i].dh_registrado = new Date(res[i].dh_registrado);
        }
        return res;
    };
    SsesGridComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sses',
            template: __webpack_require__(/*! ./sses-grid.component.html */ "./src/app/_components/sses-grid/sses-grid.component.html"),
            styles: [__webpack_require__(/*! ./sses-grid.component.scss */ "./src/app/_components/sses-grid/sses-grid.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_sses_service__WEBPACK_IMPORTED_MODULE_1__["SsesService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_tipos_de_servico_service__WEBPACK_IMPORTED_MODULE_4__["TiposDeServicoService"],
            _services_equipes_service__WEBPACK_IMPORTED_MODULE_5__["EquipesService"],
            _services_domasas_service__WEBPACK_IMPORTED_MODULE_6__["DomasasService"]])
    ], SsesGridComponent);
    return SsesGridComponent;
}());



/***/ }),

/***/ "./src/app/_components/sses-map/sses-map.component.html":
/*!**************************************************************!*\
  !*** ./src/app/_components/sses-map/sses-map.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<agm-map\n\t[latitude]=\"initial_lat\"\n\t[longitude]=\"initial_lng\"\n\t[zoom]=\"initial_zoom\"\n\t(mapClick)=\"onMapClick($event)\">\n\t<agm-marker\n\t\t*ngFor=\"let sse of sses\"\n\t\t[latitude]=\"sse.lat\"\n\t\t[longitude]=\"sse.lng\"\n\t\t[iconUrl]=\"'assets/' + sse.markerFile\"\n\t\t(markerClick)=\"onMarkerClick(infowindow)\">\n\t\t<agm-info-window [disableAutoPan]=\"false\" #infowindow>\n\t\t\t<div class=\"numero\">SSE: {{sse?.numero == null ? 'sem número' : sse?.numero}}</div>\n\t\t\t<div class=\"endereco\">{{sse?.endereco}}</div>\n\t\t\t<div>RG{{sse?.tipoDeServicoPrev?.codigo}} - {{sse?.tipoDeServicoPrev?.descricao}}</div>\n\t\t\t<div class=\"status\">{{sse?.statusMessage}}</div>\n\t\t\t<div class=\"prazo\">Data de Recebimento: {{sse?.dh_recebido?.toLocaleDateString()}}</div>\n\t\t\t<div class=\"prazo\">Prazo de Conclusão: {{sse?.prazoFinal?.toLocaleDateString()}}</div>\n\t\t\t<div>\n\t\t\t\tEquipe Atual: {{ sse.equipe ? ' [' + sse.equipe.sigla + '] - ' + sse.equipe.nome : ' NENHUMA'}}\n\t\t\t</div>\n\t\t\t<countdown *ngIf=\"sse.tempoRestante > 0 && sse.status!= 100 && sse.status!= -100\" [config]=\"{leftTime: sse.tempoRestante}\">Restam: $!d! <span>d</span> : $!h! <span>h</span> : $!m! <span>min</span></countdown>\n\t\t\t<div class=\"atrasado\" *ngIf=\"sse.tempoRestante <= 0 && sse.status!= 100 && sse.status!= -100\" >ATRASADA</div>\n\t\t\t<div class=\"agendamentos\" *ngIf=\"sse.tarefas.length > 0\">\n\t\t\t\t<div class=\"titulo\">Agendamentos para SSE</div>\n\t\t\t\t<table>\n\t\t\t\t\t<thead>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td rowspan=\"2\">Equipe</td>\n\t\t\t\t\t\t\t<td rowspan=\"2\">Apoio</td>\n\t\t\t\t\t\t\t<td rowspan=\"2\">PR</td>\n\t\t\t\t\t\t\t<td colspan=\"2\">Data / Hora</td>\n\t\t\t\t\t\t\t<td rowspan=\"2\">Divergência?</td>\n\t\t\t\t\t\t\t<td rowspan=\"2\">Ações</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>Início</td>\n\t\t\t\t\t\t\t<td>Final</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</thead>\n\t\t\t\t\t<tbody *ngFor=\"let tarefa of sse.tarefas\">\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td rowspan=\"2\">{{tarefa.equipe?.sigla}}</td>\n\t\t\t\t\t\t\t<td rowspan=\"2\">{{tarefa.apoio?.sigla}}</td>\n\t\t\t\t\t\t\t<td>P</td>\n\t\t\t\t\t\t\t<td>{{tarefa.inicio_p | date:'dd/MM HH:mm'}}</td>\n\t\t\t\t\t\t\t<td>{{tarefa.final_p | date:'dd/MM HH:mm'}}</td>\n\t\t\t\t\t\t\t<td>{{tarefa.divergente==1?'SIM':''}}</td>\n\t\t\t\t\t\t\t<td rowspan=\"2\" class=\"bt-container\">\n\t\t\t\t\t\t\t\t<button [disabled]=\"tarefa.inicio_r\" title=\"Alterar Agendamento\" (click)=\"onAlterarAgendamentoClick(sse,tarefa.id)\"><img src=\"assets/editar.svg\"></button>\n\t\t\t\t\t\t\t\t<button [disabled]=\"tarefa.inicio_r\" title=\"Cancelar Agendamento\" (click)=\"onCancelarAgendamentoClick(tarefa.id)\"><img src=\"assets/cancelar.svg\"></button>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td>R</td>\n\t\t\t\t\t\t\t<td>{{tarefa.inicio_r ? (tarefa.inicio_r | date:'dd/MM HH:mm') : ''}}</td>\n\t\t\t\t\t\t\t<td>{{tarefa.final_r ? (tarefa.final_r | date:'dd/MM HH:mm') : '' }}</td>\n\t\t\t\t\t\t\t<td>{{tarefa.autorizadaPor ? 'Aut. por: ' + tarefa.autorizadaPor :''}}</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class=\"controles-info-window\">\n\t\t\t\t<!-- Botão de ver SSE - Sempre visível -->\n\t\t\t\t<button mat-raised-button color=\"accent\" (click)=\"goToSse(sse.id)\" ><mat-icon>visibility</mat-icon>Ver SSE</button>\n\n\t\t\t\t<!-- Botão de cancelar SSE. Visível se status for cadastrada (0), agendada (1), executando (2) ou  divergente(-1) -->\n\t\t\t\t<button\n\t\t\t\t\t*ngIf = \"sse.status=='0' || sse.status=='1' || sse.status=='2' || sse.status=='-1'\"\n\t\t\t\t\tmat-raised-button color=\"accent\"\n\t\t\t\t\t(click)=\"onCancelarSseClick(sse.id)\" >\n\t\t\t\t\t\t<mat-icon>block</mat-icon>Cancelar SSE\n\t\t\t\t</button>\n\n\t\t\t\t<!-- Botão de agendar equipe. Visível quando status não for finalizado (100) nem for cancelado(-100) nem for divergente (-1)-->\n\t\t\t\t<button\n\t\t\t\t\t*ngIf=\"sse.status!=100 && sse.status!= -100 && sse.status != -1\"\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"accent\"\n\t\t\t\t\t(click)=\"onAgendarClick(sse)\">\n\t\t\t\t\t\t<mat-icon>access_time</mat-icon>Agendar Equipe\n\t\t\t\t</button>\n\n\t\t\t\t<!-- Botão Finalizar SSE. Visível somente quando o status é Pendente (3) -->\n\t\t\t\t<button\n\t\t\t\t\t*ngIf=\"sse.status == 3\"\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"accent\"\n\t\t\t\t\t(click)=\"onFinalizarClick(sse)\">\n\t\t\t\t\t\t<mat-icon>done</mat-icon>Finalizar SSE\n\t\t\t\t</button>\n\n\t\t\t\t<!-- Botão Marcar como Retrabalho. Visível somente quando o status é Finalizado (100) -->\n\t\t\t\t<button\n\t\t\t\t\t*ngIf=\"sse.status == 100\"\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"accent\"\n\t\t\t\t\t(click)=\"onRetrabalhoClick(sse.id)\">\n\t\t\t\t\t\t<mat-icon>cached</mat-icon>Marcar como Retrabalho\n\t\t\t\t</button>\n\n\t\t\t\t<!-- Botão Marcar retrabalho como finalizado. Visível somente quando o status é Retrabalho (-2) -->\n\t\t\t\t<button\n\t\t\t\t\t*ngIf=\"sse.status == -2\"\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"accent\"\n\t\t\t\t\t(click)=\"onFinalizarRetrabalhoClick(sse.id)\">\n\t\t\t\t\t\t<mat-icon>done_all</mat-icon>Finalizar Retrabalho\n\t\t\t\t</button>\n\n\t\t\t\t<!-- Botão Reabrir SSE Cancelada. Visível somente quando o status é Canceladp (-100) -->\n\t\t\t\t<button\n\t\t\t\t\t*ngIf=\"sse.status == -100\"\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"accent\"\n\t\t\t\t\t(click)=\"onReabrirClick(sse.id)\">\n\t\t\t\t\t\t<mat-icon>autorenew</mat-icon>Reabrir SSE\n\t\t\t\t</button>\n\n\t\t\t\t<!-- Botão de Autorizar Execução. Visível somente quando o status é Divergente (-1) -->\n\t\t\t\t<button\n\t\t\t\t\t*ngIf=\"sse.status == -1\"\n\t\t\t\t\tmat-raised-button\n\t\t\t\t\tcolor=\"accent\"\n\t\t\t\t\t(click)=\"onAutorizarClick(sse.id)\">\n\t\t\t\t\t\t<mat-icon>lock_open</mat-icon>Autorizar Execução\n\t\t\t\t</button>\n\n\t\t\t</div>\n\t   \t</agm-info-window>\n\t</agm-marker>\n</agm-map>\n\n<div class=\"legenda\">\n\t<div><img src=\"assets/marker-divergente-0.svg\"><span>Divergente</span></div>\n\t<div><img src=\"assets/marker-cadastrada-0.svg\"><span>Cadastrada</span></div>\n\t<div><img src=\"assets/marker-agendada-0.svg\"><span>Agendada</span></div>\n\t<div><img src=\"assets/marker-executando-0.svg\"><span>Executando</span></div>\n\t<div><img src=\"assets/marker-pendente-0.svg\"><span>Pendente</span></div>\n\t<div><img src=\"assets/marker-finalizada-0.svg\"><span>Finalizada</span></div>\n\t<div><img src=\"assets/marker-cancelada-0.svg\"><span>Cancelada</span></div>\n\t<div><img src=\"assets/marker-retrabalho-0.svg\"><span>Retrabalho</span></div>\n\t<div class=\"separador\">Níveis de Prioridade</div>\n\t<div><img src=\"assets/marker-finalizada-0.svg\"><span>Normal</span></div>\n\t<div><img src=\"assets/marker-finalizada-1.svg\"><span>Prioridade</span></div>\n\t<div><img src=\"assets/marker-finalizada-2.svg\"><span>Urgencia</span></div>\n</div>\n\n<div class=\"container-filtro\" *ngIf=\"mostrandoFiltro\">\n\t\n\t<mat-form-field>\n\t\t<mat-select [(ngModel)]=\"busca.equipes\"  placeholder=\"Equipes\" multiple>\n\t\t\t<mat-option *ngFor=\"let equipe of equipes\" [value]=\"equipe\">[{{equipe.sigla}}] {{equipe.nome}}</mat-option>\n\t\t</mat-select>\n\t</mat-form-field>\n\n\t<mat-form-field>\n\t\t<mat-select [(ngModel)]=\"busca.status\"  placeholder=\"Status\" multiple>\n\t\t\t<mat-option value=\"CADASTRADA\">Cadastradas</mat-option>\n\t\t\t<mat-option value=\"AGENDADA\">Agendadas</mat-option>\n\t\t\t<mat-option value=\"EXECUTANDO\">Executando</mat-option>\n\t\t\t<mat-option value=\"PENDENTE\">Pendentes</mat-option>\n\t\t\t<mat-option value=\"FINALIZADA\">Finalizadas</mat-option>\n\t\t\t<mat-option value=\"DIVERGENTE\">Divergentes</mat-option>\n\t\t\t<mat-option value=\"CANCELADA\">Canceladas</mat-option>\n\t\t\t<mat-option value=\"RETRABALHO\">Retrabalho</mat-option>\n\t\t</mat-select>\n\t</mat-form-field>\n\n\t<mat-form-field>\n\t\t<mat-select [(ngModel)]=\"busca.prioridades\"  placeholder=\"Nivel de Prioridade\" multiple>\n\t\t\t<mat-option [value]=\"0\">Normal</mat-option>\n\t\t\t<mat-option [value]=\"1\">Prioridade</mat-option>\n\t\t\t<mat-option [value]=\"2\">Urgente</mat-option>\n\t\t</mat-select>\n\t</mat-form-field>\n\n\t<div class=\"container-datas\">\n\t\t<mat-form-field>\n\t\t\t<input matInput [max]=\"busca.agendadas_ate\" [(ngModel)]=\"busca.agendadas_de\" [matDatepicker]=\"picker1\" placeholder=\"Agendados de\">\n\t\t\t<mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\n\t\t\t<mat-datepicker #picker1></mat-datepicker>\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput [min]=\"busca.agendadas_de\" [(ngModel)]=\"busca.agendadas_ate\" [matDatepicker]=\"picker2\" placeholder=\"Agendados até\">\n\t\t\t<mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\n\t\t\t<mat-datepicker #picker2></mat-datepicker>\n\t\t</mat-form-field>\n\t</div>\n\n\t<div class=\"container-datas\">\n\t\t<mat-form-field>\n\t\t\t<input matInput [max]=\"busca.realizadas_ate\" [(ngModel)]=\"busca.realizadas_de\" [matDatepicker]=\"picker3\" placeholder=\"Realizados de\">\n\t\t\t<mat-datepicker-toggle matSuffix [for]=\"picker3\"></mat-datepicker-toggle>\n\t\t\t<mat-datepicker #picker3></mat-datepicker>\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput [min]=\"busca.realizadas_de\" [(ngModel)]=\"busca.realizadas_ate\" [matDatepicker]=\"picker4\" placeholder=\"Realizados até\">\n\t\t\t<mat-datepicker-toggle matSuffix [for]=\"picker4\"></mat-datepicker-toggle>\n\t\t\t<mat-datepicker #picker4></mat-datepicker>\n\t\t</mat-form-field>\n\t</div>\n\n\t<div class=\"controles\">\n\t\t<button mat-button color=\"primary\" (click)=\"onCancelarBuscaClick()\">Cancelar</button>\n\t\t<button mat-raised-button color=\"accent\" (click)=\"onResetCamposClick()\">Resetar Campos</button>\n\t\t<button mat-raised-button color=\"primary\" class=\"bt-buscar\" (click)=\"onBuscarClick()\">Buscar</button>\n\t</div>\n\n</div>\n\n<mat-toolbar>\n\t<mat-toolbar-row>\n\t\t<span class=\"spacer\"></span>\n\t\t<button  matTooltip=\"Atualizar SSEs\" (click)=\"onAtualizarClick()\">\n\t\t\t<mat-icon>replay</mat-icon>\n\t\t</button>\n\t\t<button  matTooltip=\"Nova SSE\" (click)=\"onNovaSSEButtonClick()\">\n\t\t\t<mat-icon>add</mat-icon>\n\t\t</button>\n\t\t<button  matTooltip=\"Grid\" (click)=\"onGridButtonClick()\">\n\t\t\t<mat-icon>view_list</mat-icon>\n\t\t</button>\n\t\t<button  matTooltip=\"Filtrar SSEs Exibidas\" (click)=\"onFiltrarClick()\">\n\t\t\t<mat-icon>filter_list</mat-icon>\n\t\t</button>\n\t</mat-toolbar-row>\n</mat-toolbar>"

/***/ }),

/***/ "./src/app/_components/sses-map/sses-map.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/_components/sses-map/sses-map.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host() agm-map {\n  height: calc(100vh - 56px); }\n  :host() agm-map .controles-info-window {\n    text-align: left;\n    margin-top: 10px; }\n  :host() agm-map .controles-info-window button {\n      margin-right: 5px; }\n  :host() agm-map .controles-info-window button mat-icon {\n        margin-right: 10px; }\n  :host() agm-map .agendamentos .titulo {\n    font-weight: bold; }\n  :host() agm-map .agendamentos table {\n    width: 100%;\n    border-collapse: collapse;\n    margin: 10px 0 0 0; }\n  :host() agm-map .agendamentos table td {\n      border: 1px solid #DEDEDE;\n      text-align: center;\n      padding: 2px; }\n  :host() agm-map .agendamentos table .bt-container button {\n      cursor: pointer;\n      width: 25px;\n      height: 25px;\n      margin: 2px; }\n  :host() agm-map .agendamentos table .bt-container button img {\n        width: 20px;\n        position: relative;\n        left: -5px; }\n  :host() agm-map .agendamentos table .bt-container button:disabled {\n      cursor: default; }\n  :host() agm-map .agendamentos table .bt-container button:disabled img {\n        opacity: 0.5; }\n  :host() agm-map .numero {\n    font-weight: bold;\n    margin: 10px 0;\n    font-size: 18px; }\n  :host() agm-map .atrasado {\n    padding: 4px;\n    background-color: #F00;\n    color: #FFF;\n    text-align: center;\n    border-radius: 3px;\n    margin: 10px 0; }\n  :host() agm-map countdown {\n    padding: 4px;\n    background-color: #C80;\n    color: #FFF;\n    text-align: center;\n    border-radius: 3px;\n    margin: 10px 0;\n    display: block !important; }\n  :host() .legenda {\n  position: fixed;\n  left: 0px;\n  bottom: 32px;\n  left: 23px;\n  padding: 10px 10px 0 10px;\n  background-color: rgba(255, 255, 255, 0.5);\n  border-radius: 4px;\n  box-shadow: -2px 3px 7px rgba(0, 0, 0, 0.3); }\n  :host() .legenda div {\n    margin: 0 0 10px 0; }\n  :host() .legenda img {\n    vertical-align: middle;\n    height: 24px;\n    margin-right: 5px; }\n  :host() .container-filtro {\n  background-color: rgba(255, 255, 255, 0.8);\n  position: fixed;\n  top: 120px;\n  right: 0px;\n  width: 450px;\n  height: calc(100vh - 120px);\n  border-radius: 0 0 0 4px;\n  box-shadow: -2px 3px 7px rgba(0, 0, 0, 0.3);\n  padding: 20px; }\n  :host() .container-filtro mat-form-field {\n    display: block; }\n  :host() .container-filtro mat-form-field .mat-select-content {\n      width: 2000px !important;\n      background-color: red !important;\n      font-size: 10px !important; }\n  :host() .container-filtro .container-datas {\n    display: flex;\n    justify-content: space-between; }\n  :host() .container-filtro .container-datas mat-form-field {\n      display: inline-block;\n      width: calc(50% - 5px); }\n  :host() .container-filtro .controles {\n    display: flex;\n    justify-content: space-between; }\n  :host() .container-filtro .controles .bt-buscar {\n      width: 150px; }\n  :host() mat-toolbar {\n  background-color: rgba(0, 0, 0, 0.5);\n  position: fixed;\n  left: 0;\n  top: 56px;\n  z-index: 1;\n  box-shadow: -2px 3px 7px rgba(0, 0, 0, 0.3); }\n  :host() mat-toolbar button {\n    background-color: transparent;\n    border: none;\n    cursor: pointer;\n    position: relative;\n    top: 8px;\n    color: #E0E0E0;\n    outline: none; }\n  :host() mat-toolbar button:hover {\n      color: #FFF; }\n"

/***/ }),

/***/ "./src/app/_components/sses-map/sses-map.component.ts":
/*!************************************************************!*\
  !*** ./src/app/_components/sses-map/sses-map.component.ts ***!
  \************************************************************/
/*! exports provided: SsesMapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SsesMapComponent", function() { return SsesMapComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_sses_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/sses.service */ "./src/app/_services/sses.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_tipos_de_servico_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/tipos-de-servico.service */ "./src/app/_services/tipos-de-servico.service.ts");
/* harmony import */ var _services_equipes_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/equipes.service */ "./src/app/_services/equipes.service.ts");
/* harmony import */ var _nova_tarefa_nova_tarefa_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../nova-tarefa/nova-tarefa.component */ "./src/app/_components/nova-tarefa/nova-tarefa.component.ts");
/* harmony import */ var _services_tarefa_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_services/tarefa.service */ "./src/app/_services/tarefa.service.ts");
/* harmony import */ var _components_finalizar_sse_finalizar_sse_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_components/finalizar-sse/finalizar-sse.component */ "./src/app/_components/finalizar-sse/finalizar-sse.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SsesMapComponent = /** @class */ (function () {
    function SsesMapComponent(equipesService, ssesService, snackBar, router, tdsService, dialog, tarefaService) {
        this.equipesService = equipesService;
        this.ssesService = ssesService;
        this.snackBar = snackBar;
        this.router = router;
        this.tdsService = tdsService;
        this.dialog = dialog;
        this.tarefaService = tarefaService;
        this.initial_lat = -22.916405805627686;
        this.initial_lng = -47.067499388564215;
        this.initial_zoom = 11;
        this.mostrandoFiltro = false;
        this.IRSSE = 300000; // Intervalo para recarregar sses: 5min
        this.busca = {
            equipes: [],
            status: ['RETRABALHO', 'DIVERGENTE', 'CADASTRADA', 'AGENDADA', 'EXECUTANDO', 'PENDENTE'],
            prioridades: [0, 1, 2],
            agendadas_de: undefined,
            agendadas_ate: undefined,
            realizadas_de: undefined,
            realizadas_ate: undefined
        };
        this.buscaPadrao = {
            equipes: [],
            status: ['RETRABALHO', 'DIVERGENTE', 'CADASTRADA', 'AGENDADA', 'EXECUTANDO', 'PENDENTE'],
            prioridades: [0, 1, 2],
            agendadas_de: undefined,
            agendadas_ate: undefined,
            realizadas_de: undefined,
            realizadas_ate: undefined
        };
    }
    SsesMapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTiposDeServico();
        this.getEquipes();
        this.getSses();
        this.reload_sses_interval = window.setInterval(function () {
            window.setTimeout(function () {
                _this.getSses();
            }), Math.round(Math.random() * 2000);
        }, this.IRSSE);
    };
    SsesMapComponent.prototype.ngOnDestroy = function () {
        window.clearInterval(this.reload_sses_interval);
    };
    SsesMapComponent.prototype.getSses = function () {
        var _this = this;
        this.ssesService.getAll(this.busca).subscribe(function (res) {
            _this.tmpSses = res;
            _this.parseSses();
            _this.markerAtual = undefined;
            _this.mostrandoFiltro = false;
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao tentar carregar SSEs', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
        });
    };
    SsesMapComponent.prototype.getTiposDeServico = function () {
        var _this = this;
        this.tdsService.get().subscribe(function (res) {
            _this.tdss = res;
            _this.parseSses();
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar tipos de serviço', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    SsesMapComponent.prototype.getEquipes = function () {
        var _this = this;
        this.equipesService.getEquipes().subscribe(function (res) {
            _this.equipes = res;
            _this.parseSses();
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar Equipes', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    SsesMapComponent.prototype.onMarkerClick = function (infowindow) {
        if (this.markerAtual) {
            this.markerAtual.close();
        }
        this.markerAtual = infowindow;
    };
    SsesMapComponent.prototype.parseSses = function () {
        var _this = this;
        if (this.tmpSses && this.tdss && this.equipes) {
            var _loop_1 = function (i) {
                // Lendo sse da vez
                var sse = this_1.tmpSses[i];
                // Parsing escalares
                sse.dh_registrado = new Date(sse.dh_registrado);
                sse.dh_recebido = new Date(sse.dh_recebido);
                // Paring Equipe
                sse.equipe = this_1.equipes.find(function (e) {
                    return +(e.id) == +(_this.tmpSses[i].id_equipe);
                });
                delete this_1.tmpSses[i].id_equipe;
                // Parsing tipo de serviço previsto
                sse.tipoDeServicoPrev = this_1.tdss.find(function (tds) {
                    return +tds.id == +_this.tmpSses[i].id_tds_p;
                });
                delete this_1.tmpSses[i].id_tds_p;
                // Parsing tipo de serviço real
                sse.tipoDeServicoReal = this_1.tdss.find(function (tds) {
                    return +tds.id == +_this.tmpSses[i].id_tds_r;
                });
                delete this_1.tmpSses[i].id_tds_r;
                // Determinando o prazo final
                sse.prazoFinal = new Date(sse.prazo_final + 'T00:00:00');
                // Determinando o tempo restante (17 horas do dia fo prazo final)
                sse.tempoRestante = (sse.prazoFinal.getTime() + (17 * 60 * 60 * 1000) - (new Date()).getTime()) / 1000;
                // Determinando o nome do arquivo marker
                sse.markerFile = 'marker-';
                sse.statusMsg = '';
                switch (+sse.status) {
                    case -100:
                        sse.markerFile += 'cancelada';
                        sse.statusMessage = 'Cancelada';
                        break;
                    case -2:
                        sse.markerFile += 'retrabalho';
                        sse.statusMessage = 'Retrabalho';
                        break;
                    case -1:
                        sse.markerFile += 'divergente';
                        sse.statusMessage = 'Divergente';
                        break;
                    case 0:
                        sse.markerFile += 'cadastrada';
                        sse.statusMessage = 'Cadastrada - aguardando ação do programador.';
                        break;
                    case 1:
                        sse.markerFile += 'agendada';
                        sse.statusMessage = 'Agendada';
                        break;
                    case 2:
                        sse.markerFile += 'executando';
                        sse.statusMessage = 'Executando';
                        break;
                    case 3:
                        sse.markerFile += 'pendente';
                        sse.statusMessage = 'Pendente - aguardando ação do programador.';
                        break;
                    case 100:
                        sse.markerFile += 'finalizada';
                        sse.statusMessage = 'Finalizada';
                        break;
                }
                sse.markerFile += '-' + sse.urgencia;
                sse.markerFile += '.svg';
                var _loop_2 = function (i_1) {
                    // Separando tarefa a tratar
                    var tarefa = sse.tarefas[i_1];
                    // Parsing equipe encarregada pela tarefa
                    tarefa.equipe = this_1.equipes.find(function (e) {
                        return e.id == tarefa.id_equipe;
                    });
                    delete tarefa.id_equipe;
                    // Parsing apoio encarregado pela tarefa
                    tarefa.apoio = this_1.equipes.find(function (e) {
                        return e.id == tarefa.id_apoio;
                    });
                    delete tarefa.id_apoio;
                    // Parsing dates
                    tarefa.inicio_p = new Date(tarefa.inicio_p);
                    tarefa.final_p = new Date(tarefa.final_p);
                    tarefa.inicio_r = (tarefa.inicio_r == null ? null : new Date(tarefa.inicio_r));
                    tarefa.final_r = (tarefa.final_r == null ? null : new Date(tarefa.final_r));
                };
                // parsing equipes e apoios das tarefas 
                for (var i_1 = 0; i_1 < sse.tarefas.length; i_1++) {
                    _loop_2(i_1);
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.tmpSses.length; i++) {
                _loop_1(i);
            }
        }
        this.sses = this.tmpSses;
    };
    SsesMapComponent.prototype.onMapClick = function (evt) {
        if (this.markerAtual) {
            this.markerAtual.close();
        }
        this.markerAtual = undefined;
    };
    SsesMapComponent.prototype.goToSse = function (id) {
        this.router.navigateByUrl('home/sse/' + id);
    };
    SsesMapComponent.prototype.onBuscarClick = function () {
        this.getSses();
    };
    SsesMapComponent.prototype.onAtualizarClick = function () {
        this.getSses();
    };
    SsesMapComponent.prototype.onResetCamposClick = function () {
        this.busca = this.buscaPadrao;
    };
    SsesMapComponent.prototype.onCancelarBuscaClick = function () {
        this.mostrandoFiltro = false;
    };
    SsesMapComponent.prototype.onAgendarClick = function (id_sse) {
        this.openDialog(id_sse);
    };
    SsesMapComponent.prototype.onCancelarSseClick = function (id_sse) {
        var _this = this;
        var pergunta = 'Tem certeza que deseja marcar esta SSE como CANCELADA?';
        var ok = window.confirm(pergunta);
        if (ok) {
            this.ssesService.setCancelada(id_sse).subscribe(function () {
                _this.getSses();
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar cancelar SSE', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
                // Imprimindo erro no console
                console.warn(err);
            });
        }
    };
    SsesMapComponent.prototype.onCancelarAgendamentoClick = function (id_tarefa) {
        var _this = this;
        var pergunta = 'Tem certeza que deseja cancelar agendamento?';
        var ok = window.confirm(pergunta);
        if (ok) {
            this.tarefaService.remove(id_tarefa).subscribe(function () {
                _this.getSses();
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar cancelar agendamento', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
            });
        }
    };
    SsesMapComponent.prototype.onAlterarAgendamentoClick = function (sse, id_tarefa) {
        var _this = this;
        var dialogRef = this.dialog.open(_nova_tarefa_nova_tarefa_component__WEBPACK_IMPORTED_MODULE_6__["NovaTarefaComponent"], {
            width: '800px',
            data: {
                'sse': sse,
                'id_tarefa': id_tarefa,
                'equipes': this.equipes,
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == 1) {
                _this.getSses();
            }
        });
    };
    SsesMapComponent.prototype.onAutorizarClick = function (id_sse) {
        var _this = this;
        var autorizadaPor = window.prompt("Quem está autorizando a tarefa?").trim();
        if (autorizadaPor) {
            this.ssesService.setAutorizada(id_sse, autorizadaPor).subscribe(function (res) {
                // Recarregando sses
                _this.getSses();
                // Exibindo snackbar de sucesso
                _this.snackBar.open('SSE Autorizada com sucesso ', undefined, {
                    panelClass: ['snackbar-ok'],
                });
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao autorizar a SSE', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
            });
        }
    };
    SsesMapComponent.prototype.onFinalizarClick = function (sse) {
        var _this = this;
        var dialogRef = this.dialog.open(_components_finalizar_sse_finalizar_sse_component__WEBPACK_IMPORTED_MODULE_8__["FinalizarSseComponent"], {
            width: '400px',
            data: {
                'id_sse': sse.id,
                'data_conclusao': sse.final_r
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == 1) {
                _this.getSses();
                // Exibindo snackbar de sucesso
                _this.snackBar.open('SSE finalizada com sucesso!', undefined, {
                    panelClass: ['snackbar-ok'],
                });
            }
        });
    };
    SsesMapComponent.prototype.onReabrirClick = function (id_sse) {
        var _this = this;
        var pergunta = 'Tem certeza que deseja reabrir esta SSE?';
        var ok = window.confirm(pergunta);
        if (ok) {
            this.ssesService.reabrir(id_sse).subscribe(function (res) {
                _this.getSses();
            });
        }
    };
    SsesMapComponent.prototype.onRetrabalhoClick = function (id_sse) {
        var _this = this;
        var pergunta = "Tem certeza que deseja marcar esta SSE como retrabalho?";
        if (confirm(pergunta)) {
            this.ssesService.setRetrabalho(id_sse).subscribe(function () {
                _this.getSses();
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao marcar SSE como retrabalho', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
            });
        }
    };
    SsesMapComponent.prototype.onFinalizarRetrabalhoClick = function (id_sse) {
        var _this = this;
        var pergunta = "Tem certeza que deseja finalizar o retrabalho desta SSE?";
        if (confirm(pergunta)) {
            this.ssesService.finalizarRetrabalho(id_sse).subscribe(function () {
                _this.getSses();
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao finalizar retrabalho da sse', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
            });
        }
    };
    SsesMapComponent.prototype.onGridButtonClick = function () {
        this.router.navigateByUrl('home/sses/grid');
    };
    SsesMapComponent.prototype.onNovaSSEButtonClick = function () {
        this.router.navigateByUrl('home/sse/0');
    };
    SsesMapComponent.prototype.openDialog = function (sse) {
        var _this = this;
        var dialogRef = this.dialog.open(_nova_tarefa_nova_tarefa_component__WEBPACK_IMPORTED_MODULE_6__["NovaTarefaComponent"], {
            width: '800px',
            data: {
                'sse': sse,
                'equipes': this.equipes,
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == 1) {
                _this.getSses();
            }
        });
    };
    SsesMapComponent.prototype.onFiltrarClick = function () {
        this.mostrandoFiltro = !this.mostrandoFiltro;
    };
    SsesMapComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sses-map',
            template: __webpack_require__(/*! ./sses-map.component.html */ "./src/app/_components/sses-map/sses-map.component.html"),
            styles: [__webpack_require__(/*! ./sses-map.component.scss */ "./src/app/_components/sses-map/sses-map.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_equipes_service__WEBPACK_IMPORTED_MODULE_5__["EquipesService"],
            _services_sses_service__WEBPACK_IMPORTED_MODULE_1__["SsesService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_tipos_de_servico_service__WEBPACK_IMPORTED_MODULE_4__["TiposDeServicoService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _services_tarefa_service__WEBPACK_IMPORTED_MODULE_7__["TarefaService"]])
    ], SsesMapComponent);
    return SsesMapComponent;
}());



/***/ }),

/***/ "./src/app/_components/sses/sses.component.html":
/*!******************************************************!*\
  !*** ./src/app/_components/sses/sses.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/_components/sses/sses.component.scss":
/*!******************************************************!*\
  !*** ./src/app/_components/sses/sses.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/_components/sses/sses.component.ts":
/*!****************************************************!*\
  !*** ./src/app/_components/sses/sses.component.ts ***!
  \****************************************************/
/*! exports provided: SsesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SsesComponent", function() { return SsesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SsesComponent = /** @class */ (function () {
    function SsesComponent(router) {
        this.router = router;
    }
    SsesComponent.prototype.ngOnInit = function () {
    };
    SsesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sses',
            template: __webpack_require__(/*! ./sses.component.html */ "./src/app/_components/sses/sses.component.html"),
            styles: [__webpack_require__(/*! ./sses.component.scss */ "./src/app/_components/sses/sses.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], SsesComponent);
    return SsesComponent;
}());



/***/ }),

/***/ "./src/app/_components/tarefa/tarefa.component.html":
/*!**********************************************************!*\
  !*** ./src/app/_components/tarefa/tarefa.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container container-80 top-gap\">\n\t\n\t<div class=\"container-sse\">\n\t\t<div class=\"controles-sse\">\n\t\t\t<mat-form-field>\n\t\t\t\t<input matInput type=\"text\" readonly placeholder=\"SSE Número\" value=\"{{sse.numero}}\">\n\t\t\t</mat-form-field>\n\t\t\t<button mat-icon-button><mat-icon>edit</mat-icon></button>\n\t\t</div>\n\t\t<agm-map\n\t\t\t[latitude]=\"sse?.lat\"\n\t\t\t[longitude]=\"sse?.lng\"\n\t\t\t[zoom]=\"12\">\n\n\t\t\t<agm-marker\n\t\t\t\t[latitude]=\"sse?.lat\"\n\t\t\t\t[longitude]=\"sse?.lng\">\n\t\t\t</agm-marker>\n\n\t\t\t<agm-marker\n\t\t\t\t*ngFor=\"let s of ssesPendentes\"\n\t\t\t\ticonUrl=\"assets/at_work_icon.svg\"\n\t\t\t\t[latitude]=\"s?.lat\"\n\t\t\t\t[longitude]=\"s?.lng\">\n\t\t\t</agm-marker>\n\t\t</agm-map>\n\t\t\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" readonly placeholder=\"Endereço\" [(ngModel)]=\"sse.endereco\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" readonly placeholder=\"Solicitação\" value=\"RG{{sse.tipoDeServicoPrev?.codigo}} - {{sse.tipoDeServicoPrev?.descricao}}\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" readonly placeholder=\"Recebida em\" value=\"{{sse.dh_recebido.toLocaleString()}}\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input matInput type=\"text\" readonly placeholder=\"Prazo de Entrega\" value=\"{{prazoDeEntrega.toLocaleString()}}\">\n\t\t</mat-form-field>\n\t</div>\n\n\t<div class=\"container-tarefa\">\n\n\t\t<div class=\"tempo-restante\">\n\t\t\t<countdown [config]=\"{leftTime: tempoRestante}\">$!d! <span>d</span> : $!h! <span>h</span> : $!m! <span>min</span></countdown>\n\t\t\t<div>restantes</div>\n\t\t</div>\t\t\n\n\t\t<form #tarefaForm=\"ngForm\">\n\t\t\t\n\t\t\t<mat-form-field>\n\t\t\t\t<mat-select required placeholder=\"Equipe\" name=\"equipe\" [(ngModel)]=\"tarefa.equipe\" >\n\t\t\t\t\t<mat-option [value]=\"equipe\" *ngFor=\"let equipe of equipes\" >[{{equipe?.sigla}}] - {{equipe?.nome}}</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field>\n\t\t\t\t<mat-select placeholder=\"Equipe de Apoio\" name=\"apoio\" [(ngModel)]=\"tarefa.apoio\">\n\t\t\t\t\t<mat-option [value]=\"null\">Nenhuma equipe de apoio</mat-option>\n\t\t\t\t\t<mat-option [value]=\"apoio\" *ngFor=\"let apoio of equipes\" >[{{apoio.sigla}}] - {{apoio.nome}}</mat-option>\n\t\t\t\t</mat-select>\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field>\n\t\t\t\t<input\n\t\t\t\t\tmatInput\n\t\t\t\t\trequired\n\t\t\t\t\ttype=\"datetime-local\"\n\t\t\t\t\tname=\"inicio_p\"\n\t\t\t\t\t[(ngModel)]=\"tarefa.inicio_p\"\n\t\t\t\t\tplaceholder=\"Início Previsto\">\n\t\t\t</mat-form-field>\n\n\t\t\t<mat-form-field>\n\t\t\t\t<input\n\t\t\t\t\tmatInput\n\t\t\t\t\trequired\n\t\t\t\t\ttype=\"datetime-local\"\n\t\t\t\t\tname=\"final_p\"\n\t\t\t\t\t[(ngModel)]=\"tarefa.final_p\"\n\t\t\t\t\tplaceholder=\"Final Previsto\">\n\t\t\t</mat-form-field>\n\n\t\t\t<div class=\"controles\">\n\t\t\t\t<button mat-raised-button color=\"accent\">Cancelar</button>\n\t\t\t\t<button mat-raised-button color=\"primary\" (click)=\"onSalvarTarefaClick()\">Salvar</button>\n\t\t\t</div>\n\n\t\t</form>\n\t</div>\n</div>"

/***/ }),

/***/ "./src/app/_components/tarefa/tarefa.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/_components/tarefa/tarefa.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n * @param target Which kind of high contrast setting to target. Defaults to `active`, can be\n *    `white-on-black` or `black-on-white`.\n */\n/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n.container {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  margin-bottom: 10px; }\n.container .container-tarefa {\n    width: calc(50% - 40px);\n    padding: 20px; }\n.container .container-tarefa .tempo-restante {\n      background-color: #FAD835;\n      margin-bottom: 20px;\n      padding: 0 0 10px 0; }\n.container .container-tarefa .tempo-restante countdown {\n        font-size: 48px;\n        display: block !important;\n        text-align: center; }\n.container .container-tarefa .tempo-restante countdown span {\n          font-size: 20px; }\n.container .container-tarefa .tempo-restante > div:nth-child(2) {\n        text-align: center;\n        font-size: 20px;\n        text-transform: uppercase; }\n.container .container-tarefa mat-form-field {\n      width: 100%; }\n.container .container-tarefa .controles {\n      display: flex;\n      justify-content: space-between; }\n.container .container-sse {\n    width: calc(50% - 41px);\n    padding: 20px;\n    border-right: 1px solid #CCC; }\n.container .container-sse .controles-sse {\n      display: flex; }\n.container .container-sse .controles-sse mat-form-field {\n        flex-grow: 1; }\n.container .container-sse .controles-sse button {\n        margin-left: 10px;\n        position: relative;\n        top: 5px; }\n.container .container-sse agm-map {\n      height: 400px;\n      margin: 0 0 15px 0; }\n.container .container-sse > mat-form-field {\n      width: 100%; }\n"

/***/ }),

/***/ "./src/app/_components/tarefa/tarefa.component.ts":
/*!********************************************************!*\
  !*** ./src/app/_components/tarefa/tarefa.component.ts ***!
  \********************************************************/
/*! exports provided: TarefaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TarefaComponent", function() { return TarefaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_equipes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/equipes.service */ "./src/app/_services/equipes.service.ts");
/* harmony import */ var _services_tarefa_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/tarefa.service */ "./src/app/_services/tarefa.service.ts");
/* harmony import */ var _services_sses_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/sses.service */ "./src/app/_services/sses.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TarefaComponent = /** @class */ (function () {
    function TarefaComponent(equipesService, tarefaService, ssesService, snackBar, router, route) {
        this.equipesService = equipesService;
        this.tarefaService = tarefaService;
        this.ssesService = ssesService;
        this.snackBar = snackBar;
        this.router = router;
        this.route = route;
        this.equipes = [];
        this.tarefa = {
            equipe: null,
            apoio: null
        };
        this.sse = {
            id: 0,
            endereco: '',
            dh_recebido: new Date(),
            dh_registrado: new Date(),
            tipoDeServicoPrev: {
                codigo: '',
                descricao: ''
            }
        };
        this.prazoDeEntrega = new Date();
        this.atrasado = false;
        this.tempoRestante = 0;
        this.ssesPendentes = [];
    }
    TarefaComponent.prototype.ngOnInit = function () {
        this.getEquipes();
        this.getTarefa();
        this.getSSEsPendentes();
    };
    TarefaComponent.prototype.getEquipes = function () {
        var _this = this;
        this.equipesService.getEquipes().subscribe(function (res) {
            _this.equipes = res;
            _this.parseTarefa();
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar Equipes', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    TarefaComponent.prototype.getTarefa = function () {
        var _this = this;
        // Capturando id da tarega
        var id = this.route.snapshot.paramMap.get('id');
        // Requisitando a tarefa do servidor
        if (id != '0') {
            this.tarefaService.getById(+id).subscribe(function (res) {
                _this.reqTarefaResp = res;
                _this.parseTarefa();
                _this.getSSE(_this.reqTarefaResp.id_sse);
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao carregar tarefa', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
                // Imprimindo erro no console
                console.warn(err);
            });
        }
    };
    TarefaComponent.prototype.getSSE = function (id) {
        var _this = this;
        this.ssesService.getById(id, false).subscribe(function (res) {
            // Parsing SSE dates
            res.dh_recebido = new Date(res.dh_recebido);
            res.dh_registrado = new Date(res.dh_registrado);
            _this.sse = res;
            // Calculando prazo de entrega
            _this.prazoDeEntrega = new Date(_this.sse.dh_recebido.getTime());
            _this.prazoDeEntrega.setDate(_this.prazoDeEntrega.getDate() + _this.sse.tipoDeServicoPrev.prazo);
            // Calculando o tempo restante
            _this.tempoRestante = (_this.prazoDeEntrega.getTime() - (new Date()).getTime()) / 1000;
            // Removendo a sse do vetor de ssesPendentes
            if (_this.ssesPendentes) {
                _this.ssesPendentes = _this.ssesPendentes.filter(function (sse) {
                    return sse.id != _this.sse.id;
                });
            }
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar SSE da tarefa', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    TarefaComponent.prototype.getSSEsPendentes = function () {
        var _this = this;
        this.ssesService.getPendentes().subscribe(function (res) {
            _this.ssesPendentes = res;
            if (_this.sse.id) {
                _this.ssesPendentes.filter(function (s) {
                    return s.id != _this.sse.id;
                });
            }
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar SSEs', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
            // Imprimindo erro no console
            console.warn(err);
        });
    };
    TarefaComponent.prototype.parseTarefa = function () {
        var _this = this;
        if (this.reqTarefaResp && this.equipes) {
            // Parsing equipe
            this.reqTarefaResp.equipe = this.equipes.find(function (e) {
                return e.id == _this.reqTarefaResp.id_equipe;
            });
            delete this.reqTarefaResp.id_equipe;
            // Parsing apoio
            if (this.reqTarefaResp.id_apoio == null) {
                this.reqTarefaResp.apoio = null;
            }
            else {
                this.reqTarefaResp.apoio = this.equipes.find(function (e) {
                    return e.id == _this.reqTarefaResp.id_apoio;
                });
            }
            delete this.reqTarefaResp.id_apoio;
            // Parsing Dates previstas
            this.reqTarefaResp.inicio_p = this.reqTarefaResp.inicio_p.replace(' ', 'T');
            this.reqTarefaResp.final_p = this.reqTarefaResp.final_p.replace(' ', 'T');
            // atribuindo a requisição a tarefa
            this.tarefa = this.reqTarefaResp;
        }
    };
    TarefaComponent.prototype.onSalvarTarefaClick = function () {
        if (this.tarefa.id == 0) {
        }
        else {
            this.updateTarefa();
        }
    };
    TarefaComponent.prototype.updateTarefa = function () {
        var _this = this;
        this.tarefaService.update(this.tarefa).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao tentar salvar a tarefa', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-error'],
            });
        });
    };
    TarefaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tarefa',
            template: __webpack_require__(/*! ./tarefa.component.html */ "./src/app/_components/tarefa/tarefa.component.html"),
            styles: [__webpack_require__(/*! ./tarefa.component.scss */ "./src/app/_components/tarefa/tarefa.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_equipes_service__WEBPACK_IMPORTED_MODULE_3__["EquipesService"],
            _services_tarefa_service__WEBPACK_IMPORTED_MODULE_4__["TarefaService"],
            _services_sses_service__WEBPACK_IMPORTED_MODULE_5__["SsesService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], TarefaComponent);
    return TarefaComponent;
}());



/***/ }),

/***/ "./src/app/_components/usuario/usuario.component.html":
/*!************************************************************!*\
  !*** ./src/app/_components/usuario/usuario.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-50 top-gap padding\">\n\t<form #usuarioForm=\"ngForm\">\n\t\t<mat-form-field>\n\t\t\t<input name=\"nome\" [(ngModel)]=\"usuario.nome\" matInput placeholder=\"Nome\" required>\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input name=\"email\" [(ngModel)]=\"usuario.email\" matInput placeholder=\"E-mail\" type=\"email\" email #email=\"ngModel\" required>\n\t\t\t<mat-error *ngIf=\"email.invalid\">E-mail inválido</mat-error>\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input name=\"username\" [(ngModel)]=\"usuario.username\" matInput placeholder=\"Login\" required>\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input name=\"senha1\" [(ngModel)]=\"senha1\" matInput type=\"password\" placeholder=\"Senha\" [required]=\"usuario.id==0\">\n\t\t</mat-form-field>\n\t\t<mat-form-field>\n\t\t\t<input name=\"senha2\" [(ngModel)]=\"senha2\" matInput type=\"password\" placeholder=\"Confirmação de Senha\" [required]=\"usuario.id==0\">\n\t\t</mat-form-field>\n\n\t\t<mat-checkbox name=\"ativo\" [(ngModel)]=\"usuario.ativo\" color=\"primary\">Ativo</mat-checkbox>\n\n\t\t<mat-form-field>\n\t\t\t<mat-select name=\"acessoApp\" [(ngModel)]=\"usuario.acessoApp\" [disabled]=\"!usuario.ativo\" placeholder=\"Acesso via APP\">\n\t\t\t\t<mat-option [value]=\"0\">Não tem</mat-option>\n\t\t\t\t<mat-option [value]=\"1\">Como Registrador</mat-option>\n\t\t\t\t<mat-option [value]=\"2\">Como Executor</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\n\t\t<mat-form-field>\n\t\t\t<mat-select name=\"acessoWeb\" [(ngModel)]=\"usuario.acessoWeb\" [disabled]=\"!usuario.ativo\" placeholder=\"Acesso Web\">\n\t\t\t\t<mat-option [value]=\"false\">Não</mat-option>\n\t\t\t\t<mat-option [value]=\"true\">Sim</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-form-field>\n\t\t\n\t\t<div class=\"controles\">\n\t\t\t<button mat-raised-button color=\"accent\" (click)=\"onCancelarClick()\">Cancelar</button>\n\t\t\t<span class=\"spacer\"></span>\n\t\t\t<button\n\t\t\t\t[disabled]=\"usuarioForm.invalid || senha1 != senha2\"\n\t\t\t\tmat-raised-button\n\t\t\t\tcolor=\"primary\"\n\t\t\t\tclass=\"salvar\"\n\t\t\t\ttype=\"button\"\n\t\t\t\t(click)=\"onSalvarClick()\">{{(senha1 != senha2) ? \"Confirmação de senha inválida\" : \"Salvar\"}}</button>\n\t\t</div>\n\t</form>\n</div>"

/***/ }),

/***/ "./src/app/_components/usuario/usuario.component.scss":
/*!************************************************************!*\
  !*** ./src/app/_components/usuario/usuario.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n * @param target Which kind of high contrast setting to target. Defaults to `active`, can be\n *    `white-on-black` or `black-on-white`.\n */\n/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n:host() > div {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  background-color: #FFF;\n  padding: 40px;\n  position: relative;\n  left: -40px; }\n:host() > div mat-form-field {\n    width: 100%;\n    margin-bottom: 10px; }\n:host() > div mat-checkbox {\n    width: 100%;\n    margin-bottom: 24px;\n    display: inline-block; }\n:host() > div .checkbox-container {\n    display: flex;\n    justify-content: space-between; }\n:host() > div .controles {\n    margin-top: 30px;\n    display: flex; }\n"

/***/ }),

/***/ "./src/app/_components/usuario/usuario.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/_components/usuario/usuario.component.ts ***!
  \**********************************************************/
/*! exports provided: UsuarioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioComponent", function() { return UsuarioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_usuarios_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/usuarios.service */ "./src/app/_services/usuarios.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsuarioComponent = /** @class */ (function () {
    function UsuarioComponent(snackBar, router, route, usuariosService) {
        this.snackBar = snackBar;
        this.router = router;
        this.route = route;
        this.usuariosService = usuariosService;
        this.usuario = {
            id: 0,
            nome: '',
            email: '',
            username: '',
            ativo: true,
            acessoApp: 0,
            acessoWeb: false,
        };
    }
    UsuarioComponent.prototype.ngOnInit = function () {
        this.getUsuario();
    };
    UsuarioComponent.prototype.getUsuario = function () {
        var _this = this;
        // Capturando idu da url
        var idu = this.route.snapshot.paramMap.get('id');
        if (idu != '0') {
            // Chamando o serviço para carregar o usuário
            this.usuariosService.getById(idu).subscribe(function (res) {
                _this.usuario = res;
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar carregar usuário', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
            });
        }
    };
    UsuarioComponent.prototype.onSalvarClick = function () {
        var _this = this;
        if (this.usuario.id == 0) {
            this.usuariosService.create(this.usuario, this.senha1)
                .subscribe(function (res) {
                // Exibindo snackbar de sucesso
                _this.snackBar.open('Usuário criado com sucesso!', undefined, {
                    panelClass: ['snackbar-ok'],
                });
                // Navegando para página de usuários
                _this.router.navigateByUrl('/home/usuarios');
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar criar novo usuário', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
                // Imprimindo erro no console
                console.warn(err);
            });
        }
        else {
            this.usuariosService.update(this.usuario, this.senha1)
                .subscribe(function (res) {
                // Exibindo snackbar de sucesso
                _this.snackBar.open('Usuário atualizado com sucesso', undefined, {
                    panelClass: ['snackbar-ok'],
                });
                // Redirecionando para página de usuários
                _this.router.navigateByUrl('/home/usuarios');
            }, function (err) {
                // Exibindo snackbar de erro
                _this.snackBar
                    .open('Falha ao tentar atualizar usuário.', 'Fechar', {
                    duration: 0,
                    horizontalPosition: 'left',
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-error'],
                });
                // Imprimindo erro no console
                console.warn(err);
            });
        }
    };
    UsuarioComponent.prototype.onCancelarClick = function () {
        this.router.navigateByUrl('/home/usuarios');
    };
    UsuarioComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-usuario',
            template: __webpack_require__(/*! ./usuario.component.html */ "./src/app/_components/usuario/usuario.component.html"),
            styles: [__webpack_require__(/*! ./usuario.component.scss */ "./src/app/_components/usuario/usuario.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_usuarios_service__WEBPACK_IMPORTED_MODULE_3__["UsuariosService"]])
    ], UsuarioComponent);
    return UsuarioComponent;
}());



/***/ }),

/***/ "./src/app/_components/usuarios/usuarios.component.html":
/*!**************************************************************!*\
  !*** ./src/app/_components/usuarios/usuarios.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-80 top-gap padding\">\n\t<div class=\"controles\">\n\t\t\t<span class=\"spacer\"></span>\n\t\t\t<button mat-raised-button color=\"primary\" (click)=\"onNovoUsuarioClick()\">\n\t\t\t\tCadastrar Novo Usuário\n\t\t\t</button>\n\t</div>\n\t<mat-list>\n\t\t<mat-list-item *ngFor=\"let u of usuarios\" [ngClass]=\"{'inativo': !u.ativo}\" (click)=\"onUsuarioClick(u.id)\">\n\t\t\t<mat-icon matListIcon>person</mat-icon>\n\t\t\t<h2 matLine> {{u.nome}}</h2>\n\t\t\t<p matLine>\n\t\t\t\t<span> {{u.email}}</span>\n\t\t\t</p>\n\t\t\t<button mat-icon-button>\n\t\t\t\t<mat-icon>keyboard_arrow_right</mat-icon>\n\t\t\t</button>\n\t\t</mat-list-item>\n\t</mat-list>\n</div>"

/***/ }),

/***/ "./src/app/_components/usuarios/usuarios.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/_components/usuarios/usuarios.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * Applies styles for users in high contrast mode. Note that this only applies\n * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n * attribute, however Chrome handles high contrast differently.\n * @param target Which kind of high contrast setting to target. Defaults to `active`, can be\n *    `white-on-black` or `black-on-white`.\n */\n/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n:host() > div .controles {\n  margin-bottom: 40px;\n  display: flex; }\n:host() > div .controles mat-checkbox {\n    position: relative;\n    top: 9px; }\n:host() > div mat-list {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  padding-top: 0; }\n:host() > div mat-list mat-list-item {\n    background-color: #FFF;\n    border-bottom: 1px solid #CCC;\n    cursor: pointer; }\n:host() > div mat-list mat-list-item:last-child {\n      border-bottom: none; }\n:host() > div mat-list mat-list-item:hover {\n      background-color: #F0F0F0; }\n:host() > div mat-list .inativo {\n    color: #CCC; }\n"

/***/ }),

/***/ "./src/app/_components/usuarios/usuarios.component.ts":
/*!************************************************************!*\
  !*** ./src/app/_components/usuarios/usuarios.component.ts ***!
  \************************************************************/
/*! exports provided: UsuariosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuariosComponent", function() { return UsuariosComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/usuarios.service */ "./src/app/_services/usuarios.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsuariosComponent = /** @class */ (function () {
    function UsuariosComponent(usuariosService, router, snackBar) {
        this.usuariosService = usuariosService;
        this.router = router;
        this.snackBar = snackBar;
    }
    UsuariosComponent.prototype.ngOnInit = function () {
        this.getUsuarios();
    };
    UsuariosComponent.prototype.getUsuarios = function () {
        var _this = this;
        this.usuariosService.getUsuarios()
            .subscribe(function (usuarios) {
            _this.usuarios = usuarios;
        }, function (err) {
            // Exibindo snackbar de erro
            _this.snackBar
                .open('Falha ao carregar usuários', 'Fechar', {
                duration: 0,
                horizontalPosition: 'left',
                verticalPosition: 'bottom'
            });
        });
    };
    UsuariosComponent.prototype.onUsuarioClick = function (idu) {
        this.router.navigateByUrl('/home/usuarios/' + idu);
    };
    UsuariosComponent.prototype.onNovoUsuarioClick = function () {
        this.router.navigateByUrl('/home/usuarios/0');
    };
    UsuariosComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-usuarios',
            template: __webpack_require__(/*! ./usuarios.component.html */ "./src/app/_components/usuarios/usuarios.component.html"),
            styles: [__webpack_require__(/*! ./usuarios.component.scss */ "./src/app/_components/usuarios/usuarios.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_usuarios_service__WEBPACK_IMPORTED_MODULE_1__["UsuariosService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"]])
    ], UsuariosComponent);
    return UsuariosComponent;
}());



/***/ }),

/***/ "./src/app/_directives/focus.directive.ts":
/*!************************************************!*\
  !*** ./src/app/_directives/focus.directive.ts ***!
  \************************************************/
/*! exports provided: FocusDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusDirective", function() { return FocusDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FocusDirective = /** @class */ (function () {
    function FocusDirective(el) {
        this.el = el;
    }
    FocusDirective.prototype.ngOnInit = function () {
        this.el.nativeElement.focus();
    };
    FocusDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[focus]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], FocusDirective);
    return FocusDirective;
}());



/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    // Construtor
    function AuthGuard(router) {
        this.router = router;
    }
    // Método canActivate
    AuthGuard.prototype.canActivate = function (route, state) {
        // Verificando se o usuário está setado no localStorage	
        if (localStorage.getItem('currentUser')) {
            // Usuário logado; Retorna true!
            return true;
        }
        else {
            // Não está logado.
            // Navegando para página de login
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            // Retornando false
            return false;
        }
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/_helpers/error.interceptor.ts":
/*!***********************************************!*\
  !*** ./src/app/_helpers/error.interceptor.ts ***!
  \***********************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(authService) {
        this.authService = authService;
    }
    ErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (err) {
            if (err.status === 401) {
                // Auto logout if 401 response returned from api
                _this.authService.logout();
                console.log('Falhou com 401');
                location.reload(true);
            }
            var error = err.error.message || err.statusText;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(error);
        }));
    };
    ErrorInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());



/***/ }),

/***/ "./src/app/_helpers/jwt.interceptor.ts":
/*!*********************************************!*\
  !*** ./src/app/_helpers/jwt.interceptor.ts ***!
  \*********************************************/
/*! exports provided: JwtInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtInterceptor", function() { return JwtInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor() {
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + currentUser.token
                }
            });
        }
        return next.handle(request);
    };
    JwtInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], JwtInterceptor);
    return JwtInterceptor;
}());



/***/ }),

/***/ "./src/app/_models/movimento.ts":
/*!**************************************!*\
  !*** ./src/app/_models/movimento.ts ***!
  \**************************************/
/*! exports provided: Movimento */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Movimento", function() { return Movimento; });
var TipoDeMovimento;
(function (TipoDeMovimento) {
    TipoDeMovimento[TipoDeMovimento["entrada"] = 1] = "entrada";
    TipoDeMovimento[TipoDeMovimento["saida"] = -1] = "saida";
})(TipoDeMovimento || (TipoDeMovimento = {}));
var Movimento = /** @class */ (function () {
    function Movimento() {
    }
    return Movimento;
}());



/***/ }),

/***/ "./src/app/_models/nf.ts":
/*!*******************************!*\
  !*** ./src/app/_models/nf.ts ***!
  \*******************************/
/*! exports provided: NF */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NF", function() { return NF; });
var NF = /** @class */ (function () {
    function NF() {
    }
    return NF;
}());



/***/ }),

/***/ "./src/app/_models/sse.ts":
/*!********************************!*\
  !*** ./src/app/_models/sse.ts ***!
  \********************************/
/*! exports provided: SSE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SSE", function() { return SSE; });
var NiveisDeUrgencia;
(function (NiveisDeUrgencia) {
    NiveisDeUrgencia[NiveisDeUrgencia["normal"] = 0] = "normal";
    NiveisDeUrgencia[NiveisDeUrgencia["prioridade"] = 1] = "prioridade";
    NiveisDeUrgencia[NiveisDeUrgencia["urgente"] = 2] = "urgente";
})(NiveisDeUrgencia || (NiveisDeUrgencia = {}));
var SSE = /** @class */ (function () {
    function SSE() {
    }
    return SSE;
}());



/***/ }),

/***/ "./src/app/_models/tarefa.ts":
/*!***********************************!*\
  !*** ./src/app/_models/tarefa.ts ***!
  \***********************************/
/*! exports provided: Tarefa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tarefa", function() { return Tarefa; });
var Tarefa = /** @class */ (function () {
    function Tarefa() {
    }
    Object.defineProperty(Tarefa.prototype, "status", {
        // Getters e setters
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
    return Tarefa;
}());



/***/ }),

/***/ "./src/app/_modules/material/material.module.ts":
/*!******************************************************!*\
  !*** ./src/app/_modules/material/material.module.ts ***!
  \******************************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatAutocompleteModule"]
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatAutocompleteModule"]
            ],
            declarations: []
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/_pipes/moeda-brasil.pipe.ts":
/*!*********************************************!*\
  !*** ./src/app/_pipes/moeda-brasil.pipe.ts ***!
  \*********************************************/
/*! exports provided: MoedaBrasilPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoedaBrasilPipe", function() { return MoedaBrasilPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MoedaBrasilPipe = /** @class */ (function () {
    function MoedaBrasilPipe() {
    }
    MoedaBrasilPipe.prototype.transform = function (value) {
        if (value != null) {
            // Pondo o símbolo de reais com espaço
            value = value.replace('R$', 'R$ ');
            // Trocando '.' por "##";
            value = value.replace('.', "##");
            // Trocando ',' por '.'
            value = value.replace(',', '.');
            // Trocando o "##" por ','
            value = value.replace('##', ',');
            // Retornando
            return value;
        }
        else {
            return null;
        }
    };
    MoedaBrasilPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'moedaBrasil'
        })
    ], MoedaBrasilPipe);
    return MoedaBrasilPipe;
}());



/***/ }),

/***/ "./src/app/_pipes/numero-br.pipe.ts":
/*!******************************************!*\
  !*** ./src/app/_pipes/numero-br.pipe.ts ***!
  \******************************************/
/*! exports provided: NumeroBrPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumeroBrPipe", function() { return NumeroBrPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NumeroBrPipe = /** @class */ (function () {
    function NumeroBrPipe() {
    }
    NumeroBrPipe.prototype.transform = function (value) {
        // Retornando nulo se null
        if (value == null) {
            return null;
        }
        // Trocando '.' por "##";
        value = value.replace('.', "##");
        // Trocando ',' por '.'
        value = value.replace(',', '.');
        // Trocando o "##" por ','
        value = value.replace('##', ',');
        // Retornando
        return value;
    };
    NumeroBrPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'numeroBr'
        })
    ], NumeroBrPipe);
    return NumeroBrPipe;
}());



/***/ }),

/***/ "./src/app/_services/auth.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/auth.service.ts ***!
  \*******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.loginUrl = '/maxse/api/login';
        this.refreshUrl = '/maxse/api/refresh';
    }
    // Método que realiza o login
    AuthService.prototype.login = function (username, password, from) {
        return this.http.post(this.loginUrl, { username: username, password: password, from: from });
    };
    // Método que realiza o logout
    AuthService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
    };
    // Método que verifica se está logado
    AuthService.prototype.isLogged = function () {
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        else {
            return false;
        }
    };
    // Método que atualiza o token e a sua validade
    AuthService.prototype.refresh = function () {
        this.http.get(this.refreshUrl)
            .subscribe(function (response) {
            // login successful if there's a jwt token in the response
            if (response && response.novoToken) {
                // Recupera currentUser da localstorage
                var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                // Altera o valor do token do currentUser
                currentUser.token = response.novoToken;
                // Guarda currentUser com novo token na localStorage
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
        });
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/_services/domasas.service.ts":
/*!**********************************************!*\
  !*** ./src/app/_services/domasas.service.ts ***!
  \**********************************************/
/*! exports provided: DomasasService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomasasService", function() { return DomasasService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DomasasService = /** @class */ (function () {
    function DomasasService(http) {
        this.http = http;
        this.getUrl = '/maxse/api/domasas';
    }
    DomasasService.prototype.get = function () {
        return this.http.get(this.getUrl);
    };
    DomasasService.prototype.getFlat = function () {
        return this.http.get(this.getUrl + '/flat');
    };
    DomasasService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], DomasasService);
    return DomasasService;
}());



/***/ }),

/***/ "./src/app/_services/equipes.service.ts":
/*!**********************************************!*\
  !*** ./src/app/_services/equipes.service.ts ***!
  \**********************************************/
/*! exports provided: EquipesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipesService", function() { return EquipesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EquipesService = /** @class */ (function () {
    function EquipesService(http) {
        this.http = http;
        // Definição de urls
        this.url_getTipos = '/maxse/api/tdes';
        this.url_getEquipes = '/maxse/api/equipes';
        this.url_getEquipeById = '/maxse/api/equipes/';
        this.url_create = '/maxse/api/equipes';
        this.url_update = '/maxse/api/equipes/';
    }
    // Métoto que carrega todos os tipos de equipe
    EquipesService.prototype.getTiposDeEquipe = function () {
        return this.http.get(this.url_getTipos);
    };
    // Método que carrega todas as equipes
    EquipesService.prototype.getEquipes = function () {
        return this.http.get(this.url_getEquipes);
    };
    // Método que carrega uma equipe pelo id
    EquipesService.prototype.getEquipeById = function (id) {
        return this.http.get(this.url_getEquipeById + id);
    };
    // Método que cria uma nova equipe
    EquipesService.prototype.create = function (equipe) {
        return this.http.post(this.url_create, equipe);
    };
    // Método que atualiza uma equipe existente
    EquipesService.prototype.update = function (data) {
        return this.http.put(this.url_update + data.equipe.id, data);
    };
    EquipesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], EquipesService);
    return EquipesService;
}());



/***/ }),

/***/ "./src/app/_services/movimentos.service.ts":
/*!*************************************************!*\
  !*** ./src/app/_services/movimentos.service.ts ***!
  \*************************************************/
/*! exports provided: MovimentosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovimentosService", function() { return MovimentosService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MovimentosService = /** @class */ (function () {
    function MovimentosService(http) {
        this.http = http;
        this.url_get = '/maxse/api/estoque/movimentos';
        this.url_update = '/maxse/api/estoque/movimentos';
        this.url_create = '/maxse/api/estoque/movimentos';
        this.url_delete = '/maxse/api/estoque/movimentos';
        this.url_createNf = '/maxse/api/estoque/nfs';
    }
    MovimentosService.prototype.get = function () {
        return this.http.get(this.url_get);
    };
    MovimentosService.prototype.delete = function (id_movimento) {
        return this.http.delete(this.url_delete + '/' + id_movimento);
    };
    MovimentosService.prototype.update = function (movimento) {
        return this.http.put(this.url_delete + '/' + movimento.id, movimento);
    };
    MovimentosService.prototype.createNf = function (nf) {
        return this.http.post(this.url_createNf, nf);
    };
    MovimentosService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], MovimentosService);
    return MovimentosService;
}());



/***/ }),

/***/ "./src/app/_services/produtos.service.ts":
/*!***********************************************!*\
  !*** ./src/app/_services/produtos.service.ts ***!
  \***********************************************/
/*! exports provided: ProdutosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProdutosService", function() { return ProdutosService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProdutosService = /** @class */ (function () {
    function ProdutosService(http) {
        this.http = http;
        this.url_get = '/maxse/api/estoque/produtos';
        this.url_update = '/maxse/api/estoque/produtos';
        this.url_create = '/maxse/api/estoque/produtos';
        this.url_delete = '/maxse/api/estoque/produtos';
    }
    ProdutosService.prototype.get = function () {
        return this.http.get(this.url_get);
    };
    ProdutosService.prototype.update = function (produto) {
        return this.http.put(this.url_update + '/' + produto.id, produto);
    };
    ProdutosService.prototype.create = function (produto) {
        return this.http.post(this.url_create, produto);
    };
    ProdutosService.prototype.delete = function (id) {
        return this.http.delete(this.url_delete + '/' + id);
    };
    ProdutosService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ProdutosService);
    return ProdutosService;
}());



/***/ }),

/***/ "./src/app/_services/sses.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/sses.service.ts ***!
  \*******************************************/
/*! exports provided: SsesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SsesService", function() { return SsesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SsesService = /** @class */ (function () {
    function SsesService(http) {
        this.http = http;
        // Definições de urls
        this.url_getSses = '/maxse/api/sses';
        this.url_getSsesPendentes = '/maxse/api/sses/pendentes';
        this.url_updateSses = '/maxse/api/sses';
        this.url_createSses = '/maxse/api/sses';
    }
    // Método que carrega todas as SSEs
    SsesService.prototype.getAll = function (busca) {
        // Definindo queryString
        var queryString = '';
        if (busca) {
            // Pegando só os ids das equipes
            var ideqs = busca.equipes.map(function (equipe) {
                return equipe.id;
            });
            // Definindo partes da queryString
            var parts = [];
            for (var key in busca) {
                if (busca.hasOwnProperty(key)) {
                    if (busca[key] instanceof Date) {
                        parts.push(key + "=" + Object(date_fns__WEBPACK_IMPORTED_MODULE_2__["format"])(busca[key], 'YYYY-MM-DD'));
                    }
                    else if (key == "equipes") {
                        parts.push("equipes=" + ideqs.toString());
                    }
                    else if (busca[key] != undefined) {
                        parts.push(key + "=" + busca[key].toString());
                    }
                }
            }
            // Juntando partes da queryString
            queryString = '?' + parts.join('&');
        }
        return this.http.get(this.url_getSses + queryString);
    };
    // Retorna SSEs pendentes
    SsesService.prototype.getPendentes = function () {
        return this.http.get(this.url_getSsesPendentes);
    };
    // Método que carrega sse
    SsesService.prototype.getById = function (id, comFoto) {
        if (comFoto === void 0) { comFoto = true; }
        if (comFoto) {
            return this.http.get(this.url_getSses + '/' + id);
        }
        else {
            return this.http.get(this.url_getSses + '/' + id + '?comFoto=0');
        }
    };
    // Método que atualiza uma sse
    SsesService.prototype.update = function (sse) {
        return this.http.put(this.url_updateSses + '/' + sse.id, sse);
    };
    // Método que cria uma sse
    SsesService.prototype.create = function (sse) {
        return this.http.post(this.url_createSses, sse);
    };
    // Marca uma SSE como finalizada
    SsesService.prototype.setFinalizada = function (id_sse, tipoDeFinalizacao, data_devolucao) {
        var dados = { 'tipo': tipoDeFinalizacao, 'data_devolucao': Object(date_fns__WEBPACK_IMPORTED_MODULE_2__["format"])(data_devolucao, 'YYYY-MM-DD') };
        return this.http.patch(this.url_getSses + '/' + id_sse + '/setFinalizada', dados);
    };
    // Marca uma SSE como retrabalho
    SsesService.prototype.setRetrabalho = function (id_sse) {
        return this.http.patch(this.url_getSses + '/' + id_sse + '/setRetrabalho', '');
    };
    // Finaliza o retrabalho de uma SSE
    SsesService.prototype.finalizarRetrabalho = function (id_sse) {
        return this.http.patch(this.url_getSses + '/' + id_sse + '/finalizaRetrabalho', '');
    };
    // Marca uma SSE como Cancelada
    SsesService.prototype.setCancelada = function (id_sse) {
        return this.http.patch(this.url_getSses + '/' + id_sse + '/setCancelada', '');
    };
    // Reabrir uma SSE finalizada
    SsesService.prototype.reabrir = function (id_sse) {
        return this.http.patch(this.url_getSses + '/' + id_sse + '/reabrir', '');
    };
    SsesService.prototype.setAutorizada = function (id_sse, autorizadaPor) {
        var dados = { id_sse: id_sse, autorizadaPor: autorizadaPor };
        return this.http.patch(this.url_getSses + '/' + id_sse + '/setAutorizada', dados);
    };
    SsesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], SsesService);
    return SsesService;
}());



/***/ }),

/***/ "./src/app/_services/tarefa.service.ts":
/*!*********************************************!*\
  !*** ./src/app/_services/tarefa.service.ts ***!
  \*********************************************/
/*! exports provided: TarefaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TarefaService", function() { return TarefaService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TarefaService = /** @class */ (function () {
    function TarefaService(http) {
        this.http = http;
        this.url_get = '/maxse/api/tarefas';
        this.url_put = '/maxse/api/tarefas';
        this.url_post = '/maxse/api/tarefas';
        this.url_delete = '/maxse/api/tarefas';
    }
    TarefaService.prototype.getById = function (id) {
        return this.http.get(this.url_get + '/' + id);
    };
    TarefaService.prototype.update = function (tarefa) {
        return this.http.put(this.url_put + '/' + tarefa.id, tarefa);
    };
    TarefaService.prototype.create = function (tarefa) {
        return this.http.post(this.url_post, tarefa);
    };
    TarefaService.prototype.remove = function (id) {
        return this.http.delete(this.url_delete + '/' + id);
    };
    TarefaService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TarefaService);
    return TarefaService;
}());



/***/ }),

/***/ "./src/app/_services/tipos-de-servico.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/_services/tipos-de-servico.service.ts ***!
  \*******************************************************/
/*! exports provided: TiposDeServicoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TiposDeServicoService", function() { return TiposDeServicoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TiposDeServicoService = /** @class */ (function () {
    function TiposDeServicoService(http) {
        this.http = http;
        this.getUrl = '/maxse/api/tdss';
    }
    TiposDeServicoService.prototype.get = function () {
        return this.http.get(this.getUrl);
    };
    TiposDeServicoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TiposDeServicoService);
    return TiposDeServicoService;
}());



/***/ }),

/***/ "./src/app/_services/usuarios.service.ts":
/*!***********************************************!*\
  !*** ./src/app/_services/usuarios.service.ts ***!
  \***********************************************/
/*! exports provided: UsuariosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuariosService", function() { return UsuariosService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UsuariosService = /** @class */ (function () {
    function UsuariosService(http) {
        this.http = http;
        // Definição de urls
        this.url_getUsuarios = '/maxse/api/usuarios';
        this.url_getById = '/maxse/api/usuarios/';
        this.url_create = '/maxse/api/usuarios';
        this.url_update = '/maxse/api/usuarios/';
    }
    // Método que lista todos os usuários
    UsuariosService.prototype.getUsuarios = function () {
        return this.http.get(this.url_getUsuarios);
    };
    // Método que carrega um usuário a partir de sua id
    UsuariosService.prototype.getById = function (idu) {
        return this.http.get(this.url_getById + idu);
    };
    // Cria um novo usuário
    UsuariosService.prototype.create = function (usuario, senha) {
        var data = { 'usuario': usuario, 'senha': senha };
        return this.http.post(this.url_create, data);
    };
    // Atualiza um usuário existente
    UsuariosService.prototype.update = function (usuario, senha) {
        var data = { 'usuario': usuario, 'senha': senha };
        return this.http.put(this.url_update + usuario.id, data);
    };
    UsuariosService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UsuariosService);
    return UsuariosService;
}());



/***/ }),

/***/ "./src/app/app-routing/app-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/app-routing/app-routing.module.ts ***!
  \***************************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_components/login/login.component */ "./src/app/_components/login/login.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_components/home/home.component */ "./src/app/_components/home/home.component.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_guards/auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony import */ var _components_dash_dash_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_components/dash/dash.component */ "./src/app/_components/dash/dash.component.ts");
/* harmony import */ var _components_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_components/usuarios/usuarios.component */ "./src/app/_components/usuarios/usuarios.component.ts");
/* harmony import */ var _components_usuario_usuario_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_components/usuario/usuario.component */ "./src/app/_components/usuario/usuario.component.ts");
/* harmony import */ var _components_equipes_equipes_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_components/equipes/equipes.component */ "./src/app/_components/equipes/equipes.component.ts");
/* harmony import */ var _components_equipe_equipe_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_components/equipe/equipe.component */ "./src/app/_components/equipe/equipe.component.ts");
/* harmony import */ var _components_sses_sses_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_components/sses/sses.component */ "./src/app/_components/sses/sses.component.ts");
/* harmony import */ var _components_sse_sse_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../_components/sse/sse.component */ "./src/app/_components/sse/sse.component.ts");
/* harmony import */ var _components_sses_grid_sses_grid_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../_components/sses-grid/sses-grid.component */ "./src/app/_components/sses-grid/sses-grid.component.ts");
/* harmony import */ var _components_sses_map_sses_map_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../_components/sses-map/sses-map.component */ "./src/app/_components/sses-map/sses-map.component.ts");
/* harmony import */ var _components_tarefa_tarefa_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../_components/tarefa/tarefa.component */ "./src/app/_components/tarefa/tarefa.component.ts");
/* harmony import */ var _components_estoque_estoque_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../_components/estoque/estoque.component */ "./src/app/_components/estoque/estoque.component.ts");
/* harmony import */ var _components_produtos_produtos_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../_components/produtos/produtos.component */ "./src/app/_components/produtos/produtos.component.ts");
/* harmony import */ var _components_movimentos_movimentos_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../_components/movimentos/movimentos.component */ "./src/app/_components/movimentos/movimentos.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var routes = [
    {
        path: 'login',
        component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
    },
    {
        path: 'home',
        component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"],
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]],
        children: [
            {
                path: 'dash',
                component: _components_dash_dash_component__WEBPACK_IMPORTED_MODULE_5__["DashComponent"],
            },
            {
                path: 'usuarios',
                component: _components_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_6__["UsuariosComponent"],
            },
            {
                path: 'usuarios/:id',
                component: _components_usuario_usuario_component__WEBPACK_IMPORTED_MODULE_7__["UsuarioComponent"],
            },
            {
                path: 'equipes',
                component: _components_equipes_equipes_component__WEBPACK_IMPORTED_MODULE_8__["EquipesComponent"],
            },
            {
                path: 'estoque',
                component: _components_estoque_estoque_component__WEBPACK_IMPORTED_MODULE_15__["EstoqueComponent"],
                children: [
                    {
                        path: 'produtos',
                        component: _components_produtos_produtos_component__WEBPACK_IMPORTED_MODULE_16__["ProdutosComponent"]
                    },
                    {
                        path: 'movimentos',
                        component: _components_movimentos_movimentos_component__WEBPACK_IMPORTED_MODULE_17__["MovimentosComponent"]
                    },
                    {
                        path: '**',
                        redirectTo: 'movimentos'
                    }
                ]
            },
            {
                path: 'tarefas/:id',
                component: _components_tarefa_tarefa_component__WEBPACK_IMPORTED_MODULE_14__["TarefaComponent"]
            },
            {
                path: 'sse/:id',
                component: _components_sse_sse_component__WEBPACK_IMPORTED_MODULE_11__["SseComponent"],
            },
            {
                path: 'sses',
                component: _components_sses_sses_component__WEBPACK_IMPORTED_MODULE_10__["SsesComponent"],
                children: [
                    {
                        path: 'grid',
                        component: _components_sses_grid_sses_grid_component__WEBPACK_IMPORTED_MODULE_12__["SsesGridComponent"]
                    },
                    {
                        path: 'map',
                        component: _components_sses_map_sses_map_component__WEBPACK_IMPORTED_MODULE_13__["SsesMapComponent"]
                    },
                    {
                        path: '**',
                        redirectTo: 'map'
                    }
                ]
            },
            {
                path: 'equipes/:id',
                component: _components_equipe_equipe_component__WEBPACK_IMPORTED_MODULE_9__["EquipeComponent"],
            },
            {
                path: '**',
                redirectTo: 'sses'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(authService) {
        this.authService = authService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.isLogged = this.authService.isLogged();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _modules_material_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_modules/material/material.module */ "./src/app/_modules/material/material.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing_app_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app-routing/app-routing.module */ "./src/app/app-routing/app-routing.module.ts");
/* harmony import */ var ngx_countdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-countdown */ "./node_modules/ngx-countdown/esm5/countdown.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _helpers_error_interceptor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_helpers/error.interceptor */ "./src/app/_helpers/error.interceptor.ts");
/* harmony import */ var _helpers_jwt_interceptor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_helpers/jwt.interceptor */ "./src/app/_helpers/jwt.interceptor.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./_components/home/home.component */ "./src/app/_components/home/home.component.ts");
/* harmony import */ var _components_dash_dash_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./_components/dash/dash.component */ "./src/app/_components/dash/dash.component.ts");
/* harmony import */ var _components_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./_components/usuarios/usuarios.component */ "./src/app/_components/usuarios/usuarios.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./_components/login/login.component */ "./src/app/_components/login/login.component.ts");
/* harmony import */ var _components_usuario_usuario_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./_components/usuario/usuario.component */ "./src/app/_components/usuario/usuario.component.ts");
/* harmony import */ var _components_equipes_equipes_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./_components/equipes/equipes.component */ "./src/app/_components/equipes/equipes.component.ts");
/* harmony import */ var _components_equipe_equipe_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./_components/equipe/equipe.component */ "./src/app/_components/equipe/equipe.component.ts");
/* harmony import */ var _components_sses_sses_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./_components/sses/sses.component */ "./src/app/_components/sses/sses.component.ts");
/* harmony import */ var _components_sses_map_sses_map_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./_components/sses-map/sses-map.component */ "./src/app/_components/sses-map/sses-map.component.ts");
/* harmony import */ var _components_sses_grid_sses_grid_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./_components/sses-grid/sses-grid.component */ "./src/app/_components/sses-grid/sses-grid.component.ts");
/* harmony import */ var _components_sse_sse_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./_components/sse/sse.component */ "./src/app/_components/sse/sse.component.ts");
/* harmony import */ var _components_tarefa_tarefa_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./_components/tarefa/tarefa.component */ "./src/app/_components/tarefa/tarefa.component.ts");
/* harmony import */ var _components_nova_tarefa_nova_tarefa_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./_components/nova-tarefa/nova-tarefa.component */ "./src/app/_components/nova-tarefa/nova-tarefa.component.ts");
/* harmony import */ var _directives_focus_directive__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./_directives/focus.directive */ "./src/app/_directives/focus.directive.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _components_estoque_estoque_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./_components/estoque/estoque.component */ "./src/app/_components/estoque/estoque.component.ts");
/* harmony import */ var _components_produtos_produtos_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./_components/produtos/produtos.component */ "./src/app/_components/produtos/produtos.component.ts");
/* harmony import */ var _components_edit_produto_edit_produto_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./_components/edit-produto/edit-produto.component */ "./src/app/_components/edit-produto/edit-produto.component.ts");
/* harmony import */ var _components_movimentos_movimentos_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./_components/movimentos/movimentos.component */ "./src/app/_components/movimentos/movimentos.component.ts");
/* harmony import */ var _components_lancar_nota_lancar_nota_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./_components/lancar-nota/lancar-nota.component */ "./src/app/_components/lancar-nota/lancar-nota.component.ts");
/* harmony import */ var _components_edit_movimento_edit_movimento_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./_components/edit-movimento/edit-movimento.component */ "./src/app/_components/edit-movimento/edit-movimento.component.ts");
/* harmony import */ var _components_finalizar_sse_finalizar_sse_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./_components/finalizar-sse/finalizar-sse.component */ "./src/app/_components/finalizar-sse/finalizar-sse.component.ts");
/* harmony import */ var _pipes_moeda_brasil_pipe__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./_pipes/moeda-brasil.pipe */ "./src/app/_pipes/moeda-brasil.pipe.ts");
/* harmony import */ var _pipes_numero_br_pipe__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./_pipes/numero-br.pipe */ "./src/app/_pipes/numero-br.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_0__["AppComponent"],
                _components_login_login_component__WEBPACK_IMPORTED_MODULE_16__["LoginComponent"],
                _components_home_home_component__WEBPACK_IMPORTED_MODULE_13__["HomeComponent"],
                _components_dash_dash_component__WEBPACK_IMPORTED_MODULE_14__["DashComponent"],
                _components_usuarios_usuarios_component__WEBPACK_IMPORTED_MODULE_15__["UsuariosComponent"],
                _components_usuario_usuario_component__WEBPACK_IMPORTED_MODULE_17__["UsuarioComponent"],
                _components_equipes_equipes_component__WEBPACK_IMPORTED_MODULE_18__["EquipesComponent"],
                _components_equipe_equipe_component__WEBPACK_IMPORTED_MODULE_19__["EquipeComponent"],
                _directives_focus_directive__WEBPACK_IMPORTED_MODULE_26__["FocusDirective"],
                _components_sses_sses_component__WEBPACK_IMPORTED_MODULE_20__["SsesComponent"],
                _components_sses_grid_sses_grid_component__WEBPACK_IMPORTED_MODULE_22__["SsesGridComponent"],
                _components_sses_map_sses_map_component__WEBPACK_IMPORTED_MODULE_21__["SsesMapComponent"],
                _components_sse_sse_component__WEBPACK_IMPORTED_MODULE_23__["SseComponent"],
                _components_tarefa_tarefa_component__WEBPACK_IMPORTED_MODULE_24__["TarefaComponent"],
                _components_nova_tarefa_nova_tarefa_component__WEBPACK_IMPORTED_MODULE_25__["NovaTarefaComponent"],
                _components_estoque_estoque_component__WEBPACK_IMPORTED_MODULE_28__["EstoqueComponent"],
                _components_produtos_produtos_component__WEBPACK_IMPORTED_MODULE_29__["ProdutosComponent"],
                _components_edit_produto_edit_produto_component__WEBPACK_IMPORTED_MODULE_30__["EditProdutoComponent"],
                _components_movimentos_movimentos_component__WEBPACK_IMPORTED_MODULE_31__["MovimentosComponent"],
                _components_lancar_nota_lancar_nota_component__WEBPACK_IMPORTED_MODULE_32__["LancarNotaComponent"],
                _components_edit_movimento_edit_movimento_component__WEBPACK_IMPORTED_MODULE_33__["EditMovimentoComponent"],
                _components_finalizar_sse_finalizar_sse_component__WEBPACK_IMPORTED_MODULE_34__["FinalizarSseComponent"],
                _pipes_moeda_brasil_pipe__WEBPACK_IMPORTED_MODULE_35__["MoedaBrasilPipe"],
                _pipes_numero_br_pipe__WEBPACK_IMPORTED_MODULE_36__["NumeroBrPipe"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_2__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDXsRrkVQvgfWbs4OOYKLsNYomChNS8a5o'
                }),
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _modules_material_material_module__WEBPACK_IMPORTED_MODULE_5__["MaterialModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                _app_routing_app_routing_module__WEBPACK_IMPORTED_MODULE_8__["AppRoutingModule"],
                ngx_countdown__WEBPACK_IMPORTED_MODULE_9__["CountdownModule"]
            ],
            entryComponents: [
                _components_nova_tarefa_nova_tarefa_component__WEBPACK_IMPORTED_MODULE_25__["NovaTarefaComponent"],
                _components_edit_produto_edit_produto_component__WEBPACK_IMPORTED_MODULE_30__["EditProdutoComponent"],
                _components_lancar_nota_lancar_nota_component__WEBPACK_IMPORTED_MODULE_32__["LancarNotaComponent"],
                _components_edit_movimento_edit_movimento_component__WEBPACK_IMPORTED_MODULE_33__["EditMovimentoComponent"],
                _components_finalizar_sse_finalizar_sse_component__WEBPACK_IMPORTED_MODULE_34__["FinalizarSseComponent"]
            ],
            providers: [
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HTTP_INTERCEPTORS"], useClass: _helpers_jwt_interceptor__WEBPACK_IMPORTED_MODULE_12__["JwtInterceptor"], multi: true },
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HTTP_INTERCEPTORS"], useClass: _helpers_error_interceptor__WEBPACK_IMPORTED_MODULE_11__["ErrorInterceptor"], multi: true },
                {
                    provide: _angular_material__WEBPACK_IMPORTED_MODULE_27__["MAT_SNACK_BAR_DEFAULT_OPTIONS"],
                    useValue: {
                        duration: 4000,
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom'
                    }
                },
                { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_10__["MAT_DATE_LOCALE"], useValue: 'pt-BR' }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://0.0.0.0:0 ./src/main.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/sergio/Workspace/Casamax/maxse/www/webapp/node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:0 */"./node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:0");
module.exports = __webpack_require__(/*! /home/sergio/Workspace/Casamax/maxse/www/webapp/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map


export default class appRouteBar{
    constructor(){
        this.appRouteName = 'span.app-route__name'  //应用列表类型名称
        this.appRouteList = 'div.app-route__popover' //route列表
        this.mainRoute = 'div.main-route' //V5功能按钮
    }

    /**
     * 根据类型切换应用列表
     * @param {String} routeName 
     */
    changeRoute(routeName){
        cy.get(`${this.appRouteName}`).trigger('mouseenter');
        cy.get(`${this.appRouteList} p.app-route__link`).contains(routeName).click();
    }

    /**
     * V5功能入口
     * @param {String} buttonName 
     */
    clickRouteButton(buttonName){
        cy.get(`${this.mainRoute} span.main-route__text`).contains(buttonName).click();
    }



}
import viewAppCardOperation from '../common/design_viewAppCardOperation'


let viewAppCard = new viewAppCardOperation();


export default class orgAppPage{
    constructor(){
        this.appCard = 'div.card-list-item-content'  //应用卡片列表
        this.appCardMenu = `${this.appCard} div.card-item-menu` //业务包操作按钮
    }


    viewAppAttribute(appName){
        viewAppCard.viewAppOperation(appName);
        cy.get(`${this.appCardMenu} span`).contains('属性').click();
    }


}
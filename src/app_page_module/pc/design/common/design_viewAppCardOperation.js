

export default class viewAppCardOperation{
    constructor(){
        this.appCardName = 'div.card-item div.card-item-content div.card-item-text span'
    }

    /**
     * 鼠标悬停显示对应业务包的操作项
     * @param {String} appName 
     */
    viewAppOperation(appName){
        cy.get(`${this.appCardName}`).contains(appName).trigger('mouseenter');
    }
}
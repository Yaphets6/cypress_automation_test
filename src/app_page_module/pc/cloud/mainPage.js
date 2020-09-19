


export default class mainPage{
    constructor(){
        this.topBanner = 'div.header-top'//顶部菜单
    }

    /**
     * 切换顶部导航名称
     * @param {String} navName 
     */
    changeNavByName(navName){
        cy.get(`${this.topBanner} div.category a`).contains(navName).click();
    }


    /**
     * 切换中户昵称按钮的菜单
     * @param {String} barName 
     */
    selectUserMenuBar(barName){
        if(barName == '退出登录'){
            cy.get(`${this.topBanner} div.user-menu`).get('div.menu-list').invoke('show')
            .get('a').contains(barName).click()
        }
        else{
            cy.get(`${this.topBanner}`).get('div.menu-list').invoke('show');
            cy.get(`${this.topBanner} a`).contains(barName).then((el)=>{
            cy.visit(el.attr('href'))
            })
        }
    }




    
}
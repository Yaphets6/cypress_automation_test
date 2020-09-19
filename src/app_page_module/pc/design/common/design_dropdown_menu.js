

export default class dropdownMenu{
    constructor(){
        this.menuList = 'li.el-dropdown-menu__item'  //下拉列表
    }


    /**
     * 获取列表所有按钮的名称元素
     */
    getMenuTitles(){
        cy.get(`${this.menuList} div.content span.title`).as('menuTitlesEl');
        return '@menuTitlesEl'
    }


    /**
     * 获取列表指定按钮的名称元素
     * @param {String} menuName 
     */
    getMenuTitle(menuName){
        cy.get(`${this.menuList} div.content span.title`)
        .contains(menuName).scrollIntoView().as('menuTitleEl');
        return '@menuTitleEl'
    }


    /**
     * 鼠标移动到列表指定按钮元素上
     * @param {String} menuName 
     */
    hoverMenu(menuName){
        this.scrolIntoMenuView(menuName)
        cy.get(this.getMenuTitle())
        .trigger('mouseenter')
    }

    /**
     * 鼠标离开列表按钮元素
     * @param {String} menuName 
     */

    unhoverMenu(menuName){
        this.scrolIntoMenuView(menuName)
        cy.get(this.getMenuTitle()).trigger('mouseleave')
    }


    /**
     * 鼠标单击列表指定按钮元素
     * @param {String} menuName 
     */
    clickMenu(menuName){
        this.scrolIntoMenuView(menuName)
        cy.get(this.getMenuTitle(menuName)).click();
    }

    /**
     * 滑动列表指定按钮到可见状态
     * @param {String} menuName 
     */
    scrolIntoMenuView(menuName){
        cy.get(this.getMenuTitles())
        .contains(menuName).scrollIntoView();
    }


}
import menuList from '../common/design_dropdown_menu'
import designTagList from '../common/design_tagList'

let menu = new menuList();
let design_tag_list = new designTagList();

export default class topInfo{
    constructor(){
        this.topInfo = 'div.top-info'  //顶部菜单
        this.topBar = 'div.top-info-menu'  //顶部页签
        this.userInfo = 'div.user-info'  //用户信息区域按钮
        this.searchInput = `div.org-info input`  //搜索输入框
    }



    /**
     * 切换顶部页签
     * @param {String} barName 
     */
    selectTopBar(barName){
        cy.get(`${this.topInfo} ${this.topBar} a`).contains(barName).click();
    }


    /**
     * 业务包搜索
     * @param {String} key 
     */
    searchApp(key){
        cy.get(`${this.searchInput}`).eq(1).type(key)
        .next().find(`span i.el-icon-search`).click()
    }


}
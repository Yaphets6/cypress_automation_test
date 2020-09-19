import menuList from '../common/design_dropdown_menu'
import designTagList from '../common/design_tagList'
import * as raido from '../common/design_radio'
import * as dialog from '../common/design_dialog'

let menu = new menuList();
let design_tag_list = new designTagList();


export default class workSpacePage{
    constructor(){
        this.defSpace = `div.org-info div.spacename-text`  //默认空间
        this.spaceAdd = 'div.space-add'  //新增空间按钮
        this.spaceList = 'ul.el-dropdown-menu div.space-content li'  //空间列表
    }

    /**
     * 鼠标移动到当前空间元素上
     */
    mouseEnterCurrentSpace(){
        cy.server()
        cy.route({
            url:'/designCenter/space/querySwitchSpaces'
        }).as('space')
        cy.get(`${this.defSpace}`).trigger('mouseenter');
        cy.wait('@space')
    }
    
    mouseLeaveCurrentSpace(){
        cy.get(`${this.defSpace}`).trigger('mouseleave');
    }


    /**
     * 获取当前空间元素
     */
    getCurrentSpace(){
        cy.get(`${this.defSpace}`).as('currentSpace')
        return '@currentSpace'
    }


    /**
     * 切换空间
     * @param {String} spaceName 
     */
    changeSpace(spaceName){
        this.operationSpace(spaceName,'spaceClick')
    }


    /**
     * 新增空间
     * @param {String} addSpaceName 
     * @param {String} spaceType
     * @param {Array} spaceTag
     */
    addSpace(addSpaceName,spaceType,spaceTag){
        this.operationSpace(addSpaceName,'spaceAdd')
        cy.get(`${dialog.getAntModalBody('新增')}`).find(`input#coordinated_spaceName`).type(addSpaceName);
        raido.selectRaido(spaceType);
        design_tag_list.selectTag(spaceTag);
        cy.server();
        cy.route({
            url:'/designCenter/space/saveOrUpdate',
            method:'post'
        }).as('addSpace');
        dialog.clickAntModalFooterButton('新增','确 定');
        cy.wait('@addSpace');
    }


    /**
     * 编辑空间
     * @param {String} editSpaceName  目标空间名称
     * @param {String} spaceType 空间类型
     * @param {String} spaceTag 标签
     * @param {String} newSpaceName 空间新名称
     */
    editSpace(editSpaceName,spaceType,spaceTag,newSpaceName){
        this.operationSpace(editSpaceName,'spaceEdit')
        cy.get(`${dialog.getAntModalBody('修改')}`).find(`input#coordinated_spaceName`).clear().type(newSpaceName);
        raido.selectRaido(spaceType);
        design_tag_list.selectTag(spaceTag);
        cy.server();
        cy.route({
            url:'/designCenter/space/saveOrUpdate',
            method:'post'
        }).as('updateSpace');
        dialog.clickAntModalFooterButton('修改','确 定');
        cy.wait('@updateSpace');
    }




    /**
     * 空间搜索
     * @param {String} key 
     */
    searchSpace(key){
        this.mouseEnterCurrentSpace()
        cy.get(`ul.dropdown-menu input`).type(key,{force:true})
        .next().find(`span i.el-icon-search`).click({force:true});
        cy.wait(3000);
    }




    /**
     * 操作空间
     * @param {String} spaceName 
     * @param {String} method spaceClick：切换空间 spaceEdit:编辑空间 spaceDel：删除空间 spaceAdd:新增空间
     * 
     */
    operationSpace(spaceName,method){
        this.mouseEnterCurrentSpace()
        if(method=='spaceAdd'){
            cy.get(`${this.spaceAdd}`).click();
        }else{
            let spaceMenu = menu.getMenuTitle(spaceName)
            switch (method) {
                case 'spaceClick':
                    cy.get(spaceMenu).click()
                    break;
                case 'spaceEdit':
                    cy.get(spaceMenu).next('span').invoke('show')
                    .find(`svg:nth-child(1)`).click({force:true})
                    break;
                case 'spaceDel':
                    cy.get(spaceMenu).next('span').invoke('show')
                    .find(`svg:nth-child(2)`).click({force:true});
                    break;
                default:
                    break;
            }
        
        }
        cy.wait(3000)
    }



}
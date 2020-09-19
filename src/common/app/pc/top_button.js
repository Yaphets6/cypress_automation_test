import url from '../../other/url'

/**
 * 首页顶部按钮CSS选择器
 */

const LOGIN_LINK_BUTTON_EL = 'a.user-info__login--login';//登录按钮
const REGIST_LINK_BUTTON_EL  = 'a.user-info__login--register';//注册按钮
const SEARCH_INPUT_EL = 'input.search-content__input';//搜索输入框
const SEARCH_BUTTON_EL = 'svg.icon-search';//搜索按钮
const CHANGE_USER_EL = 'div.user-info_toggle';//
const JOIN_US_EL = 'div.search-button';//加入我们
const INVITE_FRIENDS_EL = 'div.search-button';//邀请好友
const USER_INFO_EL = 'span.petname';//昵称
const USERE_MENU_EL = 'div.user-menu div.menu-list'//用户信息下拉按钮


let serverUrl = new url()
const DESIGN_URL = serverUrl.getServerUrl('design')


/**
 * 点击顶部登录按钮
 */
export function intoLoginPage(){
    cy.get(LOGIN_LINK_BUTTON_EL).click();
}

//Cypress.Commands.add('intoLoginPage',intoLoginPage)
/**
 * 点击顶部注册按钮
 */
export function intoRegistPage() {
    cy.get(REGIST_LINK_BUTTON_EL).click();
}
/**
 * 顶部关键字搜索
 * @param {String} keyWords 搜索关键字，String
 */
export function searchByKeyWords(keyWords){
    cy.get(SEARCH_INPUT_EL).type(keyWords);
    cy.get(SEARCH_BUTTON_EL).click();
}
/**
 * 点击顶部加入我们按钮
 */
export function clickJoinUs(){
    cy.get(JOIN_US_EL).should('have.text','加入我们').click();
}
/**
 * 点击顶部邀请好友
 */
export function clickInviteFriends(){
    cy.get(INVITE_FRIENDS_EL).should('have.text','邀请好友').click();
}

/**
 * 获取用户登录后的昵称
 */
export function getUserLoginInfo(){
    return cy.get(USER_INFO_EL);
}

/**
 * 个人中心下拉切换菜单
 * @param {String} menuName 
 */
export function menuChange(menuName){
    let menu = cy.get(USERE_MENU_EL)
    menu.invoke('show')
    if(menuName == '云设计中心'){
        cy.visit(`${DESIGN_URL}/#/main/app/myApp`)
        cy.wait(5000)
    }else{
        menu.children('a.menu-item').contains(menuName).click()
    }
    cy.wait(5000)
}

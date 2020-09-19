import url from '../../../../common/other/url'

let serverUrl = new url()

export default class visitDesignPage{
    constructor(){
        this.defPageUrl = `${serverUrl.getServerUrl('design')}`  //默认进入首页
    }

    /**
     * 录入目标页面path，打开目标页面
     * @param {String} pagePath 
     */
    visitDesignPage(pagePath){
        if(pagePath){
            cy.visit(`${serverUrl.getServerUrl('design')}${pagePath}`)
        }else{
            cy.visit(this.defPageUrl)
        }
    }
}
/**
 * 处理页面iframe
 */


    /**
     * 根据iframe的属性获取iframe的Body数据
     * @param {String} attrName 
     * @param {String} attrValue 
     * @returns 返回iframe对象的别名。
     */
export function getIframeBody(attrName,attrValue){
    if(attrName){
        cy.get('iframe').then((iframes)=>{
            for(let i=0;i<iframes.length;i++){
                if(iframes[i][attrName]==attrValue){
                    cy.wrap(iframes[i].contentDocument.body).as('iframeBody')
                }
            }
        })
    
    }else{
        cy.get('iframe').then((iframeObj) =>{
            cy.wrap(iframeObj[0].contentDocument.body).as('iframeBody')
        })
    }
    return '@iframeBody'
}

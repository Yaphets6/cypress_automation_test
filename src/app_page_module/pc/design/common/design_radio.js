
/**
 * 选中对应名称的单选按钮
 * @param {String} raidoName 
 */
export  function selectRaido(raidoName){
    cy.get(`label.ant-radio-wrapper span`).contains(raidoName).click()
}


/**
 * 获取单选按钮元素，用于判断选中状态
 * @param {String} raidoName 
 */
export function getRaidoEl(raidoName){
    cy.get(`label.ant-radio-wrapper span`).contains(raidoName)
    .prev(`span`).find(`input.ant-radio-input`).as('radio')
    return '@radio'
}
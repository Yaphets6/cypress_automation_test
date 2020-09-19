

const DIALOG_HEADER = 'div.el-dialog__header'  //弹出框头部
const DIALOG_BODY = 'div.el-dialog__body'       //弹出框正文
const DIALOG_footer = 'div.el-dialog__footer'  //弹出框底部
const BOX_HEADER = 'div.el-message-box__header' //BOX头部
const BOX_CONTENT = 'div.el-message-box__content' //box提示内容区
const BOX_BTN = 'div.el-message-box__btns' //box底部按钮
const ANT_HEADER = 'div.ant-modal-header'  //ant弹窗头部
const ANT_BODY = 'div.ant-modal-body'   //ant弹窗正文
const ANT_FOOTER = 'div.ant-modal-footer'  //ant弹窗底部



/**
 * 云设计dailogBody元素
 * @param {*} dialogHeader dialog名称
 */
export function getDialogBody(dialogHeader){
    cy.get(`${DIALOG_HEADER} span`).contains(dialogHeader)
    .parent(`${DIALOG_HEADER}`).nextAll(`${DIALOG_BODY}`).as('dialogBody')
    return '@dialogBody'
}

/**
 * 云设计dialog底部按钮元素
 * @param {String} dialogHeader dialog名称
 */
export function getDialogFooter(dialogHeader){
    cy.get(`${DIALOG_HEADER} span`).contains(dialogHeader)
    .parent(`${DIALOG_HEADER}`).nextAll(`${DIALOG_footer}`).as('dialogFooter')
    return '@dialogFooter'
}


/**
 * 点击名称对应的底部按钮
 * @param {String} dialogHeader 
 * @param {String} button 
 */
export function clickDialogFooterButton(dialogHeader,button){
    cy.get(getDialogFooter(dialogHeader)).find(`button>span`).contains(button).click()
}

/**
 * 云设计提示弹出框内容区域元素
 * @param {String} boxHeader 
 */
export function getBoxDialogBody(boxHeader){
    cy.get(`${BOX_HEADER} span`).contains(boxHeader)
    .parents(`${BOX_HEADER}`).nextAll(`${BOX_CONTENT}`)
    .find(`div.el-message-box__message p`).as('tipsText')
    return '@tipsText'
}

/**
 * 提示内框底部按钮区域
 * @param {String} boxHeader 
 */
export function getBoxDialogFooter(boxHeader){
    cy.get(`${BOX_HEADER} span`).contains(boxHeader)
    .parents(`${BOX_HEADER}`).nextAll(`${BOX_BTN}`).as('dialogFooter')
    return '@dialogFooter'
}


/**
 * 点击提示框名称对应的按钮
 * @param {String} boxHeader 
 * @param {String} button 
 */
export function clickBoxDialogFooterButton(boxHeader,button){
    cy.get(getBoxDialogFooter(boxHeader)).find(`button>span`).contains(button).click()
}


export function getAntModalBody(antHeader){
    cy.get(`${ANT_HEADER} div`).contains(antHeader)
    .parent(`${ANT_HEADER}`).nextAll(`${ANT_BODY}`).as('antBody')
    return '@antBody'
}

export function getAntModalFooter(antHeader){
    cy.get(`${ANT_HEADER} div`).contains(antHeader)
    .parent(`${ANT_HEADER}`).nextAll(`${ANT_FOOTER}`).as('antFooter')
    return '@antFooter'
}


export function clickAntModalFooterButton(antHeader,button){
    cy.get(getAntModalFooter(antHeader)).find(`button>span`).contains(button).parent(`button`).click()
}
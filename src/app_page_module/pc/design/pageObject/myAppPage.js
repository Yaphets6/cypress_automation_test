import * as files from '../../../../common/other/files'
import * as dialog from '../common/design_dialog'
import viewAppCardOperation from '../common/design_viewAppCardOperation'


let viewAppCard = new viewAppCardOperation();

export default class myAppPage{
    constructor(){
        this.addAppCard = 'div.card-add' //添加应用卡片入口
        this.dialogBody = 'div.el-dialog__body'  //弹出框正文
        this.dialogHeader = 'div.el-dialog__header' //弹出框头部
        this.dialogfooter = 'div.el-dialog__footer'  //弹出框底部按钮
        this.appCard = 'div.card-item'  //业务包卡片
        this.appFirstOperationEl = `${this.appCard} span.card-item-menu-item-top span`
        this.appSecondOperationEl = `${this.appCard} div.card-item-menu-item-popper div`
        this.appFirstOperation = ['调试','快速认证','复制','更多']  //一级操作按钮
        this.appSecondOperation = ['提报参赛作品','上架','上传到资源库','导出','修改名称','修改所属人','删除数据','删除应用','属性']
    }


    /**
     * 选择通过什么方式新建应用
     * @param {String} addType 
     */
    selectAddAppType(addType){
        cy.get(`${this.addAppCard} span`).contains(addType).click();
    }

    /**
     * 创建空白应用
     * @param {String} appName 应用名称
     * @param {String} appIcon 应用Icon,图标库icon名称或者文件路径
     * @param {String} surface 应用封面,封面文件路径
     */
    addNewApp(appName,appIcon,surface){
        this.selectAddAppType('创建空白应用')
        this.setAppName(appName)
        this.setAppIcon(appIcon)
        this.setAppSurface(surface)
        dialog.clickDialogFooterButton('创建空白应用','确 定')
    }

    /**
     * 录入应用名称
     * @param {String} appName 
     */
    setAppName(appName){
        cy.get(dialog.getDialogBody('创建空白应用'))
        .find(`label`).contains('应用名称')
        .next(`div`).find(`input`)
        .type(appName)
    }

    /**
     * 设置应用封面，不传则使用默认
     * @param {String} surface 封面图片文件路径
     */
    setAppSurface(surface){
        if(surface){
            cy.get(`${this.dialogBody}`).find(`label`).contains('应用封面')
            .next().find(`input`).as('surfaceInput')
            files.file_upload('@surfaceInput',surface)
        }else{
            cy.log(`未上传应用封面，使用默认封面`)
        }
        
    }


    /**
     * 设置应用Icon
     * @param {String} appIcon 应用icon名称或者icon文件路径
     */
    setAppIcon(appIcon){
        if(appIcon){
            if(appIcon.indexOf('.') != -1){
                this.uploadAppIcon(appIcon)
            }else{
                this.selectAppIcon(appIcon)
            }
        }else{
            cy.log(`未确认应用Icon，使用默认Icon`)
        }
    }

    /**
     *上传应用icon
     * @param {String} iconPath icon文件路径
     */
    uploadAppIcon(iconPath){
        cy.get(`${this.dialogBody}`).find(`label`).contains('应用图标')
        .next().find(`input`).as('appIconInput')
        files.file_upload('@appIconInput',iconPath)
    }


    /**
     * 选择图标库的图标,需要单点登录到V5
     * @param {String} iconName 图标库的图标名称
     */
    selectAppIcon(iconName){
        cy.get(`${dialog.getDialogBody('创建空白应用')}`)
        .find(`button>span`).contains('从图标库中选择')
        .click()
    }


    /**
     * 新建业务包——从本地导入
     * @param {String} appPath 业务包文件路径
     */
    addAppLocalUpload(appPath){
        this.selectAddAppType('从本地导入');
        cy.get(dialog.getDialogBody('从本地导入'))
        .find(`input.el-upload__input`).as('appFileInput')
        files.file_upload('@appFileInput',appPath)
        dialog.clickDialogFooterButton('从本地导入','确 定')
    }

    /**
     * 根据操作项名称点击业务包操作项
     * @param {Array} operationName 操作项层级列表
     * @param {String} appName
     */
    clickAppOperationButton(appName,operationName){
        viewAppCard.viewAppOperation(appName)
        if(operationName.length > 1){
            cy.get(`${this.appFirstOperationEl}`).contains(operationName[0]).trigger('mouseenter');
            cy.get(`${this.appSecondOperationEl}`).contains(operationName[1]).click();
        }else{
            cy.get(`${this.appFirstOperationEl}`).contains(operationName[0]).click();
        }
    }



    
}
 import url from '../../../src/common/other/url'
 import cloudLoginPage from '../../../src/app_page_module/pc/cloud/loginPage'
 import code from '../../../src/common/other/code'
 import cloudMainPage from '../../../src/app_page_module/pc/cloud/mainPage'
 import setServerCookie from '../../../src/common/other/setServerCookie'
 import appRoute from '../../../src/app_page_module/pc/design/common/design_appRouteBar'
 import visitDesignPage from '../../../src/app_page_module/pc/design/common/design_visitPage'
 import aggAppPage from '../../../src/app_page_module/pc/design/pageObject/aggAppPage'
 import orgAppPage from '../../../src/app_page_module/pc/design/pageObject/orgAppPage'
 import * as dialog from '../../../src/app_page_module/pc/design/common/design_dialog'
 import myAppPage from '../../../src/app_page_module/pc/design/pageObject/myAppPage'
 import topInfo from '../../../src/app_page_module/pc/design/common/design_topInfo'



 let serverUrl = new url();
 let loginPage = new cloudLoginPage();
 let codeData = new code();
 let cloudMain = new cloudMainPage();
 let serverCookie = new setServerCookie();
 let appRouteToolBar = new appRoute();
 let visitDesign = new visitDesignPage();
 let aggApp = new aggAppPage();
 let orgApp = new orgAppPage();
 let myApp = new myAppPage();
 let topBar = new topInfo();



 describe('云设计中心_工作台', function(){
     before('打开cloud首页',()=>{
        // cy.viewport(1366,768);
        // cy.visit(`${serverUrl.getServerUrl('cloud')}/login`)
        // loginPage.selectLoginType('账号登录')
        // loginPage.loginByAccount('qysj1','123456')
        //cloudMain.selectUserMenuBar('云设计中心')
     })
     beforeEach('设置视图',()=>{
        cy.viewport(1366,768);
        // cy.visit(`${serverUrl.getServerUrl('cloud')}/login`)
        // loginPage.selectLoginType('账号登录')
        // loginPage.loginByAccount('qysj1','123456')
        // cloudMain.selectUserMenuBar('云设计中心')
     })


    it.skip('登录cloud', function(){
        cy.visit(`${serverUrl.getServerUrl('cloud')}/login`)
        loginPage.selectLoginType('账号登录');
        loginPage.selectLoginType('验证码登录');
        //loginPage.loginByAccount('13402850800','123456');
        //loginPage.licenseDialog(false);
        //loginPage.loginByMobile('13402850801');
        loginPage.loginByMobileWithCode('13402850800')
        loginPage.licenseDialog(false);
        // let imgData = codeData.getImgCode();
        // cy.log('图形验证码' + cy.get(imgData).its('imgCode'))
        // cy.log('图形验证码Key' + cy.get(imgData).its('codeKey'))
    })

    it.skip('找回密码',function(){
        cy.visit(`${serverUrl.getServerUrl('cloud')}/login`)
        loginPage.reSetPassWordByMobile('13402850800','123456','123456')
    })


    it.skip('注册账号',function(){
        cy.visit(`${serverUrl.getServerUrl('cloud')}/login`)
        cy.get('a').contains('免费注册').click()
        loginPage.registerUser('13999999021')
    })

    it.skip('切换顶部导航菜单',function(){
        loginPage.selectLoginType('账号登录');
        loginPage.loginByAccount('qysj1','123456');
        cloudMain.selectUserMenuBar('云设计中心');
        //designMain.changeSpace('浙江区新空间001');
        //cy.wait(3000)
        cy.server();
        cy.route({
            url:"/designCenter/space/saveOrUpdate",
            method:"post"
        }).as('re_body');
        designMain.addSpace('新增空间')
        cy.wait('@re_body').its('responseBody').its('message').should("eql","空间名称重复")
        //designMain.searchApp('老铁')
        //designMain.searchSpace('新增')
    })

    it.only('编辑空间',function(){
        serverCookie.setDesignCookie('qysj1','123456',2)
        visitDesign.visitDesignPage('/#/main/app/myApp')
        topBar.operationSpace('后台新增回测1','spaceEdit')
        cy.wait(3000)
    })


    // it('请求接口',function(){
    //     setCookies.setCloudCookies('qysj1','123456','2');
    //     cy.visit(`${serverUrl.getServerUrl('cloud')}/admin`)
    // })


    it('新建空白应用',function(){
        serverCookie.setDesignCookie('qysj1','123456',2)
        visitDesign.visitDesignPage('/#/main/app/myApp')
        cy.wait(5000)
        myApp.addNewApp('新增业务包','picture/portal.jpg','picture/背景图1.jpg')
        cy.wait(3000)
    })


    it.skip('新建业务包_从本地导入',function(){
        serverCookie.setDesignCookie('qysj1','123456',2)
        visitDesign.visitDesignPage('/#/main/app/myApp')
        myApp.addAppLocalUpload('syz/80业务包表单.syz')
        cy.wait(5000)
    })


    it.skip('新建空白业务包',function(){
        serverCookie.setDesignCookie('qysj1','123456',2)
        visitDesign.visitDesignPage('/#/main/app/myApp')
        myApp.addNewApp('自动化新增')
    })

    it.skip('编辑业务包_design',function(){
        serverCookie.setDesignCookie('qysj1','123456',2)
        visitDesign.visitDesignPage('/#/main/app/myApp')
        serverCookie.setV5Cookie()
        myApp.editApp('合同管理（标准版）V42')
        cy.wait(3000)
    })

    it('切换应用列表',function(){
        serverCookie.setDesignCookie('qysj1','123456',2);
        visitDesign.visitDesignPage('/#/main/app/myApp');
        appRouteToolBar.changeRoute('我的聚合应用');
        cy.get(`${aggApp.addAgg} p`).should('have.text','新建聚合应用');
    })


    it('切换到单位应用列表',function(){
        serverCookie.setDesignCookie('qysj1','123456',2);
        visitDesign.visitDesignPage('/#/main/app/myApp');
        appRouteToolBar.changeRoute('单位所有应用');
        cy.get(`${orgApp.appCard} div.card-item`).should('exist');
    })

    it('查看单位应用列表应用属性',function(){
        serverCookie.setDesignCookie('qysj1','123456',2);
        visitDesign.visitDesignPage('/#/main/app/myApp');
        appRouteToolBar.changeRoute('单位所有应用');
        orgApp.viewAppAttribute('区域商家二号玩家');
        let body = dialog.getDialogBody('属性');
        cy.get(body).find(`div.el-form-item`).should('have.length',11);
    })

    it('搜索应用',function(){
        serverCookie.setDesignCookie('qysj1','123456',2);
        visitDesign.visitDesignPage('/#/main/app/myApp');
        topBar.searchApp('区域商家二号玩家');
        cy.get(`${myApp.appCard} span`).contains('区域商家二号玩家');
    })


    it('业务包操作项,快速认证',function(){
        serverCookie.setDesignCookie('qysj1','123456',2);
        visitDesign.visitDesignPage('/#/main/app/myApp');
        myApp.clickAppOperationButton('222',['复制','复制到其他空间']);
    })

    it('业务包操作项,删除业务包',function(){
        let diaBox = '删除应用'
        let checkTips = '删除后，所有表单,报表,业务空间和业务导图将无法使用且无法恢复，您确认要继续删除？'
        serverCookie.setDesignCookie('qysj1','123456',2);
        visitDesign.visitDesignPage('/#/main/app/myApp');
        myApp.clickAppOperationButton('新增业务包','删除应用');
        cy.get(dialog.getBoxDialogBody(diaBox)).should('have.text',checkTips)
        cy.server();
        cy.route({
            url:'designCenter/app/deleteApp',
            method:'post'
        }).as('message')
        dialog.clickBoxDialogFooterButton(diaBox,'确定');
        cy.wait('@message').its('responseBody').then((body)=>{
            expect(body.message).to.eql('success')
        })
    })


    it.only('空用例',function(){
        serverCookie.setDesignCookie('qysj1','123456',2);
        visitDesign.visitDesignPage('/#/main/app/myApp');
        cy.log('执行空用例')
    })
 
 })
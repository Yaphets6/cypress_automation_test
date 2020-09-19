import url from '../../../src/common/other/url'
import setServerCookie from '../../../src/common/other/setServerCookie'
import designVisitPage from '../../../src/app_page_module/pc/design/common/design_visitPage'
import worksSpacePage from '../../../src/app_page_module/pc/design/pageObject/workSpacePage'


let design_visit_page = new designVisitPage();
let serverCookie = new setServerCookie();
let work_space_page = new worksSpacePage()

describe('登录云设计校验',function(){

    beforeEach('分辨率设置',function(){
        cy.viewport(1366,768)
    })


    
    it('单位未生成云联证书，人员有云设计权限',function(){
        /**
         * 步骤1：调用登录接口，设置cookie
         * 数据1：hksyb,82602233
         * 步骤2：打开云设计首页
         * 期望结果：弹窗提示“请先生成云联证书”
         */

        serverCookie.setDesignCookie('hksyb','82602233');
        cy.server()
        cy.route({
            url:'/designCenter/home/preLoginUser',
            method:'GET'
        }).as('response')
        design_visit_page.visitDesignPage();
        cy.wait('@response').its('responseBody').then((body)=>{
            expect(body.code).to.eql('500')
            expect(body.message).to.eql('请先生成云联证书！')
        })
        // cy.get('alert').should('have.text','请先生成云联证书！')
        // cy.get('div#not-generate-certify').find('div.desc-tit')
        // .should('have.text','所在单位未生成云联证书');
        
    })


    it('单位已生成证书，人员无云设计权限',function(){
        /**
         * 步骤1.调用登录接口，设置cookie
         * 数据1：18968067644
         * 期望结果：获取用户信息接口报错
         */

         serverCookie.setDesignCookieByMobile('18782006518');
         cy.server();
         cy.route({
             url:'/designCenter/home/preLoginUser',
             method:'get'
         }).as('userInfo')
         design_visit_page.visitDesignPage();
         cy.wait('@userInfo').its('responseBody').its('code').should('eql','500');
    })


    it('单位生成证书，人员有云设计权限',function(){
        /**
          * 步骤1：调用登录接口，设置cookie
          * 数据1：cy,82602233
          * 期望结果：能打开云设计首页
        */

        serverCookie.setDesignCookie('cy','82602233');
        design_visit_page.visitDesignPage();
        let currentSpace = work_space_page.getCurrentSpace();
        cy.get(currentSpace).should('contain','川渝区');
    })
   

})
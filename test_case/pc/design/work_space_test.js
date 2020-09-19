import setCookie from '../../../src/common/other/setServerCookie'
import designVisitPage from '../../../src/app_page_module/pc/design/common/design_visitPage'
import workSpacePage from '../../../src/app_page_module/pc/design/pageObject/workSpacePage'
import designDropdownMenu from '../../../src/app_page_module/pc/design/common/design_dropdown_menu'
import * as radio from '../../../src/app_page_module/pc/design/common/design_radio'
import * as dialog from '../../../src/app_page_module/pc/design/common/design_dialog'



let set_cookie = new setCookie()
let design_visit_page = new designVisitPage()
let work_space_page = new workSpacePage()
let design_dropdown_menu = new designDropdownMenu()

describe('工作台',function(){
    beforeEach('设置分辨率',function(){
        cy.viewport(1366,768);
    })

    describe('云设计空间',function(){

        it('切换空间',function(){
            /**
             * 步骤1：调用登录接口，设置cookie
             * 数据1：yangyk,123456
             * 步骤2：打开云设计首页
             * 步骤3:切换空间
             * 数据2：切换空间001
             * 期望结果：当前空间显示为【切换空间001】
             */


            set_cookie.setDesignCookie('yangyk','123456')
            design_visit_page.visitDesignPage()
            work_space_page.changeSpace('切换空间001')
            cy.get(`${work_space_page.defSpace}`)
            .then(($el)=>{
                expect($el.text()).to.contain('切换空间001')
            })
        })

        it('空间搜索_有结果',function(){
            /**
             * 步骤1：调用登录接口，设置cookie
             * 数据1：tly，8260233
             * 步骤2：打开云设计首页
             * 步骤3：搜索空间
             * 数据：key：切换
             * 期望结果：结果列表显示【切换空间001】
             */

            set_cookie.setDesignCookie('yangyk','123456')
            design_visit_page.visitDesignPage()
            work_space_page.searchSpace('切换')
            cy.get(`${work_space_page.spaceList} span.title`).then(($title)=>{
                expect($title.length).to.eql(1)
                expect($title.text()).to.contain('切换空间001')
            })

            
        })

        it('空间搜索_无结果',function(){
            /**
             * 步骤1：调用登录接口，设置cookie
             * 数据1：yangyk，123456
             * 步骤2：打开云设计首页
             * 步骤3：搜索空间
             * 数据：key：我家住在黄土高坡
             * 期望结果：结果列表显示:无匹配数据   
             */

            set_cookie.setDesignCookie('yangyk','123456')
            design_visit_page.visitDesignPage()
            work_space_page.searchSpace('我家住在黄土高坡')
            cy.get(`${work_space_page.spaceList}`)
            .then(($el)=>{
                expect($el.text()).to.contain('无匹配数据')
            })
        })

        it('用户新增空间',function(){
            /**
             * 步骤1：调用登录接口，设置cookie
             * 数据1：yangyk，123456
             * 步骤2：打开云设计首页
             * 步骤3：新增空间
             * 数据：cypress新增空间001,单位自用,[建筑业,其它]
             * 期望结果：空间列表显示新增空间【cypress新增空间001】
             */

            set_cookie.setDesignCookie('yangyk','123456')
            design_visit_page.visitDesignPage()
            work_space_page.addSpace('cypress新增空间001','单位自用',['建筑业','其他'])
            work_space_page.mouseEnterCurrentSpace();
            cy.get(`${work_space_page.spaceList}`).contains('cypress新增空间001')
        })


        it('用户新增空间_同名校验',function(){
            /**
             * 步骤1：调用登录接口，设置cookie
             * 数据1：yangyk，123456
             * 步骤2：打开云设计首页
             * 步骤3：新增空间
             * 数据：cypress新增空间001,项目,[多元化集团]
             * 期望结果：空间列表显示新增空间【cypress新增空间001】
             */

            set_cookie.setDesignCookie('yangyk','123456')
            design_visit_page.visitDesignPage()
            work_space_page.addSpace('cypress新增空间001','单位自用',['多元化集团'])
            cy.get('@addSpace').its('responseBody').then((body)=>{
                expect(body.code).to.eql('500')
                expect(body.message).to.eql('空间名称重复')
            })
        })

        it.skip('后台管理员新增空间',function(){
            /**
             * 步骤1：
             */
        })

        it('编辑前台用户新增空间',function(){
            /**
             * 步骤1：调用登录接口，设置cookie
             * 数据1：yangyk，123456
             * 步骤2：打开云设计首页
             * 步骤3：编辑空间
             * 数据：空间名【编辑前空间】,空间类型【项目】，标签[制造业，批发零售业，财务管理],新空间名【编辑后空间】
             * 
             * 期望结果：空间列表显示空间【编辑后空间】，打开空间弹窗，空间类型为【项目】
             */
            set_cookie.setDesignCookie('yangyk','123456')
            design_visit_page.visitDesignPage();
            work_space_page.editSpace('编辑前空间','项目',['制造业','批发零售业','财务管理'],'编辑后空间');
            work_space_page.operationSpace('编辑后空间','spaceEdit');
            cy.get(radio.getRaidoEl('项目')).then(($el)=>{
                expect($el.attr('value')).to.eql('0');
            });
            cy.get(radio.getRaidoEl('单位自用')).then(($el)=>{
                expect($el.attr('value')).to.eql('1');
            });
            
        })

        it.skip('编辑后台管理员新增的空间',function(){
           

        })

        it('删除本人新建空间',function(){
            /**
             * 步骤1：调用登录接口，设置cookie
             * 数据1：yangyk，123456
             * 步骤2：打开云设计首页
             * 步骤3：新建空间
             * 数据：cypress删除空间,项目,[多元化集团]
             * 步骤4：删除空间
             * 数据：cypress删除空间
             * 期望结果：空间列表不再显示空间【cypress删除空间】
             */

            set_cookie.setDesignCookie('yangyk','123456')
            design_visit_page.visitDesignPage()
            work_space_page.addSpace('cypress删除空间','单位自用',['建筑业','其他'])
            work_space_page.operationSpace('cypress删除空间','spaceDel')
            dialog.clickAntModalFooterButton('提示','确 定');
            cy.get(`${work_space_page.defSpace}`).trigger('mouseenter')
            cy.get(design_dropdown_menu.getMenuTitles()).then(($els)=>{
                expect($els.text()).to.not.contain('cypress删除空间')
            })

            
        })

        it('删除非本人新建空间',function(){
            /**
             * 步骤1：调用登录接口，设置cookie
             * 数据1：tly，82602233
             * 步骤2：打开云设计首页
             * 步骤3：搜索空间
             * 数据：key：切换
             * 期望结果：结果列表显示【切换空间001】
             */

            set_cookie.setDesignCookie('tly','82602233')
            design_visit_page.visitDesignPage()
            cy.server();
            cy.route({
                url:'/designCenter/space/deleteBySpaceId*',
                method:'GET'
            }).as('delSpace')
            work_space_page.operationSpace('cypress新增空间001','spaceDel')
            dialog.clickAntModalFooterButton('提示','确 定');
            cy.wait('@delSpace').its('responseBody').then((body)=>{
                expect(body.code).to.eql('500');
                expect(body.message).to.eql('禁止删除非本人创建的空间');
            })
            dialog.clickAntModalFooterButton('提示','取 消')
        })

    })


})
import url from '../../../common/other/url'
import code from '../../../common/other/code'



let codeData = new code();


export  default class cloudFrontLogin{

    constructor(){
        this.accountLoginEl = 'div.account-login'   //账号登录
        this.mobileLoginEl = 'div.mobile-login' //验证码登录
        this.loginTypeEl = 'ul.logintype-list li'   //登录类型元素
        this.loginButton = 'button span'    //登录按钮
        this.dialog = 'el-dialog'  //弹出框
        this.imgCodePic = 'img.img-code'  //图形验证码
        this.sendCodeButton= 'button.send-code'  //发送短信验证码按钮
        this.findPassWordLink = 'div.find-pass>a' //找回密码链接
        this.findPassWord = 'div.form-content'  //找回密码form、注册
        this.formConten = 'div.form-content'  //找回密码和注册输入框
        this.bigButton = 'div.button-yellow--big'  //大按钮
        this.userDefInfo = {"passWord":"123456",
        "unitName":"中国火箭军",
        "post":"主力DPS",
        "industy":"贸易/进出口",
        "interest":"网络游戏"}
        this.scrollbarList = 'div.el-scrollbar' //兴趣爱好列表
    }


    /**
     * 选择协同云登录类型
     * @param {String} typeName 
     */
    selectLoginType(typeName){
        cy.get(this.loginTypeEl).as('typeEl');
        if(typeName == '账号登录'){
            cy.get('@typeEl').siblings().contains(typeName).click();
        }else{
            cy.get('@typeEl').contains(typeName).click();
        }
    }


    /**
     * 账号密码登录协同云
     * @param {String} userName 
     * @param {String} passWord 
     */
    loginByAccount(userName,passWord) {
        if(userName&&passWord){
            this.selectLoginType('账号登录');
            let input = this.getAccountLoginInput();
            cy.get(input).first().type(userName);
            cy.get(input).last().type(passWord);
            cy.get(`${this.accountLoginEl} ${this.loginButton}`).contains('登录').click();
            this.licenseDialog(true);
        }else{
            cy.log('用户名和密码不能为空');
        }
    }



    /**
     * 获取账号登录的所有input输入框
     */
    getAccountLoginInput(){
        cy.get(`${this.accountLoginEl} input`).as('input');
        return '@input';
    }


    /**
     * 验证码登录协同云(通过调用验证码接口获取相关验证码数据)
     * @param {String} mobile 
     */
    loginByMobile(mobile){
        this.selectLoginType('验证码登录');
        let input = this.getMobileLoginInput();
        let img = codeData.getImgCode();
        cy.get(input).get('[placeholder="请输入手机号"]').type(mobile);
        cy.get(img).then((imgData)=>{
            let imgCode = imgData.imgCode;
            let codeKey = imgData.codeKey
            cy.get(input).get('input[placeholder="请输入图形验证码"]').type(imgCode)
            let mobileCode = codeData.getMobileCode(mobile,imgCode,codeKey);
            cy.get(mobileCode).then((codeData)=>{
                let mobileCode = codeData.randcode
                cy.get(input).get('input[placeholder="请输入验证码"]').type(mobileCode);
            })
        })
        cy.get(`${this.mobileLoginEl} ${this.loginButton}`).contains('登录').click();
        this.licenseDialog(true);
        //cy.wait(1000)
    }


    /**
     * 获取短信登录的所有input输入框
     */
    getMobileLoginInput(){
        cy.get(`${this.mobileLoginEl} input`).as('input');
        return '@input';
    }

    /**
     * 处理登录后的许可协议弹窗
     * @param {Boolean} action 
     */
    licenseDialog(action){
        cy.wait(3000)
        cy.get('div').then(($div)=>{
            for(let i = 0;i<$div.length;i++){
                if($div[i].getAttribute('class') == this.dialog){
                    cy.wrap($div[i]).as('dialog')
                    if(action){
                        cy.get('@dialog').find('div').contains('已阅读并同意').click();
                    }else{
                        cy.get('@dialog').find('div').contains('不同意').click();
                    }
                break;
                }
            }
        })
    }


    /**
     * 验证码登录，通过监听接口获取验证码
     * @param {String} mobile 
     */
    loginByMobileWithCode(mobile){
        this.selectLoginType('验证码登录');
        let input = this.getMobileLoginInput();
        cy.get(input).get('[placeholder="请输入手机号"]').type(mobile);
        let img = this.mointorRequestGetImgCode();
        cy.get(img).then((imgCode)=>{
            cy.get(input).get('input[placeholder="请输入图形验证码"]').type(imgCode)
        }) 
        let randcode = this.mointorRequestGetMobilleCode(); 
        cy.get(randcode).then((mobileCode)=>{
            cy.get(input).get('input[placeholder="请输入验证码"]').type(mobileCode);
        })
        cy.get(`${this.mobileLoginEl} ${this.loginButton}`).contains('登录').click();
        cy.wait(1000)
     }

     /**
      * 监听接口获取图形验证码
      */
    mointorRequestGetImgCode(){
        cy.server();
        cy.route({
            url:'/portal.php*',
            method:'post'
        }).as('requestData');
        cy.get(this.imgCodePic).click();
        cy.wait('@requestData').its('responseBody').its('realImgCode').as('imgCode')
        return '@imgCode'
     }

     /**
      * 监听接口获取短信验证码
      */
    mointorRequestGetMobilleCode(){
        cy.server();
        cy.route({
            url:'/portal.php*',
            method:'post'
        }).as('requestData');
        cy.get(`${this.sendCodeButton}>span`).contains('获取手机验证码').click();
        return cy.wait('@requestData').its('responseBody').its('data').its('randcode').as('mobileCode');
        return '@mobileCode'
     }


     /**
      * 找回密码,注册账号输入框
      * @param {String} inputName 
      * @param {String} value 
      */
     
     typeByInputName(inputName,value){
        cy.get(`${this.findPassWord} form div.el-form-item>label`)
        .contains(inputName).nextAll().find('div.el-input input').type(value)
     }
    
    /**
     * 枚举类列表输入框
     * @param {String} inputName 
     * @param {String} value 
     */
    clickInputByName(inputName,value){
        cy.get(`${this.findPassWord} form div.el-form-item>label`)
        .contains(inputName).nextAll().find('div.el-input input').click();
        cy.get(`${this.scrollbarList} li>span`).contains(value).scrollIntoView()
        .click("topLeft",{force:true});
        //type(value)
    }

    
    /**
     * 找回密码方式
     * @param {String} findMethod 
     */
    selectFindPassWordMethod(findMethod){
        cy.get(`${this.findPassWordLink}`).click();
        cy.get(`div.el-radio-group label span:nth-child(2)`).as('findMethod')
        cy.get('@findMethod').contains(findMethod).prev().click();
    }


    /**
     * 手机重置密码
     * @param {*} mobile 
     * @param {*} newPW 
     * @param {*} confirmPW 
     */
    reSetPassWordByMobile(mobile,newPW,confirmPW){
        this.selectFindPassWordMethod('手机验证 ');
        this.typeByInputName('手机号码',mobile);
        this.mointorRequestGetImgCode().then((imgCode)=>{
            this.typeByInputName('图形验证码',imgCode);
        })
        this.mointorRequestGetMobilleCode().then((mobileCode)=>{
            this.typeByInputName('手机验证码',mobileCode);
        })
        this.typeByInputName('设置新密码',newPW);
        this.typeByInputName('确认新密码',confirmPW);
        cy.get(`button`).contains('立即验证').click();
       
     }

    


    /**
     * 邮箱重置密码。暂时无法使用，验证码直接发送到了邮箱
     * @param {String} email 
     * @param {String} newPW 
     * @param {String} confirmPW 
     */
    reSetPassWordByEmail(email,newPW,confirmPW){
        this.selectFindPassWordMethod('邮箱验证 ');
        this.typeByInputName('邮箱',email);
        let img = this.mointorRequestGetImgCode();
        cy.get(img).then((imgCode)=>{
            this.typeByInputName('图形验证码',imgCode);
        })
        let randcode = this.mointorRequestGetMobilleCode();
        cy.get(randcode).then((mobileCode)=>{
            this.typeByInputName('邮箱验证码',mobileCode);
        })
        this.typeByInputName('设置新密码',newPW);
        this.typeByInputName('确认新密码',confirmPW);
     }


     /**
      * 注册账号
      * @param {String} mobile 
      * @param {String} userInfo 
      */
     registerUser(mobile,userInfo){
        this.typeByInputName('手机号码',mobile);
        let img = this.mointorRequestGetImgCode();
        cy.get(img).then((imgCode)=>{
            this.typeByInputName('图形验证码',imgCode);
        })
        this.mointorRequestGetMobilleCode().then((mobileCode)=>{
            this.typeByInputName('手机验证码',mobileCode);
        })
        cy.get(this.bigButton).contains('下一步').click();
        cy.wait(3000);
        //设置用户信息
        if(userInfo){
            this.typeByInputName('输入密码',userInfo.passWord);
            this.typeByInputName('确认密码',userInfo.passWord);
            this.typeByInputName('单位名称',userInfo.unitName);
            this.typeByInputName('岗位',userInfo.post);
            this.clickInputByName('所属行业',userInfo.industy);
            this.clickInputByName('兴趣领域',userInfo.interest);
        }else{
            this.typeByInputName('输入密码',this.userDefInfo.passWord);
            this.typeByInputName('确认密码',this.userDefInfo.passWord);
            this.typeByInputName('单位名称',this.userDefInfo.unitName);
            this.typeByInputName('岗位',this.userDefInfo.post);
            this.clickInputByName('所属行业',this.userDefInfo.industy);
            this.clickInputByName('兴趣领域',this.userDefInfo.interest);
        }
        cy.get(this.bigButton).contains('完成').click();
     }

}

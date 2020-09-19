import url from './url'

let serverUrl = new url();

export default class code{
    

    constructor(){
        this.imgCodeUrl = `${serverUrl.getServerUrl('chome')}/portal.php?m=util&a=randcode&type=login&w=100&h=40&base64=1`    //发送图形验证码
        this.mobileCodeUrl = `${serverUrl.getServerUrl('cloud')}/commonapi/auth/sendSmsCode`    //短信验证码
        this.eMailCodeUrl = `${serverUrl.getServerUrl('chome')}/portal.php` //邮箱验证码
    }

    /**
     * 调用接口获取图形验证码和codeKey
     * @returns 返回图形验证码对象别名
     */
    getImgCode(){
        cy.request({
            url:this.imgCodeUrl,
            method:"post",
            body:{},
            headers:{
                "Content-Type":"application/json"
            },
        }).its('body').then((bodyData)=>{
            let imgCode = bodyData.realImgCode;
            let codeKey = bodyData.codeKey;
            cy.wrap({"imgCode":imgCode,"codeKey":codeKey}).as('imgData')
        });
        return '@imgData'
    }


    /**
     * 获取短信验证码
     * @param {String} mobile 
     * @param {String} imgCode 
     * @param {String} codeKey
     * @returns 返回code数据对象别名。
     */
    getMobileCode(mobile,imgCode,codeKey){
        cy.request({
            url:this.mobileCodeUrl,
            method:'POST',
            body:{
                "type":"login",
                "param":mobile,
                "imgCode":imgCode,
                "codeKey":codeKey
            },
            headers:{
                "Content-Type":"application/json"
            }
        }).its('body').then((data)=>{
            let mobileCode = data.data;
            cy.wrap({"imgCode":imgCode,"codeKey":codeKey,"randcode":mobileCode}).as('codeData')
        })
        return '@codeData'
    }


    /**
     * 获取短信验证码，只录入手机
     * @param {String} mobile 
     * @returns 返回短信验证码
     */
    getMobileCodeOnlyByMobile(mobile){
        cy.get(this.getImgCode()).then((img)=>{
            let codeData = this.getMobileCode(mobile,img.imgCode,img.codeKey)
            cy.get(codeData).then((data)=>{
                cy.wrap(data.randcode).as('mobileCode')
            })
        })
        return '@mobileCode'
    }

    getEmailCode(){

    }
}
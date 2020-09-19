import url from './url'
import _replace from 'lodash/replace'
import code from '../../common/other/code'

let serverUrl = new url()
let codeData = new code()

export default class setServerCookie{

    constructor(){
        this.header = {
            "Content-Type":"application/json",
            "Accept":"application/json,text/plain,\*\/\*"
        }
    }

    /**
     * 调用登录接口获取token设置未公共cookie
     * @param {String} userName 
     * @param {String} passWord 
     * @param {string} userType //协同云账号类型
     */
    setDesignCookie(userName,passWord,userType){
        cy.request({
            url:`${serverUrl.getServerUrl('cloud')}/commonapi/auth/login`,
            method:'post',
            headers:this.header,
            body:{
            "username":userName,
            "password":passWord
        }
        }).then((response)=>{
            let token = _replace(response.body.data.token,'Bearer ','Bearer%20')
            cy.setCookie(`${serverUrl.evnType}Authorization`,`${token}`)
        })
    }

    /**
     * 手机号登录获取协同云登录token
     * @param {String}} mobile 
     */
    setDesignCookieByMobile(mobile){
        cy.get(codeData.getMobileCodeOnlyByMobile(mobile)).then((mobileCode)=>{
            cy.request({
                url:`${serverUrl.getServerUrl('cloud')}/commonapi/auth/login`,
                method:'post',
                headers:this.header,
                body:{
                "mobile":mobile,
                "code":mobileCode
                }
            }).then((response)=>{
                let token = _replace(response.body.data.token,'Bearer ','Bearer%20')
                cy.setCookie(`${serverUrl.evnType}Authorization`,`${token}`)
            })
        })
    }

    setV5Cookie(){
        cy.request({
            url:`${serverUrl.getServerUrl('design')}/designCenter/member/sso`,
            method:'post',
            headers:this.header,
            body:{"ssoType":"DesCenter"},
            followRedirect:true
        }).then((response)=>{
            let session = response.body.data.ssoPrefix
            cy.log(`单点登录获取的V5session:${session}`)
            cy.request({
                url:`${session}`,
                method:'get',
                followRedirect:true
            })
        })  
    }

}
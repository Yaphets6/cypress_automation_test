/**
 * 获取服务器地址配置信息
 */



export default class serverUrl{
    
    constructor(){
        this.evnType = Cypress.env('evnType');
        this.http = Cypress.env('http');
        this.cloud = Cypress.env('cloud');
        this.chome = Cypress.env('chome');
        this.cmanager = Cypress.env('cmanager');
        this.design = Cypress.env('design');
        this.boss = Cypress.env('boss');
    }

    /**
     * 根据服务名获取服务器域名
     * @param {String} serverName 
     */
    getServerUrl(serverName){
        let serverUrl;
        switch (serverName) {
            case 'cloud':
                serverUrl = `${this.http}${this.evnType}${this.cloud}`;
                break;
            case 'chome':
                serverUrl = `${this.http}${this.evnType}${this.chome}`;
                break;

            case 'cmanager':
                serverUrl = `${this.http}${this.evnType}${this.cmanager}`;
                break;

            case 'design':
                serverUrl = `${this.http}${this.evnType}${this.design}`;
                break;

            case 'boss':
                serverUrl = `${this.http}${this.evnType}${this.boss}`;
                break;
        
            default:
                cy.log(`++++++++++++未找到${serverName}服务对应的服务器地址+++++++++++++`);
                break;
        }
        return serverUrl;
    }

    /**
     * 获取服务器类型
     */
    getServerEnvType(){
        return this.evnType
    }


    /**
     * 获取服务器传输方式
     */
    getServerHttp(){
        return this.http
    }
}
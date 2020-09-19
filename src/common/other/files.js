import  _split  from "lodash/split";


const FILE_TYPE = ['json','js','coffee','html','txt','csv','png','jpg','jpeg','gif','tif','tiff','zip']



/**
 * 
 * @param {String} selector input框元素的selector或者input框元素的别名
 * @param {String} filePath 文件在fixtures的路径
 */
export function file_upload(selector,filePath){
    let file = getFileAttr(filePath);
    cy.server()
    cy.route({
        url:'/designCenter/*/*',
        method:'post'
    }).as('upload')
    if(FILE_TYPE.indexOf(file.type) != -1){
        cy.get(selector).attachFile(filePath)
        cy.wait('@upload')
    }else{
        cy.fixture(filePath,'binary').then(Cypress.Blob.binaryStringToBlob).then((fileObj)=>{
          cy.get(selector).attachFile({
                fileContent:fileObj, 
                fileName:file.fileName,
                mimeType:'application/octet-stream', 
                encoding:'utf-8'
            })
            //上传方法设置固定等待时间，最好用例自己拦截监听上传接口（每个业务上传调用接口不一样），完成后再执行下一步
            cy.wait(2000)
        })
    }
}


function getFileAttr(filePath){
    //let path = filePath;
    let file = {};
    let pathList = _split(filePath,'/');
    let fileName = pathList[pathList.length - 1];
    let suffix = getFileSuffix(fileName);
    file['fileName'] = fileName
    file['type'] = suffix
    return file;
}


function getFileSuffix(fileName){
    let nameList = _split(fileName,'.');
    let suffix = nameList[nameList.length - 1];
    return suffix
}


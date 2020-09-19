export default class designTagList{
    constructor(){
        this.tagList = 'ul.ant-list-items'  //标签列表
    }

    /**
     * 选择标签
     * @param {Array} tagList 
     */
    selectTag(tagList){
        tagList.forEach((tag)=>{
            cy.get(`${this.tagList} li.ant-list-item span`)
            .contains(tag).scrollIntoView()
            .parents('label').find(`input.ant-checkbox-input`).check()
        })
    }

    /**
     * 取消标签选择
     * @param {Array} tagList
     */
    unSelectTag(tagList){
        tagList.forEach((tag)=>{
            cy.get(`${this.tagList} li.ant-list-item span`)
            .contains(tag).scrollIntoView()
            .parents('label').find(`input.ant-checkbox-input`).uncheck()
        })
    }

    /**
     * 获取标签元素，用于判断标签选中状态
     * @param {String} tagName 
     */
    getTagEl(tagName){
        cy.get(`${this.tagList} li.ant-list-item span`)
        .contains(tag).parents('label').as('label')
    }
}
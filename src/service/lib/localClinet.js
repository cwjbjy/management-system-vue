/**
 * 动态加载本地资源
*/

let PRE = "CWJ_GLOBAL_"; //前缀

class LocalClient{
    get({url="",uag=""}){
        let fileName = `${PRE}${uag}`;
        console.log('fileName',fileName)
        return new Promise((resolve,reject)=>{
            if(document.querySelector(`#${fileName}`)){
                resolve()
            }else{
                //如果文件没有加载
                //加载文件
                let script = document.createElement('script');
                script.src = url;
                script.id = fileName;
                //加载完成输出
                script.onload = function(){
                    //配置文件的内容，通过定义的全局变量，加到了window对象上
                    resolve()
                }
                document.head.appendChild(script)
            }
        })
    }
}

export default new LocalClient
class Pwa {
    constructor(){
        this.event = null; 
        this.addEvents()
    }
    addEvents(){
        console.log('监听事件')
        window.addEventListener("beforeinstallprompt",(e)=>{
            console.log('安装前监听',e)
            this.event = e;
            this.event?.userChoice.then((choiceResult)=>{
                if (choiceResult.outcome === 'dismissed') {
                    console.log('用户取消安装应用');
                }
                else {
                    this.event = null;
                    console.log('用户安装了应用');
                }
            })
        })
    }
}

export default new Pwa()
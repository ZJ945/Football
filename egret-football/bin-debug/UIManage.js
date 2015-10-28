//游戏场景管理类
var UIManage = (function () {
    function UIManage() {
        if (UIManage.instance == null)
            UIManage.instance = this;
        else
            throw new Error("UIManage had been Instanced");
    }
    var d = __define,c=UIManage;p=c.prototype;
    UIManage.getInstance = function () {
        if (UIManage.instance == null)
            UIManage.instance = new UIManage();
        return UIManage.instance;
    };
    //释放内存，清除所有
    p.releaseAll = function () {
        if (this.welcomeScene != null)
            Main.Stage.removeChild(this.welcomeScene);
        if (this.gameScene != null)
            Main.Stage.removeChild(this.gameScene);
        this.welcomeScene = null;
        this.gameScene = null;
    };
    p.showWelcome = function () {
        console.log("showWelcome");
        if (this.welcomeScene != null)
            this.welcomeScene = null;
        this.welcomeScene = new WelcomeScene();
        Main.Stage.addChild(this.welcomeScene);
    };
    p.hideWelcome = function () {
        if (this.welcomeScene != null) {
            console.log("hideWelcome");
            Main.Stage.removeChild(this.welcomeScene);
            this.welcomeScene = null;
        }
        else
            console.log("welcomeScene   had   not  instance");
    };
    p.showSelect = function () {
        console.log("showSelect");
        if (this.selectScene != null)
            this.selectScene = null;
        this.selectScene = new SelectScene();
        Main.Stage.addChild(this.selectScene);
    };
    p.hideSelect = function () {
        if (this.selectScene != null) {
            console.log("hideSelect");
            Main.Stage.removeChild(this.selectScene);
            this.selectScene = null;
        }
        else
            console.log("selectScene   had   not  instance");
    };
    p.showGame = function () {
        GameData.reset();
        if (this.gameScene != null)
            this.gameScene = null;
        this.gameScene = new GameScene();
        Main.Stage.addChild(this.gameScene);
        console.log("showGame");
    };
    p.hideGame = function () {
        if (this.gameScene != null) {
            console.log("hideGame");
            Main.Stage.removeChild(this.gameScene);
            this.gameScene = null;
        }
        else
            console.log("gameScene   had   not  instance");
    };
    return UIManage;
})();
egret.registerClass(UIManage,"UIManage");

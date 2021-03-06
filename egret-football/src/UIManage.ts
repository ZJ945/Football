//游戏场景管理类
class UIManage {
    static instance;
    private welcomeScene:WelcomeScene;
    private selectScene:SelectScene;
    private gameScene:GameScene;

    public static getInstance():UIManage {
        if (UIManage.instance == null)UIManage.instance = new UIManage();
        return UIManage.instance;
    }

    constructor() {
        if (UIManage.instance == null)UIManage.instance = this;
        else throw new Error("UIManage had been Instanced");
    }

    //释放内存，清除所有
    public releaseAll() {
        if (this.welcomeScene != null)Main.Stage.removeChild(this.welcomeScene);
        if (this.gameScene != null)Main.Stage.removeChild(this.gameScene);
        this.welcomeScene = null;
        this.gameScene = null;
    }

    public showWelcome() {
        console.log("showWelcome");
        if (this.welcomeScene != null)this.welcomeScene = null;
        this.welcomeScene = new WelcomeScene();
        Main.Stage.addChild(this.welcomeScene);
    }

    public hideWelcome() {
        if (this.welcomeScene != null) {
            console.log("hideWelcome");
            Main.Stage.removeChild(this.welcomeScene);
            this.welcomeScene = null;
        }
        else console.log("welcomeScene   had   not  instance");
    }


    public showSelect() {
        console.log("showSelect");
        if (this.selectScene != null)this.selectScene = null;
        this.selectScene = new SelectScene();
        Main.Stage.addChild(this.selectScene);
    }

    public hideSelect() {
        if (this.selectScene != null) {
            console.log("hideSelect");
            Main.Stage.removeChild(this.selectScene);
            this.selectScene = null;
        }
        else console.log("selectScene   had   not  instance");
    }

    public showGame() {
        GameData.reset();
        if (this.gameScene != null)this.gameScene = null;
        this.gameScene = new GameScene();
        Main.Stage.addChild(this.gameScene);
        console.log("showGame");
    }

    public hideGame() {
        if (this.gameScene != null) {
            console.log("hideGame");
            Main.Stage.removeChild(this.gameScene);
            this.gameScene = null;
        }
        else console.log("gameScene   had   not  instance");
    }


}
//程序入口�?
class Main extends egret.DisplayObjectContainer {
    static Stage:egret.DisplayObjectContainer;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        Main.Stage = this;
        meiriq.CommonComponent.instance.init("yuanshuzhanzheng", this.stage);
        meiriq.CommonComponent.instance.load(
            function () {
                GameData.loadData();
                GameData.reset();
                //UIManage.getInstance().showWelcome();
                //UIManage.getInstance().showSelect();
                UIManage.getInstance().showGame();
            }
            //, this, ["welcome","game","role","select", "effect"], "default.res.json");
            , this, ["game","hero","enemy"], "default.res.json");
    }
}
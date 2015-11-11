//程序入口��?
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main;p=c.prototype;
    p.onAddToStage = function (event) {
        Main.Stage = this;
        meiriq.CommonComponent.instance.init("football", this.stage);
        meiriq.CommonComponent.instance.load(function () {
            GameData.loadData();
            GameData.reset();
            UIManage.getInstance().showWelcome();
            //UIManage.getInstance().showSelect();
            //UIManage.getInstance().showGame();
        }, this, ["welcome", "select", "game", "hero", "enemy"], "default.res.json");
    };
    return Main;
})(egret.DisplayObjectContainer);
egret.registerClass(Main,"Main");

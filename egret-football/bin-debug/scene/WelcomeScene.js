//��Ϸ��ӭҳ��
var WelcomeScene = (function (_super) {
    __extends(WelcomeScene, _super);
    function WelcomeScene() {
        _super.call(this);
        this.startOrSelect = "";
        this.init();
    }
    var d = __define,c=WelcomeScene;p=c.prototype;
    p.init = function () {
        this.welcome_background = Tool.addBitmap(this, "welcome_background_png", 0, 0, GameData.gameWidth, GameData.gameHeight, false);
        this.welcome_background.width = GameData.gameWidth;
        this.welcome_background.height = GameData.gameHeight;
        this.welcome_tip = Tool.addBitmap(this, "welcome_tip_png", 0, 690, 300, 90, true);
        this.welcome_tip.x = (this.width - this.welcome_tip.width) / 2;
        this.welcome_start = Tool.addBitmap(this, "welcome_start0_png", 0, 680, 150, 50, true);
        this.welcome_start.x = (this.width - this.welcome_start.width) / 2;
        this.welcome_select = Tool.addBitmap(this, "welcome_select0_png", 0, 745, 150, 50, true);
        this.welcome_select.x = (this.width - this.welcome_select.width) / 2;
        this.instrution = Tool.addBitmap(this, "instrution_png", 0, 0, GameData.gameWidth, GameData.gameHeight, true);
        this.instrution.width = GameData.gameWidth;
        this.instrution.height = GameData.gameHeight;
        this.instrution.visible = false;
    };
    p.onTouchStart = function (e) {
        e.stopImmediatePropagation();
        if (e.target == this.welcome_start) {
            this.startOrSelect = "start";
            this.welcome_start.texture = RES.getRes("welcome_start1_png");
        }
        else if (e.target == this.welcome_select) {
            this.startOrSelect = "select";
            this.welcome_select.texture = RES.getRes("welcome_select1_png");
        }
    };
    //�����¼�����Ӧ����
    p.onTouchEnd = function (e) {
        e.stopImmediatePropagation();
        if (!Tool.checkLocal("muyewar_first")) {
            Tool.setLocal("muyewar_first", "true");
            this.instrution.visible = true;
            return;
        }
        if (e.target == this.welcome_start) {
            UIManage.getInstance().hideWelcome();
            UIManage.getInstance().showGame();
        }
        else if (e.target == this.welcome_select) {
            UIManage.getInstance().hideWelcome();
            UIManage.getInstance().showSelect();
        }
        else if (e.target == this.instrution) {
            UIManage.getInstance().hideWelcome();
            if (this.startOrSelect == "start")
                UIManage.getInstance().showGame();
            else
                UIManage.getInstance().showSelect();
        }
    };
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return WelcomeScene;
})(egret.DisplayObjectContainer);
egret.registerClass(WelcomeScene,"WelcomeScene");

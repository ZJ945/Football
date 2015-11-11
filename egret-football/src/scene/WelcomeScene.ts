//游戏欢迎页面
class WelcomeScene extends egret.DisplayObjectContainer {
    private welcome_background:egret.Bitmap;//欢迎页面背景
    private instrution:egret.Bitmap;//游戏说明页面
    private welcome_select:egret.Bitmap;//选择按钮
    private welcome_start:egret.Bitmap;//开始按钮
    private startOrSelect:string = "";
    private instrutionIndex:number = 0;//标示游戏说明页的状态

    constructor() {
        super();
        this.init();
    }

    public init():void {
        this.welcome_background = Tool.addBitmap(this, "welcome_background_png", 0, 0, GameData.gameWidth, GameData.gameHeight, false);
        this.welcome_background.width = GameData.gameWidth;
        this.welcome_background.height = GameData.gameHeight;


        this.welcome_start = Tool.addBitmap(this, "welcome_start0_png", 0, 240, 150, 50, true);
        this.welcome_start.x = (this.width - this.welcome_start.width) / 2;

        this.welcome_select = Tool.addBitmap(this, "welcome_select0_png", 0, 320, 150, 50, true);
        this.welcome_select.x = (this.width - this.welcome_select.width) / 2;

        this.instrution = Tool.addBitmap(this, "instrution0_jpg", 0, 0, GameData.gameWidth, GameData.gameHeight, true);
        this.instrution.width = GameData.gameWidth;
        this.instrution.height = GameData.gameHeight;
        this.instrution.visible = false;
    }

    public onTouchStart(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (e.target == this.welcome_start) {
            this.startOrSelect = "start";
            this.welcome_start.texture = RES.getRes("welcome_start1_png");
        }
        else if (e.target == this.welcome_select) {
            this.startOrSelect = "select";
            this.welcome_select.texture = RES.getRes("welcome_select1_png");
        }
    }

    //点击事件的响应函数
    public onTouchEnd(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (!Tool.checkLocal("football_first")) {
            this.instrution.visible = true;
            if (this.instrutionIndex > 0){
                this.instrution.texture = RES.getRes("instrution1_jpg");
                Tool.setLocal("football_first", "true");
            }
            this.instrutionIndex++;
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
            if (this.startOrSelect == "start")UIManage.getInstance().showGame();
            else UIManage.getInstance().showSelect();
        }
    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
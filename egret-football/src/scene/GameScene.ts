//游戏主体页面
class GameScene extends egret.DisplayObjectContainer {
    private background:egret.Bitmap;//背景
    private hero:Hero;
    private enemy:Enemy;

    public constructor() {
        super();
        this.init();
    }

    public init():void {
        this.addEventListener(egret.Event.ENTER_FRAME, this.flashGame, this);
        this.background = Tool.addBitmap(this, "game_background_png", 0, 0, 800, 480, true);
        this.hero = new Hero(this);
        this.enemy = new Enemy(this);
    }

    public flashGame():void {
        //this.hero.flash();
    }

    //开始点击的响应函数
    public onTouchStart(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();

    }

    //点击事件的响应函数
    public onTouchEnd(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        this.hero.checkAttack();
        //this.enemy.die();

    }

    //移出显示容器的响应函数
    public onRemove(e:egret.Event):void {
        if (e.target == this) {
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.flashGame, this);
        }
        else {
            e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        }
    }


}
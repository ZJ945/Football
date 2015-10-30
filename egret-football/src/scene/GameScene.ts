//游戏主体页面
class GameScene extends egret.DisplayObjectContainer {
    private background1:egret.Bitmap;//背景
    private background2:egret.Bitmap;//背景
    private hero:Hero;
    private enemyArray:any;//四个敌人
    private enemyFlashTime:number = 9999;//enemy更新的计时器

    public constructor() {
        super();
        this.init();
    }

    public init():void {
        this.addEventListener(egret.Event.ENTER_FRAME, this.flashGame, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.background1 = Tool.addBitmap(this, "game_background_png", 0, 0, 1000, 480, true);
        this.background2 = Tool.addBitmap(this, "game_background_png", 1000, 0, 1000, 480, true);
        this.hero = new Hero(this);
        this.enemyArray = [];
    }

    public flashGame():void {
        //设置背景的滚动
        this.background1.x -= GameData.backgroundSpeed;
        this.background2.x -= GameData.backgroundSpeed;
        if (this.background1.x < 0 - this.background1.width)this.background1.x = this.background2.x + this.background2.width;
        if (this.background2.x < 0 - this.background2.width)this.background2.x = this.background1.x + this.background1.width;

        //选择最前面的敌人进行攻击
        GameData.firstX = 999;
        var index:number = 0;
        for (var i = 0; i < this.enemyArray.length; i++) {
            this.enemyArray[i].flash();
            if (GameData.firstX > this.enemyArray[i].siteX) {
                GameData.firstX = this.enemyArray[i].siteX + 20;
                index = i;
            }
        }
        //进行攻击范围的检测，若命中则把最前面的enemy放在数组最前面
        if (GameData.firstX < (this.hero.ball.x + 20) && GameData.hadHit == false) {
            var tempEnemy = this.enemyArray[0];
            this.enemyArray[0] = this.enemyArray[index];
            this.enemyArray[index] = tempEnemy;
            this.enemyArray[0].die();
            GameData.hadHit = true;
        }

        this.checkEnemy();
        GameData.enemyLestNum = this.enemyArray.length;
        this.hero.flash();
    }

    //检测enemy数组，进行及时的清除和增加
    public checkEnemy():void {
        //清除死亡的enemy
        for (var i = 0; i < this.enemyArray.length; i++) {
            if (this.enemyArray[i].isDie == true) {
                Tool.removeOne(this.enemyArray, i);
                GameData.score++;
            }
        }

        this.enemyFlashTime++;
        if ((this.enemyFlashTime > GameData.enemyFlashSpace &&
            this.enemyArray.length < GameData.enemyNum)) {
            this.enemyFlashTime = 0;
            var randomNum = Math.floor(Math.random() * 3) + 2;
            for (var i = 0; i < randomNum; i++) {
                var temp = new Enemy(this);
                this.enemyArray.push(temp);//加快刷新速度
            }
            if (GameData.enemyFlashSpace > GameData.enemyFlashLestSpace) {
                GameData.enemyFlashSpace -= GameData.enemyFlashSpeed;
            }
        }
    }

    //开始点击的响应函数
    public onTouchStart(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();

    }

    //点击事件的响应函数
    public onTouchEnd(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        this.hero.checkAttack();
        //this.enemyArray[0].test();
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
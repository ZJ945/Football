//游戏主角类
class Hero {
    private targer;//父类容器
    private body:egret.MovieClip;//主体
    private effect:egret.MovieClip;//主体
    private ball:egret.Bitmap;//足球
    private sight:egret.Bitmap;//瞄准器
    private ballTW:egret.Tween;//实现足球移动的缓动函数
    private sightDirection:string = "down";//瞄准器的移动方向
    private isDie:boolean = false;//标示hero是否死亡
    private ballRangle:number = 0;//标记足球的自转角

    //构造函数//初始化数据
    constructor(target) {
        this.targer = target;
        this.ball = Tool.addBitmap(target, "game_ball_png", 90, 350, 30, 30, false);
        this.sight = Tool.addBitmap(target, "game_sight_png", 50, 300, 120, 100, false);
        this.ball.anchorOffsetX = this.ball.width / 2;
        this.ball.anchorOffsetY = this.ball.height / 2;
        this.run();
        this.setBall();
    }

    //切换攻击状态
    public changeEffect():void {
        var type = "effect0";
        if (GameData.attackType == "attack0")type = "effect0";
        else if (GameData.attackType == "attack1")type = "effect1";
        var data = RES.getRes(type + "_json");
        var txtr = RES.getRes(type + "_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.effect = new egret.MovieClip(mcFactory.generateMovieClipData(type));
        this.effect.x = 80;
        this.effect.y = 280;
        GameData.ballSpeed = 10;
        if (type == "effect1") {
            this.effect.x = 80;
            this.effect.y = 200;
            GameData.ballSpeed = 10;
        }
        this.effect.play(1);
        this.targer.addChild(this.effect);
        this.targer.setChildIndex(this.ball, 99);
        this.effect.addEventListener(egret.Event.COMPLETE, this.effectComp, this);
        GameData.ballDirection = "right";
        this.setBall();
    }

    //攻击特效结束
    public effectComp():void {
        if (this.effect != null) {
            this.effect.removeEventListener(egret.Event.COMPLETE, this.effectComp, this);
            this.targer.removeChild(this.effect);
            this.effect = null;
            GameData.attackOver = true;
        }
    }

    //切换攻击状态
    public changeStage(type:string):void {
        if (this.isDie == true)return;
        GameData.attackType = type;
        GameData.attackOver = false;
        if (this.body != null) {
            this.body.removeEventListener(egret.Event.COMPLETE, this.run, this);
            this.targer.removeChild(this.body);
            this.body = null;
        }
        var data = RES.getRes(GameData.heroName + "_" + type + "_json");
        var txtr = RES.getRes(GameData.heroName + "_" + type + "_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.body = new egret.MovieClip(mcFactory.generateMovieClipData(type));
        this.body.x = 0;
        this.body.y = 250;
        if (type == "attack1")this.body.y = 235;
        this.body.play(1);
        this.targer.addChild(this.body);
        if (type != "die")this.body.addEventListener(egret.Event.COMPLETE, this.run, this);
        else this.body.addEventListener(egret.Event.COMPLETE, this.die, this);
    }

    //站立状态
    public run():void {
        if (this.body != null) {
            this.changeEffect();//设置攻击特效
            this.body.removeEventListener(egret.Event.COMPLETE, this.run, this);
            this.targer.removeChild(this.body);
            this.body = null;
        }

        var data = RES.getRes(GameData.heroName + "_run_json");
        var txtr = RES.getRes(GameData.heroName + "_run_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.body = new egret.MovieClip(mcFactory.generateMovieClipData("run"));

        this.body.x = 0;
        this.body.y = 260;
        this.body.play(999);
        this.targer.addChild(this.body);
    }

    //死亡效果完成
    public die():void {
        this.body.removeEventListener(egret.Event.COMPLETE, this.run, this);
        this.targer.removeChild(this.body);
        this.body = null;
        meiriq.CommonComponent.instance.executedHook("gameover",        //函数名
            GameData.score,         //游戏得分
            function () {
                meiriq.CommonComponent.instance.executedHook("restart");
                GameData.reset();
                UIManage.getInstance().hideGame();
                UIManage.getInstance().showGame();
            },
            this);
    }

    //刷新Hero的状态
    public flash():void {
        this.ballRangle = (GameData.ballRangle + this.ballRangle) % 360;
        this.ball.rotation = this.ballRangle;
        if (this.sightDirection == "up") {
            this.sight.y += 3;
            if (this.sight.y > 320)this.sightDirection = "down";
        }
        else {
            this.sight.y -= 3;
            if (this.sight.y < 0)this.sightDirection = "up";
        }
    }

    //设置足球的移动函数
    public setBall():void {
        if (this.ballTW != null)this.ballTW = null;
        this.ballTW = egret.Tween.get(this.ball);
        var ballTime = 1500 - (GameData.ballSpeed * 100);

        if (GameData.ballDirection == "right") {
            GameData.ballDirection = "left";
            this.ballTW.to({x: 700}, ballTime).call(this.setBall, this);
            GameData.ballSpeed = 0;
        }
        else if (GameData.ballDirection == "left") {
            GameData.ballDirection = "right";
            this.ballTW.to({x: 0}, ballTime).call(this.setBall, this);
            GameData.ballSpeed = 0;
        }
    }

    //检测攻击是否命中
    public checkAttack():void {
        if (this.sight.x + 20 < this.ball.x && this.ball.x < this.sight.x + this.sight.width - 20) {
            egret.Tween.pauseTweens(this.ball);
            this.changeStage("attack0");
            console.log("sight");
        }
    }

}
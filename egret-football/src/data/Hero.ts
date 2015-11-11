//游戏主角类
class Hero {
    public ball:egret.Bitmap;//足球
    private targer;//父类容器
    private body:egret.MovieClip;//人物动作
    private effect:egret.MovieClip;//攻击特效
    private sight:egret.Bitmap;//瞄准器
    private isDie:boolean = false;//标示hero是否死亡
    private ballBaseX = 125;//足球在Hero脚底下时的Y轴坐标
    private targetX = 700;//射击目标的X轴坐标
    private targetY = 330;//射击目标的Y轴坐标

    private returnNodePre:number = 0.4;//返回时切换状态所在时所占百分比
    private returnNodeY:number = 150;//在变化的节点时的Y轴位置
    private returnType:number = 0;//返回返回路径的样式
    private returnX:number = -75;//返回目标位置的X坐标
    private returnY:number = 385;//返回目标位置的Y坐标
    private returnSpeed:number = 10;//足球返回的速度

    private isCommon:boolean = false;//标示是否是随便踢效果
    private attackIndex:number = 0;//标示攻击特效的种类

    //构造函数//初始化数据
    constructor(target) {
        this.targer = target;
        this.ball = Tool.addBitmap(target, "game_ball_png", 125, 385, 30, 30, false);
        this.sight = Tool.addBitmap(target, "game_sight_png", 125, 385, 120, 100, false);
        this.ball.anchorOffsetX = this.ball.width / 2;
        this.ball.anchorOffsetY = this.ball.height / 2;
        this.sight.anchorOffsetX = this.sight.width / 2;
        this.sight.anchorOffsetY = this.sight.height / 2;
        this.run();
    }

    //切换攻击状态
    public changeEffect():void {
        this.effectComp();
        var type = "effect0";
        var data = RES.getRes(type + "_json");
        var txtr = RES.getRes(type + "_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.effect = new egret.MovieClip(mcFactory.generateMovieClipData(type));
        if (this.returnType == 0) {//设置特效位置
            this.effect.x = 80;
            this.effect.y = 330;
            this.effect.scaleX = GameData.Hero.effect0Scale;
            this.effect.scaleY = GameData.Hero.effect0Scale;

            if (this.attackIndex == 1) this.effect.y = 280;

            this.ball.x = 255;
            this.ball.y = 385;
        }
        else if (this.returnType == 1) {
            this.effect.scaleX = GameData.Hero.effect0Scale;
            this.effect.scaleY = GameData.Hero.effect0Scale;
            this.effect.x = 80;
            this.effect.y = 200;
            this.effect.rotation = 4;

            if (this.attackIndex == 1) this.effect.y = 160;

            this.ball.x = 230;
            this.ball.y = 240;
        }
        else if (this.returnType == 2) {
            this.effect.scaleX = GameData.Hero.effect0Scale;
            this.effect.scaleY = GameData.Hero.effect0Scale;
            this.effect.x = 150;
            this.effect.y = 160;
            this.effect.rotation = 12;

            if (this.attackIndex == 1) this.effect.y = 120;

            this.ball.x = 325;
            this.ball.y = 230;
        }
        else if (this.returnType == 3) {
            this.effect.scaleX = GameData.Hero.effect0Scale;
            this.effect.scaleY = GameData.Hero.effect0Scale;
            this.effect.x = 70;
            this.effect.y = 120;
            this.effect.rotation = 16;

            if (this.attackIndex == 1) this.effect.y = 80;

            this.ball.x = 190;
            this.ball.y = 190;
        }
        this.effect.play(1);
        this.targer.addChild(this.effect);
        this.targer.setChildIndex(this.ball, 99);//把球放在最顶层
        this.effect.addEventListener(egret.Event.COMPLETE, this.effectComp, this);
    }

    //攻击特效结束
    public effectComp():void {
        if (this.effect != null) {
            this.effect.removeEventListener(egret.Event.COMPLETE, this.effectComp, this);
            this.targer.removeChild(this.effect);
            this.effect = null;

            this.ball.visible = true;
            GameData.ballState = "shoot";
            GameData.ballSpeed = 10;
            GameData.attackOver = true;
        }
    }

    //切换攻击状态
    public changeStage(type:string):void {
        GameData.attackOver = false;
        if (this.body != null) {
            this.body.removeEventListener(egret.Event.COMPLETE, this.run, this);
            this.targer.removeChild(this.body);
            this.body = null;
        }
        var data = RES.getRes(GameData.heroName + "_attack0_json");
        var txtr = RES.getRes(GameData.heroName + "_attack0_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.body = new egret.MovieClip(mcFactory.generateMovieClipData("attack0"));
        this.body.scaleX = GameData.Hero.attackScale;
        this.body.scaleY = GameData.Hero.attackScale;

        var tempOffsetY = 18;

        if (this.returnType == 0) {
            this.body.x = 0;
            this.body.y = 250 + tempOffsetY;
        }
        else if (this.returnType == 1) {
            this.body.x = 0;
            this.body.y = 180;
        }
        else if (this.returnType == 2) {
            this.body.x = 70;
            this.body.y = 190;
        }
        else if (this.returnType == 3) {
            this.body.x = -30;
            this.body.y = 75;
        }
        if (type == "die") {
            this.body.visible = false;
            this.sight.visible = false;
        }
        this.targer.addChild(this.body);
        if (type != "die") {
            this.body.play(1);
            this.body.addEventListener(egret.Event.COMPLETE, this.run, this);
        }
        else {
            this.body.play(999);
            this.body = null;
            this.isDie = true;
            GameData.backgroundSpeed = 0 - GameData.returnSpeedUp * 0.5;
            meiriq.CommonComponent.instance.executedHook("gameover",        //函数名
                GameData.score,         //游戏得分
                function () {
                    meiriq.CommonComponent.instance.executedHook("restart");
                    GameData.reset();
                    GameData.saveData();
                    UIManage.getInstance().hideGame();
                    //UIManage.getInstance().showGame();
                    UIManage.getInstance().showWelcome();
                },
                this);
        }
    }

    //普通踢球//即当没有敌人出现时的随便踢球
    public common():void {
        GameData.ballSpeed = 0;
        GameData.ballState = "shoot";

        this.isCommon = true;
        this.targetX = 350;
        this.targetY = 385;
        this.returnNodePre = 0.8;
        this.returnNodeY = 385;
        this.returnX = -75;
        this.returnY = 385;
        this.returnSpeed = 5;
        this.sight.x = this.returnX + 200;
        this.sight.y = this.returnY;
        GameData.ballRangle = GameData.ballBaseRangle * 3;
    }

    //站立状态
    public run():void {
        if (this.body != null) {
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
        this.body.scaleX = GameData.Hero.scale;
        this.body.scaleY = GameData.Hero.scale;
        this.body.play(999);
        this.targer.addChild(this.body);
    }

    //刷新Hero的状态
    public flash():void {
        this.ball.rotation = (GameData.ballRangle + this.ball.rotation) % 360;//足球的自转

        //判断抵达目的地，切换状态
        if (this.ball.x > this.targetX && GameData.ballState == "shoot") {
            GameData.ballState = "return";
            this.ball.x = this.targetX;
            this.sight.visible = true;
            if (this.isCommon == true)return;
            else if (GameData.enemyLestNum > 0)this.setPath(true);
            else this.setPath(false);
            return;
        }
        if (this.ball.x < this.returnX + 1 && GameData.ballState == "return") {
            GameData.ballRangle = GameData.ballBaseRangle;
            GameData.ballState = "empty";
            return;
        }

        if (GameData.ballState == "shoot") {//发射状态
            if (this.isCommon == false)this.targetX = GameData.firstX;
            this.ball.x += GameData.ballSpeed * 2 + 10;
            var pre = (this.ball.x - this.ballBaseX) / (this.targetX - this.ballBaseX);//当前进度所占百分比
            this.ball.y = this.returnY + pre * (this.targetY - this.returnY );//当前Y轴应该设置的位置
        }
        else if (GameData.ballState == "return") {//返回状态
            this.ball.x -= (this.targetX - this.returnX - 200) / (this.targetX - this.ballBaseX) * (this.returnSpeed + GameData.returnSpeedUp);
            if (this.ball.x < 30 && this.isDie == false) {
                this.changeStage("die");
                return;
            }
            var pre = 1 - (this.ball.x - this.returnX - 200) / (this.targetX - this.returnX - 200);//当前进度所占百分比
            if (pre < this.returnNodePre) {//在状态一
                var statePre = pre / this.returnNodePre;//在本状态中所占的百分比
                this.ball.y = this.targetY + Math.sin((2 * 3.14 * 90 * statePre) / 360) * (this.returnNodeY - this.targetY);
            }
            else if (pre > 0.1 + this.returnNodePre) {//在状态二
                GameData.hadHit = false;
                var statePre = (pre - this.returnNodePre) / (1 - this.returnNodePre);//在本状态中所占的百分比
                this.ball.y = this.returnY + Math.sin((2 * 3.14 * (90 + 90 * statePre)) / 360) * (this.returnNodeY - this.returnY);
            }
            if (this.ball.x < 200)this.isCommon = false;
        }
    }

    //设置随机路径以及随机返回点
    public setPath(isRamdon:boolean):void {
        //随机返回路径
        if (isRamdon)this.returnType = Math.floor(Math.random() * 4);
        else this.returnType = 0;
        //this.returnType = 2;
        if (this.returnType == 0) {
            this.returnNodePre = 0.2;
            this.returnNodeY = 365;
            this.returnX = -75;
            this.returnY = 385;
            this.returnSpeed = 10;
            GameData.ballRangle = GameData.ballBaseRangle * 6;
        }
        else if (this.returnType == 1) {
            this.returnNodePre = 0.45;
            this.returnNodeY = 200;
            this.returnX = -65;
            this.returnY = 270;
            this.returnSpeed = 12;
            GameData.ballRangle = GameData.ballBaseRangle * 5;
        }
        else if (this.returnType == 2) {
            this.returnNodePre = 0.45;
            this.returnNodeY = 100;
            this.returnX = -30;
            this.returnY = 210;
            this.returnSpeed = 10;
            GameData.ballRangle = GameData.ballBaseRangle * 3;
        }
        else if (this.returnType == 3) {
            this.returnNodePre = 0.45;
            this.returnNodeY = 50;
            this.returnX = -130;
            this.returnY = 180;
            this.returnSpeed = 10;
            GameData.ballRangle = GameData.ballBaseRangle * 2;
        }

        this.sight.x = this.returnX + 200;
        this.sight.y = this.returnY;
    }

    //检测攻击是否命中
    public checkAttack():void {
        if (this.isDie == true)return;
        if (this.sight.x - 50 < this.ball.x && this.ball.x < this.sight.x + 50) {
            if (GameData.enemyLestNum > 0 && this.isCommon == false && GameData.isEnter) {//有敌人
                if (Math.random() > 0.5) {
                    this.changeStage("attack0");
                    this.attackIndex = 0;
                }
                else {
                    this.changeStage("attack1");
                    this.attackIndex = 1;
                }
                this.changeEffect();//设置攻击特效
                GameData.ballState = "empty";
                this.ball.visible = false;
                this.sight.visible = false;
            }
            else this.common();
        }
    }
}
//游戏主角类
var Hero = (function () {
    //构造函数//初始化数据
    function Hero(target) {
        this.isDie = false; //标示hero是否死亡
        this.ballRangle = 0; //标记足球的自转角
        this.ballBaseX = 125; //足球在Hero脚底下时的Y轴坐标
        this.targetX = 700; //射击目标的X轴坐标
        this.targetY = 330; //射击目标的Y轴坐标
        this.returnNode = 0.4; //返回时切换状态所在时所占百分比
        this.nodeY = 150; //在变化的节点时的Y轴位置
        this.returnType = 0; //返回返回路径的样式
        //private returnX:number = 125;//返回目标位置的X坐标
        this.returnX = -75; //返回目标位置的X坐标
        this.returnY = 345; //返回目标位置的Y坐标
        this.returnSpeed = 10; //足球返回的速度
        this.isCommon = false; //标示是否是随便踢效果
        this.targer = target;
        this.ball = Tool.addBitmap(target, "game_ball_png", 125, 345, 30, 30, false);
        this.sight = Tool.addBitmap(target, "game_sight_png", 125, 345, 120, 100, false);
        this.ball.anchorOffsetX = this.ball.width / 2;
        this.ball.anchorOffsetY = this.ball.height / 2;
        this.sight.anchorOffsetX = this.sight.width / 2;
        this.sight.anchorOffsetY = this.sight.height / 2;
        this.run();
    }
    var d = __define,c=Hero;p=c.prototype;
    //切换攻击状态
    p.changeEffect = function () {
        this.effectComp();
        var type = "effect0";
        if (GameData.attackType == "attack0")
            type = "effect0";
        else if (GameData.attackType == "attack1")
            type = "effect1";
        var data = RES.getRes(type + "_json");
        var txtr = RES.getRes(type + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.effect = new egret.MovieClip(mcFactory.generateMovieClipData(type));
        if (this.returnType == 0) {
            this.effect.x = 80;
            this.effect.y = 265;
        }
        else if (this.returnType == 1) {
            this.effect.x = 80;
            this.effect.y = 200;
            this.effect.rotation = 4;
        }
        else if (this.returnType == 2) {
            this.effect.x = 150;
            this.effect.y = 160;
            this.effect.rotation = 12;
        }
        else if (this.returnType == 3) {
            this.effect.x = 70;
            this.effect.y = 120;
            this.effect.rotation = 16;
        }
        this.effect.play(1);
        this.targer.addChild(this.effect);
        this.targer.setChildIndex(this.ball, 99);
        this.effect.addEventListener(egret.Event.COMPLETE, this.effectComp, this);
        GameData.ballState = "shoot";
        GameData.ballSpeed = 10;
    };
    //攻击特效结束
    p.effectComp = function () {
        if (this.effect != null) {
            this.effect.removeEventListener(egret.Event.COMPLETE, this.effectComp, this);
            this.targer.removeChild(this.effect);
            this.effect = null;
            GameData.attackOver = true;
        }
    };
    //切换攻击状态
    p.changeStage = function (type) {
        if (this.isDie == true)
            return;
        GameData.attackType = type;
        GameData.attackOver = false;
        if (this.body != null) {
            this.body.removeEventListener(egret.Event.COMPLETE, this.run, this);
            this.targer.removeChild(this.body);
            this.body = null;
        }
        var data = RES.getRes(GameData.heroName + "_" + type + "_json");
        var txtr = RES.getRes(GameData.heroName + "_" + type + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.body = new egret.MovieClip(mcFactory.generateMovieClipData(type));
        if (this.returnType == 0) {
            this.body.x = 0;
            this.body.y = 250;
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
            this.body.x = 20;
            this.body.y = 175;
        }
        if (type == "die") {
            this.body.x = -10;
            this.body.y = 285;
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
            GameData.backgroundSpeed = 0;
            meiriq.CommonComponent.instance.executedHook("gameover", GameData.score, function () {
                meiriq.CommonComponent.instance.executedHook("restart");
                GameData.reset();
                UIManage.getInstance().hideGame();
                UIManage.getInstance().showGame();
            }, this);
        }
    };
    //普通踢球//即当没有敌人出现时的随便踢球
    p.common = function () {
        GameData.ballSpeed = 0;
        GameData.ballState = "shoot";
        this.isCommon = true;
        this.targetX = 350;
        this.targetY = 345;
        this.returnNode = 0.8;
        this.nodeY = 345;
        this.returnX = -75;
        this.returnY = 345;
        this.returnSpeed = 5;
        this.sight.x = this.returnX + 200;
        this.sight.y = this.returnY;
        GameData.ballRangle = GameData.ballBaseRangle * 3;
    };
    //站立状态
    p.run = function () {
        if (this.body != null) {
            this.body.removeEventListener(egret.Event.COMPLETE, this.run, this);
            this.targer.removeChild(this.body);
            this.body = null;
        }
        var data = RES.getRes(GameData.heroName + "_run_json");
        var txtr = RES.getRes(GameData.heroName + "_run_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.body = new egret.MovieClip(mcFactory.generateMovieClipData("run"));
        this.body.x = 0;
        this.body.y = 260;
        this.body.play(999);
        this.targer.addChild(this.body);
    };
    //刷新Hero的状态
    p.flash = function () {
        //足球的自转
        this.ballRangle = (GameData.ballRangle + this.ballRangle) % 360;
        this.ball.rotation = this.ballRangle;
        //判断抵达目的地，切换状态
        if (this.ball.x > this.targetX && GameData.ballState == "shoot") {
            GameData.ballState = "return";
            this.ball.x = this.targetX;
            this.sight.visible = true;
            if (this.isCommon == true)
                return;
            else if (GameData.enemyLestNum > 0)
                this.setPath(true);
            else
                this.setPath(false);
            console.log("enemyLestNum   " + GameData.enemyLestNum);
            return;
        }
        if (this.ball.x < this.returnX + 1 && GameData.ballState == "return") {
            GameData.ballRangle = GameData.ballBaseRangle;
            GameData.ballState = "empty";
            return;
        }
        if (GameData.ballState == "shoot") {
            if (this.isCommon == false)
                this.targetX = GameData.firstX;
            this.ball.x += GameData.ballSpeed * 2 + 10;
            var pre = (this.ball.x - this.ballBaseX) / (this.targetX - this.ballBaseX); //当前进度所占百分比
            this.ball.y = this.returnY + pre * (this.targetY - this.returnY); //当前Y轴应该设置的位置
        }
        else if (GameData.ballState == "return") {
            this.ball.x -= (this.targetX - this.returnX - 200) / (this.targetX - this.ballBaseX) * this.returnSpeed;
            if (this.ball.x < 30) {
                this.changeStage("die");
                return;
            }
            var pre = 1 - (this.ball.x - this.returnX - 200) / (this.targetX - this.returnX - 200); //当前进度所占百分比
            if (pre < this.returnNode) {
                var statePre = pre / this.returnNode; //在本状态中所占的百分比
                this.ball.y = this.targetY + Math.sin((2 * 3.14 * 90 * statePre) / 360) * (this.nodeY - this.targetY);
            }
            else if (pre > 0.1 + this.returnNode) {
                GameData.hadHit = false;
                var statePre = (pre - this.returnNode) / (1 - this.returnNode); //在本状态中所占的百分比
                this.ball.y = this.returnY + Math.sin((2 * 3.14 * (90 + 90 * statePre)) / 360) * (this.nodeY - this.returnY);
            }
            if (this.ball.x < 200)
                this.isCommon = false;
        }
    };
    //设置随机路径以及随机返回点
    p.setPath = function (isRamdon) {
        //随机返回路径
        if (isRamdon)
            this.returnType = Math.floor(Math.random() * 4);
        else
            this.returnType = 0;
        //this.returnType = 2;
        if (this.returnType == 0) {
            this.returnNode = 0.2;
            this.nodeY = 345;
            this.returnX = -75;
            this.returnY = 345;
            this.returnSpeed = 10;
            GameData.ballRangle = GameData.ballBaseRangle * 6;
        }
        else if (this.returnType == 1) {
            this.returnNode = 0.45;
            this.nodeY = 200;
            this.returnX = -65;
            this.returnY = 270;
            this.returnSpeed = 12;
            GameData.ballRangle = GameData.ballBaseRangle * 5;
        }
        else if (this.returnType == 2) {
            this.returnNode = 0.45;
            this.nodeY = 100;
            this.returnX = -30;
            this.returnY = 210;
            this.returnSpeed = 10;
            GameData.ballRangle = GameData.ballBaseRangle * 3;
        }
        else if (this.returnType == 3) {
            this.returnNode = 0.45;
            this.nodeY = 50;
            this.returnX = -130;
            this.returnY = 180;
            this.returnSpeed = 10;
            GameData.ballRangle = GameData.ballBaseRangle * 2;
        }
        this.sight.x = this.returnX + 200;
        this.sight.y = this.returnY;
    };
    //检测攻击是否命中
    p.checkAttack = function () {
        if (this.isDie == true)
            return;
        if (this.sight.x - 50 < this.ball.x && this.ball.x < this.sight.x + 50) {
            if (GameData.enemyLestNum > 0 && this.isCommon == false && GameData.isEnter) {
                if (this.ball.y > 250)
                    this.changeStage("attack0");
                else
                    this.changeStage("attack1");
                this.changeEffect(); //设置攻击特效
                this.sight.visible = false;
            }
            else
                this.common();
        }
    };
    return Hero;
})();
egret.registerClass(Hero,"Hero");

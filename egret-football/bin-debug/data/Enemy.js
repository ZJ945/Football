//游戏敌人类
var Enemy = (function () {
    //构造函数//初始化数据
    function Enemy(target) {
        this.name = "Enemy4"; //名字
        this.siteX = 800; //起始点的X坐标
        this.isDie = false; //标示是否已经死亡
        this.direction = "left"; //敌人的移动走向
        this.directionX = 560; //敌人的移动的X轴偏移
        this.targer = target;
        this.siteX = 800 + Math.random() * 200;
        this.directionX = 700 - Math.random() * 300;
        this.init();
        this.run();
    }
    var d = __define,c=Enemy;p=c.prototype;
    //初始化函数，对特有属性赋值
    p.init = function () {
        this.name = "Enemy" + Math.floor(Math.random() * GameData.enemyTypeNum + 1); //设置随机敌人
    };
    //移动特效
    p.run = function () {
        var data = RES.getRes(this.name + "_run_json");
        var txtr = RES.getRes(this.name + "_run_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.body = new egret.MovieClip(mcFactory.generateMovieClipData("run"));
        this.body.x = this.siteX + GameData[this.name]["run"].offsetX;
        this.body.y = GameData[this.name]["run"].offsetY;
        this.body.scaleX = GameData[this.name].scaleX;
        this.body.scaleY = GameData[this.name].scaleY;
        this.body.play(999);
        this.targer.addChild(this.body);
    };
    //Hero的移动效果
    p.flash = function () {
        if (this.siteX < 730)
            GameData.isEnter = true;
        if (this.isDie == false) {
            if (this.direction == "left") {
                this.siteX -= 2;
                this.body.x = this.siteX + GameData[this.name]["run"].offsetX;
                if (this.siteX < this.directionX) {
                    this.body.scaleX = -1;
                    this.direction = "right";
                    this.directionX = 650 + Math.random() * 80;
                    this.body.x = this.siteX + GameData[this.name]["right"].offsetX;
                }
            }
            else if (this.direction == "right") {
                this.siteX += 2;
                this.body.x = this.siteX + GameData[this.name]["right"].offsetX;
                if (this.siteX > this.directionX) {
                    this.body.scaleX = 1;
                    this.direction = "left";
                    this.directionX = 680 - (20 + Math.random() * 150);
                    this.body.x = this.siteX + GameData[this.name]["run"].offsetX;
                }
            }
        }
    };
    //死亡状态
    p.die = function () {
        GameData.isEnter = false;
        if (this.body != null) {
            this.body.removeEventListener(egret.Event.COMPLETE, this.run, this);
            this.targer.removeChild(this.body);
            this.body = null;
        }
        var data = RES.getRes(this.name + "_die_json");
        var txtr = RES.getRes(this.name + "_die_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        this.body = new egret.MovieClip(mcFactory.generateMovieClipData("die"));
        this.body.x = this.siteX + GameData[this.name]["run"].offsetX;
        this.body.y = GameData[this.name]["die"].offsetY;
        this.body.scaleX = GameData[this.name].scaleX;
        this.body.scaleY = GameData[this.name].scaleY;
        this.body.play(1);
        this.isDie = true;
        this.targer.addChild(this.body);
        this.body.addEventListener(egret.Event.COMPLETE, this.dieComp, this);
    };
    //死亡后的处理
    p.dieComp = function () {
        if (this.body != null) {
            this.body.removeEventListener(egret.Event.COMPLETE, this.run, this);
            this.targer.removeChild(this.body);
            this.body = null;
        }
    };
    //测试函数
    p.test = function () {
        if (this.direction == "left") {
            this.body.scaleX = -1;
            this.direction = "right";
            this.body.x = this.siteX + GameData[this.name]["right"].offsetX;
        }
        else if (this.direction == "right") {
            this.body.scaleX = 1;
            this.direction = "left";
            this.body.x = this.siteX + GameData[this.name]["run"].offsetX;
        }
    };
    return Enemy;
})();
egret.registerClass(Enemy,"Enemy");

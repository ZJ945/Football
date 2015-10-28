//游戏敌人类
class Enemy {
    public body:egret.MovieClip;//主体
    private targer;//保留上级容器对象
    private name:string = "Enemy4";//名字
    //private name:string = "Enemy2";//名字
    //private name:string = "Enemy3";//名字
    private isDie:boolean = false;//标示是否已经死亡
    private isDieComp:boolean = false;//标示死亡特效是否完成

    //构造函数//初始化数据
    constructor(target) {
        this.targer = target;
        this.init();
        this.run();
    }

    //初始化函数，对特有属性赋值
    public init():void {
        //this.name = "Enemy" + Math.floor(Math.random() * GameData.enemyTypeNum + 1); //设置随机敌人
    }

    //移动特效
    public run():void {
        var data = RES.getRes(this.name + "_run_json");
        var txtr = RES.getRes(this.name + "_run_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.body = new egret.MovieClip(mcFactory.generateMovieClipData("run"));
        this.body.x = GameData[this.name]["run"].offsetX;
        this.body.y = GameData[this.name]["run"].offsetY;
        this.body.scaleX = GameData[this.name].scaleX;
        this.body.scaleY = GameData[this.name].scaleY;
        this.body.play(999);
        this.targer.addChild(this.body);
    }

    //死亡状态
    public die():void {
        if (this.body != null) {
            this.body.removeEventListener(egret.Event.COMPLETE, this.run, this);
            this.targer.removeChild(this.body);
            this.body = null;
        }
        var data = RES.getRes(this.name + "_die_json");
        var txtr = RES.getRes(this.name + "_die_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.body = new egret.MovieClip(mcFactory.generateMovieClipData("die"));
        this.body.x = GameData[this.name]["die"].offsetX;
        this.body.y = GameData[this.name]["die"].offsetY;
        this.body.scaleX = GameData[this.name].scaleX;
        this.body.scaleY = GameData[this.name].scaleY;
        this.body.play(1);
        this.isDie = true;
        this.targer.addChild(this.body);
        this.body.addEventListener(egret.Event.COMPLETE, this.dieComp, this);
    }


    //死亡后的处理
    public dieComp():void {
        if (this.body != null) {
            this.body.removeEventListener(egret.Event.COMPLETE, this.run, this);
            this.targer.removeChild(this.body);
            this.body = null;
        }
        this.isDieComp = true;
    }

}
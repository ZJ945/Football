//游戏敌人类
class Enemy {
    private body:egret.MovieClip;//主体
    private add:egret.Bitmap;//获得金币标示
    private targer;//保留上级容器对象
    private name:string = "Enemy4";//名字
    public siteX:number = 800;//起始点的X坐标
    public isDie:boolean = false;//标示是否已经死亡

    public direction:string = "left";//敌人的移动走向
    public directionX:number = 560;//敌人的移动的X轴偏移

    //构造函数//初始化数据
    constructor(target) {
        this.targer = target;
        this.siteX = 800 + Math.random() * 200;
        this.directionX = 700 - Math.random() * 300;
        this.name = "Enemy" + Math.floor(Math.random() * GameData.enemyTypeNum + 1); //设置随机敌人

        this.add = Tool.addBitmap(this.targer, "game_add_png", 0, 0, 0, 0, false);
        this.add.visible = false;

        this.run();

    }

    //移动特效
    public run():void {
        var data = RES.getRes(this.name + "_run_json");
        var txtr = RES.getRes(this.name + "_run_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.body = new egret.MovieClip(mcFactory.generateMovieClipData("run"));
        this.body.x = this.siteX + GameData[this.name]["run"].offsetX;
        this.body.y = GameData[this.name]["run"].offsetY;
        this.body.scaleX = -GameData[this.name].scaleX;
        this.body.scaleY = GameData[this.name].scaleY;
        this.body.play(999);
        this.targer.addChild(this.body);
    }

    //Hero的移动效果
    public flash():void {
        if (this.siteX < 730)GameData.isEnter = true;//设置enemy进场的效果

        if (this.isDie == false) {
            if (this.direction == "left") {
                this.siteX -= 2;
                this.body.x = this.siteX + GameData[this.name]["run"].offsetX;
                if (this.siteX < this.directionX) {
                    this.body.scaleX = GameData[this.name].scaleX;
                    this.direction = "right";
                    this.directionX = 650 + Math.random() * 80;
                    this.body.x = this.siteX + GameData[this.name]["right"].offsetX;
                }
            }
            else if (this.direction == "right") {
                this.siteX += 2;
                this.body.x = this.siteX + GameData[this.name]["right"].offsetX;
                if (this.siteX > this.directionX) {
                    this.body.scaleX = -GameData[this.name].scaleX;
                    this.direction = "left";
                    this.directionX = 680 - (20 + Math.random() * 150);
                    this.body.x = this.siteX + GameData[this.name]["run"].offsetX;
                }
            }
        }
    }

    //enemy死亡函数
    public die():void {
        GameData.isEnter = false;//防止后面的也被判断为已经进入战场
        this.isDie = true;
        this.add.visible = true;
        if (this.direction == "left")this.add.x = this.body.x - 50;
        else this.add.x = this.body.x + 50;
        this.add.y = this.body.y - this.add.height;
        this.body.stop();

        GameData.score++;
        GameData.goldNum++;

        if (this.body != null) {
            var tw = egret.Tween.get(this.add);
            tw.to({alpha: 0.5, y: 250}, 500).call(function () {
                this.targer.removeChild(this.add);
                this.add = null;
            }, this);

            var tw = egret.Tween.get(this.body);
            tw.to({alpha: 0.5}, 500).call(function () {
                this.targer.removeChild(this.body);
                this.body = null;
            }, this);
        }
    }
}
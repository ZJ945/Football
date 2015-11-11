//角色选择页面
class SelectScene extends egret.DisplayObjectContainer {
    private background:egret.Bitmap;//背景
    private box:egret.Bitmap;//待选择的人物
    private people:egret.Bitmap;//待选择的人物
    private left:egret.Bitmap;//左箭头
    private right:egret.Bitmap;//右箭头
    private start:egret.Bitmap;//开始/解锁按钮
    private goldIcon:egret.Bitmap;//玩家拥有的金币图标
    private costIcon:egret.Bitmap;//解锁需要金币图标
    private text:egret.Bitmap;//解锁需要金币图标
    private text2:egret.Bitmap;//不够钱的提示

    private GoldNum:egret.BitmapText;//玩家拥有的金币数
    private CostNum:egret.BitmapText;//解锁所需金币数

    private nameList = ["Hero1", "Hero2", "Hero3"];//角色列表
    private nameIndex:number = 0;//标示当前选择的人物的下标

    constructor() {
        super();
        this.init();
    }

    public init():void {
        this.background = Tool.addBitmap(this, "select_background_png", 0, 0, 0, 0, false);
        this.goldIcon = Tool.addBitmap(this, "select_gold_png", 600, 20, 50, 50, false);
        this.box = Tool.addBitmap(this, "select_box_png", 265, 100, 300, 300, false);
        this.people = Tool.addBitmap(this, "select_Hero1_png", 300, 110, 200, 300, false);
        this.left = Tool.addBitmap(this, "select_left_png", 35, 190, 70, 80, true);
        this.right = Tool.addBitmap(this, "select_right_png", 690, 190, 70, 80, true);
        this.start = Tool.addBitmap(this, "start0_png", 275, 410, 150, 55, true);
        this.costIcon = Tool.addBitmap(this, "select_gold_png", 420, 60, 50, 50, false);
        this.text = Tool.addBitmap(this, "select_text_png", 340, 65, 70, 35, false);
        this.text2 = Tool.addBitmap(this, "select_text2_png", 323, 200, 200, 100, false);
        this.CostNum = Tool.addBitmapText(this, "number_fnt", 485, 65, 150, 50, "99999");
        this.GoldNum = Tool.addBitmapText(this, "number_fnt", 660, 28, 150, 50, "99999");

        //设置各元素的位置
        this.left.alpha = 0.5;
        this.width = GameData.gameWidth;
        this.height = GameData.gameHeight;
        this.background.width = GameData.gameWidth;
        this.background.height = GameData.gameHeight;
        this.people.x = (this.width - this.people.width) / 2;
        this.start.x = (this.width - this.start.width) / 2;
        this.GoldNum.text = GameData.goldNum + "";

        this.getRole(this.nameList[this.nameIndex]);

        this.text.visible = false;
        this.text2.visible = false;
        this.CostNum.visible = false;
        this.costIcon.visible = false;
    }

    public onTouchStart(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (e.target == this.start) {
            if (GameData.heroList[this.nameIndex] == false) this.start.texture = RES.getRes("unlock1_png");
            else this.start.texture = RES.getRes("start1_png");
        }
    }

    //点击事件的响应函数
    public onTouchEnd(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (e.target == this.left)this.onClickLeft();
        else if (e.target == this.right)this.onClickRight();
        else if (e.target == this.start)this.onClickStart();
    }

    //点击开始按钮
    public onClickStart():void {
        if (GameData.heroList[this.nameIndex] == false) {//该角色还未激活
            if (500 > GameData.goldNum) {
                this.start.texture = RES.getRes("unlock0_png");
                this.people.visible = false;
                this.text2.visible = true;
                return;
            }
            this.text.visible = false;
            this.CostNum.visible = false;
            this.costIcon.visible = false;
            GameData.goldNum -= 500;
            this.GoldNum.text = GameData.goldNum + "";
            GameData.heroList[this.nameIndex] = true;
            this.start.texture = RES.getRes("start0_png");
        }
        else {//该角色已经激活
            GameData.saveData();
            UIManage.getInstance().hideSelect();
            UIManage.getInstance().showGame();
        }
    }

    //移出消息监听
    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }

    //点击向左箭头
    public onClickLeft():void {
        if (this.left.alpha == 0.5)return;
        this.nameIndex--;
        this.getRole(this.nameList[this.nameIndex]);
        if (this.nameIndex == 0) this.left.alpha = 0.5;
        else this.left.alpha = 1;
        this.right.alpha = 1;
    }

    //点击向右箭头
    public onClickRight():void {
        if (this.right.alpha == 0.5)return;
        this.nameIndex++;
        this.getRole(this.nameList[this.nameIndex]);
        if (this.nameIndex == 2) this.right.alpha = 0.5;
        else this.right.alpha = 1;
        this.left.alpha = 1;
    }

    //获取角色信息
    public getRole(name:string):void {
        GameData.heroName = "Hero" + (this.nameIndex + 1);
        this.text2.visible = false;
        this.people.visible = true;
        this.people.texture = RES.getRes("select_" + GameData.heroName + "_png");
        console.log("this.nameIndex   " + this.nameIndex + "   " + GameData.heroList[this.nameIndex] + "   " + (GameData.heroList[this.nameIndex] == true));
        if (GameData.heroList[this.nameIndex] == true) {
            this.text.visible = false;
            this.CostNum.visible = false;
            this.costIcon.visible = false;
            this.start.texture = RES.getRes("start0_png");
        }
        else {
            this.text.visible = true;
            this.CostNum.visible = true;
            this.costIcon.visible = true;
            this.CostNum.text = "500";
            this.start.texture = RES.getRes("unlock0_png");
        }
    }

}

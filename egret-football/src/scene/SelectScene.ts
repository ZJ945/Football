//角色选择页面
class SelectScene extends egret.DisplayObjectContainer {
    private background:egret.Bitmap;//背景
    private people:egret.Bitmap;//待选择的人物
    private left:egret.Bitmap;//左箭头
    private right:egret.Bitmap;//右箭头
    private start:egret.Bitmap;//开始/解锁按钮
    private goldIcon:egret.Bitmap;//玩家拥有的金币图标
    private costIcon:egret.Bitmap;//解锁需要金币图标
    private text:egret.Bitmap;//解锁需要金币图标

    private GoldNum:egret.BitmapText;//玩家拥有的金币数
    private CostNum:egret.BitmapText;//解锁所需金币数

    private data:any;//保存从GameData中获取的人物初始数值
    private nameList = ["Hero1", "Hero2", "Hero3"];//角色列表
    private nameIndex:number = 0;//标示当前选择的人物的下标

    constructor() {
        super();
        this.init();
    }

    public init():void {
        this.background = Tool.addBitmap(this, "select_background_png", 0, 0, 0, 0, false);
        this.goldIcon = Tool.addBitmap(this, "select_gold_png", 25, 20, 50, 50, false);
        this.people = Tool.addBitmap(this, "select_Hero1_png", 0, 180, 200, 200, false);
        this.left = Tool.addBitmap(this, "select_left_png", 35, 240, 70, 80, true);
        this.right = Tool.addBitmap(this, "select_right_png", 370, 240, 70, 80, true);
        this.start = Tool.addBitmap(this, "start0_png", 275, 430, 180, 70, true);
        this.costIcon = Tool.addBitmap(this, "select_gold_png", 220, 95, 50, 50, false);
        this.text = Tool.addBitmap(this, "select_text_png", 130, 100, 80, 40, false);
        this.CostNum = Tool.addBitmapText(this, "number_fnt", 275, 102, 150, 50, "99999");
        this.GoldNum = Tool.addBitmapText(this, "number_fnt", 80, 30, 150, 50, "99999");

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
        this.CostNum.visible = false;
        this.costIcon.visible = false;
    }

    public onTouchStart(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (e.target == this.start) {
            if (this.data.activation == false) this.start.texture = RES.getRes("unlock1_png");
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
        if (this.data.activation == false) {//该角色还未激活
            if (GameData[this.nameList[this.nameIndex]].cost > GameData.goldNum) {
                this.start.texture = RES.getRes("unlock0_png");
                return;
            }
            this.text.visible = false;
            this.CostNum.visible = false;
            this.costIcon.visible = false;
            GameData.goldNum -= GameData[this.nameList[this.nameIndex]].cost;
            this.GoldNum.text = GameData.goldNum + "";
            this.data.activation = true;
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
        GameData.heroName = GameData[this.nameList[this.nameIndex]].name;
        this.data = GameData[name];
        this.people.texture = RES.getRes("select_" + this.data.name + "_png");
        if (this.data.activation == true) {
            this.text.visible = false;
            this.CostNum.visible = false;
            this.costIcon.visible = false;
            this.start.texture = RES.getRes("start0_png");
        }
        else {
            this.text.visible = true;
            this.CostNum.visible = true;
            this.costIcon.visible = true;
            this.CostNum.text = GameData[this.nameList[this.nameIndex]].cost + "";
            this.start.texture = RES.getRes("unlock0_png");
        }
    }

}

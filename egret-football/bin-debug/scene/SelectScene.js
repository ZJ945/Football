//角色选择页面
var SelectScene = (function (_super) {
    __extends(SelectScene, _super);
    function SelectScene() {
        _super.call(this);
        this.nameList = ["Hero1", "Hero2", "Hero3"]; //角色列表
        this.nameIndex = 0; //标示当前选择的人物的下标
        this.init();
    }
    var d = __define,c=SelectScene;p=c.prototype;
    p.init = function () {
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
    };
    p.onTouchStart = function (e) {
        e.stopImmediatePropagation();
        if (e.target == this.start) {
            if (GameData.heroList[this.nameIndex] == false)
                this.start.texture = RES.getRes("unlock1_png");
            else
                this.start.texture = RES.getRes("start1_png");
        }
    };
    //点击事件的响应函数
    p.onTouchEnd = function (e) {
        e.stopImmediatePropagation();
        if (e.target == this.left)
            this.onClickLeft();
        else if (e.target == this.right)
            this.onClickRight();
        else if (e.target == this.start)
            this.onClickStart();
    };
    //点击开始按钮
    p.onClickStart = function () {
        if (GameData.heroList[this.nameIndex] == false) {
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
        else {
            GameData.saveData();
            UIManage.getInstance().hideSelect();
            UIManage.getInstance().showGame();
        }
    };
    //移出消息监听
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    //点击向左箭头
    p.onClickLeft = function () {
        if (this.left.alpha == 0.5)
            return;
        this.nameIndex--;
        this.getRole(this.nameList[this.nameIndex]);
        if (this.nameIndex == 0)
            this.left.alpha = 0.5;
        else
            this.left.alpha = 1;
        this.right.alpha = 1;
    };
    //点击向右箭头
    p.onClickRight = function () {
        if (this.right.alpha == 0.5)
            return;
        this.nameIndex++;
        this.getRole(this.nameList[this.nameIndex]);
        if (this.nameIndex == 2)
            this.right.alpha = 0.5;
        else
            this.right.alpha = 1;
        this.left.alpha = 1;
    };
    //获取角色信息
    p.getRole = function (name) {
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
    };
    return SelectScene;
})(egret.DisplayObjectContainer);
egret.registerClass(SelectScene,"SelectScene");

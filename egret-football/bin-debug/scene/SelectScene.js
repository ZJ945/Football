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
    };
    p.onTouchStart = function (e) {
        e.stopImmediatePropagation();
        if (e.target == this.start) {
            if (this.data.activation == false)
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
        if (this.data.activation == false) {
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
    };
    return SelectScene;
})(egret.DisplayObjectContainer);
egret.registerClass(SelectScene,"SelectScene");

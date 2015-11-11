//��Ϸ����ҳ��
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.enemyFlashTime = 9999; //enemy���µļ�ʱ��
        this.index = 0;
        this.init();
    }
    var d = __define,c=GameScene;p=c.prototype;
    p.init = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.flashGame, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.background1 = Tool.addBitmap(this, "game_background1_png", 0, 0, 1000, 480, true);
        this.background2 = Tool.addBitmap(this, "game_background2_png", 1000, 0, 1000, 480, true);
        this.goldIcon = Tool.addBitmap(this, "select_gold_png", 600, 20, 50, 50, false);
        this.GoldNum = Tool.addBitmapText(this, "number_fnt", 660, 28, 150, 50, "99999");
        this.hero = new Hero(this);
        this.enemyArray = [];
        this.enemyArray.push(new Enemy(this));
    };
    p.flashGame = function () {
        //���ñ����Ĺ���
        this.background1.x -= GameData.backgroundSpeed + GameData.returnSpeedUp * 0.5;
        this.background2.x -= GameData.backgroundSpeed + GameData.returnSpeedUp * 0.5;
        if (this.background1.x < 0 - this.background1.width)
            this.background1.x = this.background2.x + this.background2.width;
        if (this.background2.x < 0 - this.background2.width)
            this.background2.x = this.background1.x + this.background1.width;
        //ˢ�½�����
        this.GoldNum.text = Tool.setZero(GameData.goldNum, 4);
        //ѡ����ǰ���ĵ��˽��й���
        GameData.firstX = 999;
        var index = 0;
        for (var i = 0; i < this.enemyArray.length; i++) {
            this.enemyArray[i].flash();
            if (GameData.firstX > this.enemyArray[i].siteX + 20) {
                GameData.firstX = this.enemyArray[i].siteX + 20;
                index = i;
            }
        }
        //���й�����Χ�ļ��⣬������������ǰ����enemy����������ǰ��
        if (GameData.firstX < (this.hero.ball.x + 20) && GameData.hadHit == false) {
            this.enemyArray[index].die();
            GameData.hadHit = true;
        }
        this.checkEnemy();
        this.hero.flash();
    };
    //����enemy���飬���м�ʱ������������
    p.checkEnemy = function () {
        for (var i = 0; i < this.enemyArray.length; i++) {
            if (this.enemyArray[i].isDie == true) {
                Tool.removeOne(this.enemyArray, i);
                GameData.score++;
                if (GameData.returnSpeedUp < 4)
                    GameData.returnSpeedUp += 0.1;
            }
        }
        this.enemyFlashTime++;
        if ((this.enemyFlashTime > GameData.enemyFlashSpace && this.enemyArray.length < GameData.enemyNum)) {
            this.enemyFlashTime = 0;
            var randomNum = Math.floor(Math.random() * 3) + 2;
            for (var i = 0; i < randomNum; i++)
                this.enemyArray.push(new Enemy(this));
            if (GameData.enemyFlashSpace > GameData.enemyFlashLestSpace) {
                GameData.enemyFlashSpace -= GameData.enemyFlashSpeed;
            }
        }
        GameData.enemyLestNum = this.enemyArray.length;
    };
    //��ʼ��������Ӧ����
    p.onTouchStart = function (e) {
        e.stopImmediatePropagation();
        //console.log("x   " + e.stageX + "    y    " + e.stageY)
        //this.test();
    };
    //�����¼�����Ӧ����
    p.onTouchEnd = function (e) {
        e.stopImmediatePropagation();
        this.hero.checkAttack();
    };
    //�Ƴ���ʾ��������Ӧ����
    p.onRemove = function (e) {
        if (e.target == this) {
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.flashGame, this);
        }
        else {
            e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        }
    };
    p.test = function () {
        //this.hero.changeStage("attack0");
        this.hero.changeStage("attack0");
        this.hero.changeEffect();
    };
    return GameScene;
})(egret.DisplayObjectContainer);
egret.registerClass(GameScene,"GameScene");

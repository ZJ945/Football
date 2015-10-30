//��Ϸ����ҳ��
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.enemyFlashTime = 9999; //enemy���µļ�ʱ��
        this.init();
    }
    var d = __define,c=GameScene;p=c.prototype;
    p.init = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.flashGame, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.background1 = Tool.addBitmap(this, "game_background_png", 0, 0, 1000, 480, true);
        this.background2 = Tool.addBitmap(this, "game_background_png", 1000, 0, 1000, 480, true);
        this.hero = new Hero(this);
        this.enemyArray = [];
    };
    p.flashGame = function () {
        //���ñ����Ĺ���
        this.background1.x -= GameData.backgroundSpeed;
        this.background2.x -= GameData.backgroundSpeed;
        if (this.background1.x < 0 - this.background1.width)
            this.background1.x = this.background2.x + this.background2.width;
        if (this.background2.x < 0 - this.background2.width)
            this.background2.x = this.background1.x + this.background1.width;
        //ѡ����ǰ���ĵ��˽��й���
        GameData.firstX = 999;
        var index = 0;
        for (var i = 0; i < this.enemyArray.length; i++) {
            this.enemyArray[i].flash();
            if (GameData.firstX > this.enemyArray[i].siteX) {
                GameData.firstX = this.enemyArray[i].siteX + 20;
                index = i;
            }
        }
        //���й�����Χ�ļ��⣬������������ǰ����enemy����������ǰ��
        if (GameData.firstX < (this.hero.ball.x + 20) && GameData.hadHit == false) {
            var tempEnemy = this.enemyArray[0];
            this.enemyArray[0] = this.enemyArray[index];
            this.enemyArray[index] = tempEnemy;
            this.enemyArray[0].die();
            GameData.hadHit = true;
        }
        this.checkEnemy();
        GameData.enemyLestNum = this.enemyArray.length;
        this.hero.flash();
    };
    //����enemy���飬���м�ʱ������������
    p.checkEnemy = function () {
        for (var i = 0; i < this.enemyArray.length; i++) {
            if (this.enemyArray[i].isDie == true) {
                Tool.removeOne(this.enemyArray, i);
                GameData.score++;
            }
        }
        this.enemyFlashTime++;
        if ((this.enemyFlashTime > GameData.enemyFlashSpace && this.enemyArray.length < GameData.enemyNum)) {
            this.enemyFlashTime = 0;
            var randomNum = Math.floor(Math.random() * 3) + 2;
            for (var i = 0; i < randomNum; i++) {
                var temp = new Enemy(this);
                this.enemyArray.push(temp); //�ӿ�ˢ���ٶ�
            }
            if (GameData.enemyFlashSpace > GameData.enemyFlashLestSpace) {
                GameData.enemyFlashSpace -= GameData.enemyFlashSpeed;
            }
        }
    };
    //��ʼ��������Ӧ����
    p.onTouchStart = function (e) {
        e.stopImmediatePropagation();
    };
    //�����¼�����Ӧ����
    p.onTouchEnd = function (e) {
        e.stopImmediatePropagation();
        this.hero.checkAttack();
        //this.enemyArray[0].test();
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
    return GameScene;
})(egret.DisplayObjectContainer);
egret.registerClass(GameScene,"GameScene");

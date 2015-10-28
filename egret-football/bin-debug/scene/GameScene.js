//��Ϸ����ҳ��
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=GameScene;p=c.prototype;
    p.init = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.flashGame, this);
        this.background = Tool.addBitmap(this, "game_background_png", 0, 0, 800, 480, true);
        this.hero = new Hero(this);
        this.enemy = new Enemy(this);
    };
    p.flashGame = function () {
        //this.hero.flash();
    };
    //��ʼ��������Ӧ����
    p.onTouchStart = function (e) {
        e.stopImmediatePropagation();
    };
    //�����¼�����Ӧ����
    p.onTouchEnd = function (e) {
        e.stopImmediatePropagation();
        this.hero.checkAttack();
        //this.enemy.die();
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

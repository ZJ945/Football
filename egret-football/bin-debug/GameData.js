//游戏数据类
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData;p=c.prototype;
    //重置参数
    GameData.reset = function () {
        GameData.ballRangle = 5; //足球的自转速度
        GameData.ballBaseRangle = 5; //足球的自转速度
        GameData.ballSpeed = 10; //足球的前进速度,档次分别是0~10
        GameData.ballState = "empty"; //足球当状态
        GameData.attackOver = true; //标示攻击是否完成，能否进行第二次攻击
        GameData.hadHit = false; //标示该次踢球是否已经命中目标
        GameData.score = 0;
        GameData.goldChance = 0.5; //获取金币的概率
        GameData.enemyNum = 2; //共设4个敌人
        GameData.enemyTypeNum = 2; //敌人的类型数量
        GameData.enemyFlashSpeed = 10; //刷新加快的步长
        GameData.enemyFlashSpace = 500; //刷新敌人的时间间隔
        GameData.enemyFlashLestSpace = 200; //最快刷新敌人的时间间隔
        GameData.firstX = 999; //标示距离Hero最近的enemy的X坐标
        GameData.enemyLestNum = 0; //标示还存活的敌人数量
        GameData.isEnter = false; //标示是否有enemy完成进入战区
        GameData.returnSpeedUp = -1;
        GameData.backgroundSpeed = 3;
    };
    //加载数据
    GameData.loadData = function () {
        console.log("loadData");
        var nameList = ["Hero1", "Hero2", "Hero3"]; //角色列表.
        for (var i = 0; i < nameList.length; i++) {
            if (Tool.checkLocal(nameList[i])) {
                if (Tool.getLocal(nameList[i]) == "true")
                    GameData.heroList[i] = true;
                else
                    GameData.heroList[i] = false;
            }
        }
        GameData.goldNum = Tool.getLocal("goldNum");
        if (GameData.goldNum == null)
            GameData.goldNum = 0;
    };
    //保存数据//角色数据//基本数据（金币数）
    GameData.saveData = function () {
        console.log("saveData");
        var nameList = ["Hero1", "Hero2", "Hero3"]; //角色列表.
        for (var i = 0; i < nameList.length; i++)
            Tool.setLocal(nameList[i], GameData.heroList[i]);
        Tool.setLocal("goldNum", GameData.goldNum);
    };
    GameData.gameWidth = 800;
    GameData.gameHeight = 480;
    GameData.scaleSmall = 1;
    GameData.heroName = "Hero1";
    GameData.heroList = [true, false, false]; //角色是否解锁
    GameData.ballRangle = 5; //足球的当前自转速度
    GameData.ballBaseRangle = 5; //足球的基本自转速度
    GameData.ballSpeed = 10; //足球的前进速度,档次分别是0~10
    GameData.ballState = "empty"; //足球当状态
    GameData.attackOver = true; //标示攻击是否完成，能否进行第二次攻击
    GameData.hadHit = false; //标示该次踢球是否已经命中目标
    GameData.score = 0;
    GameData.goldNum = 0;
    GameData.goldChance = 0.5; //获取金币的概率
    GameData.enemyNum = 6; //共设4个敌人
    GameData.enemyTypeNum = 4; //敌人的类型数量
    GameData.enemyFlashSpeed = 10; //刷新加快的步长
    GameData.enemyFlashSpace = 500; //刷新敌人的时间间隔
    GameData.enemyFlashLestSpace = 200; //最快刷新敌人的时间间隔
    GameData.firstX = 999; //标示距离Hero最近的enemy的X坐标
    GameData.enemyLestNum = 0; //标示还存活的敌人数量
    GameData.isEnter = false; //标示是否有enemy完成进入战区
    GameData.returnSpeedUp = 0; //用于加快足球返回的速度，用于增加难度
    GameData.backgroundSpeed = 3;
    GameData.Hero = {
        "activation": true,
        "name": "Hero1",
        "cost": 300,
        "offsetX": -30,
        "offsetY": 125,
        "scale": 0.5,
        "attackScale": 0.25,
        "effect0Scale": 1.5,
        "effect1Scale": 1.5,
    };
    GameData.Enemy1 = {
        "name": "Enemy1",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "run": {
            offsetX: 130,
            offsetY: 300
        },
        "right": {
            offsetX: 40,
            offsetY: 300
        }
    };
    GameData.Enemy2 = {
        "name": "Enemy2",
        "scaleX": 0.5,
        "scaleY": 0.5,
        "run": {
            offsetX: 130,
            offsetY: 290
        },
        "right": {
            offsetX: 40,
            offsetY: 290
        }
    };
    return GameData;
})();
egret.registerClass(GameData,"GameData");

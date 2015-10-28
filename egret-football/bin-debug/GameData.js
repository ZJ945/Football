//游戏数据类
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData;p=c.prototype;
    //重置参数
    GameData.reset = function () {
    };
    //加载数据
    GameData.loadData = function () {
        var nameList = ["Hero1", "Hero2", "Hero3"]; //角色列表.
        for (var i = 0; i < nameList.length; i++) {
            if (Tool.checkLocal(nameList[i])) {
                GameData[nameList[i]] = JSON.parse(Tool.getLocal(nameList[i]));
            }
        }
        GameData.goldNum = Tool.getLocal("goldNum");
        if (GameData.goldNum == null)
            GameData.goldNum = 0;
    };
    //保存数据//角色数据//基本数据（金币数）
    GameData.saveData = function () {
        var nameList = ["Hero1", "Hero2", "Hero3"]; //角色列表.
        for (var i = 0; i < nameList.length; i++)
            Tool.setLocal(nameList[i], JSON.stringify(GameData[nameList[i]]));
        Tool.setLocal("goldNum", GameData.goldNum);
    };
    GameData.gameWidth = 800;
    GameData.gameHeight = 480;
    GameData.scaleSmall = 1;
    GameData.gameOver = false; //标示游戏结束
    GameData.heroName = "Hero1";
    GameData.ballRangle = 5; //足球的自转速度
    GameData.ballSpeed = 0; //足球的前进速度,档次分别是0~10
    GameData.ballDirection = "right"; //足球的移动方向
    GameData.attackType = ""; //Hero攻击的类型
    GameData.attackOver = true; //标示攻击是否完成，能否进行第二次攻击
    GameData.score = 0;
    GameData.goldNum = 0;
    GameData.goldChance = 0.5; //获取金币的概率
    GameData.enemyTypeNum = 1;
    GameData.Hero1 = {
        "activation": true,
        "name": "Hero1",
        "cost": 300,
        "offsetX": -30,
        "offsetY": 125,
        "scale": 0.8,
    };
    GameData.Hero2 = {
        "activation": false,
        "name": "Hero2",
        "cost": 300,
        "offsetX": -30,
        "offsetY": 135,
        "scale": 0.8,
    };
    GameData.Hero3 = {
        "activation": false,
        "name": "Hero3",
        "cost": 300,
        "offsetX": -60,
        "offsetY": 135,
        "scale": 0.8,
    };
    GameData.Enemy1 = {
        "name": "Enemy1",
        "scaleX": 1,
        "scaleY": 1,
        "run": {
            offsetX: 700,
            offsetY: 300
        },
        "die": {
            offsetX: 700,
            offsetY: 300
        }
    };
    GameData.Enemy2 = {
        "name": "Enemy2",
        "scaleX": 1,
        "scaleY": 1,
        "run": {
            offsetX: 700,
            offsetY: 290
        },
        "die": {
            offsetX: 710,
            offsetY: 295
        }
    };
    GameData.Enemy3 = {
        "name": "Enemy3",
        "scaleX": 1,
        "scaleY": 1,
        "run": {
            offsetX: 680,
            offsetY: 285
        },
        "die": {
            offsetX: 680,
            offsetY: 260
        }
    };
    GameData.Enemy4 = {
        "name": "Enemy4",
        "scaleX": 1,
        "scaleY": 1,
        "run": {
            offsetX: 660,
            offsetY: 290
        },
        "die": {
            offsetX: 660,
            offsetY: 265
        }
    };
    return GameData;
})();
egret.registerClass(GameData,"GameData");

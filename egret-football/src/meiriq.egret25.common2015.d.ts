declare module meiriq {
    class InterFace {
        static home: string;
        static pause: string;
        static resume: string;
        static orientStart: string;
        static orientPause: string;
        static orientResume: string;
    }
    class Hook {
        static start: string;
        static gameover: string;
        static levelwin: string;
        static share: string;
        static more: string;
        static restart: string;
    }
    class CommonComponent {
        private static _instance;
        static stage: egret.Stage;
        static instance: CommonComponent;
        private static _config;
        static config: any;
        interface: any;
        private common;
        constructor();
        private _opt;
        private _hasinit;
        init(name: string, stage: egret.Stage): void;
        private loader;
        private onfinshload;
        load(finish: Function, thisObject: any, groups?: string[], resourcejson?: string): void;
        private startcb;
        customExeHook(hook: string, fn?: Function): void;
        private exehook;
        executedHook(exe: string, ...param: any[]): void;
        implementsInterFace(name: string, fn: Function, thisObject?: any): void;
        /**
         * GameData
         * @type {{hightScore: number, hightLevel: number}}
         */
        private _gameData;
        gameData: {
            name: boolean;
            resourceCDN: string;
            permitStart: number;
            buttonLayout: Array<any>;
            overModal: (texture?: egret.Texture) => {};
            updateHighLevel: any;
            updateHighScore: any;
        };
        private getInitlizeGameData();
        /**
         * 兼容旧接口
         *
         * @returns {{}}
         * @param gamedata => config.gameData
         * @param cb_hooks
         * @param exe_hooks
         */
        config_common(gamedata?: any, cb_hooks?: any, exe_hooks?: any): any;
    }
}
declare module meiriq {
    function stageWidth(multiple?: number): number;
    function stageHeight(multiple?: number): number;
    function stage(): egret.Stage;
    function stageW2H(): number;
    function context(): egret.MainContext;
}

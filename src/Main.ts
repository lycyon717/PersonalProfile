//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {

        var sky: egret.Bitmap = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        var sky2: egret.Bitmap = this.createBitmapByName("bg2_jpg");
        this.addChild(sky2);
        sky2.width = stageW;
        sky2.height = stageH;
        sky2.y = sky.height;

        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        var topMask2 = new egret.Shape();
        topMask2.graphics.beginFill(0x000000, 0.5);
        topMask2.graphics.drawRect(0, 0, 172, 1014);
        topMask2.graphics.endFill();
        topMask2.y = 1113;
        this.addChild(topMask2);

        var icon: egret.Bitmap = this.createBitmapByName("001_png");
        this.addChild(icon);
        icon.width = 172;
        icon.height = 172;
        icon.x = 0;
        icon.y = 33;

        var Myshapemask = new egret.Shape();
        Myshapemask.graphics.beginFill(0x000000, 0.7);
        Myshapemask.graphics.drawRect(0, 0, stageW, stageH - 238);
        Myshapemask.graphics.endFill();
        Myshapemask.y = 205;
        this.addChild(Myshapemask);

        var Myshapemask2 = new egret.Shape();
        Myshapemask2.graphics.beginFill(0x000000, 0.7);
        Myshapemask2.graphics.drawRect(0, 0, stageW - 172, 1014);
        Myshapemask2.graphics.endFill();
        Myshapemask2.y = 1113;
        Myshapemask2.x = 172;

        var snow: egret.Bitmap = this.createBitmapByName("snow_png");
        this.addChild(snow);
        snow.width = 172;
        snow.height = 172;
        snow.x = 0;
        snow.y = 0;

        this.addChild(Myshapemask2);

        this.Twistandmovedown(snow);
        this.MovePages(2, this);                                          //翻页函数。传入总页数和舞台。


        /*        var distance: egret.Point = new egret.Point();                 不能扩展
                sky.touchEnabled = true;
        
                sky.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
                    distance.x = e.stageX;
                    distance.y = e.stageY;
                    sky.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
                        this.y = e.stageY - distance.y;
                        sky.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
                            if (this.y <= -300) {
                                egret.Tween.get(this).to({ y: -1080 }, 600, egret.Ease.backOut);
                            }
                            else {
                                egret.Tween.get(this).to({ y: 0 }, 600, egret.Ease.backOut);
                            }
    
                        }, this);
                    }, this);
                }, this);
        
                sky2.touchEnabled = true;
                sky2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
                    distance.x = e.stageX;
                    distance.y = e.stageY;
                    sky2.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
                        this.y = -1080 + e.stageY - distance.y;
                        sky2.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
                            if (this.y >= -780) {
                                egret.Tween.get(this).to({ y: 0 }, 600, egret.Ease.backOut);
                            }
                            else {
                                egret.Tween.get(this).to({ y: -1080 }, 600, egret.Ease.backOut);
                            }
                        }, this);
                    }, this);
                }, this);


        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);

        var icon2: egret.Bitmap = this.createBitmapByName("002_jpg");
        this.addChild(icon2);
        icon2.width = 500;
        icon2.height = 800;
        icon2.x = 30;
        icon2.y = 230;
*/

        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "『Personal Profile』";
        colorLabel.size = 50;
        colorLabel.fontFamily = "SimHei"
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        var colorLabel2 = new egret.TextField();
        colorLabel2.textColor = 0xffffff;
        colorLabel2.width = stageW - 172;
        colorLabel2.textAlign = "center";
        colorLabel2.text = "目标职位： Java程序员  Java WEB 开发人员 JavaEE 软件开发人员";
        colorLabel2.size = 40;
        colorLabel2.fontFamily = "SimHei"
        colorLabel2.x = 100;
        colorLabel2.y = 300;
        this.addChild(colorLabel2);

        var colorLabel3 = new egret.TextField();
        colorLabel3.textColor = 0xffffff;
        colorLabel3.width = stageW - 172;
        colorLabel3.text = "工作性质： 全  职";
        colorLabel3.size = 40;
        colorLabel3.fontFamily = "SimHei"
        colorLabel3.x = 377;
        colorLabel3.y = 370;
        this.addChild(colorLabel3);

        var colorLabel4 = new egret.TextField();
        colorLabel4.textColor = 0xffffff;
        colorLabel4.width = stageW - 172;
        colorLabel4.text = "求职地点： 北京市";
        colorLabel4.size = 40;
        colorLabel4.fontFamily = "SimHei"
        colorLabel4.x = 377;
        colorLabel4.y = 440;
        this.addChild(colorLabel4);

        var colorLabel5 = new egret.TextField();
        colorLabel5.textColor = 0xffffff;
        colorLabel5.width = stageW - 172;
        colorLabel5.text = "薪资要求： 面  议";
        colorLabel5.size = 40;
        colorLabel5.fontFamily = "SimHei"
        colorLabel5.x = 377;
        colorLabel5.y = 510;
        this.addChild(colorLabel5);

        var colorLabel6 = new egret.TextField();
        colorLabel6.textColor = 0xffffff;
        colorLabel6.width = stageW - 172;
        colorLabel6.text = "所学专业： 数字媒体技术";
        colorLabel6.size = 40;
        colorLabel6.fontFamily = "SimHei"
        colorLabel6.x = 377;
        colorLabel6.y = 580;
        this.addChild(colorLabel6);

        var colorLabel7 = new egret.TextField();
        colorLabel7.textColor = 0xffffff;
        colorLabel7.width = stageW - 172;
        colorLabel7.text = "毕业院校： 北京工业大学";
        colorLabel7.size = 40;
        colorLabel7.fontFamily = "SimHei"
        colorLabel7.x = 377;
        colorLabel7.y = 650;
        this.addChild(colorLabel7);

        var colorLabel8 = new egret.TextField();
        colorLabel8.textColor = 0xffffff;
        colorLabel8.width = stageW - 172;
        colorLabel8.text = "E-mail： 420197665@qq.com";
        colorLabel8.size = 40;
        colorLabel8.fontFamily = "SimHei"
        colorLabel8.x = 380;
        colorLabel8.y = 720;
        this.addChild(colorLabel8);

        var _txInfo = new egret.TextField();
        _txInfo.textColor = 0xffffff;
        _txInfo.size = 40;
        _txInfo.fontFamily = "SimHei"
        _txInfo.x = 280;
        _txInfo.y = 1200;
        _txInfo.lineSpacing = 60;
        this.addChild(_txInfo);
        var isComplete = true;

        Myshapemask2.touchEnabled = true;
        Myshapemask2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            if (isComplete){
                isComplete = false;
                this.typerEffect(_txInfo, "1. 熟练掌握JavaSE技术基础，熟练应用泛型集合，IO流，多线程，Swing反射等技术。\n2. 熟悉B/S软件架构 基于多层的JavaEE开发体系结构，熟悉面向对象分析与设计。\n3. 应用过前台开发的技术有： HTML CSS+DIV 进行页面布局，使用JavaScript动态生成控件。\n4. 掌握Apache Tomcat等主流应用服务器，熟悉并能在Windows操作系统上部署B/S项目。\n......", 50);
            }
        }, this); 
        
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 30;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 150;
        this.textfield = textfield;  

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
    }


    /*private FilterChange(result: any):void{
         var blurFliter = new egret.BlurFilter( 0 , 0);
         
         var change: Function = function () {
            var tw = egret.Tween.get(blurFliter);
            tw.to({ blurX:1,blurY:1  }, 200, function A(){result.filters=[blurFliter];});
            tw.wait(2000);
            tw.to({ blurX:0,blurY:0  }, 200, function A(){result.filters=[blurFliter];});
            tw.call(change, result);
        };
        change();
    }*/

    private MovePages(PagesNum: number, Allthings: any): void {
        var distance: egret.Point = new egret.Point();
        var nowpages = 0;
        Allthings.touchEnabled = true;

        Allthings.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
            distance.x = e.stageX;
            distance.y = e.stageY;
            Allthings.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
                Allthings.y = nowpages * -1080 + e.stageY - distance.y;
                Allthings.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
                    if (distance.y - e.stageY >= 300 && nowpages < PagesNum - 1) {
                        nowpages++;
                        egret.Tween.get(Allthings).to({ y: nowpages * -1080 }, 600, egret.Ease.backOut);
                    }
                    else if (distance.y - e.stageY <= -300 && nowpages > 0) {
                        nowpages--;
                        egret.Tween.get(Allthings).to({ y: nowpages * -1080 }, 600, egret.Ease.backOut);
                    }
                    else {
                        egret.Tween.get(Allthings).to({ y: nowpages * -1080 }, 600, egret.Ease.backOut);
                    }
                }, this);
            }, this);
        }, this);
    }

    private typerEffect(obj,content:string = "",interval:number = 200):void{
        var strArr:Array<any> = content.split("");
        var len:number = strArr.length;
        for (var i = 0; i < len; i++){
            egret.setTimeout(function () {              
                obj.appendText(strArr[Number(this)]);
            }, i, interval*i);              
        }
    }

    private Twistandmovedown(YourPic: egret.Bitmap):void {
        var tween = egret.Tween.get(YourPic,{loop:true});
        tween.to({y:1988},10000).to({y:0},10000);
    }

    /**
       * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
       * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
       */
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        var self: any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr: Array<Array<egret.ITextElement>> = [];
        for (var i: number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change: Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield: egret.TextField, textFlow: Array<egret.ITextElement>): void {
        textfield.textFlow = textFlow;
    }
}



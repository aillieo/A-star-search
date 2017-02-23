/**
 * Created by aillieo on 17/1/3.
 */



var LayerBlocks = cc.Layer.extend({
    _basePoint:null,
    _snake:[],
    _dirction:0, // 0 up ; 1 right ; 2 down ; 3 left
    ctor:function () {


        this._super();

        var self= this;
        var size = cc.winSize;
        
        self.initSnake();



        var operationListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target : self,
            eventName: "OPERATION",
            callback: self.handleOperation
        });
        cc.eventManager.addListener(operationListener,self);

        //cc.eventManager.dispatchCustomEvent("ENABLE_TOUCH");

        this.scheduleUpdate();

        return true;
    },


    initSnake:function(){


        var self = this;

        var size = cc.winSize;
        var itemWidth = GlobalPara.blockWidth;



        var px = 0.5* (size.width - GlobalPara.columns * itemWidth - (GlobalPara.columns - 1)* GlobalPara.blockGap) + 0.5*itemWidth;
        var py = 0.5* (size.height - GlobalPara.rows * itemWidth - (GlobalPara.rows - 1)* GlobalPara.blockGap) + 0.5*itemWidth;
        self._basePoint = cc.p(px,py);


        var matrixHeight = (itemWidth+GlobalPara.blockGap)*GlobalPara.rows;
        self._upperDisplayBound = py + matrixHeight + 0*itemWidth;

        self._blocks = new Array(GlobalPara.columns * GlobalPara.rows);

        if(GlobalPara.rows < 4 || GlobalPara.columns < 1)
        {
            return;
        }

        var c = GlobalPara.columns - 1;
        if (c%2 == 0)
        {
            c = c/2;
        }
        else
        {
            c = (c + 1)/2;
        }
        for(var r = 0; r< 3; r++) {

                self.createBlock(r,c);

        }



    },

    createBlock:function(row,col) {

        var self = this;

        var block = new BlockElement();
        block.setRow(row);
        block.setCol(col);
        
        self.addChild(block);
        self._snake.unshift(block);

        block.setPosition( self.getPositionByDim(row,col));
        
    },

    getPositionByDim:function(row,col) {

        //return cc.p(350,450);
        var width = GlobalPara.blockWidth;
        var self = this;
        var x = self._basePoint.x + col*(width + GlobalPara.blockGap);
        var y = self._basePoint.y + row*(width + GlobalPara.blockGap);
        return cc.p(x,y);

    },


    update: function(delta) {
    
    
    },

    handleOperation:function(event){


        var self = event.getCurrentTarget();

        var dat = event.getUserData();

        var p = dat.pt;
        var dir = dat.dir;



        if((dir == self._direction)||(Math.abs(dir - self._direction)==2))
        {
            return;
        }
        
        self._direction = dir;
        
        cc.log(dir);

    }



});




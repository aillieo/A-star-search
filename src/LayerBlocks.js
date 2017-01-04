/**
 * Created by aillieo on 17/1/3.
 */



var LayerBlocks = cc.Layer.extend({
    _basePoint:null,
    _blocks:[],
    ctor:function () {


        this._super();

        var self= this;
        var size = cc.winSize;

        var bg = new cc.Sprite(res.HelloWorld_png);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        self.addChild(bg, -1);
        
        self.initMatrix();
        
        
        
        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            target : self,
            onTouchBegan: self.onTouchBegan
        });
        cc.eventManager.addListener(touchListener,self);


    
        return true;
    },


    initMatrix:function(){


        var self = this;

        var size = cc.winSize;
        var itemWidth = GlobalPara.blockWidth;



        var px = 0.5* (size.width - GlobalPara.columns * itemWidth - (GlobalPara.columns - 1)* GlobalPara.blockGap) + 0.5*itemWidth;
        var py = 0.5* (size.height - GlobalPara.rows * itemWidth - (GlobalPara.rows - 1)* GlobalPara.blockGap) + 0.5*itemWidth;
        self._basePoint = cc.p(px,py);


        var matrixHeight = (itemWidth+GlobalPara.blockGap)*GlobalPara.rows;
        self._upperDisplayBound = py + matrixHeight + 0*itemWidth;

        self._blocks = new Array(GlobalPara.columns * GlobalPara.rows);

        for(var r = 0; r<GlobalPara.rows; r++) {

            for(var c = 0; c<GlobalPara.columns; c++){

                self.createBlock(r,c);

            }

        }



    },

    createBlock:function(row,col) {

        var self = this;

        var block = new BlockElement();
        block.setRow(row);
        block.setCol(col);
        
        self.addChild(block);
        self._blocks[row * GlobalPara.columns + col]=block;

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


    getBlockContainingPoint : function (p) {



        var self = this;

        var length = self._blocks.length;
        for (var i =0 ; i<length ;i++){
            if(cc.rectContainsPoint(this._blocks[i].getBoundingBox(),p)){


                return this._blocks[i];
            }
        }





    },
    
    
    onTouchBegan:function(touch , event){


        var self = event.getCurrentTarget();


        cc.log("touch began");

        var pt = touch.getLocation();

        self.getBlockContainingPoint(pt).toggleTypeIndex();

        return true;

    }


});




/**
 * Created by aillieo on 17/2/16.
 */



var LayerBackground = cc.Layer.extend({
    _basePoint:null,
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
        self._upperDisplayBound = py + matrixHeight + 0 * itemWidth;

        self._blocks = new Array(GlobalPara.columns * GlobalPara.rows);

        for(var r = 0; r<GlobalPara.rows; r++) {

            for(var c = 0; c<GlobalPara.columns; c++){

                self.createBlock(r,c);

            }

        }



    },

    createBlock:function(row,col) {

        var self = this;

        var block = new cc.Sprite(res.blank);
        

        self.addChild(block);
        //self._blocks[row * GlobalPara.columns + col]=block;
        block.setColor(cc.color(98,98,98));
        var wid = GlobalPara.blockWidth;
        block.setTextureRect(cc.rect(0,0,wid,wid));
        block.setPosition( self.getPositionByDim(row,col));

    },

    getPositionByDim:function(row,col) {
        
        var width = GlobalPara.blockWidth;
        var self = this;
        var x = self._basePoint.x + col*(width + GlobalPara.blockGap);
        var y = self._basePoint.y + row*(width + GlobalPara.blockGap);
        return cc.p(x,y);

    }

});




/**
 * Created by aillieo on 17/1/3.
 */


var BlockElement = cc.Sprite.extend({
    _pos_col:0,
    _pos_row:0,
    _next_block:null,
    _next_pos:null,
    ctor:function () {

        this._super();

        var self = this;
        //self.setCascadeOpacityEnabled(true);
        self.setTexture(res.blank);
        self.setColor(cc.color(10,10,60));
        var wid = GlobalPara.blockWidth;
        self.setTextureRect(cc.rect(0,0,wid,wid));

        self._next_pos = cc.p(0,0);

        return true;
    },

    getCol : function () {

        return this._pos_col;
    },

    getRow : function () {

        return this._pos_row;

    },


    setRow : function (row) {

        this._pos_row = row;
    },

    setCol : function (col) {

        this._pos_col = col;
    },
    
    setNextBlock : function ( blk ) {
        
        this._next_block = blk;
    },
    
    preMove : function () {

        var self = this;
        //cc.log("p1",self.y,self._next_block.y,self._next_pos.y);
        self._next_pos.x  = self._next_block.getPositionX();
        self._next_pos.y  = self._next_block.getPositionY();
        //cc.log("p2",self.y,self._next_block.y,self._next_pos.y);
    },
    
    move : function () {

        var self = this;
        //cc.log("m1",self.y,self._next_block.y,self._next_pos.y);
        self.setPosition(self._next_pos);
        //cc.log("m2",self.y,self._next_block.y,self._next_pos.y);
    }


});

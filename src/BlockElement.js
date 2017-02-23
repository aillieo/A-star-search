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
        
        this._next_pos = this._next_block.getPosition();
    },
    
    move : function () {
    
        var self = this;
        self.setPosition(self._next_pos);
    }


});

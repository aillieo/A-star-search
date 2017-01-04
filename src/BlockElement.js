/**
 * Created by aillieo on 17/1/3.
 */


var BlockElement = cc.Sprite.extend({
    _pos_col:0,
    _pos_row:0,
    _typeIndex:0,
    ctor:function () {

        this._super();

        var self = this;
        self.setCascadeOpacityEnabled(true);
        self.setTexture(res.blank);
        self.setColor(cc.color(98,98,98));
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

    getTypeIndex:function () {

        return this._typeIndex;
    },

    setRow : function (row) {

        this._pos_row = row;
    },

    setCol : function (col) {

        this._pos_col = col;
    },
    
    setTypeIndex : function(typeIndex) {
    
        if(typeIndex<0 || typeIndex>= GlobalPara.blockTypes){
            return;
        }
        
        var self = this;
        self._typeIndex = typeIndex;
        switch (typeIndex) {
        case 0:
            self.setColor(cc.color(98,98,98));
            break;
        case 1:
            self.setColor(cc.color(255,98,98));
            break;
        case 2:
            self.setColor(cc.color(98,255,98));
            break;
        case 3:
            self.setColor(cc.color(98,98,255));
            break;
        case 4:
            self.setColor(cc.color(255,255,255));
            break;
            
        }
    },
    
    toggleTypeIndex : function() {
        
        var self = this;
        if(self._typeIndex == GlobalPara.blockTypes - 1 ){
        
            self.setTypeIndex(0);
        }
        else {
        
            self.setTypeIndex(self._typeIndex + 1);
        }
        
    }


});

/**
 * Created by aillieo on 17/1/3.
 */



var LayerBlocks = cc.Layer.extend({
    _basePoint:null,
    _snake:[],
    _direction:0, // 0 up ; 1 right ; 2 down ; 3 left
    _timer : 0,
    _food : null,
    ctor:function () {


        this._super();

        var self= this;
        var size = cc.winSize;
        
        self.initSnake();

        self.initFood();


        if(GlobalPara.enableAI) {

        }
        else {

            var operationListener = cc.EventListener.create({
                event: cc.EventListener.CUSTOM,
                target: self,
                eventName: "OPERATION",
                callback: self.handleOperation
            });
            cc.eventManager.addListener(operationListener, self);

            //cc.eventManager.dispatchCustomEvent("ENABLE_TOUCH");
        }
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
        for(var r = 2; r >= 0; r--) {

            self.createBlock(r,c);

        }



    },

    createBlock:function(row,col) {

        var self = this;

        var block = new BlockElement();
        block.setRow(row);
        block.setCol(col);

        self.addChild(block);

        block.setPosition(self.getPositionByDim(row, col));

        var len = self._snake.length ;
        if (len > 0) {
            block.setNextBlock(self._snake[0]);
        }

        self._snake.unshift(block);
    },

    getPositionByDim:function(row,col) {

        //return cc.p(350,450);
        var width = GlobalPara.blockWidth;
        var self = this;
        var x = self._basePoint.x + col*(width + GlobalPara.blockGap);
        var y = self._basePoint.y + row*(width + GlobalPara.blockGap);
        return cc.p(x,y);

    },

    initFood : function () {

        var wid = GlobalPara.blockWidth;
        var self = this;
        this._food = new cc.Sprite(res.blank);
        this._food.setTextureRect(cc.rect(0,0,wid,wid));
        this._food.setPosition(self.getPositionByDim(0,0));

        self.addChild(self._food);

        self.moveFood();

    },

    checkSnakeHead : function () {

        var self = this;
        var len = self._snake.length ;

        var move_x = 0;
        var move_y = 0;
        var moveDis = GlobalPara.blockWidth + GlobalPara.blockGap;
        switch (this._direction)
        {
            case 0:
                move_y = moveDis;
                break;
            case 1:
                move_x = moveDis;
                break;
            case 2:
                move_y = - moveDis;
                break;
            case 3:
                move_x = - moveDis;
                break;
        }

        var current_pos = self._snake[len-1].getPosition();
        var next_pos = cc.p(current_pos.x+move_x , current_pos.y + move_y);


        // four bounds
        if((next_pos.x > self._basePoint.x + GlobalPara.columns*(GlobalPara.blockGap + GlobalPara.blockWidth))
            ||(next_pos.x < self._basePoint.x)
            ||(next_pos.y > self._basePoint.y + GlobalPara.rows*(GlobalPara.blockGap + GlobalPara.blockWidth))
            ||(next_pos.y < self._basePoint.y))
        {
            self.onGameOver();
            return false;
        }


        // snake body
        for(var i = 0 ; i<len -1 ; i++)
        {
            if(self._snake[i].getPosition() == next_pos)
            {
                self.onGameOver();
                return false;
            }
        }


        // catch food
        if((next_pos.x == self._food.x) && (next_pos.y == self._food.y))
        {
            //cc.log("catch food");

            self.snakeGrow();
            self.moveFood();

            return false;
        }





        self._snake[len-1].setPosition(next_pos);
        return true;


    },

    update: function(delta) {

        var self = this;
        if(!self.moveTimer( delta))
        {
            return;
        }


        var len = self._snake.length ;


        for(var i = 0 ; i < len-1 ;i++)
        {
            self._snake[i].preMove();
        }

        if(self.checkSnakeHead())
        {
            for(var j = 0 ; j < len-1 ;j++)
            {
                self._snake[j].move();
            }
        }


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
        
        //cc.log(dir);

    },


    moveTimer : function (delta){

        var self = this;
        self._timer += delta;
        if(self._timer > GlobalPara.moveInterval)
        {
            self._timer -= GlobalPara.moveInterval;
            return true;
        }
        return false;

    },
    
    
    onGameOver : function () {

        this.unscheduleUpdate();
        cc.log("GAME OVER");

    },
    
    moveFood : function () {

        var col_offset = Math.floor(cc.random0To1() * GlobalPara.columns);
        var row_offset = Math.floor(cc.random0To1() * GlobalPara.rows);

        var self = this;
        var len = self._snake.length;

        var pos = cc.p(0,0);
        for(var c = col_offset ; c < GlobalPara.columns ; c++)
        {
            if(c == GlobalPara.columns -1) {
                c = 0;
            }

            for(var r = row_offset ; r < GlobalPara.rows ; r++) {
                if (r == GlobalPara.rows - 1) {
                    r = 0;
                }

                pos = self.getPositionByDim(r,c);
                var empty = true;
                for(var i = 0 ; i < len ; i++ ) {
                    if ((pos.x == self._snake[i].x) &&(pos.y == self._snake[i].y)){
                        empty = false;
                        break;
                    }
                }
                if(empty)
                {
                    self._food.setPosition(pos);
                    return;
                }

            }
        }
    },
    
    
    snakeGrow : function () {

        var self = this;
        var block = new BlockElement();
        //block.setRow(row);
        //block.setCol(col);

        self.addChild(block);

        block.setPosition(self._food.getPosition());

        var len = self._snake.length ;

        self._snake[len-1].setNextBlock(block);
        self._snake.push(block);

    }

    

});




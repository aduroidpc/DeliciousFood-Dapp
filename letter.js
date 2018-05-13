'use strict'

var Floral = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.name = obj.name;
        this.emblems = obj.emblems;
        this.author = obj.author;
    }
};

Floral.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

var TheFloral = function () {
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new Floral(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

TheFloral.prototype ={
    init:function(){

    },

    save:function(name,emblems){
        if(!name || !emblems){
            throw new Error("empty name or emblems ")
        }

        if(name.length > 20 || emblems.length > 500){
            throw new Error("name or emblems exceed limit length")
        }

        var from = Blockchain.transaction.from;
        var floral = this.data.get(name);
        if(floral){
            throw new Error("floral has been occupied");
        }

        floral = new Floral();
        floral.author = from;
        floral.name = name;
        floral.emblems = emblems;

        this.data.put(name,floral);
    },

    get:function(name){
        if(!name){
            throw new Error("empty name")
        }
        return this.data.get(name);
    }
}

module.exports = TheFloral;
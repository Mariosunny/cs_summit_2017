(function() {

    app.util = {
        inherit: function(proto, obj) {

            obj.prototype = Object.create(proto.prototype);
            obj.prototype.constructor = obj;
        },
        randomInt: function(min, max) {

            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
    };
})();
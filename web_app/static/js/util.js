(function() {

    Array.prototype.clean = function(deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {         
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };

    app.util = {
        inherit: function(proto, obj) {

            obj.prototype = Object.create(proto.prototype);
            obj.prototype.constructor = obj;
        },
        randomInt: function(min, max) {

            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        },
        uuid: function() {

            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
        currentTime: function() {

            return + new Date();
        },
        postResults: function(type, time, topic, lesson, sessionID, data) {

            $.ajax({
                type: "GET",
                url: "http://54.187.124.2:8000/results/" + type + "/",
                data: $.extend({"time": time, "topic": topic, "lesson": lesson, "session": sessionID}, data)
            });
        }
    };
})();
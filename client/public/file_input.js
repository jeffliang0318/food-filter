$(function() {
    var App = {
        init: function() {
            App.attachListeners();
        },
        attachListeners: function() {
            var self = this;

            $(".controls input[type=file]").on("change", function(e) {
                if (e.target.files && e.target.files.length) {
                    App.decode(URL.createObjectURL(e.target.files[0]));
                }
            });

        //     $(".controls button").on("click", function(e) {
        //         var input = document.querySelector(".controls input[type=file]");
        //         if (input.files && input.files.length) {
        //             App.decode(URL.createObjectURL(input.files[0]));
        //         }
        //     });

        //     $(".controls .reader-config-group").on("change", "input, select", function(e) {
            //         e.preventDefault();
            //         var $target = $(e.target),
            //             value = $target.attr("type") === "checkbox" ? $target.prop("checked") : $target.val(),
            //             name = $target.attr("name"),
            //             state = self._convertNameToState(name);
            
            //         console.log("Value of "+ state + " changed to " + value);
            //         self.setState(state, value);
            //     });
        },
        // _accessByPath: function(obj, path, val) {
        //     console.log(".................................");
        //     var parts = path.split('.'),
        //         depth = parts.length,
        //         setter = (typeof val !== "undefined") ? true : false;

        //     return parts.reduce(function(o, key, i) {
        //         if (setter && (i + 1) === depth) {
        //             o[key] = val;
        //         }
        //         return key in o ? o[key] : {};
        //     }, obj);
        // },
        // _convertNameToState: function(name) {
        //     return name.replace("_", ".").split("-").reduce(function(result, value) {
        //         return result + value.charAt(0).toUpperCase() + value.substring(1);
        //     });
        // },
        // detachListeners: function() {
        //     $(".controls input[type=file]").off("change");
        //     $(".controls .reader-config-group").off("change", "input, select");
        //     $(".controls button").off("click");
        // },
        decode: function(src) {
            var self = this,
                config = $.extend({}, self.state, {src: src});

            Quagga.decodeSingle(config, function(result) {});
        },
        // setState: function(path, value) {
        //     var self = this;

        //     if (typeof self._accessByPath(self.inputMapper, path) === "function") {
        //         value = self._accessByPath(self.inputMapper, path)(value);
        //     }

        //     self._accessByPath(self.state, path, value);

        //     console.log(JSON.stringify(self.state));
        //     App.detachListeners();
        //     App.init();
        // },
        inputMapper: {
            inputStream: {
                size: function(value){
                    return parseInt(value);
                }
            },
            numOfWorkers: function(value) {
                return parseInt(value);
            },
            decoder: {
                readers: function(value) {
                    if (value === 'ean_extended') {
                        return [{
                            format: "ean_reader",
                            config: {
                                supplements: [
                                    'ean_5_reader', 'ean_2_reader'
                                ]
                            }
                        }];
                    }
                    return [{
                        format: value + "_reader",
                        config: {}
                    }];
                }
            }
        },
        state: {
            inputStream: {
                size: 1280,
                singleChannel: false
            },
            locator: {
                patchSize: "large",
                halfSample: true
            },
            decoder: {
                readers: [{
                    format: "upc_reader",
                    config: {}
                }]
            },
            locate: true,
            src: null
        }
    };

    App.init();

    function calculateRectFromArea(canvas, area) {
        console.log(canvas);
        console.log(area);
        console.log(".................................");
        var canvasWidth = canvas.width,
            canvasHeight = canvas.height,
            top = parseInt(area.top)/100,
            right = parseInt(area.right)/100,
            bottom = parseInt(area.bottom)/100,
            left = parseInt(area.left)/100;

        top *= canvasHeight;
        right = canvasWidth - canvasWidth*right;
        bottom = canvasHeight - canvasHeight*bottom;
        left *= canvasWidth;
        return {
            x: left,
            y: top,
            width: right - left,
            height: bottom - top
        };
    }

    Quagga.onProcessed(function(result) {
        console.log('THIS IS THE RESULT  ' + result); //if result === undefined also not working
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay,
            area;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                    //NOT WORKING 
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
            }

            if (App.state.inputStream.area) {
                area = calculateRectFromArea(drawingCanvas, App.state.inputStream.area);
                drawingCtx.strokeStyle = "#0F0";
                drawingCtx.strokeRect(area.x, area.y, area.width, area.height);
            }
    }
    });

    Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
        console.log(code);
            var $node,
            canvas = Quagga.canvas.dom.image;
            console.log(code);
            
            $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
            $node.find("img").attr("src", canvas.toDataURL());
            $node.find("h4.code").html(code);
            $("#result_strip ul.thumbnails").prepend($node);
            console.log($node);
    });
});

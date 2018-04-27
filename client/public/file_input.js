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
        },
        decode: function(src) {
            var self = this,
                config = $.extend({}, self.state, {src: src});

            Quagga.decodeSingle(config, function(result) {});
        },

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

    Quagga.onProcessed(function(result) {
        $('#search-error-strip ul.search-error').empty();
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay,
            area;

        if (result === undefined) {
            var $node = $('<li>Cannot Find Barcode. Please try again.</li>');
            $("#search-error-strip ul.search-error").prepend($node);
        }

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                    //NOT WORKING 
                });
                if (result.box === undefined) {
                    var $node = $('<li className="error-list-item">Cannot Read Barcode. Please try again.</li>');
                    $("#search-error-strip ul.search-error").prepend($node);
                }
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
            }
    }
    });

    Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
            var $node,
            canvas = Quagga.canvas.dom.image;
            window.upcCode = (code);
            $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
            $node.find("img").attr("src", canvas.toDataURL());
            $node.find("h4.code").html(code);
            $("#result_strip ul.thumbnails").empty();
            $("#result_strip ul.thumbnails").prepend($node);
    });
});

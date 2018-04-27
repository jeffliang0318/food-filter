import React from "react";
import $ from "jquery";
import Quagga from 'quagga'; // ES6

class searchUploadUPC extends React.Component {
    constructor(props) {
        super(props);

        this.reloadJquery = this.reloadJquery.bind(this);
    }

    componentDidMount() {
        var old_element = document.getElementById("capture-button-id");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
        this.reloadJquery();
    }
    componentWillUnmount() {
        // var old_element = document.getElementById("capture-button-id");
        // var new_element = old_element.cloneNode(true);
        // old_element.parentNode.replaceChild(new_element, old_element);
        $("#capture-button-id").prop("change", null).off("change");
    }

    
    reloadJquery() {
        $(function() {
            var App = {
                init: function() {
                    App.attachListeners();
                },
            attachListeners: function() {
                var self = this;
                $("#capture-button-id").off("change");
            
            $("#capture-button-id").on("change", function xyz(e) {
                if (e.target.files && e.target.files.length) {
                    console.log(e.target.files);
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
            
            $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
            $node.find("img").attr("src", canvas.toDataURL());
            $node.find("h4.code").html(code);
            $("#result_strip ul.thumbnails").prepend($node);
    });
});

    }

    render() {
        //DO NOT CHANGE THESE className's controls, input-group, result_strip and thumbnails
        // this.reloadJquery();
        return (
          <div className='photo-container' >
            <div className='header-barcode-container'>
                <img src="http://res.cloudinary.com/dwanjkcku/image/upload/c_scale,w_500/v1524763023/barcode.png" />
                <div>
                    <h1> Barcode Reader </h1>
                    <br />
                    <div> Upload a barcode and we will read the code for you. 
                    Please upload a photo of the barcode below. 
                    </div>
                    <div className="controls"
                    > 
                        <fieldset className="input-group"
                        >
                            <input className='capture-button' 
                            id="capture-button-id"
                            type="file" accept="image/*" 
                            capture="camera" 
                            />
                        </fieldset>
                    </div>
                    <div id="search-error-strip">
                        <ul className="search-error"></ul>
                    </div>
                </div>
            </div>  
            <div id="result_strip">
                <ul className="thumbnails"></ul>
            </div>
          </div>
        );
    }

}

export default (searchUploadUPC);

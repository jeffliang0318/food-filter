import React from "react";

class searchUploadUPC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {upc: ""};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.fetch_product(window.upcCode)
        .then(() => this.props.history.push("/results"));

    }

    render() {
        //DO NOT CHANGE THESE className's controls, input-group, result_strip and thumbnails
        console.log(window.upcCode);
        return (
          <div className='photo-container' >
            <div className='header-barcode-container'>
                <img src="http://res.cloudinary.com/dwanjkcku/image/upload/c_scale,w_500/v1524763023/barcode.png" alt="barcode"/>
                <div className="header-content">
                    <h4> Barcode Reader </h4>
                    <p> Upload a barcode and we will read the code for you.
                    Please upload a photo of the barcode below.
                    </p>
                    <div className="controls">
                        <fieldset className="input-group">
                            <input className='capture-button'
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
                <ul className="thumbnails">Please Wait for image load...</ul>
            </div>
            <div>
            <button onClick={this.handleClick}>Search Item</button>
            </div>
          </div>
        );
    }

}

export default (searchUploadUPC);

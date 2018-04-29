import React from "react";

class searchUploadUPC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {upc: ""};
      this.handleClick = this.handleClick.bind(this);
      this.handleExampleClick = this.handleExampleClick.bind(this);
    }

    handleClick(e) {
      this.props.fetch_product(window.upcCode)
      .then(() => this.props.history.push("/results"));
    }

    handleExampleClick(e) {
      // alert(e.currentTarget.id);
      this.props.fetch_product(e.currentTarget.id)
      .then(() => this.props.history.push("/results"));
    }

    render() {
        //DO NOT CHANGE THESE className's controls, input-group, result_strip and thumbnails
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
                <p>Barcode Reading Area</p>
                <ul className="thumbnails">
                  <li>
                    <div className="thumbnail">
                      <div className="imgWrapper">
                        <img src="http://res.cloudinary.com/chengzii/image/upload/v1524972811/barcodeDemo.png" alt="barcodeDemo" />
                      </div>
                      <div className="caption">
                        <h4 className="code"> </h4>
                      </div>
                    </div>
                  </li>
                </ul>
            </div>
            <div className="searchButton-container">
              <button className="searchButton" onClick={this.handleClick}>Search</button>
            </div>
            <div className="recentlySearch">
              <h4>Demo Images</h4>
              <ul>
                <li className="searchExample-li" id="858089003050" onClick={this.handleExampleClick}>
                  <div className="searchExample-imgWrapper">
                    <img src="http://res.cloudinary.com/chengzii/image/upload/v1524974638/IMG_7175.jpg" alt="barcodeDemo" />
                  </div>
                  <div className="searchExample-codeContainer">
                    <p className="searchExample-code">858089003050</p>
                  </div>
                </li>

                <li className="searchExample-li">
                  <div className="searchExample-imgWrapper">
                    <img src="http://res.cloudinary.com/dwanjkcku/image/upload/c_scale,w_500/v1524763023/barcode.png" alt="barcodeDemo" />
                  </div>
                  <div className="searchExample-codeContainer">
                    <p className="searchExampleCode">123456789123</p>
                  </div>
                </li>

                <li className="searchExample-li">
                  <div className="searchExample-imgWrapper">
                    <img src="http://res.cloudinary.com/dwanjkcku/image/upload/c_scale,w_500/v1524763023/barcode.png" alt="barcodeDemo" />
                  </div>
                  <div className="searchExample-codeContainer">
                    <p className="searchExampleCode">123456789123</p>
                  </div>
                </li>

                <li className="searchExample-li last-li">
                  <div className="searchExample-imgWrapper">
                    <img src="http://res.cloudinary.com/dwanjkcku/image/upload/c_scale,w_500/v1524763023/barcode.png" alt="barcodeDemo" />
                  </div>
                  <div className="searchExample-codeContainer">
                    <p className="searchExampleCode">123456789123</p>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        );
    }

}

export default (searchUploadUPC);

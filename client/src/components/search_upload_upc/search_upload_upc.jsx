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
                <img src="https://res.cloudinary.com/dwanjkcku/image/upload/c_scale,w_500/v1524763023/barcode.png" alt="barcode"/>
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
                        <img src="https://res.cloudinary.com/chengzii/image/upload/v1524972811/barcodeDemo.png" alt="barcodeDemo" />
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
                <li className="searchExample-li">
                  <div className="searchExample-imgWrapper"  id="858089003050" onClick={this.handleExampleClick}>
                    <div className="searchExample-imgBox">
                      <img src="https://res.cloudinary.com/chengzii/image/upload/v1524974638/IMG_7175.jpg" alt="barcodeDemo" />
                    </div>
                  </div>
                  <div>
                    <p>858089003050</p>
                    <p>Icecream</p>
                  </div>
                </li>

                <li className="searchExample-li">
                  <div className="searchExample-imgWrapper" id="013764027138" onClick={this.handleExampleClick}>
                    <div className="searchExample-imgBox">
                    <img src="http://res.cloudinary.com/chengzii/image/upload/v1526602890/wheatbread.jpg" alt="barcodeDemo" />
                    </div>
                  </div>
                  <div>
                    <p>013764027138</p>
                    <p>Wheat Bread</p>
                  </div>
                </li>

                <li className="searchExample-li">
                  <div className="searchExample-imgWrapper" id="025293600232" onClick={this.handleExampleClick}>
                    <div className="searchExample-imgBox">
                    <img src="https://res.cloudinary.com/chengzii/image/upload/v1524983307/soyMilk.jpg" alt="barcodeDemo" />
                    </div>
                  </div>
                  <div>
                    <p>025293600232</p>
                    <p>Soymilk</p>
                  </div>
                </li>

                <li className="searchExample-li">
                  <div className="searchExample-imgWrapper" id="011029311817" onClick={this.handleExampleClick}>
                    <div className="searchExample-imgBox">
                      <img src="https://res.cloudinary.com/chengzii/image/upload/v1524983307/seafoodFlaker.jpg" alt="barcodeDemo" />
                    </div>
                  </div>
                  <div>
                    <p>011029311817</p>
                    <p>Fishstick</p>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        );
    }

}

export default (searchUploadUPC);

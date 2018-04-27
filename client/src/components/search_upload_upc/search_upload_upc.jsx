import React from "react";

class searchUploadUPC extends React.Component {

    render() {
        //DO NOT CHANGE THESE className's controls, input-group, result_strip and thumbnails
        return (
          <div>
            <div className="controls">
                <fieldset className="input-group">
                    <input className='capture-button'
                    type="file" accept="image/*"
                    capture="camera"
                    />
                    <button className='rerun-button' >Rerun</button>
                </fieldset>
            </div>
            <div id="result_strip">
                <ul className="thumbnails"></ul>
            </div>
          </div>
        );
    }

}

export default (searchUploadUPC);

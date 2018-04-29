import React, { Component } from 'react';

class Team extends Component {


  render() {
    return (
      <div className="team-main">
        <h2>Our Team</h2>
        <section className="team-section">
          <ul className="team-ul">
            <li className="team-li">
              <div className="info-wrapper">
                <div className="photo-wrapper">
                  <img src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524855355/egg.png" />
                </div>
                <ul className="info-detail">
                  <li>Jeff</li>
                  <li>Software Developer</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                </ul>
              </div>
            </li>

            <li className="team-li">
              <div className="info-wrapper">
                <div className="photo-wrapper">
                <img src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524855355/egg.png" />
                </div>
                <ul>
                  <li>Tiffany</li>
                  <li>Software Developer</li>
                  <li>hen li hai hen li hai</li>
                </ul>
              </div>
            </li>

            <li className="team-li">
              <div className="info-wrapper">
                <div className="photo-wrapper">
                <img src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524855355/egg.png" />
                </div>
                <ul>
                  <li>TingTing</li>
                  <li>Software Developer</li>
                  <li>hen li hai hen li hai</li>
                </ul>
              </div>
            </li>

            <li className="team-li">
              <div className="info-wrapper">
                <div className="photo-wrapper">
                <img src="https://res.cloudinary.com/chengzii/image/upload/c_scale,w_200/v1524855355/egg.png" />
                </div>
                <ul>
                  <li>Ziyan</li>
                  <li>Software Developer</li>
                  <li>hen li hai hen li hai</li>
                </ul>
              </div>
            </li>


          </ul>
        </section>
      </div>
    );
  }
}

export default Team;

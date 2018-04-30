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
                  <img alt="team-pic" src="https://res.cloudinary.com/chengzii/image/upload/v1525031709/jeff.jpg" />
                </div>
                <ul className="info-detail">
                  <li className="info-name">Jeff</li>
                  <li>
                    <p>
                      Jeff worked as an suspension design engineer and manufacturing engineer at Honda before changing his career as a software engineer. Since then, his primary focus has been new technologies, with a strong background in Rails, React and Redux and recent experience with node.js. With years of technical problem solving and experience, he hopes to join a company that using new technologies in automotive and manufacturing.
                    </p>
                  </li>
                  <li>
                    <a href="https://github.com/jeffliang0318" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github-square"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/jeff-chun-liang-699bb679/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="team-li">
              <div className="info-wrapper">

              <ul className="info-detail">
                <li className="info-name">Tiffany</li>
                <li>
                  <p>
                    Tiffany is a full stack developer who is experienced in React, Redux, Ruby on Rails, JavaScript, and Java. Her passion to code started with a college course. Since then, she enjoys engineering projects that enriches the user’s experience. Her ideal workplace would be a passionate engineer team who envision a superior software product and executes it quickly and efficiently.
                  </p>
                </li>
                <li>
                  <a href="https://github.com/tjshiu" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github-square"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/tiffany-shiu/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
              </ul>
                <div className="photo-wrapper">
                  <img src="https://res.cloudinary.com/chengzii/image/upload/v1525031709/tiffany.jpg" alt="team-pic"/>
                </div>
              </div>
            </li>

            <li className="team-li">
              <div className="info-wrapper">
                <div className="photo-wrapper">
                <img src="https://res.cloudinary.com/chengzii/image/upload/v1525031709/tingting.jpg" alt="team-pic"/>
                </div>
                <ul className="info-detail">
                  <li className="info-name">TingTing</li>
                  <li>
                    <p>
                      TingTing is an accounting analyst turned software engineer in Bay Area. She enjoys learning about logic and is expereinced in Ruby on Rails, React and Redux, Javascript, Node.js and CSS3.
                      With years of analytical and problem solving experience, she hopes to develope web applications that can solve real life problems. Her other passions include minimalist living, environmental sustainability, and Jazz music.
                    </p>
                  </li>
                  <li>
                    <a href="https://github.com/jiangtt18" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github-square"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/jiangtt/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="team-li">
              <div className="info-wrapper">

              <ul className="info-detail">
                <li className="info-name">Ziyan</li>
                <li>
                  <p>
                    Ziyan is a full-stack software engineer, experienced in React, Redux, Ruby on Rails, Express and JavaScript. Coming from research and academia, what drew Ziyan to being a software engineer was the algorithms and problem solving. However, these days, she gets just as excited about building something that is interactive, easy to use, and can really be leveraged in a meaningful way.
                  </p>
                </li>
                <li>
                  <a href="https://github.com/zw301" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github-square"></i>
                  </a>
                  <a href="https://linkedin.com/in/ziyan-wang-4149b6161/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
              </ul>
                <div className="photo-wrapper">
                  <img src="https://res.cloudinary.com/chengzii/image/upload/v1525032334/ziyan.jpg" alt="team-pic"/>
                </div>
              </div>
            </li>


          </ul>
        </section>
      </div>
    );
  }
}

export default Team;

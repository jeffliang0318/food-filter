import React, { Component } from 'react';

class Footer extends Component {


  render() {
    return (
      <footer className="footer">
        <section className="footer-body">
          <div>
            <a href="https://github.com/jeffliang0318/food-filter">
              <i className="fab fa-github-square"></i>
            </a>
          </div>
          <div>
            <a href="/team" className="team-link">
              © 2018 FoodFilter Team
            </a>
          </div>
        </section>
      </footer>
    );
  }
}

export default Footer;

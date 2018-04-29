import React, { Component } from 'react';

class Footer extends Component {


  render() {
    return (
      <footer className="footer">
        <section className="footer-body">
          <div>
            <a href="https://github.com/jeffliang0318/food-filter">
              <i class="fab fa-github-square"></i>
            </a>
          </div>
          <div>
            © 2018 FoodFilter Team
          </div>
        </section>
      </footer>
    );
  }
}

export default Footer;

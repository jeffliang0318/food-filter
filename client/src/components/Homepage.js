import React, { Component } from 'react';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.scrollTo = this.scrollTo.bind(this);
  }

  scrollTo(elId) {

    return () => {
      document.getElementById(elId).scrollIntoView({
        "behavior" : "smooth",
        "block": "start",
        "inline": "start"
      });
    }
  }

  render() {
    return (
      <main className="homepage-main">
        <div className="homepage-hero">
          <div className="header-backcolor" />
          <div className="homepage-header">
            <h1>FoodFilter</h1>
            <p className="homepage-description">
              Welcome to Food Filter! 
              <div>
              We help you identify ingredients that you are allergic to based on your allergy profile. 
              </div>
            </p>
          </div>
        </div>

        <section className="homepage-body">
          <aside>
            <div
              className="body-nav"
              onClick={this.scrollTo("overivew")}>
              Overview
            </div>
            <div
              className="body-nav"
              onClick={this.scrollTo("symptoms")}>
              Symptoms
            </div>
            <div
              className="body-nav"
              onClick={this.scrollTo("triggers")}>
              Triggers
            </div>
          </aside>

          <div className="homepage-content">
            <section>
              <div
                className="homepage-section"
                id='overivew'>

                <h3>About Food Filter</h3>
                <div className="section-content">
                  Our goal is to help you! Based off of each person's profile, we help you avoid food items by 
                  highlighting ingredients that are potentially dangerous based on your allergy profile.
                  You can type in the product name into the search bar or type the bar code
                  that is found on the product. We also have a bar code scanner where you can upload a photo!
                </div>
              </div>

              <div className="homepage-section"
                id='symptoms'>
                <h3>How to Use Food Filter</h3>
                <div className="section-content">
                  <ol className="symptoms-ul">
                    <li>Login or Register</li>
                    <li>Select Allergies</li>
                    <li>Type UPC, product name, or upload barcode photo!</li>
                  </ol>
                  
                                  </div>
              </div>

              <div
                className="homepage-section"
                id='triggers'>
                <h3>Triggers</h3>
                <div className="section-content">
                  Once a food allergy is diagnosed, the most effective treatment
                  is to avoid the food. The foods most associated with food
                  allergy in children are:
                  <br />
                  People allergic to a specific food may also potentially have a
                  reaction to related foods. A person allergic to one tree nut
                  may be cross-reactive to others. Those allergic to shrimp may
                  react to crab and lobster. Someone allergic to peanuts - which
                  actually are legumes (beans), not nuts - may have problems
                  with tree nuts, such as pecans, walnuts, almonds and cashews;
                  in very rare circumstances they may have problems with other
                  legumes (excluding soy). Learning about patterns of
                  cross-reactivity and what must be avoided is one of the
                  reasons why people with food allergies should receive care
                  from a board-certified allergist. Determining if you are
                  cross-reactive is not straightforward. Allergy testing to many
                  items in the same “family” may not be specific enough - many
                  times, these tests are positive, given how similar two food
                  items in a “family” may look to the test. If you have
                  tolerated it well in the past, a food that is theoretically
                  cross-reactive may not have to be avoided at all. Negative
                  tests may be very useful in ruling out an allergy. In the case
                  of positive tests to foods that you have never eaten but that
                  are related to items to which you’ve had an allergic reaction,
                  an oral food challenge is the best way to determine whether
                  the food poses a danger.
                </div>
              </div>
            </section>
          </div>

          <div className="backToTop-col">
            <div
              id="backToTop"
              onClick={this.scrollTo("root")}>
                Top
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Homepage;

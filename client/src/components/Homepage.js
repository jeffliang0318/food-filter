import React, { Component } from 'react';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.scrollTo = this.scrollTo.bind(this);
  }

  scrollTo(elId) {
    // return () => {
    // el.scrollIntoView({ behavior: 'smooth' });
    // };

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
            <h1>Food Filter</h1>
            <p className="homepage-description">
              An allergy occurs when your body’s natural defenses overreact to
              exposure to a particular substance, treating it as an invader and
              sending out chemicals to defend against it.
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

                <h3>Overview</h3>
                <div className="section-content">
                  More than 50 million Americans have an allergy of some kind.
                  Food allergies are estimated to affect 4 to 6 percent of
                  children and 4 percent of adults, according to the Centers for
                  Disease Control and Prevention. Food allergy symptoms are most
                  common in babies and children, but they can appear at any age.
                  You can even develop an allergy to foods you have eaten for
                  years with no problems. Learn more about the types of food
                  allergies.
                </div>
              </div>

              <div className="homepage-section"
                id='symptoms'>
                <h3>Symptoms</h3>
                <div className="section-content">
                  Symptoms The body’s immune system keeps you healthy by
                  fighting off infections and other dangers to good health. A
                  food allergy reaction occurs when your immune system
                  overreacts to a food or a substance in a food, identifying it
                  as a danger and triggering a protective response. While
                  allergies tend to run in families, it is impossible to predict
                  whether a child will inherit a parent’s food allergy or
                  whether siblings will have a similar condition. Some research
                  does suggest that the younger siblings of a child with a
                  peanut allergy will also be allergic to peanuts. Symptoms of a
                  food allergy can range from mild to severe. Just because an
                  initial reaction causes few problems doesn’t mean that all
                  reactions will be similar; a food that triggered only mild
                  symptoms on one occasion may cause more severe symptoms at
                  another time. The most severe allergic reaction is anaphylaxis
                  — a life-threatening whole-body allergic reaction that can
                  impair your breathing, cause a dramatic drop in your blood
                  pressure and affect your heart rate. Anaphylaxis can come on
                  within minutes of exposure to the trigger food. It can be
                  fatal and must be treated promptly with an injection of
                  epinephrine (adrenaline). While any food can cause an adverse
                  reaction, eight types of food account for about 90 percent of
                  all reactions:
                  <ul className="symptoms-ul">
                    <li>Eggs</li>
                    <li>Milk</li>
                    <li>Peanuts</li>
                    <li>Shellfish</li>
                    <li>Soy</li>
                  </ul>
                  <p>
                    Certain seeds, including sesame and mustard seeds (the main
                    ingredient in the condiment mustard), also are common food
                    allergy triggers and considered a major allergen in some
                    countries. Symptoms of an allergic reaction may involve the
                    skin, the gastrointestinal tract, the cardiovascular system
                    and the respiratory tract. They can surface in one or more
                    of the following ways:
                  </p>
                  <ul className="symptoms-ul">
                    <li>Vomiting and/or stomach cramps</li>
                    <li>Hives</li>
                    <li>Shortness of breath</li>
                    <li>Wheezing</li>
                    <li>Repetitive cough</li>
                    <li>Shock or circulatory collapse</li>
                    <li>Tight, hoarse throat; trouble swallowing</li>
                    <li>
                      Swelling of the tongue, affecting the ability to talk or
                      breathe
                    </li>
                    <li>Weak pulse</li>
                    <li>Pale or blue coloring of skin</li>
                    <li>Dizziness or feeling faint</li>
                  </ul>
                  <p>
                    Most food-related symptoms occur within two hours of
                    ingestion; often they start within minutes. In some very
                    rare cases, the reaction may be delayed by four to six hours
                    or even longer. Delayed reactions are most typically seen in
                    children who develop eczema as a symptom of food allergy and
                    in people with a rare allergy to red meat caused by the bite
                    of a lone star tick. Another type of delayed food allergy
                    reaction stems from food protein-induced enterocolitis
                    syndrome (FPIES), a severe gastrointestinal reaction that
                    generally occurs two to six hours after consuming milk, soy,
                    certain grains and some other solid foods. It mostly occurs
                    in young infants who are being exposed to these foods for
                    the first time or who are being weaned. FPIES often involves
                    repetitive vomiting and can lead to dehydration. In some
                    instances, babies will develop bloody diarrhea. Because the
                    symptoms resemble those of a viral illness or bacterial
                    infection, diagnosis of FPIES may be delayed. FPIES is a
                    medical emergency that should be treated with IV
                    rehydration. Not everyone who experiences symptoms after
                    eating certain foods has a food allergy or needs to avoid
                    that food entirely; for instance, some people experience an
                    itchy mouth and throat after eating a raw or uncooked fruit
                    or vegetable. This may indicate oral allergy syndrome - a
                    reaction to pollen, not to the food itself. The immune
                    system recognizes the pollen and similar proteins in the
                    food and directs an allergic response to it. The allergen is
                    destroyed by heating the food, which can then be consumed
                    with no problem.
                  </p>
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

import './About.css';

import worldGlobe from '../../images/nasa-vhSz50AaFAs-unsplash.jpg';

function About() {
  return (
    <section className="about">
      <img src={worldGlobe} alt="world globe centered and above a black background" className="about__avatar" />
      <div className="about__text-wrap">
        <h2 className="about__heading">About the author</h2>
        <p className="about__description">
          Hello, my name is Isaac Terry. I am currently unemployed and focusing on learning
          building my skills in web development. I am more familiar with the following
          technologies: HTML, CSS, JavaScript, React, and Node.js.
        </p>
        <p className="about__description">
          Practicum has helped me gain more confidence by building projects and receiving code
          reviews to make further improvements. It has been challenging going through the curriculum.
          I felt like quiting multiple times, but I was able to stick with it. This experience has
          helped my perseverance. The ability to stick with something even when times get rough is
          something I can use to help my future employers.
        </p>
      </div>
    </section>
  );
}

export default About;
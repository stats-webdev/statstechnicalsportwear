import React from 'react';
import Footer from './Footer';
import './HowWeWork.css';

function HowWeWork() {
  return (
    <>
      <div className="howwework">
        {/* Page heading */}
        <h1 className="howwework__title">HOW WE WORK</h1>
        <p className="howwework__tagline">
          Every STATS TECHNICAL SPORTSWEAR design is rooted in years of experience as athletes and individuals who live and breathe an active lifestyle.
        </p>

        {/* Three-column grid */}
        <div className="howwework__grid">

          {/* SAMPLE TESTING */}
          <section className="howwework__item">
            <h3 className="howwework__subtitle">SAMPLE TESTING</h3>
            <div className="howwework__content">
              <img src="https://i.imgur.com/lEXKbUt.jpeg" alt="Sample testing" />
              <p>
                Once the design is finalized, the entire process remains in-house, ensuring full control over quality. We craft multiple prototypes, rigorously testing each for fit, functionality, and durability. Athletes, designers, and our team put them through real-world conditions—intense workouts, dynamic movements, and varied environments—to guarantee top-tier performance. The result? Sportswear that looks exceptional and stands up to the demands of an active, high-performance lifestyle. At STATS, every stitch, seam, and prototype is a step toward perfection.
              </p>
            </div>
          </section>

          {/* SMALL BATCH PRODUCTION */}
          <section className="howwework__item">
            <h3 className="howwework__subtitle">SMALL BATCH PRODUCTION</h3>
            <div className="howwework__content">
              <img src="https://i.imgur.com/jrhQJ7a.jpeg" alt="Small batch production" />
              <p>
                After perfecting the design, we move to small-batch production. We intentionally keep our runs limited to maintain the highest quality and craftsmanship. This approach allows us to focus on precision, ensuring every piece meets our rigorous standards. By producing in small quantities, we also minimize waste and deliver fresh, purpose-built sportswear directly to you—never sitting in storage, never compromising on quality.
              </p>
            </div>
          </section>

          {/* SUSTAINABILITY STATEMENT */}
          <section className="howwework__item">
            <h3 className="howwework__subtitle">SUSTAINABILITY STATEMENT</h3>
            <div className="howwework__content">
              <img src="https://i.imgur.com/njPBVFG.jpeg" alt="Sustainability statement" />
              <p>
                Sustainability is deeply embedded in our process. We donate fabric cutouts to small sewing shops, giving these materials a second life while supporting local communities and minimizing waste. This practice reflects our commitment to creating more than just high-performance sportswear—it’s about making a meaningful impact on the environment and the world around us. We believe in crafting for a better future, where every decision reflects our dedication to excellence and responsibility.
              </p>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default HowWeWork;

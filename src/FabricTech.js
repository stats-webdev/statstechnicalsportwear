import React from "react";
import "./FabricTech.css";
import Footer from "./Footer";
import Banner from "./Banner";
import { Link } from "react-router-dom";
function FabricTech() {
const fabricList = [
  {
    title: "Durasoft",
    image: "https://i.imgur.com/8XMG1lw.jpeg",
    description:
      "An ultra-soft premium polyester. Lightweight yet highly durable performance-tech fabric. Engineered for extreme comfort during high-performance activities.",
    highlights: ["Lightweight",	"Ultrasoft", "Durability"
],
  },
    {
    title: "Duraflex",
    image: "https://i.imgur.com/fOocyEZ.jpeg",
    description:
      "The next addition to our high-performance fabrics. The Duraflex holds all the same qualities as Durasoft, but with added traits of stretch and shape retention.",
    highlights: ["Lightweight",	"Stretch Retention", "Durability", "Shape Retention"
],
  },
  {
    title: "Membrane",
    image: "https://i.imgur.com/EiL6OqB.jpeg", 
    description:
      "The latest advancement in ultra-lightweight performance-tech fabrics. Moisture-wicking, stretch, durable.",
  highlights: ["Ultra Lightweight", "Moisture-wicking", "Stretch Retention", "Durability"],
  },
  {
    title: "CARBONITE",
    image: "https://i.imgur.com/EPjqcDR.jpeg", 
    description:
      "Carbonite® is a specialized material created with a process called warp knit, which results in incredible shape retention and mild compression for added performance qualities. Incredibly soft, stretchy, and sweat-wicking. Ideal for next-to-skin products like leggings, liners, and compression accessories.",
    highlights: ["Ultrasoft",		"Shape Retention", "Moisture-Wicking",	"Mild Compression"],
  },
   {
    title: "TROIKA",
    image: "https://i.imgur.com/VEUGAMo.jpeg", 
    description:
      "Advanced tech fabric with 3 characteristics ideal for Tropical Climates. Extremely breathable, 4-way stretch, and water-resistant. Hence the name TROIKA, in recognition of the 3-horse troop drawn abreast in harnessed Russian sleighs.",
    highlights: ["Breathability",	"4-Way Stretch", "Water-Resistant"],
  },
    {
    title: "AeroCotton",
    image: "https://i.imgur.com/a6bLYve.jpeg", 
    description:
      "The 1st generation of our poly-lined cotton comfort wear, with enhanced fiber softness and durability for recreation and recovery before and after the toughest training sessions.",
    highlights: ["Lightweight",	"Breathability", "Ultrasoft"	,"Poly-lined"],
  },
      {
    title: "Light Fleece",
    image: "https://i.imgur.com/7ExUbCW.jpeg", 
    description:
      "Highly soft, brushed fabric known for its natural breathability and comfort. Better suited for active pursuits and warmer conditions than regular fleece. Comes with 4-way stretch properties.",
    highlights: ["Lightweight",	"Breathability", "Ultrasoft"	,"4-Way Stretch"],
  },
       {
    title: "Tech Waffle",
    image: "https://i.imgur.com/TvorbPX.jpeg", 
    description:
      "A soft, mid-weight fabric. Builds on the comfort and aesthetic appeal of the standard waffle pattern, blended with active-life qualities. Bears a super soft hand-feel.",
    highlights: [ "Ultrasoft",	"Breathability"],
  },
         {
    title: "Tech Terry",
    image: "https://i.imgur.com/sTPxeQ3.jpeg", 
    description:
      "Soft, smooth, durable. Made with Light French Terry, featuring a smooth hand-feel on the fabric with stretch retention properties.",
    highlights: [ "Ultrasoft","Stretch Retention",	"Breathability"],
  },
]
    return (
    <div>
        <div className="fabric-section">
  <img src="https://i.imgur.com/YLsTeQ0.jpeg" alt="Current Banner" className="fabric-background" />
  <div className="fabric-content">
    <h2>OUR FABRIC</h2>
    <p>
      STATS apparel aims to go beyond the ordinary. What goes into every woven fabric and design detail
      count toward the experience that the individual wearing the garment undertakes in the journey that
      unifies mind and body toward self development.
    </p>
    <p>This is how we put the tech in technical sportswear.</p>
  </div>
</div>
      <div className="Fabric-Tech-Container">
        {fabricList.map((fabric, index) => (
          <div className="aero-container" key={index}>
            <div className="aero-left">
                 <Link to={`/fabtech/${(fabric.title)}`}>
              <img src={fabric.image} alt={`${fabric.title} Product`} className="aero-image" />
              </Link>
            </div>
            <div className="aero-right">
              <h2 className="aero-title">{fabric.title}</h2>
              <Link to={`/fabtech/${(fabric.title)}`}>
                <button className="aero-button">VIEW PRODUCTS</button>
              </Link>
              <p className="aero-description">{fabric.description}</p>
              {fabric.highlights && (<div> <h3 className="highlightsh3">HIGHLIGHTS</h3>
                <div className="aero-highlights">
                  {fabric.highlights.map((point, i) => (
                    <div key={i}>{point}</div>
                  ))}
                </div>
                   </div>
              )}
            </div>
           
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FabricTech;

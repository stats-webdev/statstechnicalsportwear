import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Lookbook.css";
import Footer from "./Footer";

const Lookbook = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await fetch("https://my-product-api.stats-webdev.workers.dev/lookbooks");
        const data = await res.json();
        setGalleries(data);
      } catch (err) {
        console.error("Error fetching lookbook data:", err);
      }
    };
    fetchGalleries();
  }, []);

  return (
    <div>
    <div className="lookbook-grid">
      {galleries.map((gallery) => (
        <Link style={{textDecoration:'none'}}key={gallery.id} to={`/lookbook/${gallery.id}`} className="lookbook-card">
          <p>{gallery.title}</p>
          <img src={gallery.cover} alt={gallery.title} />
        </Link>
      ))}
    </div>
           <Footer/>
    </div>
  );
};

export default Lookbook;
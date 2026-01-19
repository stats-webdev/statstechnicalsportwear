import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Lookbook.css";
import Footer from "./Footer";

const LookbookPage = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
  const [groupedImages, setGroupedImages] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("https://my-product-api.stats-webdev.workers.dev/lookbooks");
        const data = await res.json();
        const selectedGallery = data.find((g) => g.id === id);

        if (!selectedGallery) return;

        const groups = [];
        let portraitGroup = [];

        const processImages = selectedGallery.images.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              const isLandscape = img.naturalWidth > img.naturalHeight;
              if (isLandscape) {
                // Push portrait group first if not empty
                if (portraitGroup.length > 0) {
                  groups.push({ type: "portrait", images: portraitGroup });
                  portraitGroup = [];
                }
                // Then push the landscape image
                groups.push({ type: "landscape", images: [src] });
              } else {
                portraitGroup.push(src);
              }
              resolve();
            };
            img.onerror = () => resolve(); // skip on error
          });
        });

        await Promise.all(processImages);

        // Push any remaining portraits
        if (portraitGroup.length > 0) {
          groups.push({ type: "portrait", images: portraitGroup });
        }

        setGallery(selectedGallery);
        setGroupedImages(groups);
      } catch (err) {
        console.error("Failed to load gallery:", err);
      }
    };

    fetchGallery();
  }, [id]);

  const handleImageClick = (e, src) => {
    e.preventDefault();
    setZoomedImage(src);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  if (!gallery || !groupedImages) return <div className="spinner"></div>;

  return (
    <div>
    <div className="lookbook-detail">
      <Link to="/lookbook">
        <button>Back to Lookbooks</button>
      </Link>
      <h2>{gallery.title}</h2>

      {/* Render grouped images */}
      {groupedImages.map((group, index) => (
        <div
          key={index}
          className={group.type === "landscape" ? "landscape-images" : "lookbook-images"}
        >
          {group.images.map((src, idx) => (
            <img
              key={`${index}-${idx}`}
              src={src}
              className={group.type === "landscape" ? "landscape" : ""}
              onClick={(e) => handleImageClick(e, src)}
              alt={`Lookbook ${index}-${idx}`}
            />
          ))}
        </div>
      ))}

      {/* Shop the Collection */}
      {gallery.collectionLink && (
        <div className="shop-collection">
          <a href={gallery.collectionLink} target="_blank" rel="noopener noreferrer">
            <button className="lookbook-shop-button">Shop the Collection</button>
          </a>
        </div>
      )}

      {/* Zoom image overlay */}
      {zoomedImage && (
        <div className="zoom-overlay" onClick={closeZoom}>
          <img src={zoomedImage} alt="Zoomed" className="zoomed-image" />
        </div>
      )}
    </div>
             <Footer/>
             </div>
  );
};

export default LookbookPage;
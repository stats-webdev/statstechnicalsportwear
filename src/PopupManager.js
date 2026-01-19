import { useState, useEffect } from "react";
import "./PopupManager.css";

export default function PopupAdmin() {
  const [pageKey, setPageKey] = useState("/"); // Default to homepage
  const [form, setForm] = useState({
    isActive: true,
    displayType: "imageWithText",
    imageUrl: "",
    title: "",
    description: "",
    buttonText: "",
    linkType: "Internal Page", // Default to Internal Page
    linkDestination: "/"
  });

  const API_BASE = "https://my-product-api.stats-webdev.workers.dev";

  const [allTypes, setAllTypes] = useState([]);
  const [allSeries, setAllSeries] = useState([]);
  const [allIDs, setAllIDs] = useState([]);


  useEffect(() => {
    fetch("https://my-product-api.stats-webdev.workers.dev/?id=1")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const types = Array.from(new Set(data.map(item => item.Type).filter(Boolean)));
          const series = Array.from(new Set(data.map(item => item.Series).filter(Boolean)));
          const ids = Array.from(new Set(data.map(item => item.ID).filter(Boolean)));
          setAllTypes(types);
          setAllSeries(series);
          setAllIDs(ids);
        }
      })
      .catch(err => console.error("Failed to fetch types/series:", err));
  }, []);
  // Fetch popup data whenever pageKey changes
  useEffect(() => {
    if (!pageKey) return;
    fetch(`${API_BASE}/api/get-popup?page=${pageKey}`)
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setForm(data);
        } else {
          // Reset to default if no data found
          setForm(prev => ({
            ...prev,
            isActive: true,
            displayType: "imageWithText",
            imageUrl: "",
            title: "",
            description: "",
            buttonText: "",
            linkType: "Internal Page",
            linkDestination: prev.linkDestination || "/"
          }));
        }
      })

      .catch(err => console.error("Failed to load popup:", err));
  }, [pageKey]);
  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => {
      const updatedForm = { ...prev, [name]: type === "checkbox" ? checked : value };
      return updatedForm;
    });
  };

  // Save popup data
  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/save-popup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey, ...form })
      });
      if (!response.ok) throw new Error("Failed to save");
      alert(`Popup for "${pageKey}" saved successfully!`);
    } catch (err) {
      console.error(err);
      alert("Failed to save popup.");
    }
  };

  return (
    <div className="popup-admin">
      <h2>Manage Pop-up Banner ({pageKey})</h2>

      {/* Show popup toggle */}
      <label>
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        Show Pop-up Banner
      </label>

      {/* Display Type */}
      <div>
        <label>
          <input
            type="radio"
            name="displayType"
            value="imageWithText"
            checked={form.displayType === "imageWithText"}
            onChange={handleChange}
          />
          Image with Text
        </label>
        <label>
          <input
            type="radio"
            name="displayType"
            value="imageOnly"
            checked={form.displayType === "imageOnly"}
            onChange={handleChange}
          />
          Image Only (Clickable)
        </label>
      </div>

      {/* Image URL */}
      <label>Image URL:</label>
      <input
        type="url"
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
      />
  
      {/* Title */}
      <label>Title:</label>  
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      {/* Description */}

      {form.displayType === "imageWithText" && (
         <>
        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        </>
      )}
       
      {/* Button Text */}
 
      {form.displayType === "imageWithText" && (
        <>
        <label>Button Text:</label>
        <input
          type="text"
          name="buttonText"
          placeholder="Button Text"
          value={form.buttonText}
          onChange={handleChange}
        />
        </>
      )}

      {/* Link Type */}
      <label>Link Type:</label>
      <select name="linkType" value={form.linkType} onChange={handleChange}>
        <option value="Internal Page">Internal Page</option>
        <option value="Product Category/Collection">Product Category/Collection</option>
        <option value="External Page">External Page</option>
      </select>

      {/* Link Destination */}
      {console.log(form.linkDestination)}
      <label>Link Destination:</label>
      {form.linkType === "Internal Page" && (
        <select
          name="linkDestination"
          value={form.linkDestination}
          onChange={handleChange}
        >
          <option value="/">Home</option>
          <option value="whatwedo">What We Do</option>
          <option value="howwework">How We Work</option>
          <option value="whoweare">Who We Are</option>
          <option value="community">Community</option>
          <option value="Location">Location</option>
          <option value="faqs">Faqs</option>
          <option value="termsofservice">Terms Of Service</option>
          <option value="returnpolicy">Return And Exchange Policy</option>
          <option value="privacypolicy">Privacy Policy</option>
        </select>
      )}

{form.linkType === "Product Category/Collection" && (
  <select
    name="linkDestination"
    value={form.linkDestination}
    onChange={handleChange}
  >
    <option value="">Select Type, Series, or Product ID</option>
    <optgroup label="Type">
      {allTypes.map(type => (
        <option key={type} value={type}>{type}</option>
      ))}
    </optgroup>
    <optgroup label="Series">
      {allSeries.map(series => (
        <option key={series} value={series}>{series}</option>
      ))}
    </optgroup>
    <optgroup label="Product ID">
      {allIDs.map(id => (
        <option key={id} value={id}>{id}</option>
      ))}
    </optgroup>
  </select>
)}
      {form.linkType === "External Page" && (
        <input
          type="url"
          name="linkDestination"
          placeholder="Enter full URL (https://...)"
          value={form.linkDestination}
          onChange={handleChange}
        />
      )}

      {/* Save Button */}
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
}

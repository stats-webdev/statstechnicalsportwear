import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './AdminDashboard.css';
import AddProductForm from './AddProductForm';
import UpdateSizeChart from './UpdateSizeChart';
import BannerManager from './BannerManager';
import Admin from './Admin';
import AdsManager from './AdsManager';
import FeaturesUpdate from './FeaturesUpdate';
import UpdateThumbnail from './UpdateThumbnail';
import UpdateProductType from './UpdateProductType';
import PopupAdmin from './PopupManager';

const AdminDashboard = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [activeSection, setActiveSection] = useState('dashboard');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://my-product-api.stats-webdev.workers.dev/?id=1");
                const data = await response.json();
                if (response.ok) {
                    setProducts(data);
                } else {
                    console.error("Failed to fetch products:", data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const requestDeleteProduct = (id) => {
        setProductToDelete(id);
        setShowConfirmModal(true);
    };

    const handleDeleteProduct = async () => {
            setShowConfirmModal(false);
        try {
            const response = await fetch(`https://my-product-api.stats-webdev.workers.dev/delete-product`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productID: productToDelete }),
            });
            if (response.ok) {
                setProducts(products.filter((product) => product.ID !== productToDelete));
                setMessage('Product deleted successfully!');
            } else {
                setMessage('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            setMessage('Error deleting product');
        }
    
        setProductToDelete(null);
        setTimeout(() => setMessage(''), 3000);
    };

    const cancelDelete = () => {
        setShowConfirmModal(false);
        setProductToDelete(null);
    };

    return (
        <div>
            <div className="admin-dashboard">
                <div className="button-group1">
                    <button className={`dashboard-button ${activeSection === "dashboard" ? "active" : ""}`} onClick={() => setActiveSection("dashboard")}>Dashboard</button>
                    <button className={`dashboard-button ${activeSection === "addProduct" ? "active" : ""}`} onClick={() => setActiveSection("addProduct")}>Add Product</button>
                    <button className={`dashboard-button ${activeSection === "ads" ? "active" : ""}`} onClick={() => setActiveSection("ads")}>Update Ads</button>
                    <button className={`dashboard-button ${activeSection === "features" ? "active" : ""}`} onClick={() => setActiveSection("features")}>Update Features</button>
                    <button className={`dashboard-button ${activeSection === "sizeChartPriceCard" ? "active" : ""}`} onClick={() => setActiveSection("sizeChartPriceCard")}>Update Size Chart & Card</button>
                    <button className={`dashboard-button ${activeSection === "banner" ? "active" : ""}`} onClick={() => setActiveSection("banner")}>Update Banner</button>
                    <button className={`dashboard-button ${activeSection === "admin" ? "active" : ""}`} onClick={() => setActiveSection("admin")}>Update Stocks and Sale Price</button>
                    <button className={`dashboard-button ${activeSection === "thumbnail" ? "active" : ""}`} onClick={() => setActiveSection("thumbnail")}>Update Thumbnail</button>
                    <button className={`dashboard-button ${activeSection === "UpdateType" ? "active" : ""}`} onClick={() => setActiveSection("UpdateType")}>Update Product Type</button>
                    <button className={`dashboard-button ${activeSection === "UpdatePopup" ? "active" : ""}`} onClick={() => setActiveSection("UpdatePopup")}>Update Pop-up</button>
                </div>

                <div className='content-section'>
                    {activeSection === "dashboard" && (
                        <div className='product-data-container'>
                            <nav className='product-data-nav'><h2 style={{ color: 'white', marginLeft: '15px' }}>Product Data</h2></nav>
                            <div className='product-data-table-container'>
                                <table className='product-data-table'>
                                    <thead>
                                        <tr>
                                            <th>Product ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Sale Price</th>
                                            <th>Description</th>
                                            <th>Type</th>
                                            <th>Colors</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.ID}>
                                                <td>{product.ID}</td>
                                                <td>{product.Name}</td>
                                                <td>{product.Price}</td>
                                                <td>{product.SalePrice}</td>
                                                <td>{product.Description}</td>
                                                <td>{product.Type}</td>
                                                <td>{Object.keys(product.Colors).join(", ")}</td>
                                                <td>
                                                    <button onClick={() => requestDeleteProduct(product.ID)} className='button'>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSection === "addProduct" && <AddProductForm />}
                    {activeSection === "ads" && <AdsManager />}
                    {activeSection === "features" && <FeaturesUpdate />}
                    {activeSection === "sizeChartPriceCard" && <UpdateSizeChart />}
                    {activeSection === "banner" && <BannerManager />}
                    {activeSection === "admin" && <Admin />}
                    {activeSection === "thumbnail" && <UpdateThumbnail />}
                    {activeSection === "UpdateType" && <UpdateProductType />}
                     {activeSection === "UpdatePopup" && <PopupAdmin />}
                </div>
            </div>

            {showConfirmModal && (
                <div className="deletemodal">
                    <div className="deletemodal-content">
                        <p>Are you sure you want to delete this product?</p>
                        <button onClick={handleDeleteProduct} className='deletebuttondanger'>Yes, Delete</button>
                        <button onClick={cancelDelete} className='deletebutton'>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

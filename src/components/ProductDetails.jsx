import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import RatingStar from "./RatingStar";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const imgRef = useRef(null);
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error("Error loading product:", error);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p id="status">Loading product details...</p>;
    if (!product) return <p id="status">Product not found</p>;

    const handleMouseMove = (e) => {
        const { top, left, width, height } = imgRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        if (x < 0 || y < 0 || x > width || y > height) {
            setShowMagnifier(false);
            return;
        }

        setMagnifierPos({ x, y });
    };

    const handleBack = () => {
        navigate("/", { state: location.state });
    };

    return (
        <div className="details" style={{ padding: "20px" }}>
            <h2>{product.title}</h2>

            <div
                style={{ position: "relative", display: "inline-block" }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
            >
                <img
                    ref={imgRef}
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                        width: "400px",
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "10px",
                    }}
                />

                {showMagnifier && (
                    <div
                        style={{
                            position: "absolute",
                            pointerEvents: "none",
                            border: "2px solid #ccc",
                            borderRadius: "50%",
                            width: "120px",
                            height: "120px",
                            top: `${magnifierPos.y - 60}px`,
                            left: `${magnifierPos.x - 60}px`,
                            backgroundImage: `url(${product.images?.[0] || product.thumbnail})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "800px 800px",
                            backgroundPosition: `-${magnifierPos.x * 2 - 60}px -${magnifierPos.y * 2 - 60
                                }px`,
                            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                        }}
                    />
                )}
            </div>

            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Discount:</strong> {product.discountPercentage}% off</p>
            <p><strong>Rating:</strong> ⭐ {product.rating}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Warranty:</strong> {product.warrantyInformation || "Not Available"}</p>
            <p><strong>Shipping:</strong> {product.shippingInformation || "Standard Shipping"}</p>
            <p><strong>Availability:</strong> {product.availabilityStatus || "Available"}</p>
            <p><strong>Return:</strong> {product.returnPolicy || "No Return Policy"}</p>

            <div className="reviews">
                <h3>Reviews</h3>
                {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
                    product.reviews.map((rev, index) => (
                        <div key={index} className="review-item" style={{ marginBottom: 12, textAlign: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                <RatingStar rating={rev.rating} size={18} />
                                <span style={{ color: "#666", fontSize: 13 }}>{rev.rating.toFixed(1)}</span>
                            </div>

                            <p className="rev-comment" style={{ margin: "6px 0 0" }}>
                                {rev.comment}
                            </p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No Reviews Available</p>
                )}

            </div>

            <button className="backbtn" onClick={handleBack}>
                Back
            </button>
        </div>
    );
};

export default ProductDetails;

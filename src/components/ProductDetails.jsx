import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <p id="status">Loading product details...</p>;
    }

    if (!product) {
        return <p id="status">Product not found</p>;
    }

    return (
        <div className="details">

            <h2>{product.title}</h2>
            <img src={product.thumbnail} alt={product.title} />

            <p><strong>Brand : </strong> {product.brand}</p>
            <p><strong>Description : </strong> {product.description}</p>
            <p><strong>Category : </strong> {product.category}</p>
            <p><strong>Price : </strong> ${product.price}</p>
            <p><strong>Discount : </strong> {product.discountPercentage}% off</p>
            <p><strong>Rating : </strong> ⭐ {product.rating}</p>
            <p><strong>Stock : </strong> {product.stock}</p>
            <p><strong>Warranty : </strong> {product.warrantyInformation || "Not Available"}</p>
            <p><strong>Shipping : </strong> {product.shippingInformation || "Standard Shipping"}</p>
            <p><strong>Availability : </strong> {product.availabilityStatus || "Available"}</p>
            <p><strong>Return : </strong> {product.returnPolicy || "No Return Policy"}</p>
            <div className="reviews">
                <h3>Reviews</h3>

                {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
                    product.reviews.map((rev, index) => (
                        <div key={index} className="review-item">
                            <p className="rev-rating">⭐ {rev.rating}</p>
                            <p className="rev-comment">{rev.comment}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No Reviews Available</p>
                )}
            </div>


            <button className="backbtn" onClick={() => navigate("/")}>Back</button>
        </div>
    );
};

export default ProductDetails;

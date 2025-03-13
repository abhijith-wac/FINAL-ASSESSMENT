import React from "react";
import { Card, Badge } from "react-bootstrap";

const ProductCard = ({ item }) => {
    const finalPrice = item.sale_price ? parseFloat(item.sale_price) : parseFloat(item.price);

    return (
        <Card className="h-100 border-0 shadow-sm position-relative p-2">
            {!item.in_stock && (
                <Badge
                    bg="danger"
                    className="position-absolute top-0 start-50 translate-middle-x px-3 py-2 rounded-pill fs-6"
                >
                    Sold Out!
                </Badge>
            )}

            <Card.Img
                variant="top"
                src={item.image_link}
                alt={item.title}
                className="img-fluid rounded"
                style={{ height: "200px", objectFit: "contain", padding: "10px", backgroundColor: "#f8f9fa" }}
            />

            <Card.Body className="text-center">
                <Card.Title className="fw-medium fs-6 text-dark mb-3">{item.title}</Card.Title>

                <Card.Text className="fw-bold text-primary fs-4 mb-1">
                    KWD{" "}
                    {item.discount_percentage ? parseFloat(item.sale_price).toFixed(2) : parseFloat(item.price).toFixed(2)}
                </Card.Text>

                {/* Show original price + discount badge only if there's a discount */}
                {item.discount_percentage > 0 && (
                    <Card.Text className="fs-6 mb-2">
                        <span className="text-decoration-line-through me-2 text-muted">
                            KWD {parseFloat(item.price).toFixed(2)}
                        </span>
                        <span className="text-success fw-medium"> {item.discount_percentage}% off</span>
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
};

export default ProductCard;

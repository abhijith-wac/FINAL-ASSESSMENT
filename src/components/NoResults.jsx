import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NoResults = ({ query }) => {
  const navigate = useNavigate();


  return (
    <div className="text-center py-5">
      <img
        src="/images/shopping.png" 
        alt="No products found"
        style={{ width: "120px", marginBottom: "20px", height: "120px" }}
      />
      <p className="lead fs-4">
        Sorry! We couldn't find any products for <strong>'{query}'</strong>
      </p>
      <Button variant="primary" onClick={() => navigate("/")}>
        CONTINUE SHOPPING
      </Button>
    </div>
  );
};

export default NoResults;

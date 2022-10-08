import { Link } from "react-router-dom";

const ProductItem = ({itemImg, itemName, itemDescription, itemLink}) => {
	return (
        <div className="col">
            <div className="card h-100">
                <img src={itemImg} className="card-img-top p-3" alt={itemName} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">{itemName}</h5>
                    <p className="fs-3 text-primary fw-bold text-center card-text">
                        <span className="fs-5">from</span> {itemDescription !== "" ? itemDescription : "-"}<span className="fs-5">€</span>
                    </p>
                    <Link to={itemLink} className="btn btn-primary stretched-link mt-auto">
                        View more
                    </Link>
                </div>
            </div>
        </div>
	);
};

export default ProductItem

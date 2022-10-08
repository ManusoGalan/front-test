import { Link } from "react-router-dom";

const ProductItem = ({itemImg, itemName, itemDescription, itemLink}) => {
	return (
        <div className="col">
            <div className="card h-100">
                <img src={itemImg} className="card-img-top p-3" alt={itemName} />
                <div className="card-body d-flex flex-column justify-content-end">
                    <h5 className="card-title">{itemName}</h5>
                    <p className="card-text">{itemDescription}</p>
                    <Link to={itemLink} className="btn btn-primary">
                        View more
                    </Link>
                </div>
            </div>
        </div>
	);
};

export default ProductItem

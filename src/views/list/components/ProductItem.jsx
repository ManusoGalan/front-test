import { Link } from "react-router-dom";

const ProductItem = ({itemImg, itemName, itemDescription, itemLink}) => {
	return (
        <div className="col">
            <div className="card">
                <img src={itemImg} className="card-img-top" alt={itemName} />
                <div className="card-body">
                    <h5 className="card-title">{itemName}</h5>
                    <p className="card-text">{itemDescription}</p>
                    <Link to={itemLink} className="btn btn-primary">
                        Comprar
                    </Link>
                </div>
            </div>
        </div>
	);
};

export default ProductItem

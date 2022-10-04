import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { select } from '../../utils/dbconnector';
import ProductItem from './components/ProductItem';

const ProductList = () => {
	const ITEMS_PER_PAGE = 8;
	const [dbObject, tableName] = useLoaderData();

	const [page, setPage] = useState(0);
	const [items, setItems] = useState([]);

	useEffect(() => {
		select(dbObject, tableName, IDBKeyRange.bound(page * ITEMS_PER_PAGE, ((page + 1) * ITEMS_PER_PAGE) - 1)).then((newItems) => {
			setItems(newItems);
		});
	}, [page]);

	return (
		<div className="container">
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
				{items.map((item) => (
					<ProductItem key={item.id} itemImg={item.imgUrl} itemName={item.model} itemDescription={item.brand} itemLink={item.id} />
				))}
			</div>
		</div>
	);
};

export default ProductList;

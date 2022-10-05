import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { select } from '../../utils/dbconnector';
import Pagination from './components/Pagination';
import ProductItem from './components/ProductItem';
import SearchBar from './components/SearchBar';

const ProductList = () => {
	const ITEMS_PER_PAGE = 8;
	const [database, table] = useLoaderData();

	const [page, setPage] = useState(0);
	const [items, setItems] = useState([]);
	const [isSearching, setIsSearching] = useState(false)

	useEffect(() => {
		if(!isSearching) {
			select(database, table, IDBKeyRange.bound(page * ITEMS_PER_PAGE, ((page + 1) * ITEMS_PER_PAGE) - 1)).then((newItems) => {
				setItems(newItems);
			});
		}
	}, [page, isSearching]);

	return (
		<div className="container">
			<SearchBar database={database} table={table} searchSetter={setIsSearching} itemSetter={setItems}></SearchBar>
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-2 mb-4">
				{items.map((item) => (
					<ProductItem key={item.id} itemImg={item.imgUrl} itemName={item.model} itemDescription={item.brand} itemLink={item.id} />
				))}
			</div>
			{!isSearching ? <Pagination currentPage={page} currentPageSetter={setPage} numberOfPages={12}></Pagination> : ''}
		</div>
	);
};

export default ProductList;

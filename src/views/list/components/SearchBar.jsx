import { select } from '../../../utils/dbconnector';

const SearchBar = ({ database, table, searchSetter, itemSetter }) => {
	const search = (event) => {
		select(database, table, IDBKeyRange.bound(0, Number.MAX_VALUE)).then((allItems) => {
			const searchTerms = event.target.value.trim() === '' ? [] : event.target.value.trim().split(' ');
            let filteredItems = allItems;

            if(searchTerms.length) {
                searchSetter(true)
            } else {
                searchSetter(false)
            }

			for (const searchTerm of searchTerms) {
                filteredItems = filteredItems.filter((item) => {
                    let matchesSearchedTerms = false;

                    if (item.model.toLowerCase().match(new RegExp(`(${searchTerm})`)) || item.brand.toLowerCase().match(new RegExp(`(${searchTerm})`)))
                        matchesSearchedTerms = true;

                    return matchesSearchedTerms;
                });
			}

            itemSetter(filteredItems)
		});
	};

	return (
		<div className="input-group mt-4">
			<span className="input-group-text" id="search-icon">
                <i className="bi bi-search"></i>
			</span>
			<input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="search-icon" onInput={search} />
		</div>
	);
};

export default SearchBar;

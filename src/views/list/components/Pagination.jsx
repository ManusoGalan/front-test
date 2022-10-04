const Pagination = ({ currentPage, currentPageSetter, numberOfPages }) => {
    const getPaginationItems = (page, pageSetter, numberOfPages) => {
        switch (page) {
            case 0:
                return (
                    <>
                        <li class="page-item"><a class="page-link active" href="#" onClick={() => pageSetter(page)}>{(page + 1)}</a></li>
                        <li class="page-item"><a class="page-link" href="#" onClick={() => pageSetter(page + 1)}>{(page + 1) + 1}</a></li>
                        <li class="page-item"><a class="page-link" href="#" onClick={() => pageSetter(page + 2)}>{(page + 1) + 2}</a></li>
                    </>
                )
            case numberOfPages:
                return (
                    <>
                        <li class="page-item"><a class="page-link" href="#" onClick={() => pageSetter(page - 2)}>{(page + 1) - 2}</a></li>
                        <li class="page-item"><a class="page-link" href="#" onClick={() => pageSetter(page - 1)}>{(page + 1) - 1}</a></li>
                        <li class="page-item"><a class="page-link active" href="#" onClick={() => pageSetter(page + 2)}>{(page + 1)}</a></li>
                    </>
                )
            default:
                return (
                    <>
                        <li class="page-item"><a class="page-link" href="#" onClick={() => pageSetter(page - 1)}>{(page + 1) - 1}</a></li>
                        <li class="page-item"><a class="page-link active" href="#" onClick={() => pageSetter(page)}>{(page + 1)}</a></li>
                        <li class="page-item"><a class="page-link" href="#" onClick={() => pageSetter(page + 1)}>{(page + 1) + 1}</a></li>
                    </>
                )
                break;
        }
    }

	return (
		<nav aria-label="Products list navigation">
			<ul className="pagination justify-content-center">
				<li className="page-item">
					<a
						className={`page-link ${currentPage === 0 ? 'disabled' : ''}`}
						href="#"
						aria-label="Previous"
						onClick={() => {
							currentPage > 0 ? currentPageSetter(currentPage - 1) : false;
						}}
					>
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
                {
                    getPaginationItems(currentPage, currentPageSetter, numberOfPages)
                }
				<li className="page-item">
					<a
						className={`page-link ${currentPage === numberOfPages ? 'disabled' : ''}`}
						href="#"
						aria-label="Next"
						onClick={() => {
							currentPage < numberOfPages ? currentPageSetter(currentPage + 1) : false;
						}}
					>
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
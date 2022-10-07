const DetailItem = ({property, icon, content}) => {
    return (
        <div className="col">
            <div className="d-flex flex-row align-items-center justify-content-start h-100">
                <i className={`bi ${icon} fs-3`}></i>
                <div className="ps-3">
                    <span className="d-block text-secondary fw-semibold">{property}</span>
                    <span>{content}</span>
                </div>
            </div>
        </div>
    )
}

export default DetailItem;
import DetailItem from './Detailitem';

const Details = ({ productInfo }) => {
	const { chipset, ram, os, displaySize, battery, primaryCamera, secondaryCmera, dimentions, weight } = productInfo;

	return (
		<div className="w-100">
			<div className="row row-cols-2 g-3 align-items-stretch">
				<DetailItem property="Dimesions" icon="bi-phone" content={dimentions.split('(')[0].trim()}></DetailItem>
				<DetailItem property="Weight" icon="bi-box" content={`${weight} gr`}></DetailItem>
				<DetailItem property="Resolution" icon="bi-fullscreen" content={displaySize.split('(')[0].trim()}></DetailItem>
				<DetailItem property="OS" icon="bi-disc" content={os.split('(')[0].trim()}></DetailItem>
				<DetailItem property="CPU" icon="bi-cpu" content={chipset}></DetailItem>
				<DetailItem property="RAM" icon="bi-memory" content={ram}></DetailItem>
				<div className="col">
            		<div className="d-flex flex-row align-items-center justify-content-start h-100">
						<i className="bi bi-camera fs-3"></i>
						<div className="ps-3">
							<span className="d-block text-secondary fw-semibold">Camera(s)</span>
							<div className="d-flex flex-column">
								<span>Back: {primaryCamera[0]}</span>
								<span>
									Front: {secondaryCmera != undefined ? (Array.isArray(secondaryCmera) ? secondaryCmera[0] : secondaryCmera) : '-'}
								</span>
							</div>
						</div>
					</div>
				</div>
				<DetailItem property="Battery" icon="bi-battery" content={battery.split('(')[0].trim()}></DetailItem>
			</div>
		</div>
	);
};

export default Details;

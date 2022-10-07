import OptionItem from "./OptionItem";

const Options = ({ colorOptions, storageOptions }) => {
	return (
		<form>
			<div className="d-flex mb-3">
				<div className="w-50 me-3">
					<p className="fs-5 text-primary fw-semibold">Color<br/>options</p>
					<div className="btn-group" key={"btn-group-color"} role="group" aria-label="Basic radio toggle button group">
						{colorOptions.map((colorOption, index) => {
							return  <OptionItem key={`color-option-${colorOption.name.toLowerCase()}`} name={colorOption.name} radioGroupName="color" value={colorOption.value} isChecked={!index}></OptionItem>
						})}
					</div>
				</div>
				<div className="w-50 ms-3">
					<p className="fs-5 text-primary fw-semibold">Storage<br/>options</p>
					<div className="btn-group" key="btn-group-storage" role="group" aria-label="Basic radio toggle button group">
						{storageOptions.map((storageOption, index) => {
							return <OptionItem key={`storage-option-${storageOption.name.toLowerCase()}`} name={storageOption.name} radioGroupName="storage" value={storageOption.value} isChecked={!index}></OptionItem>
						})}
					</div>
				</div>
			</div>

			<button type="submit" className="btn btn-primary">
				Add to cart
			</button>
		</form>
	);
};

export default Options;

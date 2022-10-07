import OptionItem from "./OptionItem";

const Options = ({ colorOptions, storageOptions }) => {
	return (
		<form>
			<div className="btn-group" key={"btn-group-color"} role="group" aria-label="Basic radio toggle button group">
				{colorOptions.map((colorOption, index) => {
					return  <OptionItem key={`color-option-${colorOption.name.toLowerCase()}`} name={colorOption.name} radioGroupName="color" value={colorOption.value} isChecked={!index}></OptionItem>
				})}
			</div>

			<div className="btn-group" key="btn-group-storage" role="group" aria-label="Basic radio toggle button group">
				{storageOptions.map((storageOption, index) => {
					return <OptionItem key={`storage-option-${storageOption.name.toLowerCase()}`} name={storageOption.name} radioGroupName="storage" value={storageOption.value} isChecked={!index}></OptionItem>
				})}
			</div>

			<button type="submit" className="btn btn-primary">
				Primary
			</button>
		</form>
	);
};

export default Options;

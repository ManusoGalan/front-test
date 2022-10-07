const Options = ({ colorOptions, storageOptions }) => {
	return (
		<form>
			<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
				{colorOptions.map((colorOption, index) => {
					return (
						<>
							<input type="radio" value={colorOption.code} className="btn-check" name="color" id={colorOption.name.toLowerCase()} autocomplete="off" checked={!index}/>
							<label className="btn btn-outline-secondary" for={colorOption.name.toLowerCase()}>
								{colorOption.name}
							</label>
						</>
					);
				})}
			</div>

			<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
				{storageOptions.map((storageOption, index) => {
					return (
						<>
							<input type="radio" value={storageOption.code} className="btn-check" name="storage" id={storageOption.name.toLowerCase()} autocomplete="off" checked={!index}/>
							<label className="btn btn-outline-secondary" for={storageOption.name.toLowerCase()}>
								{storageOption.name}
							</label>
						</>
					);
				})}
			</div>

			<button type="submit" className="btn btn-primary">
				Primary
			</button>
		</form>
	);
};

export default Options;

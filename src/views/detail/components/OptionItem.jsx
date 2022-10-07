const OptionItem = ({name, radioGroupName, value, isChecked}) => {
    return (
        <>
            <input type="radio" value={value} className="btn-check" name={radioGroupName} id={name.toLowerCase()} autoComplete="off" defaultChecked={isChecked}/>
            <label className="btn btn-outline-secondary" htmlFor={name.toLowerCase()}>
                {name}
            </label>
        </>
    )
}

export default OptionItem
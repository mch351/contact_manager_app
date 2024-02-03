const ColorFull = WrappedComponent => {
    const colors = [
        "success",
        "warning",
        "info",
        "danger",
        "primary",
        "dark",
        "light"
    ];

    let randomColor = colors[Math.floor(Math.random() * 6)]
    let ClassName = `bg-${randomColor}`;

    return(props)=>{
        return(
            <div className={ClassName}>
                <WrappedComponent {...props}/>
            </div>
        )
    }
}

export default ColorFull
import SpinnerGIF from "../assets/Spinner_GIF.gif";

const Spinner = () => {
    return (
        <>
            <img src={SpinnerGIF} alt="loading_gif" className="d-block m-auto" style={{width: "200px"}}/>
        </>
    )
}

export default Spinner;
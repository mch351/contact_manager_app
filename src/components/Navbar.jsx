import {useLocation} from "react-router-dom";

import {SearchContact} from "./Index";
import {DARKBLUE, PALEBLUE} from "../helpers/Colors";
import ColorFull from "../hoc/ColorFull";

const Navbar = () => {

    const location = useLocation();

    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg"
            // style={{backgroundColor: DARKBLUE}}
        >
            <div className="container" dir="rtl">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i className="fas fa-id-badge" style={{color: PALEBLUE}}/>
                            {" "}وب اپلیکیشن مدیریت {" "}
                            <span style={{color: PALEBLUE}}>مخاطبین</span>
                        </div>
                    </div>
                    {/* @desc JS condition to display searchBox only in main page*/}
                    {location.pathname === "/contacts" ? (
                        <div className="col">
                            <SearchContact/>
                        </div>
                    ) : null
                    }

                </div>
            </div>
        </nav>)
}

export default ColorFull(Navbar);
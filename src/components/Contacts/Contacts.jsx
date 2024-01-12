import {useContext} from "react";

import {Spinner,Contact} from "../Index"
import {ContactContext} from "../../context/ContactContext";
import {RED, YELLOW} from "../../helpers/Colors";
import {Link} from "react-router-dom";

const Contacts = () => {
    const {filteredContacts,loading,deleteContact}=useContext(ContactContext);

    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col pt-3">
                            <p className="h3">
                                <Link to="/contacts/add" className="btn" style={{backgroundColor: RED}}>
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2"></i>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* @desc condition for loaded or unloaded*/}
            {
                loading ? <Spinner/> :

                    // @desc Show NotFound_Gif
                    (
                        <section className="container" dir="rtl">
                            <div className="row">

                                {/* @desc condition for displaying or not displaying contacts*/}
                                {
                                    filteredContacts.length > 0 ?(
                                        filteredContacts.map((c) =>(
                                            <Contact
                                                key={c.id}
                                                deleteContact={() =>
                                                    // @desc this `confirmDelete` is taken from Props
                                                    deleteContact(c.id, c.fullname)
                                                }
                                                contact={c}
                                            />))) :
                                        (
                                            <div className="text-center py-5">
                                                <p className="h3" style={{color: YELLOW}}>مخاطب یافت نشد ...</p>
                                                <img src={require("../../assets/404_error.gif")} alt="پیدا نشد"
                                                     className="w-25"/>
                                            </div>
                                        )
                                }

                            </div>
                        </section>
                    )
            }
        </>
    )
}

export default Contacts;
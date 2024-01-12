import {BLUE, PALEBLUE, RED, WHITE, YELLOW} from "../../helpers/Colors";
import React from "react";
import {Link} from "react-router-dom";

const Contact = ({contact,deleteContact}) => {
    return (
        <div className="col-md-6">
            <div className="card my-2" style={{backgroundColor: WHITE}}>
                <div className="card-body">
                    <div className="row align-items-center d-flex justify-content-around">

                        {/*pictures of Contacts*/}
                        <div className="col-md-4 col-sm-4">
                            {/*@desc condition for show real image*/}
                            <img src={
                                contact.photo!==""? contact.photo : "https://placehold.co/600x400"
                            }
                                 alt={contact.fullname}
                                 style={{border: `1px solid ${BLUE}`}}
                                 className="img-fluid rounded"
                            />
                        </div>

                        {/*Contacts information*/}
                        <div className="col-md-6 col-sm-6">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                    نام و نام خانوادگی:{" "}
                                    <span className="fw-bold">{contact.fullname}</span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    شماره تلفن:{" "}
                                    <span className="fw-bold">{contact.mobile}</span>
                                </li>

                                <li className="list-group-item list-group-item-dark">
                                    ادرس ایمیل:{" "}
                                    <span className="fw-bold">{contact.email}</span>
                                </li>
                            </ul>
                        </div>

                        {/*Buttons in card*/}
                        <div className="col-md-2 col-sm-2 flex-column align-items-center">
                            <Link to={`/contacts/${contact.id}`} className="btn my-1" style={{backgroundColor: YELLOW}}>
                                <i className="fa fa-eye"/>
                            </Link>

                            <Link to={`/contacts/edit/${contact.id}`} className="btn my-1" style={{backgroundColor: PALEBLUE}}>
                                <i className="fa fa-pen"/>
                            </Link>

                            <button onClick={deleteContact} className="btn my-1" style={{backgroundColor: RED}}>
                                <i className="fa fa-trash"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
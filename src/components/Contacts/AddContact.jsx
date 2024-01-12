import {useContext} from "react";
import {Link} from "react-router-dom";
import {Formik, Field, Form, ErrorMessage} from "formik";

import {contactSchema} from "../../validations/contactValidayion";
import {ContactContext} from "../../context/ContactContext";
import {Spinner} from "../Index";
import {RED, YELLOW} from "../../helpers/Colors"


const AddContact = () => {
    const {loading, groups, createContact} = useContext(ContactContext);


    return (<>
            {/*condition to show spinner or contacts*/}
            {loading ? (<Spinner/>) : (<section dir="rtl" className="p-3">
                <img
                    alt="man_laptop"
                    src={require("../../assets/man_laptop.png")}
                    height="400px"
                    style={{
                        position: "absolute", zIndex: "-1", top: "130px", left: "100px", opacity: "50%"
                    }}
                />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 fw-bold text-center"
                               style={{color: YELLOW}}
                            >ساخت مخاطب جدید</p>
                        </div>
                    </div>
                    <hr style={{backgroundColor: "green"}}/>
                    <div className="row mt-5">
                        <div className="col-md-4">
                            <Formik
                                initialValues={{
                                    fullname: "", photo: "", mobile: "", email: "", job: "", group: "",
                                }}
                                validationSchema={contactSchema}
                                onSubmit={(values) => {
                                    createContact(values);
                                }}
                            >
                                <Form
                                    // onSubmit={formik.handleSubmit}
                                >

                                    <div className="mb-2">
                                        {/*instead of input*/}
                                        <Field
                                            // id="fullname"
                                            name="fullname"
                                            // value={formik.values.fullname}
                                            // name="fullname"
                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                            className="form-control"
                                            type="text"
                                            placeholder="نام و نام خانوادگی"
                                            // required={true}
                                        />
                                    </div>
                                    {/*{formik.touched.fullname && formik.errors.fullname ?*/}
                                    {/*    <div className="text-danger">{formik.errors.fullname}</div> : null}*/}
                                    <ErrorMessage name="fullname"
                                                  render={msg => <div className="text-danger">{msg}</div>}/>


                                    {/*NOTE I applied these changes to everyone*/}
                                    <div className="mb-2">
                                        <Field
                                            // id="photo"
                                            name="photo"
                                            // value={formik.values.photo}
                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                            type="text"
                                            className="form-control"
                                            placeholder="آدرس تصویر"
                                            // required={false}
                                        />
                                    </div>
                                    <ErrorMessage name="photo"
                                                  render={msg => <div className="text-danger">{msg}</div>}/>
                                    <div className="mb-2">
                                        <Field
                                            type="number"
                                            // id="mobile"
                                            name="mobile"
                                            // value={formik.values.mobile}
                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                            className="form-control"
                                            placeholder="شماره همراه"
                                            // required={true}
                                        />
                                    </div>
                                    <ErrorMessage name="mobile"
                                                  render={msg => <div className="text-danger">{msg}</div>}/>
                                    <div className="mb-2">
                                        <Field
                                            type="email"
                                            // id="email"
                                            name="email"
                                            // value={formik.values.email}
                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                            className="form-control"
                                            placeholder="ایمیل"
                                            // required={true}
                                        />
                                    </div>
                                    <ErrorMessage name="email"
                                                  render={msg => <div className="text-danger">{msg}</div>}/>
                                    <div className="mb-2">
                                        <Field
                                            type="text"
                                            // id="job"
                                            name="job"
                                            // value={formik.values.job}
                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                            className="form-control"
                                            placeholder="شغل"
                                            // required={true}
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <Field
                                            // id="group"
                                            name="group"
                                            as="select"
                                            // value={formik.values.group}
                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                            className="form-control"
                                            // required={true}
                                        >
                                            <option value="">انتخاب گروه</option>
                                            {/*@desc JS Code*/}
                                            {/*@desc condition: if both condition are true, the code is executed*/}
                                            {groups.length > 0 && groups.map((group) => (<option key={group.id}
                                                                                                 value={group.id}>{group.name}</option>))}
                                        </Field>
                                    </div>
                                    <ErrorMessage name="group"
                                                  render={msg => <div className="text-danger">{msg}</div>}/>

                                    <div className="mx-2">
                                        <input
                                            placeholder="ثبت"
                                            type="submit"
                                            className="btn"
                                            style={{backgroundColor: YELLOW}}
                                        />
                                        <Link
                                            to={"/contacts"}
                                            className="btn mx-2"
                                            style={{backgroundColor: RED}}
                                        >
                                            انصراف
                                        </Link>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>)}
        </>
    )
}

export default AddContact;
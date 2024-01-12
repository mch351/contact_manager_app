import {useEffect, useContext} from "react";

import {Link, useNavigate, useParams} from "react-router-dom";
import {Formik, Field, Form, ErrorMessage} from "formik";
import {useImmer} from "use-immer"
import {toast} from "react-toastify"

import {ContactContext} from "../../context/ContactContext"
import {getContact, updateContact} from "../../services/contactServices";
import {RED, YELLOW, BLUE} from "../../helpers/Colors";
import {Spinner} from "../Index";
import {contactSchema} from "../../validations/contactValidayion";

const EditContact = () => {
    // @desc to get id from URL
    const {contactId} = useParams();
    const {
        setContacts,
        setFilteredContacts,
        loading,
        setLoading,
        groups
    } = useContext(ContactContext);

    const navigate = useNavigate();

    const [contact, setContact] = useImmer({})

    useEffect(() => {

        // @desc to put contact's data in inputs
        const fetchData = async () => {
            try {
                setLoading(true);
                const {data: contactData} = await getContact(contactId);
                setContact(contactData);
                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    // const onContactChange = (event) => {
    //     setContact({
    //         ...contact, [event.target.name]: event.target.value
    //     });
    // };

    const submitForm = async (values) => {
        try {
            setLoading(true);
            const {data, status} = await updateContact(values, contactId);

            /*
            * NOTE
            * the ways for hotReload after changing contact
            * 1- forceRender -> setForceRender(true)
            * 2- send Request Server
            * 3- update Local State (used for EditContact)
            * 4- Update Local State before sending request to Server
            * */

            // @desc if data is updated successfully, user will return to "/contacts"
            if (status === 200) {
                setLoading(true);

                toast.success("مخاطب اپدیت داد بیرون",{icon:"👍"})
                // const allContacts = [...contacts];
                // const contactIndex = allContacts.findIndex((c) => c.id === parseInt(contactId));
                // allContacts[contactIndex] = {...data};

                setContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id === parseInt(contactId));
                    draft[contactIndex] = {...data};
                });
                setFilteredContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id === parseInt(contactId));
                    draft[contactIndex] = {...data};
                });

                navigate("/contacts");
                setLoading(false);
            }
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }


    return (
        <>
            {loading ? <Spinner/> : (
                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p className="h4 fw-bold" style={{color: RED}}>
                                        ویرایش مخاطب
                                    </p>
                                </div>
                            </div>
                            <hr style={{backgroundColor: RED}}/>
                            <div className="row p-2 w-75 mx-auto align-items-center rounded-1"
                                 style={{backgroundColor: BLUE}}>
                                <div className="col-md-8">

                                    <Formik
                                        initialValues={
                                            contact

                                            // {fullname: contact.fullname,
                                            //     photo: contact.photo,
                                            //     mobile: contact.mobile,
                                            //     email: contact.email,
                                            //     job: contact.job,
                                            //     group: contact.group,}
                                        }
                                        validationSchema={contactSchema}
                                        onSubmit={(values) => {
                                            submitForm(values);
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
                                                    value="ثبت"
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
                                <div className="col-md-4">
                                    <img src={contact.photo} alt={`تصویر : ${contact.name}`}/>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <img
                                src={require("../../assets/man_laptop.png")} alt=""
                                height="300vm"
                                style={{opacity: "50%"}}
                            />
                        </div>

                    </section>

                </>
            )}
        </>
    )
}

export default EditContact;
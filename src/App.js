import { useEffect} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import {useImmer} from "use-immer"
import {ToastContainer,toast} from "react-toastify"

import _ from "lodash";

import {ContactContext} from "./context/ContactContext";
import {Navbar, Contacts, AddContact, EditContact, ViewContact} from "./components/Index";

import './App.css';
import {createContact, deleteContact, getAllContacts, getAllGroups} from "./services/contactServices";
import {DARKBLUE, PALEBLUE, RED, WHITE, YELLOW} from "./helpers/Colors";

const App = () => {

    // NOTE useImmer instead of useState
    const [loading, setLoading] = useImmer(false);
    const [contacts, setContacts] = useImmer([]);
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    const [groups, setGroups] = useImmer([]);
    // NOTE State to set data from "/contacts/add"
    // const [contact, setContact] = useImmer({});
    // const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // NOTE Getting data From The DataBase
        const fetchData = async () => {
            try {
                setLoading(true);

                const {data: contactsData} = await getAllContacts();
                const {data: groupsData} = await getAllGroups();

                setContacts(contactsData);
                setFilteredContacts(contactsData);
                setGroups(groupsData);

                setLoading(false);

            } catch (err) {
                console.log(err.message);
            }
        }
        fetchData();
    }, [])

    // NOTE This event is fired when the form is submitted by the user.
    const createContactForm = async (values) => {
        // NOTE This event occurs when the form is submitted by the user. By default, when the form is submitted, the page is refreshed. However, when the code `event.preventDefault()` is used, the default actions of the form are not executed and the page is not refreshed.*/
        // event.preventDefault();
        try {
            setLoading(true);

            const {status, data} = await createContact(values);

            // NOTE A copy is taken from all the contacts in the states ->  ...contacts
            // NOTE If contact is successfully registered, the value of getContact is cleared to register next contact
            // and user is redirected to "/contacts"
            if (status === 201) {
                toast.success("تبریک، شما یه نفر رو افریدی",{icon:"😎"})
                // const allContact = [...contacts, data];
                // setContacts(allContact);
                // setFilteredContacts(allContact);

                setContacts(draft => {
                    draft.push(data)
                })
                setFilteredContacts(draft => {
                    draft.push(data)
                })
                // setContact({});
                // setErrors([]);
                setLoading(false);
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
            // setErrors(err.inner);
            setLoading(false)
        }
    }

    // NOTE Get and set data from "contacts/add"
    // const onContactChange = (event) => {
    //     /*
    //     * NOTE ...getContact copies all the information from the getContact state into the array that is setting the information.
    //     * [event.target.name] specifies which input the user is currently making a change to,
    //     *  and event.target.value contains the value of that input.
    //     */
    //     setContact({...contact, [event.target.name]: event.target.value});
    // }

    // NOTE custom AlertWindow
    const confirmDelete = (contactId, contactFullname) => {
        confirmAlert({
            customUI: ({onClose}) => {
                // @desc JSX Code
                return (<div dir="rtl"
                             style={{
                                 backgroundColor: DARKBLUE, border: `1px solid ${PALEBLUE}`, borderRadius: "1em"
                             }}
                             className="p-4">
                    <h1 style={{color: YELLOW}}>پاک کردن مخاطب</h1>
                    <p style={{color: WHITE}}>از پاک کردن {contactFullname} اطمینان دارید ؟</p>
                    <button onClick={() => {
                        removeContact(contactId);
                        onClose();
                    }}
                            className="btn mx-2"
                            style={{backgroundColor: PALEBLUE}}
                    >
                        بله
                    </button>
                    <button onClick={onClose} className="btn" style={{backgroundColor: RED}}>
                        انصراف
                    </button>
                </div>)
            }
        })
    }

    const removeContact = async (contactID) => {
        /*
            * NOTE
            * the ways for hotReload after changing contact
            * 1- forceRender -> setForceRender(true)
            * 2- send Request Server
            * 3- delete Local State (used for UpdateContact)
            * 4- delete Local State before sending request to Server (used for removeContact)
            * */

        /* The 4th Way
        *Copy State
        *Update State
        * Send Request
        * if status===200 -> do nothing
        * elseIf status !== 200 -> setState(CopyState)
        */

        // Contacts Copy
        const contactsBackup = [...contacts];

        try {
            setLoading(true);

            setContacts(draft => draft.filter(c => c.id !== contactID))
            setFilteredContacts(draft => draft.filter(c => c.id !== contactID))

            // Sending Delete Request
            const {status} = await deleteContact(contactID);

            toast.error("مخاطب با موفقیت به فنا رفت",{icon:"💣😂"})

            if (status !== 200) {
                // const {data: contactsData} = await getAllContacts();
                setContacts(contactsBackup);
                setFilteredContacts(contactsBackup);

            }
            setLoading(false);
        } catch (err) {
            console.log(err.message);
            setContacts(contactsBackup);
            setFilteredContacts(contactsBackup);
            setLoading(false);
        }
    }

    // let filterTimeOut;
    // NOTE using Lodash
    const contactSearch = _.debounce(query => {
        if (!query) return setFilteredContacts([...contacts]);

        console.log(query);

        // setFilteredContacts(contacts.filter((contact) => {
        //     return contact.fullname
        //         .toLocaleLowerCase()
        //         .includes(query.toLowerCase());
        // }));

        setFilteredContacts(draft => draft.filter(c =>
            c.fullname.toLowerCase().includes(query.toLowerCase())
        ));

    }, 1000)
    return (// @desc Set Contexts Value
        // In JS When Both Key And Value Are The Same Name, We Can Write Only One Of Theme Like: "loading" instead "loading:loading"
        <ContactContext.Provider value={{
            loading: loading,
            setLoading: setLoading,
            // contact: contact,
            setContacts: setContacts,
            filteredContacts: filteredContacts,
            setFilteredContacts: setFilteredContacts,
            contacts: contacts,
            groups: groups,
            // errors:errors,
            // onContactChange: onContactChange,
            deleteContact: confirmDelete,
            createContact: createContactForm,
            contactSearch: contactSearch,
        }}>
            <div className="App">
                <ToastContainer rtl={true} position="top-right" theme="colored" autoClose={4000}/>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts"/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/contacts/add" element={<AddContact/>}/>
                    <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                    <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
                </Routes>
            </div>
        </ContactContext.Provider>);
}

export default App;

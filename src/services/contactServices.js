import axios from "axios";

// const SERVER_URL = "http://localhost:9000";
const SERVER_URL = "mysql://root:Fyd9d4i5CKsyqRvBzH8IGEQB@contact-manager-server:3306/nostalgic_jepsen";


// @desc Get All Contacts
// @route GET http://localhost:9000/contacts
export const getAllContacts = () => {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

// @desc Get Contact with Contact ID
// @route GET http://localhost:9000/contacts/:contactId
export const getContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);
}

// @desc Get All Groups
// @route GET http://localhost:9000/groups
export const getAllGroups = () => {
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
}

// @desc Get group with group ID
// @route GET http://localhost:9000/groups/:groupid
export const getGroup = (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
}

// @desc Create New Contact
// @route POST http://localhost:9000/contacts
export const createContact = (contact) => {
    const url = `${SERVER_URL}/contacts`
    return axios.post(url, contact)
}

// @desc Update Contact
// @route PUT http://localhost:9000/contacts/contactId
export const updateContact = (contact, contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url, contact);
}

// @desc Delete Contact
// @route DELETE http://localhost:9000/contacts/contactId
export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
}
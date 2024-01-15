import { nanoid } from 'nanoid';

const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join('db', 'contacts.json')

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}


async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.filter((c) => c.id === contactId);
    if (index === -1) {
      return null;
    }
    const [deleteContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null));
  return deleteContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
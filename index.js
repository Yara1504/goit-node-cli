import { program } from "commander";
const contacts = require('./contacts')

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table("All contacts:", allContacts);

      break;

    case "get":
      const getContact = await contacts.getContactById();
      console.table("Find contact:", getContact);

      break;

    case "add":
      await contacts.addContact(name, email, phone);
      console.table("contact successfully added!");

      break;

    case "remove":
      const deleteContact = await contacts.removeContact();
      console.table("Contact removed:", deleteContact);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

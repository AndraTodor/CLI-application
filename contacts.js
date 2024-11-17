const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.error("Failed to list contacts:", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data); // Citește și parsează fișierul JSON

    const contact = contacts.find((contact) => contact.id === contactId);

    if (contact) {
      console.log(contact);
    } else {
      console.log(`Contact with ID "${contactId}" not found.`);
    }
  } catch (error) {
    console.error("Failed to get contact by ID:", error.message);
  }
}

async function removeContact(contactId) {
  try {
    // Citește lista de contacte
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data) || [];

    // Verifică dacă ID-ul există în listă
    const contactExists = contacts.some((contact) => contact.id === contactId);
    if (!contactExists) {
      console.log(`Contact with ID "${contactId}" not found.`);
      return null;
    }

    // Filtrează lista pentru a elimina contactul cu ID-ul specificat
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    // Scrie lista actualizată în fișier
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    console.log(`Contact with ID "${contactId}" removed successfully.`);

    return filteredContacts;
  } catch (error) {
    console.error("Failed to remove contact:", error.message);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data) || [];
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("New contact added:", newContact);
  } catch (error) {
    console.error("Failed to add contact:", error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

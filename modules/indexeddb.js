let db;
const dbName = "contactDb";
let transaction;
const testData = [
    { name: "John Doe", email: "jd@mail.com", phone: "123-456-7890" },
    { name: "Jane Smith", email: "jmail.com", phone: "987-654-3210" },
]

let lastAddedId = 0; // Variable to keep track of the last added ID

const emailInput = document.getElementById("email-input");
const nameInput = document.getElementById("username-input");
const phoneInput = document.getElementById("phone-input");
const loadContactsBtn = document.getElementById("load-contacts-btn");
const addContactBtn = document.getElementById("add-contact-btn");
const deleteContactBtn = document.getElementById("delete-contact-btn");

function addEventListeners() {
    loadContactsBtn.addEventListener("click", (event) => getObject("id", true));
    addContactBtn.addEventListener("click", (event) => addContact(event));
    deleteContactBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (lastAddedId) {
            removeObject(lastAddedId);
            lastAddedId = 0; // Reset last added ID after deletion
        } else {
            console.warn("No contact to delete.");
        }
    });
    console.log("Listeners added");
}

function openDB(){
    // Let us open our database
    const request = window.indexedDB.open(dbName, 3);
    request.onerror = (event) => {
      // Do something with request.error!
        console.error("Database error: ", event.target.error);
    };
    request.onsuccess = (event) => {
      // Do something with request.result!
      db = event.target.result;
      console.log("Database opened successfully: ", db);
    };

    // This event is only implemented in recent browsers
    request.onupgradeneeded = (event) => {
        // Save the IDBDatabase interface
        db = event.target.result;

        // Create an objectStore for this database
        // id allows autogeneneration of keys
        const objectStore = db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });

        objectStore.transaction.oncomplete = (event) => {
            // Store values in the newly created objectStore.
            const contactObjectStore = db.transaction("contacts", "readwrite").objectStore("contacts");
            // Add test data to the object store
            testData.forEach((contact) => {
                contactObjectStore.add(contact);
            });
        }
    };
}   

function addObjects(object) {
    if (!db) {
        console.error("Database not initialized. Call openDB() first.");
        return;
    }
    const transaction = db.transaction(["contacts"], "readwrite");
    const objectStore = transaction.objectStore("contacts");
    console.log("Adding contact: ", object);
    const request = objectStore.add(object);
    request.onsuccess = (event) => {
        lastAddedId = event.target.result;
        console.log("Contact added to the store with id: ", event.target.result);
    };
    request.onerror = (event) => {
        // Handle errors!
        console.error("Error adding contact: ", event.target.error);
    };
}

function removeObject(id) {
    if (!db) {
        console.error("Database not initialized. Call openDB() first.");
        return;
    }
    const request = db.transaction(["contacts"], "readwrite")
                        .objectStore("contacts")
                        .delete(id);
    request.onsuccess = (event) => {
        console.log("Contact deleted from the store with id: ", id);
    };
}

function getObject(id, all) {
    if (!db) {
        console.error("Database not initialized. Call openDB() first.");
        return;
    }
    const transaction = db.transaction(["contacts"]);
    const objectStore = transaction.objectStore("contacts");
    if (all) {
        const request = objectStore.getAll();
        request.onsuccess = (event) => {
            // Do something with the request.result!
            console.log("All contacts: ", event.target.result);
        };
        request.onerror = (event) => {
            // Handle errors!
            console.error("Error fetching contacts: ", event.target.error);
        };
    }
    else {
        const request = objectStore.get(id);
        request.onerror = (event) => {
            // Handle errors!
            console.error("Error fetching contact: ", event.target.error);
        };
        request.onsuccess = (event) => {
            // Do something with the request.result!
            console.log(`Name for ID ${id} is ${request.result.name}`);
        };
    }
}

function editObject(id, updatedData) {
    if (!db) {
        console.error("Database not initialized. Call openDB() first.");
        return;
    }
    const objectStore = db.transaction(["contacts"], "readwrite")
                            .objectStore("contacts");
    const request = objectStore.get(id);
    request.onerror = (event) => {
        // Handle errors!
        console.error("Error fetching contact: ", event.target.error);
    };
    request.onsuccess = (event) => {
        // Get the old value that we want to update
        const data = event.target.result;

        // update the value(s) in the object that you want to change
        data.name = updatedData.name;
        data.email = updatedData.email;
        data.phone = updatedData.phone;

        // Put this updated object back into the database.
        const requestUpdate = objectStore.put(data);
        requestUpdate.onerror = (event) => {
            // Do something with the error
            console.error("Error updating contact: ", event.target.error);
        };
        requestUpdate.onsuccess = (event) => {
            // Success - the data is updated!
            console.log("Contact updated successfully: ", event.target.result);
        };
    };

}

function getAllContacts(event, keyPath, all) {
    event.preventDefault();
    getObject(keyPath, all);
}

function addContact(event) {
    event.preventDefault();
    const contacts = [];
    const newContact = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    };
    contacts.push(newContact);
    contacts.forEach(contact => {
        addObjects(contact);
    });
}

function main(){
    console.log("IndexedDB module loaded successfully");
    addEventListeners();
    openDB();
}

main();
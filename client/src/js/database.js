import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");

  // Connect to Database
  const jateDb = await openDB("jate",1);
  // Create a transection by declaring database and data actions
  const tx = jateDb.transaction("jate", "readwrite");
  // Open object store
  const store = tx.objectStore("jate");
  // Update data in the database
  const request = store.put({ id:1, content: content});
  // Get information of the request
  const result = await request;
  console.log("Data saved to the database!", result);
  

}
// console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all from database");
  // Connect to database
  const jateDb = await openDB ("jate", 1);
  // Create a transection by declaring database and data actions
  const tx = jateDb.transaction("jate", "readonly");
  // Open object store
  const store = tx.objectStore("jate");
  // Get contents from database
  const request = store.get(1);
  // Get information of the request
  const result = await request;
  if (result) {
    console.log ("Data retrieved from database", result.value);
  } else {
    console.log("No data was found from database");
  }

}

// console.error('getDb not implemented');

initdb();

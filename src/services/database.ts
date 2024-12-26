import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  FirestoreError,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { User } from "../types";
import { db } from "../config/firebase";

// Get collection data
const getCollectionFromDB = async <T>(schema: string): Promise<T[]> => {
  try {
    // Get collection reference
    const reference = collection(db, schema);

    // Get documents
    const { docs } = await getDocs(reference);

    return docs.map((document) => {
      return { ...document.data(), id: document.id } as T;
    });
  } catch (err) {
    if (err instanceof FirestoreError) {
      // Firebase error
      throw new Error(`Firestore error: ${err.message}`);
    } else {
      // Other error
      throw new Error(`Unexpected error: ${(err as Error).message}`);
    }
  }
};

// Get a document by id
const getDocFromCollection = async <T>(
  schema: string,
  id: string
): Promise<T> => {
  try {
    // Get document reference
    const reference = doc(db, schema, id);

    // Get document
    const document = await getDoc(reference);
    return { ...document.data(), id: document.id } as T;
  } catch (err) {
    if (err instanceof FirestoreError) {
      // Firebase error
      throw new Error(`Firestore error: ${err.message}`);
    } else {
      // Other error
      throw new Error(`Unexpected error: ${(err as Error).message}`);
    }
  }
};

// Add a new document
const addDocInCollection = async (schema: string, document: DocumentData) => {
  try {
    // Get collection reference
    const reference = collection(db, schema);

    // Add document
    const response = await addDoc(reference, document);
    return response.id;
  } catch (err) {
    if (err instanceof FirestoreError) {
      // Firebase error
      throw new Error(`Firestore error: ${err.message}`);
    } else {
      // Other error
      throw new Error(`Unexpected error: ${(err as Error).message}`);
    }
  }
};

const addDocInCollectionWithId = async (
  schema: string,
  document: DocumentData
) => {
  try {
    // Create a new document
    const newDocRef = doc(collection(db, schema));
    document.id = newDocRef.id;

    // Add the new document with a new id
    await setDoc(newDocRef, document);

    return document.id;
  } catch (err) {
    if (err instanceof FirestoreError) {
      // Firebase error
      throw new Error(`Firestore error: ${err.message}`);
    } else {
      // Other error
      throw new Error(`Unexpected error: ${(err as Error).message}`);
    }
  }
};

// Update a document
const updateDocInCollection = async (
  schema: string,
  id: string,
  document: DocumentData
) => {
  try {
    // Get document reference
    const reference = doc(db, schema, id);

    // Update document
    const response = await updateDoc(reference, document);
    return response;
  } catch (err) {
    if (err instanceof FirestoreError) {
      // Firebase error
      throw new Error(`Firestore error: ${err.message}`);
    } else {
      // Other error
      throw new Error(`Unexpected error: ${(err as Error).message}`);
    }
  }
};

// Delete a document
const deleteDocInCollection = async (schema: string, id: string) => {
  try {
    // Get document reference
    const reference = doc(db, schema, id);

    // Delete document
    const response = await deleteDoc(reference);
    return response;
  } catch (err) {
    if (err instanceof FirestoreError) {
      // Firebase error
      throw new Error(`Firestore error: ${err.message}`);
    } else {
      // Other error
      throw new Error(`Unexpected error: ${(err as Error).message}`);
    }
  }
};

// Get user details
const getUserDetails = async (id: string): Promise<User> => {
  try {
    // Get users collection reference
    const users = collection(db, "users");

    const q = query(users, where("id", "==", id));

    const querySnapshot = await getDocs(q);

    let userDetails: User = {
      id: "",
      name: "",
      email: "",
      phone: "",
      birthday: "",
      gender: "",
      contactName: "",
      contactPhone: "",
      isAdmin: false,
      isActive: false,
      credits: 0,
      isSuperAdmin: false,
      createdAt: 0,
      updatedAt: 0,
    };

    querySnapshot.forEach((doc) => {
      userDetails = { ...doc.data(), id: doc.id } as User;
    });

    return userDetails;
  } catch (err) {
    if (err instanceof FirestoreError) {
      // Firebase error
      throw new Error(`Firestore error: ${err.message}`);
    } else {
      // Other error
      throw new Error(`Unexpected error: ${(err as Error).message}`);
    }
  }
};

export const databaseCtrl = {
  getCollection: getCollectionFromDB,
  getDoc: getDocFromCollection,
  addDoc: addDocInCollection,
  addDocWithId: addDocInCollectionWithId,
  getUser: getUserDetails,
  updateDoc: updateDocInCollection,
  deleteDoc: deleteDocInCollection,
};

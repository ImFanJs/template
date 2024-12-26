import { FirestoreError } from "firebase/firestore";
import { databaseCtrl } from "../services";

// Returns first letter in uppercase
// Example: Jose => J
export const createAvatar = (input: string): string => {
  if (!input) return input;
  return input.charAt(0).toUpperCase();
};

// Timestamp revalidation
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp); // Crea un objeto Date con el timestamp
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, // 24h format
  };
  return date.toLocaleDateString("es-Mx", options); // Formating date for spanish
};

// Format number to Mexican price format
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Function to get the any prop from the document by id
// prop by default is 'name'
export const getPropById = async (
  schema: string,
  id: string,
  prop = "name"
): Promise<string> => {
  try {
    // Firebase Get Doc
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const document: any = await databaseCtrl.getDoc<{ prop: string }>(
      schema,
      id
    );

    // Return name field
    if (document[prop]) {
      return document[prop];
    } else {
      throw new Error(`this document does not contain a ${prop} field`);
    }
  } catch (err) {
    if (err instanceof FirestoreError) {
      // Error de Firebase
      throw new Error(`Firestore error: ${err.message}`);
    } else {
      // Otro error
      throw new Error(`Unexpected error: ${(err as Error).message}`);
    }
  }
};

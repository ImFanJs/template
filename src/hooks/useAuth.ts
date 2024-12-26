import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { databaseCtrl } from "../services";
import { User } from "../types";

export const useAuth = () => {
  const auth = getAuth();
  const [session, setSession] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = onAuthStateChanged(auth, async (user) => {
      setSession(user);
      setLoading(true);

      if (user) {
        try {
          const userDetails = await databaseCtrl.getUser(user.uid);
          setUser(userDetails);
        } catch (error) {
          console.error("Error fetching user: ", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => getSession(); // Clean up function to unsubscribe from listener when unmounted
  }, []);

  return { session, loading, user };
};

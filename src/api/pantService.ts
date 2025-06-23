import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

export async function savePantData(
  bottles: number,
  cans: number,
  totalKr: number
) {
  const docRef = await addDoc(collection(db, "receipts"), {
    bottles,
    cans,
    totalKr,
    timestamp: new Date(),
  });

  return { id: docRef.id };
}

export async function getLastPantEntry() {
  const q = query(
    collection(db, "receipts"),
    orderBy("timestamp", "desc"),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  const doc = querySnapshot.docs[0];
  return doc ? doc.data() : null;
}

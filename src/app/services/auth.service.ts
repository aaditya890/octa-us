import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  firestore = inject(Firestore);

  // ⬇️ Submit new enquiry with createdAt timestamp
  async submitEnquiry(enquiry: any) {
    const enquiryRef = collection(this.firestore, 'enquiries');
    await addDoc(enquiryRef, {
      ...enquiry,
      createdAt: serverTimestamp()
    });
  }

  // ⬇️ Get all enquiries ordered by createdAt DESC
async getAllEnquiries(): Promise<any[]> {
  const enquiryRef = collection(this.firestore, 'enquiries');
  const q = query(enquiryRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}


  // ⬇️ Delete by ID
  deleteEnquiryById(id: string) {
    const enquiryDoc = doc(this.firestore, 'enquiries', id);
    return deleteDoc(enquiryDoc);
  }
}

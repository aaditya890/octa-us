import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  firestore = inject(Firestore);

  async submitEnquiry(enquiry: any) {
    const enquiryRef = collection(this.firestore, 'enquiries');
    await addDoc(enquiryRef, enquiry);
  }

  // ✅ Get all enquiries (promise-based)
  async getAllEnquiries(): Promise<any[]> {
    const enquiryRef = collection(this.firestore, 'enquiries');
    const snapshot = await getDocs(enquiryRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  // ✅ Delete by ID
  deleteEnquiryById(id: string) {
    const enquiryDoc = doc(this.firestore, 'enquiries', id);
    return deleteDoc(enquiryDoc);
  }
}

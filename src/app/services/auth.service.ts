import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   firestore = inject(Firestore);

  async submitEnquiry(enquiry: any) {
    const enquiryRef = collection(this.firestore, 'enquiries');
    await addDoc(enquiryRef, enquiry);
    console.log('✔️ Enquiry saved:', enquiry);
  }
}

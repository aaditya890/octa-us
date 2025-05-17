import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Firestore, doc, setDoc, getDoc, collection, addDoc, collectionData, getDocs, deleteDoc, updateDoc, Timestamp, query, where, orderBy } from '@angular/fire/firestore';

@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './enquiry-form.component.html',
  styleUrls: ['./enquiry-form.component.scss']
})
export class EnquiryFormComponent {
  @ViewChild('enquiryForm') enquiryForm!: NgForm;
  constructor(private enquiryService:AuthService, private firestore: Firestore,){}
  formStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
  formTouched = false;
  enquiry = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  // For animated placeholder effect
  focusedField: string | null = null;
  
async handleSubmit(event: Event): Promise<void> {
  event.preventDefault();

  if (
    !this.enquiry.name.trim() ||
    !this.enquiry.email.trim() ||
    this.enquiry.message.trim().length < 10
  ) {
    this.formStatus = 'error';
    return;
  }

  try {
    const enquiryRef = collection(this.firestore, 'enquiries');
    await addDoc(enquiryRef, this.enquiry);
    console.log('🔥 Stored in Firestore:', this.enquiry);
    this.formStatus = 'success';
    this.resetForm();
    setTimeout(() => (this.formStatus = 'idle'), 4000);
  } catch (error) {
    console.error('❌ Firestore Error:', error);
    this.formStatus = 'error';
  }
}

  resetForm(): void {
    this.enquiry = { 
      name: '', 
      email: '', 
      phone: '', 
      subject: '',
      message: '' 
    };
    
    // This is crucial - reset the form state after model reset
    setTimeout(() => {
      if (this.enquiryForm) {
        this.enquiryForm.resetForm();
        this.formTouched = false;
      }
    });
  }
  
  markFormAsTouched(): void {
    this.formTouched = true;
    
    Object.keys(this.enquiryForm.controls).forEach(key => {
      const control = this.enquiryForm.controls[key];
      control.markAsTouched();
    });
  }
  
  setFocus(field: string): void {
    this.focusedField = field;
  }
  
  clearFocus(): void {
    this.focusedField = null;
  }
  
  // Helper method to check if a field should show error
  shouldShowError(fieldName: string): boolean {
    const control = this.enquiryForm?.controls[fieldName];
    return control ? (control.invalid && (control.touched || this.formTouched)) : false;
  }
  
  // Get specific error messages
  getErrorMessage(fieldName: string): string {
    const control = this.enquiryForm?.controls[fieldName];
    
    if (!control || !control.errors) return '';
    
    if (control.errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    
    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `${this.getFieldLabel(fieldName)} must be at least ${requiredLength} characters`;
    }
    
    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }
    
    if (control.errors['pattern']) {
      if (fieldName === 'phone') {
        return 'Please enter a valid 10-digit phone number';
      }
    }
    
    return 'Invalid input';
  }
  
  private getFieldLabel(fieldName: string): string {
    const labels: {[key: string]: string} = {
      'name': 'Name',
      'email': 'Email',
      'phone': 'Phone number',
      'subject': 'Subject',
      'message': 'Message'
    };
    
    return labels[fieldName] || fieldName;
  }
}
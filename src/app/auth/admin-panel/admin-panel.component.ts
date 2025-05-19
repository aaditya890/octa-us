import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  enquiries: any[] = [];
  loading = true;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.enquiries = await this.authService.getAllEnquiries();
    // console.log('✅ Loaded enquiries:', this.enquiries);
    this.loading = false;
  }

  async deleteEnquiry(id: string) {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      await this.authService.deleteEnquiryById(id);
      this.enquiries = this.enquiries.filter(e => e.id !== id);
    }
  }
}

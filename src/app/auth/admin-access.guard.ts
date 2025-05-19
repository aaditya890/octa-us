import { CanActivateFn } from '@angular/router';

export const adminAccessGuard: CanActivateFn = (route, state) => {
  const password = prompt('🔐 Enter admin access key:');

  if (password === 'octa@2025') {
    return true;
  } else {
    alert('❌ Access denied. Redirecting...');
    window.location.href = '/'; // Redirect to homepage
    return false;
  }
};

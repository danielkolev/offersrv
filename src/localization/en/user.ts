
import { UserTranslations } from '@/types/language/user';

export const enUserTranslations: UserTranslations = {
  profile: 'Profile',
  settings: 'Settings',
  signOut: 'Sign Out',
  manageAccount: 'Manage Account',
  editProfile: 'Edit Profile',
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  password: 'Password',
  changePassword: 'Change Password',
  currentPassword: 'Current Password',
  newPassword: 'New Password',
  confirmPassword: 'Confirm Password',
  save: 'Save',
  cancel: 'Cancel',
  updateSuccess: 'Profile updated successfully',
  updateError: 'Error updating profile',
  passwordMismatch: 'Passwords do not match',
  passwordChangeSuccess: 'Password changed successfully',
  passwordChangeError: 'Error changing password',
  accountCreated: 'Account created'
};

// Export for use in the main language file
export const user = enUserTranslations;

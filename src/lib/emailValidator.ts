const FREE_EMAIL_DOMAINS: string[] = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 
  'icloud.com', 'mail.com', 'zoho.com', 'protonmail.com', 'gmx.com', 
  'yandex.com', 'live.com', 'msn.com', 'free.fr'
];

export function isValidProfessionalEmail(email: string): boolean {
  if (!email || !email.includes('@')) {
    return false;
  }
  const domain = email.substring(email.lastIndexOf('@') + 1).toLowerCase();
  return !FREE_EMAIL_DOMAINS.includes(domain);
}

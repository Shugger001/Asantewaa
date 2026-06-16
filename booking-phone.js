export function normalizePhoneDigits(phone) {
  return (phone || '').replace(/\D/g, '');
}

export function phoneVariants(phone) {
  const digits = normalizePhoneDigits(phone);
  const variants = new Set([digits]);
  if (digits.startsWith('233') && digits.length >= 12) {
    variants.add(`0${digits.slice(3)}`);
  }
  if (digits.startsWith('0') && digits.length >= 10) {
    variants.add(`233${digits.slice(1)}`);
  }
  return [...variants];
}

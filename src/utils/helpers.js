export function formatPrice(price) {
  if (price >= 100000) {
    const lakhs = price / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(2)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatKms(kms) {
  return `${kms.toLocaleString('en-IN')} km`;
}

export function getPlateId(numberPlate) {
  return numberPlate.slice(-4);
}

export function buildWhatsAppMessage(car) {
  return encodeURIComponent(
    `Hi, I'm interested in the ${car.name} (${car.year}, ${car.fuelType}, ${car.transmission}) listed at ${formatPrice(car.price)}. Please share more details.`
  );
}

export function buildSellWhatsAppMessage(form) {
  return encodeURIComponent(
    `Hi, I want to sell my car.\n\nDetails:\n- Car: ${form.carName}\n- Brand: ${form.brand}\n- Year: ${form.year}\n- KMs Driven: ${form.kmsDriven}\n- Accidental: ${form.accidental}\n- Insurance Valid: ${form.insurance}\n\nPlease contact me.`
  );
}

export const WHATSAPP_NUMBER = '919999999999';
export const CALL_NUMBER = '+91 99999 99999';

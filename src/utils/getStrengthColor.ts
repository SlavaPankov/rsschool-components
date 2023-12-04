export const getStrengthColor = (strength: number): string => {
  if (strength < 40) {
    return 'red';
  }
  if (strength < 70) {
    return 'orange';
  }
  return 'green';
};

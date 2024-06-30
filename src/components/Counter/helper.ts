export const handleDisplayQuantity = (quantity: string) => {
  const quantityNum = Number(quantity);
  return isNaN(quantityNum)
    ? quantity.slice(0, 3)
    : quantityNum > 99
    ? "99+"
    : quantityNum;
};

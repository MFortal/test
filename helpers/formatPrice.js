export const formatPrice = (value) => {
  return new Intl.NumberFormat("ru").format(value);
};

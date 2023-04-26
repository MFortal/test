export function getDateNow() {
  const today = new Date();

  let month = today.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  return today.getFullYear() + "-" + month + "-" + today.getDate();
}

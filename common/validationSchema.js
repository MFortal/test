import * as yup from "yup";

const yearNow = new Date().getFullYear();

export const validationSchema = yup.object().shape({
  INN: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 10 символов",
      (val) => !isNaN(val) && `${val}`.length === 10
    ),
  OGRNIP: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 15 символов",
      (val) => !isNaN(val) && `${val}`.length === 15
    ),
  checking_account: yup.number().typeError("Должны быть только цифры"),
  correspondent_account: yup.number().typeError("Должны быть только цифры"),
  BIK: yup.number().typeError("Должны быть только цифры"),
  email: yup.string().email("Введите Email"),
  phone_number: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 11 символов",
      (val) => !isNaN(val) && `${val}`.length === 11
    ),
  password: yup.string().min(6, "Длина должна не менее 6 символов"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
  passport_series: yup
    .number()
    .typeError("В серии паспорта должны быть только цифры")
    .test(
      "Длина",
      "Длина серии должна быть 4 символа",
      (val) => !isNaN(val) && `${val}`.length === 4
    ),
  passport_number: yup
    .number()
    .typeError("В номере паспорта должны быть только цифры")
    .test(
      "Длина",
      "Длина номера должна быть 6 символов",
      (val) => !isNaN(val) && `${val}`.length === 6
    ),
  OGRN: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 13 символов",
      (val) => !isNaN(val) && `${val}`.length === 13
    ),
  KPP: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 9 символов",
      (val) => !isNaN(val) && `${val}`.length === 9
    ),
  passport_code: yup.number().typeError("Должны быть только цифры"),
});

export const validationSchemaPrivate = yup.object().shape({
  email: yup.string().email("Введите Email"),
  phone_number: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 11 символов",
      (val) => !isNaN(val) && `${val}`.length === 11
    ),
  password: yup.string().min(6, "Длина должна не менее 6 символов"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
  passport_series: yup
    .number()
    .typeError("В серии паспорта должны быть только цифры")
    .test(
      "Длина",
      "Длина серии должна быть 4 символа",
      (val) => !isNaN(val) && `${val}`.length === 4
    ),
  passport_number: yup
    .number()
    .typeError("В номере паспорта должны быть только цифры")
    .test(
      "Длина",
      "Длина номера должна быть 6 символов",
      (val) => !isNaN(val) && `${val}`.length === 6
    ),
  passport_code: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина кода подразделения должна быть 6 символа",
      (val) => !isNaN(val) && `${val}`.length === 6
    ),
});

export const validationSchemaNatural = yup.object().shape({
  INN: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 10 символов",
      (val) => !isNaN(val) && `${val}`.length === 10
    ),
  OGRNIP: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 15 символов",
      (val) => !isNaN(val) && `${val}`.length === 15
    ),
  checking_account: yup.number().typeError("Должны быть только цифры"),
  correspondent_account: yup.number().typeError("Должны быть только цифры"),
  BIK: yup.number().typeError("Должны быть только цифры"),
  email: yup.string().email("Введите Email"),
  phone_number: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 11 символов",
      (val) => !isNaN(val) && `${val}`.length === 11
    ),
  password: yup.string().min(6, "Длина должна не менее 6 символов"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
});

export const validationSchemaLegal = yup.object().shape({
  INN: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 10 символов",
      (val) => !isNaN(val) && `${val}`.length === 10
    ),
  checking_account: yup.number().typeError("Должны быть только цифры"),
  correspondent_account: yup.number().typeError("Должны быть только цифры"),
  BIK: yup.number().typeError("Должны быть только цифры"),
  email: yup.string().email("Введите Email"),
  phone_number: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 11 символов",
      (val) => !isNaN(val) && `${val}`.length === 11
    ),
  password: yup.string().min(6, "Длина должна не менее 6 символов"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
  passport_series: yup
    .number()
    .typeError("В серии паспорта должны быть только цифры")
    .test(
      "Длина",
      "Длина серии должна быть 4 символа",
      (val) => !isNaN(val) && `${val}`.length === 4
    ),
  passport_number: yup
    .number()
    .typeError("В номере паспорта должны быть только цифры")
    .test(
      "Длина",
      "Длина номера должна быть 6 символов",
      (val) => !isNaN(val) && `${val}`.length === 6
    ),
  OGRN: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 13 символов",
      (val) => !isNaN(val) && `${val}`.length === 13
    ),
  KPP: yup
    .number()
    .typeError("Должны быть только цифры")
    .test(
      "Длина",
      "Длина должна быть 9 символов",
      (val) => !isNaN(val) && `${val}`.length === 9
    ),
  passport_code: yup.number().typeError("Должны быть только цифры"),
});

export const validationSchemaLogin = yup.object().shape({
  email: yup.string().email("Введите Email"),
  password: yup.string().min(6, "Длина должна не менее 6 символов"),
});

export const validationSchemaAddLotStart = yup.object().shape({
  email: yup.string().email("Введите Email"),
});

export const validationSchemaAddLotCar = yup.object().shape({
  initial_price: yup.number().typeError("Должны быть только цифры"),
  mileage: yup.number().typeError("Должны быть только цифры"),
  volume: yup.number().typeError("Должны быть только цифры"),
  year: yup
    .number()
    .integer("Только целочисленное значение")
    .typeError("Должны быть только цифры")
    .test(
      "Positive",
      `Больше 0 и меньше ${yearNow}`,
      (val) => !isNaN(val) && val > 0 && val <= yearNow
    ),
  files: yup.mixed().required("Обязательное поле"),
});

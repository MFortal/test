import { useState } from "react";

import { styleSelectGender } from "@/common/styleSelect";
import { validationSchemaPrivate } from "@/common/validationSchema";
import CustomSelect from "@/components/Form/components/CustomSelect";
import { PrivatePolicy } from "@/components/PrivatePolicy";
import { connection } from "@/helpers/connection";
import { getDateNow } from "@/helpers/getDateNow";
import { Field, FormikProvider, useFormik } from "formik";
import { CustomField } from "./components/CustomField";
import MaskedInput from "react-text-mask";
import { CustomPopup } from "../CustomPopup";

export const FormNatural = () => {
  const optionsGender = [
    { value: 0, label: "Выберите пол" },
    { value: "М", label: "Мужской" },
    { value: "Ж", label: "Женский" },
  ];

  const handleClickReset = (e) => {
    e.preventDefault();
  };

  const phoneNumberMask = [
    "+",
    /[1-9]/,
    "(",
    /\d/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  const formatValues = (values) => {
    let newValues = {};

    newValues.email = values.email;
    newValues.last_name = values.last_name;
    newValues.first_name = values.first_name;
    newValues.patronymic = values.patronymic;
    newValues.gender = values.gender.value;
    newValues.birth_date = values.birth_date;
    newValues.passport_series = values.passport_series;
    newValues.passport_number = values.passport_number;
    newValues.passport_date = values.passport_date;
    newValues.passport_issued_by = values.passport_issued_by;
    newValues.passport_code = values.passport_code;
    newValues.phone_number = values.phone_number;
    newValues.password = values.password;

    return newValues;
  };

  const [stateModal, setStateModal] = useState();

  const [additionErrors, setAdditionErrors] = useState();

  function onSubmitForm(values, { resetForm }) {
    const newUser = formatValues(values);
    connection
      .post("/api/v1/registration/natural", {
        ...newUser,
      })
      .then((response) => {
        setStateModal({
          open: true,
          heading: "Подтвердите Email",
          message: `На Email ${values.email} отправлено письмо. Перейдите по ссылке в письме для подтверждения.`,
          success: true,
        });
        //resetForm({});
      })
      .catch((error) => {
        if (error.response) {
          setAdditionErrors((prev) => ({
            ...prev,
            email: error.response.data?.email,
          }));

          // setStateModal({
          //   open: true,
          //   heading: error.response.data?.message
          //     ? error.response.data.message
          //     : "Неполадки на сервере",
          //   success: false,
          // });
        }
      });
  }

  const formik = useFormik({
    initialValues: {
      last_name: "",
      first_name: "",
      patronymic: "",
      birth_date: "",
      gender: optionsGender[0],
      passport_series: "",
      passport_number: "",
      passport_issued_by: "",
      passport_date: "",
      passport_code: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      send_code: "",
      phone: "",
    },
    validationSchema: validationSchemaPrivate,
    onSubmit: (value, handleClickReset) => {
      value.phone = value.phone.replace(/[^1-9]/gi, "");
      console.log(value);
      onSubmitForm(value, handleClickReset);
    },
  });

  return (
    <div className="grid_container">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="personal_data_form">
          <div className="personal_data_item">
            <CustomField
              textName="Фамилия"
              name="last_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              required={true}
            />

            <CustomField
              textName="Имя"
              name="first_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              required={true}
            />

            <CustomField
              textName="Отчество"
              name="patronymic"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.patronymic}
            />

            <label className="label_box label_box_border label_box_no_overflow">
              <span className="red_star">*</span>&nbsp;&nbsp;Пол
              <div className="input_container input_container_margin-top">
                <CustomSelect
                  className="react-select-container"
                  styles={styleSelectGender}
                  defaultValue={optionsGender[0]}
                  options={optionsGender}
                  value={formik.values.gender}
                  onChange={(value) => formik.setFieldValue("gender", value)}
                />
                <span className="focus-border"></span>
              </div>
            </label>

            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;Дата рождения
              <div className="label_box_div">
                <Field
                  placeholder=""
                  type="date"
                  max={getDateNow()}
                  name="birth_date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.birth_date}
                  required
                />
                <span className="focus-border"></span>
              </div>
            </label>

            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;Серия и номер
              паспорта
              <span className="label_box_wrap">
                <span className="label_box_border">
                  <div className="label_box_div">
                    <Field
                      type="text"
                      placeholder="Серия"
                      name="passport_series"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.passport_series}
                      required
                    />
                    <span className="focus-border"></span>
                  </div>
                </span>
                <span className="label_box_border">
                  <div className="label_box_div">
                    <Field
                      type="text"
                      placeholder="Номер паспорта"
                      name="passport_number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.passport_number}
                      required
                    />
                    <span className="focus-border"></span>
                  </div>
                </span>
              </span>
              {formik.touched.passport_series &&
                formik.errors.passport_series && (
                  <p className="error">{formik.errors.passport_series}</p>
                )}
              {formik.touched.passport_number &&
                formik.errors.passport_number && (
                  <p className="error">{formik.errors.passport_number}</p>
                )}
            </label>

            <CustomField
              textName="Код подразделения"
              required={true}
              name="passport_code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passport_code}
              touched={formik.touched.passport_code}
              error={formik.errors.passport_code}
            />

            <CustomField
              textName="Кем выдан"
              required={true}
              name="passport_issued_by"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passport_issued_by}
            />

            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;Дата выдачи
              <div className="label_box_div">
                <Field
                  type="date"
                  placeholder=""
                  name="passport_date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passport_date}
                  max={getDateNow()}
                  required
                />
                <span className="focus-border"></span>
              </div>
            </label>

            <CustomField
              textName="Электронная почта"
              type="email"
              required={true}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              touched={formik.touched.email}
              error={formik.errors.email}
              additionErrors={additionErrors}
            />

            <CustomField
              textName="Телефон"
              required={true}
              name="phone_number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
              touched={formik.touched.phone_number}
              error={formik.errors.phone_number}
            />
            {/* <Field
              name="phone"
              render={({ field }) => (
                <MaskedInput
                  {...field}
                  mask={phoneNumberMask}
                  placeholder="Enter your phone number"
                  type="text"
                  onChange={(e) => {
                    formik.handleChange;
                    console.log(e.target.value.replace(/[^1-9]/gi, "").length);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
              )}
            /> */}

            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;Код подтверждения
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="send_code"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.send_code}
                  required
                />
                <span className="focus-border"></span>
                <span className="cod_btn">Выслать код</span>
              </div>
            </label>

            <CustomField
              textName="Пароль"
              required={true}
              isSecret={true}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              touched={formik.touched.password}
              error={formik.errors.password}
            />

            <CustomField
              textName="Подтвердите пароль"
              required={true}
              isSecret={true}
              name="confirm_password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
              touched={formik.touched.confirm_password}
              error={formik.errors.confirm_password}
            />
          </div>

          <PrivatePolicy />

          <div className="personal_data_btn adding_lot_btn_box">
            <button className="btn_site" type="submit">
              Регистрация
            </button>
            <button
              className="btn_site btn_site_white"
              type="reset"
              onClick={(e) => handleClickReset(e)}
            >
              Отменить
            </button>
          </div>
        </form>
      </FormikProvider>

      <CustomPopup stateModal={stateModal} setStateModal={setStateModal} />
    </div>
  );
};

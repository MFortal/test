import { validationSchemaNatural } from "@/common/validationSchema";
import { connection } from "@/helpers/connection";
import { getAuthorization, getToken } from "@/helpers/getToken";
import { selectAuthState, setAuthState } from "@/redux/slices/authSlice";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrivatePolicy } from "../PrivatePolicy";
import ResponseResult from "../ResponseResult";
import { CustomField } from "./components/CustomField";

export const FormPrivateEdit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [result, setResult] = useState();

  const data = useSelector(selectAuthState);
  const values = { ...data.info };

  const handleClickReset = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const formatValues = (values) => {
    let newValues = {};

    newValues.organization_name = values.organization_name;
    newValues.INN = values.INN;
    newValues.OGRNIP = values.OGRNIP;
    newValues.legal_address = values.legal_address;
    newValues.checking_account = values.checking_account;
    newValues.name_bank = values.name_bank;
    newValues.correspondent_account = values.correspondent_account;
    newValues.BIK = values.BIK;
    newValues.email = values.email;
    newValues.phone_number = values.phone_number;
    newValues.password = values.password;

    return newValues;
  };

  const onSubmitForm = (values, { resetForm }) => {
    const newUser = formatValues(values);

    connection
      .put(
        `/api/v1/update/private`,
        { ...newUser },
        {
          headers: getAuthorization(),
        }
      )
      .then((response) => {
        setResult({ status: true, text: response.data.message });
        const info = response.data.user;
        dispatch(setAuthState({ token: getToken(), info: { ...info } }));
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setResult({
            status: false,
            text: error.response.data.message,
          });
        }

        if (error.response.data == 401) {
          clearUserData(dispatch, router);
        }
      });
  };

  return (
    <div className="grid_container">
      {result && <ResponseResult status={result.status} text={result.text} />}
      <Formik
        initialValues={{
          organization_name: values?.organization_name ?? "",
          INN: values?.INN ?? "",
          OGRNIP: values?.OGRNIP ?? "",
          legal_address: values?.legal_address ?? "",
          checking_account: values?.checking_account ?? "",
          name_bank: values?.name_bank ?? "",
          correspondent_account: values?.correspondent_account ?? "",
          BIK: values?.BIK ?? "",
          email: values?.email ?? "",
          phone_number: values?.phone_number ?? "",
          send_code: values?.send_code ?? "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={validationSchemaNatural}
        onSubmit={(values, { resetForm }) =>
          onSubmitForm(values, { resetForm })
        }
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="personal_data_form">
            <div className="personal_data_item">
              <CustomField
                textName="Полное
                наименование предприятия"
                name="organization_name"
                required={true}
                value={values.organization_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomField
                textName="ИНН"
                name="INN"
                required={true}
                value={values.INN}
                touched={touched.INN}
                error={errors.INN}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomField
                textName="ОГРНИП"
                name="OGRNIP"
                required={true}
                value={values.OGRNIP}
                touched={touched.OGRNIP}
                error={errors.OGRNIP}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomField
                textName="Юридический адрес с индексом"
                name="legal_address"
                required={true}
                value={values.legal_address}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomField
                textName="Номер расчетного
                счета"
                name="checking_account"
                required={true}
                value={values.checking_account}
                touched={touched.checking_account}
                error={errors.checking_account}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomField
                textName="Наименование банка"
                name="name_bank"
                required={true}
                value={values.name_bank}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomField
                textName="Корреспондентский счет банка"
                name="correspondent_account"
                required={true}
                value={values.correspondent_account}
                touched={touched.correspondent_account}
                error={errors.correspondent_account}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomField
                textName="БИК"
                name="BIK"
                required={true}
                value={values.BIK}
                touched={touched.BIK}
                error={errors.BIK}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomField
                textName="Электронная почта"
                name="email"
                required={true}
                value={values.email}
                touched={touched.email}
                error={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomField
                textName="Телефон"
                name="phone_number"
                required={true}
                value={values.phone_number}
                touched={touched.phone_number}
                error={errors.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <label className="label_box label_box_border">
                <span className="red_star">*</span>&nbsp;&nbsp;Код подтверждения
                <div className="label_box_div">
                  <Field
                    type="text"
                    placeholder=""
                    name="send_code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.send_code}
                    required
                  />
                  <span className="focus-border"></span>
                  <span className="cod_btn">Выслать код</span>
                </div>
              </label>

              <CustomField
                textName="Пароль"
                name="password"
                required={true}
                isSecret={true}
                value={values.password}
                touched={touched.password}
                error={errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <CustomField
                textName="Подтвердите пароль"
                name="confirm_password"
                required={true}
                isSecret={true}
                value={values.confirm_password}
                touched={touched.confirm_password}
                error={errors.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <PrivatePolicy isChange={true} />

            <div className="personal_data_btn adding_lot_btn_box">
              <button className="btn_site" type="submit">
                Сохранить
              </button>
              <button
                className="btn_site btn_site_white"
                type="reset"
                onClick={handleClickReset}
              >
                Отменить
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

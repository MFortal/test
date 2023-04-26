import { styleSelect3 } from "@/common/styleSelect";
import { validationSchemaLegal } from "@/common/validationSchema";
import { CustomInputLotFile } from "@/components/Form/components/CustomInputLotFile";
import { PrivatePolicy } from "@/components/PrivatePolicy";
import { clearLS } from "@/helpers/clearLS";
import { connection } from "@/helpers/connection";
import { getDateNow } from "@/helpers/getDateNow";
import { getObjOptions } from "@/helpers/getObjOptions";
import { Field, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import Select from "react-select";
import { CustomPopup } from "../CustomPopup";

export default function FormLegal({ documents }) {
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [isTypeConfirmPassword, setisTypeConfirmPassword] = useState(true);
  const router = useRouter();
  const filesLS = localStorage.files
    ? new Map(JSON.parse(localStorage.files))
    : new Map();

  const [selectDoc, setSelectDoc] = useState(filesLS);

  const [stateModal, setStateModal] = useState();

  const [additionErrors, setAdditionErrors] = useState();

  const optionsDocumentsWithoutFirst = getObjOptions(documents);
  const optionsDocuments = [
    { value: "Выберите из списка", label: "Выберите из списка" },
    ...optionsDocumentsWithoutFirst,
  ];

  const deleteFile = (value) => {
    selectDoc.delete(value);
  };

  const selectDocument = (e) => {
    const map = new Map(selectDoc);

    if (!map.has(e.value)) {
      map.set(e.value, {});
    }

    setSelectDoc(map);
  };

  const cancelForm = () => {
    clearLS();
    router.back();
  };

  // Отправка данных на сервер
  const onSubmitForm = (values) => {
    values.files = Array.from(
      new Map(JSON.parse(localStorage.getItem("files"))).values()
    );

    connection
      .post("/api/v1/registration/juridial", {
        ...values,
      })
      .then((response) => {
        setStateModal({
          open: true,
          heading: "Подтвердите Email",
          message: `На Email ${values.email} отправлено письмо. Перейдите по ссылке в письме для подтверждения.`,
          success: true,
        });
        clearLS();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response) {
          setAdditionErrors((prev) => ({
            ...prev,
            email: error.response.data?.email,
          }));
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      organization_name: "",
      director_name: "",
      legal_form: "",
      legal_address: "",
      passport_series: "",
      passport_number: "",
      passport_issued_by: "",
      passport_date: "",
      OGRN: "",
      mailing_address: "",
      INN: "",
      KPP: "",
      checking_account: "",
      name_bank: "",
      correspondent_account: "",
      BIK: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      send_code: "",
      files: "",
    },
    validationSchema: validationSchemaLegal,
    onSubmit: (values) => {
      onSubmitForm(values);
    },
  });

  return (
    <div className="grid_container">
      <FormikProvider value={formik}>
        <form
          className="personal_data_form"
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
        >
          <div className="personal_data_item">
            <label className="label_box">
              Выберите документ для загрузки
              <Select
                className="react-select-container"
                defaultValue={optionsDocuments[0]}
                onChange={(e) => selectDocument(e)}
                options={optionsDocuments}
                styles={styleSelect3}
              />
              {optionsDocumentsWithoutFirst &&
                optionsDocumentsWithoutFirst.map((doc) => (
                  <CustomInputLotFile
                    key={doc.index}
                    doc={doc}
                    selectDoc={selectDoc}
                    deleteFile={() => deleteFile(doc.value)}
                    name={"files[]"}
                    saveLS={false}
                  />
                ))}
            </label>

            <label className="label_box label_box_border">
              Полное наименование организации
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="organization_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.organization_name}
                />
                <span className="focus-border"></span>
              </div>
            </label>
            <label className="label_box label_box_border">
              Директор
              <div className="label_box_div">
                <Field
                  placeholder=""
                  type="text"
                  name="director_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.director_name}
                />
                <span className="focus-border"></span>
              </div>
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>
              &nbsp;&nbsp;Организационно-правовая форма
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="legal_form"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.legal_form}
                  //required
                />
                <span className="focus-border"></span>
              </div>
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>
              &nbsp;&nbsp;Юридический адрес
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="legal_address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.legal_address}
                  //required
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
                      //required
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
                      //required
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
            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;Кем выдан
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="passport_issued_by"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passport_issued_by}
                  //required
                />
                <span className="focus-border"></span>
              </div>
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;Дата выдачи
              <div className="label_box_div">
                <Field
                  type="date"
                  placeholder=""
                  name="passport_date"
                  max={getDateNow()}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passport_date}
                  //required
                />
                <span className="focus-border"></span>
              </div>
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;ОГРН
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="OGRN"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.OGRN}
                  //required
                />
                <span className="focus-border"></span>
              </div>
              {formik.touched.OGRN && formik.errors.OGRN && (
                <p className="error">{formik.errors.OGRN}</p>
              )}
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;Почтовый Адрес
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="mailing_address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mailing_address}
                  //required
                />
                <span className="focus-border"></span>
              </div>
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;ИНН
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="INN"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.INN}
                  //required
                />
                <span className="focus-border"></span>
              </div>
              {formik.touched.INN && formik.errors.INN && (
                <p className="error">{formik.errors.INN}</p>
              )}
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;КПП
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="KPP"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.KPP}
                  //required
                />
                <span className="focus-border"></span>
              </div>
              {formik.touched.KPP && formik.errors.KPP && (
                <p className="error">{formik.errors.KPP}</p>
              )}
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;Расчетный счет
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="checking_account"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.checking_account}
                  //required
                />
                <span className="focus-border"></span>
              </div>
              {formik.touched.checking_account &&
                formik.errors.checking_account && (
                  <p className="error">{formik.errors.checking_account}</p>
                )}
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>
              &nbsp;&nbsp;Наименование банка
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="name_bank"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name_bank}
                  //required
                />
                <span className="focus-border"></span>
              </div>
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>
              &nbsp;&nbsp;Корреспондентский счет
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="correspondent_account"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.correspondent_account}
                  //required
                />
                <span className="focus-border"></span>
              </div>
              {formik.touched.correspondent_account &&
                formik.errors.correspondent_account && (
                  <p className="error">{formik.errors.correspondent_account}</p>
                )}
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;БИК
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="BIK"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.BIK}
                  //required
                />
                <span className="focus-border"></span>
              </div>
              {formik.touched.BIK && formik.errors.BIK && (
                <p className="error">{formik.errors.BIK}</p>
              )}
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>
              &nbsp;&nbsp;Электронная почта
              <div className="label_box_div">
                <Field
                  type="email"
                  placeholder=""
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <span className="focus-border"></span>
              </div>
              {formik.touched.email && additionErrors?.email && (
                <p className="error">{additionErrors.email}</p>
              )}
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;Телефон
              <div className="label_box_div">
                <Field
                  type="text"
                  placeholder=""
                  name="phone_number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone_number}
                  //required
                />
                <span className="focus-border"></span>
              </div>
              {formik.touched.phone_number && formik.errors.phone_number && (
                <p className="error">{formik.errors.phone_number}</p>
              )}
            </label>
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
                  //required
                />
                <span className="focus-border"></span>
                <span className="cod_btn">Выслать код</span>
              </div>
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>&nbsp;&nbsp;Пароль
              <div className="label_box_div">
                <Field
                  type={isTypePassword ? "password" : "text"}
                  placeholder=""
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  //required
                />
                <span className="focus-border"></span>
                <span
                  className="password_btn"
                  onClick={() => setIsTypePassword(!isTypePassword)}
                ></span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="error">{formik.errors.password}</p>
              )}
            </label>
            <label className="label_box label_box_border">
              <span className="red_star">*</span>
              &nbsp;&nbsp;Подтвердите пароль
              <div className="label_box_div">
                <Field
                  type={isTypeConfirmPassword ? "password" : "text"}
                  placeholder=""
                  name="confirm_password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm_password}
                  //required
                />
                <span className="focus-border"></span>
                <span
                  className="password_btn"
                  onClick={() =>
                    setisTypeConfirmPassword(!isTypeConfirmPassword)
                  }
                ></span>
              </div>
              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <p className="error">{formik.errors.confirm_password}</p>
                )}
            </label>
          </div>

          <PrivatePolicy />

          <div className="personal_data_btn adding_lot_btn_box">
            <button
              type="submit"
              className="btn_site"
              //disabled={formik.isSubmitting}
            >
              Регистрация
            </button>
            <button
              type="reset"
              className="btn_site btn_site_white"
              onClick={() => cancelForm()}
            >
              Отменить
            </button>
          </div>
        </form>
      </FormikProvider>

      <CustomPopup stateModal={stateModal} setStateModal={setStateModal} />
    </div>
  );
}

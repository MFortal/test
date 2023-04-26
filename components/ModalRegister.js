import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";

import { validationSchemaLogin } from "@/common/validationSchema";
import { connection } from "@/helpers/connection";
import { setAuthState } from "@/redux/slices/authSlice";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import ResponseResult from "./ResponseResult";
import { USER_TYPE } from "@/common/const";

export function ModalRegister({ isVisible, open, closeModal, setIsVisible }) {
  const router = useRouter();
  const [result, setResult] = useState();

  const dispatch = useDispatch();

  const formatValues = (values) => {
    let newValues = {};

    newValues.email = values.email;
    newValues.password = values.password;

    return newValues;
  };

  async function onSubmitForm(values) {
    const login = formatValues(values);
    await connection
      .post("/api/v1/login/", {
        ...login,
      })
      .then((response) => {
        const token = response.data.token;
        const info = response.data.user;

        Cookies.set("token", token, { expires: 30 });
        setResult(false);
        dispatch(setAuthState({ token: token, info: { ...info } }));
        router.reload(window.location.pathname);
        closeModal();
      })
      .catch((error) => {
        if (error.response) {
          setResult({
            status: false,
            text: error.response.data?.message
              ? error.response.data.message
              : "Неполадки на сервере",
          });
        }
      });
  }

  const closeRegisterModal = () => {
    setResult();
    closeModal();
  };

  return (
    <>
      <Popup open={open} closeOnDocumentClick onClose={closeRegisterModal}>
        <div className="modal_register_login">
          <a className="close" onClick={closeRegisterModal}>
            &times;
          </a>
          <div className="register_login_head">
            <span
              className={!isVisible ? "btn_login active_btn" : "btn_login"}
              onClick={() => setIsVisible(!isVisible)}
            >
              Вход
            </span>
            <span
              className={
                isVisible ? "btn_register active_btn " : "btn_register "
              }
              onClick={() => setIsVisible(!isVisible)}
            >
              Регистрация
            </span>
          </div>

          {!isVisible ? (
            <>
              {result && (
                <ResponseResult
                  status={result.status}
                  text={result.text}
                  flag={true}
                />
              )}

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchemaLogin}
                onSubmit={(values) => {
                  onSubmitForm(values);
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form className="login_box">
                    <label>
                      Email
                      <Field
                        placeholder="Введите адрес электронной почты"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        required
                      />
                      {touched.email && errors.email && (
                        <p className="error">{errors.email}</p>
                      )}
                    </label>
                    <label>
                      <span className="row_box">
                        Пароль
                        <Link href="#!">Забыли пароль?</Link>
                      </span>
                      <Field
                        placeholder="Введите пароль"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        required
                      />
                      {touched.password && errors.password && (
                        <p className="error">{errors.password}</p>
                      )}
                    </label>
                    <button type="submit" className="form_btn btn_site">
                      Войти
                    </button>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <div className={"register_box"}>
              <Link
                href={`/registration/${USER_TYPE.NATURAL}`}
                onClick={closeModal}
              >
                Регистрация для Физического лица
              </Link>
              <Link
                href={`/registration/${USER_TYPE.LEGAL}`}
                onClick={closeModal}
              >
                Регистрация для Юридического лица
              </Link>
              <Link
                href={`/registration/${USER_TYPE.PRIVATE}`}
                onClick={closeModal}
              >
                Регистрация для ИП
              </Link>
            </div>
          )}
        </div>
      </Popup>
    </>
  );
}

export default ModalRegister;

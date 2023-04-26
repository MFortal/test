import { clearUserData } from "@/helpers/clearUserData";
import { connection } from "@/helpers/connection";
import { formatPrice } from "@/helpers/formatPrice";
import { getAuthorization, getToken } from "@/helpers/getToken";
import { MainLayout } from "@/layouts/MainLayout";
import { selectAuthState, setAuthState } from "@/redux/slices/authSlice";
import { Field, FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";

export default function PersonalArea() {
  const [open, setOpen] = useState(false);
  const [openAccount, setAccount] = useState(false);
  const [openSubscribe, setSubscribe] = useState(false);
  const [openQuestions, setQuestions] = useState(false);
  const closeModal = () => setOpen(false);
  const closeSubscribe = () => setSubscribe(false);
  const closeQuestions = () => setQuestions(false);
  const closeAccount = () => setAccount(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const authState = useSelector(selectAuthState);

  const formik = useFormik({
    initialValues: {
      deposit_amount: "",
    },
    onSubmit: (values, handleClickReset) => {
      onSubmitForm(values, handleClickReset);
    },
  });

  const onSubmitForm = (values, { resetForm }) => {
    console.log(values);

    connection
      .post(
        "/api/v1/topUpAccount/",
        { ...values },
        {
          headers: getAuthorization(),
        }
      )
      .then((response) => {
        console.log(response);
        resetForm({});
        dispatch(
          setAuthState({ token: getToken(), info: { ...response.data.data } })
        );
        router.push("/thanks");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          clearUserData(dispatch, router);
        }
      });
  };

  return (
    <div>
      <MainLayout title={"Личный кабинет"}>
        <main>
          <div className="personal_area margin_bottom">
            <div className="grid_container personal_area_wrap">
              <Link href={`/update_data/${authState.info.type}`} legacyBehavior>
                <a className="personal_item persona">
                  <div className="personal_item_left">
                    <h1 className="personal_name">
                      Добрый день, <br />
                      <span className="blue_color">
                        {authState.info.first_name &&
                          `${authState.info.first_name ?? "Иван"} ${
                            authState.info.patronymic ?? ""
                          }!`}
                        {authState.info.organization_name &&
                          `${authState.info.organization_name}!`}
                      </span>
                    </h1>
                    <span className="personal_subtitle">
                      Приятно снова вас видеть
                    </span>
                  </div>
                  <div className="personal_item_right">
                    {/*
                <img className="hand" src="/images/hand.svg" alt=""/>
                */}
                    <img className="man" src="/images/man_full.svg" alt="" />
                  </div>
                </a>
              </Link>
              <Link href="/my_auctions" legacyBehavior>
                <a className="personal_item auction">
                  <span className="personal_item_num">11</span>
                  <p className="personal_item_text">
                    Аукцинов, в которых вы принимаете участие
                  </p>
                </a>
              </Link>
              <div className="personal_item_balance personal_item">
                <span
                  className="personal_item_questions"
                  onClick={() => setQuestions((o) => !o)}
                ></span>
                <span className="item_balance_title">Ваш баланс:</span>
                <span className="item_balance_price">
                  {formatPrice(authState.info?.balance)} ₽
                </span>
                <span
                  className="btn_site"
                  onClick={() => setAccount((o) => !o)}
                >
                  Пополнить
                </span>
              </div>
              <Link href="/add_lot" legacyBehavior>
                <a className="personal_item_link personal_item">
                  <span className="item_link_title">Добавить лот</span>
                  <span className="personal_item_subtitle">
                    Заполните данные, чтобы <br /> опубликовать лот
                  </span>
                </a>
              </Link>

              <Link href="/my_lots" className="personal_item auction">
                <span className="personal_item_num">
                  {authState.info.lots?.published?.length ?? 0}
                </span>
                <p className="personal_item_text">Опубликованных аукционов</p>
              </Link>

              <Link href="/my_lots" legacyBehavior>
                <a className="personal_item_link personal_item">
                  <span className="item_link_title">Мои лоты</span>
                  <span className="personal_item_subtitle">
                    Проверьте статус своих <br /> опубликованных проектов
                  </span>
                </a>
              </Link>

              {/* <Link
                href="/my_lots"
                className="personal_item_published personal_item"
              >
                <span className="item_published_num">
                  {authState.info.lots?.length ?? 0}
                </span>
                <span className="personal_item_subtitle">Опубликовано</span>
              </Link> */}
              {/* <Link href="" legacyBehavior>
                <a className="personal_item_signature personal_item">
                  <span className="item_link_title">Электронная подпись</span>
                </a>
              </Link> */}
              <div className="personal_technical_support personal_item">
                <div className="personal_item_info">
                  <span className="technical_support_name">
                    Техническая поддержка
                  </span>
                  <span className="personal_item_subtitle">
                    Если возникли вопросы, обратитесь к нам
                  </span>
                  <span className="btn_site" onClick={() => setOpen((o) => !o)}>
                    Написать
                  </span>
                </div>
                <div className="personal_item_img">
                  <img src="/images/technical_support.svg" alt="" />
                </div>
              </div>
              <div className="personal_subscription personal_item personal_technical_support">
                <div className="personal_item_info">
                  <span className="technical_support_name">
                    Подписка на новости
                  </span>
                  <span className="personal_item_subtitle">
                    Будь в курсе последних событий нашей компании
                  </span>
                  <span
                    className="btn_site"
                    onClick={() => setSubscribe((o) => !o)}
                  >
                    Подписаться
                  </span>
                </div>
                <div className="personal_item_img">
                  <img src="/images/subscription.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </main>

        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="modal_technical_support">
            <a className="close" onClick={closeModal}>
              &times;
            </a>
            <span className="technical_support__title">
              Техническая поддержка
            </span>
            <form action="" className="form_technical_support">
              <input type="text" placeholder="Ваше имя" />
              <input type="mail" placeholder="Email" />
              <textarea placeholder="Текст обращения"></textarea>
              <button type="submit" className="btn_site">
                Отправить
              </button>
            </form>
            <p className="private_policy">
              Нажимая на кнопку отправить, вы подтверждаете свое согласие на
              &nbsp;
              <Link href="" legacyBehavior>
                <a>обработку пользовательских данных</a>
              </Link>
            </p>
          </div>
          <div className="thank_modal">
            <a className="close">&times;</a>
            Спасибо, вы успешно подписались
          </div>
        </Popup>

        <Popup
          open={openSubscribe}
          closeOnDocumentClick
          onClose={closeSubscribe}
        >
          <div className="modal_technical_support">
            <a className="close" onClick={closeSubscribe}>
              &times;
            </a>
            <span className="technical_support__title">
              Подписаться на новости
            </span>
            <form action="" className="form_technical_support">
              <input type="text" placeholder="Ваше имя" />
              <input type="mail" placeholder="Email" />
              <button type="submit" className="btn_site">
                Отправить
              </button>
            </form>
            <p className="private_policy">
              Нажимая на кнопку отправить, вы подтверждаете свое согласие на
              &nbsp;
              <Link href="">обработку пользовательских данных</Link>
            </p>
          </div>
          <div className="thank_modal">
            <a className="close">&times;</a>
            Спасибо, вы успешно подписались
          </div>
        </Popup>

        <Popup
          open={openQuestions}
          closeOnDocumentClick
          onClose={closeQuestions}
        >
          <div className="modal_technical_support">
            <a className="close" onClick={closeQuestions}>
              &times;
            </a>
            <span className="technical_support__title">
              Ваш баланс (кратко)
            </span>
            <p className="private_policy">
              В этом окне будет информация о пополнении баланса, о списаниии
              средств с баланса и др.
            </p>
          </div>
          <div className="thank_modal">
            <a className="close">&times;</a>
            Спасибо, вы успешно подписались
          </div>
        </Popup>

        <Popup open={openAccount} closeOnDocumentClick onClose={closeAccount}>
          <div className="modal_technical_support">
            <a className="close" onClick={closeAccount}>
              &times;
            </a>
            <span className="technical_support__title">Пополнение счета</span>
            <FormikProvider value={formik}>
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
                className="form_technical_support"
              >
                <Field
                  type="text"
                  placeholder="Введите сумму"
                  name="deposit_amount"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.deposit_amount}
                />
                <button type="submit" className="btn_site">
                  Пополнить
                </button>
              </form>
            </FormikProvider>
          </div>
        </Popup>
      </MainLayout>
    </div>
  );
}

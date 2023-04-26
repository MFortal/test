import Link from "next/link";
import ModalRegister from "./ModalRegister";

import { clearUserData } from "@/helpers/clearUserData";
import { connection } from "@/helpers/connection";
import { getAuthorization } from "@/helpers/getToken";
import useOnClickOutside from "@/hooks/useOnclickOutside";
import { selectAuthState } from "@/redux/slices/authSlice";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Header = ({}) => {
  const refMenu = useRef();
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [openMenu, setOpenMenu] = useState(false);
  const authState = useSelector(selectAuthState);

  const [stateBurger, setStateBurger] = useState(false);
  const handlerBurger = () => setStateBurger(!stateBurger);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    await connection
      .get("/api/v1/logout/", { headers: getAuthorization() })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        clearUserData(dispatch, router);
      });
  };

  useOnClickOutside(refMenu, () => setOpenMenu(false));

  const name =
    authState.info.organization_name?.length > 0
      ? authState.info.organization_name
      : authState.info.patronymic?.length > 0
      ? `${authState.info?.first_name} ${authState.info?.patronymic}`
      : authState.info?.first_name;

  return (
    <>
      <header>
        <div className="header_top">
          <div className="grid_container header_wrap">
            <Link href="/" className="header_logo">
              Аукцион
            </Link>
            <div className="header_contacts">
              <Link href="tel:+7 (000) 000-00-00;" className="header_phone">
                +7 (000) 000-00-00
              </Link>
              <span className="header_time">
                Пн-Чт: 08.30-17.30; Пт: 08.30-16.15
              </span>
              <Link href="mailto:info@gmail.com" className="header_mail">
                info@gmail.com
              </Link>
            </div>

            {authState.token ? (
              <div className="user_panel user_panel_desktop">
                <Link href="/favorites" className="favorites user_link"></Link>
                <Link href="" className="notifications user_link">
                  <span className="notifications_active"></span>
                </Link>
                <div class="dropdown" ref={refMenu}>
                  <button
                    onClick={() => setOpenMenu((prev) => !prev)}
                    className="dropbtn-wrap"
                  >
                    <div className="dropbtn">
                      <span className="dropbtn__word">{name[0]}</span>
                    </div>
                    <svg
                      className={`dropbtn__arrow ${
                        openMenu ? "dropbtn__arrow_active" : ""
                      }`}
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.41167 5.93337L10.6834 2.03884C10.9441 1.80123 10.9441 1.41586 10.6834 1.17825C10.4227 0.940584 10.0002 0.940584 9.73948 1.17825L6.60716 4.03396C6.60716 4.03396 6.29196 4.35578 5.94224 4.34903C5.60092 4.34244 5.27223 4.03396 5.27223 4.03396L2.1399 1.17834C1.87922 0.940681 1.45663 0.940681 1.19595 1.17834C1.06571 1.29713 1.00046 1.45291 1.00046 1.60864C1.00046 1.76437 1.06571 1.92011 1.19595 2.03894L5.46772 5.93337C5.7284 6.17103 6.15098 6.17103 6.41167 5.93337Z"
                        stroke-width="0.5"
                      />
                    </svg>
                  </button>
                  <div className={`dropdown-content ${openMenu ? "show" : ""}`}>
                    <Link href="/personal_area">
                      <div className="dropdown-content__profile">
                        <div className="dropbtn">
                          <span className="dropbtn__word">{name[0]}</span>
                        </div>
                        <div className="dropbtn__name">{name}</div>
                      </div>
                    </Link>
                    <div className="dropbtn__links">
                      <Link className="dropbtn__links_item" href="/my_auctions">
                        мои аукционы
                      </Link>
                      {/* <Link className="dropbtn__links_item" href="#">
                        мои сообщения
                      </Link> */}
                      <Link className="dropbtn__links_item" href="/my_lots">
                        мои лоты
                      </Link>
                      <Link className="dropbtn__links_item" href="/favorites">
                        избранное
                      </Link>
                    </div>
                    <div className="dropbtn__links">
                      <span
                        className="dropbtn__links_item dropbtn__links_out"
                        onClick={() => {
                          logout();
                        }}
                      >
                        выйти из аккаунта
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="#!"
                className="registration_btn btn_site"
                onClick={() => setOpen((o) => !o)}
              >
                Регистрация/Вход
              </Link>
            )}

            <ul
              className={stateBurger ? "humb active" : "humb"}
              onClick={handlerBurger}
            >
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div className="header_bottom">
          <div className="grid_container">
            <nav
              className={
                stateBurger ? "header_nav header_nav_open" : "header_nav"
              }
            >
              <div
                className={
                  stateBurger
                    ? "site-nav__curtain js-nav-curtain curtain-up"
                    : "site-nav__curtain js-nav-curtain"
                }
              ></div>

              {/*---mobail btn-----*/}

              <div className="user_panel">
                <Link href="/favorites" className="favorites user_link"></Link>
                <Link href="" className="notifications user_link">
                  <span className="notifications_active"></span>
                </Link>
                <Link href="/personal_area" className="user user_link"></Link>
              </div>
              {/*--- end mobail btn-----*/}

              <ul>
                <li>
                  <Link href="/catalog">КАТАЛОГ ЛОТОВ</Link>
                </li>
                <li>
                  <Link href="/services">Услуги и стоимость</Link>
                </li>
                <li>
                  <Link href="/blog">БЛОГ</Link>
                </li>
                <li>
                  <Link href="/contacts">контакты</Link>
                </li>
                <li>
                  <Link href="/argeement">Соглашения и правила</Link>
                </li>
                <li>
                  <Link href="/question_answer">Часто задаваемые вопросы</Link>
                </li>
              </ul>

              {/*---mobail -----*/}

              <div className="mobail_contacts">
                <Link href="tel:+7 (000) 000-00-00;" className="header_phone">
                  +7 (000) 000-00-00
                </Link>
                <span className="header_time">
                  Пн-Чт: 08.30-17.30; Пт: 08.30-16.15
                </span>
                <Link href="mailto:info@gmail.com" className="header_mail">
                  info@gmail.com
                </Link>
              </div>

              {/*--- end mobail -----*/}
            </nav>
          </div>
        </div>
      </header>

      <ModalRegister
        isVisible={isVisible}
        open={open}
        setOpen={setOpen}
        closeModal={closeModal}
        setIsVisible={setIsVisible}
      />
    </>
  );
};

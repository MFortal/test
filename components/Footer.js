import Link from "next/link";
import { useState } from "react";

import ModalRegister from "./ModalRegister";
import { useSelector } from "react-redux";
import { selectAuthState } from "@/redux/slices/authSlice";

export const Footer = ({}) => {
  /*------popup-----*/

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [stateLogin, setStateLogin] = useState(false);
  const handlerLogin = () => setStateLogin(!stateLogin);
  const [isVisible, setIsVisible] = useState(false);

  const [stateRegister, setStateRegister] = useState(false);
  const handlerRegister = () => setStateRegister(!stateRegister);

  /*---------*/

  const [stateList, setStateList] = useState(false);
  const handlerList = () => setStateList(!stateList);

  const [stateList2, setStateList2] = useState(false);
  const handlerList2 = () => setStateList2(!stateList2);

  const authState = useSelector(selectAuthState);

  return (
    <>
      <footer>
        <div className="footer_top">
          <div className="grid_container footer_wrap">
            <div className="footer_contacts">
              <Link href="tel:+7 (000) 000-00-00" className="footer_phone">
                +7 (000) 000-00-00
              </Link>
              <ul className="social_link">
                <li>
                  <Link href="" className="in"></Link>
                </li>
                <li>
                  <Link href="" className="fe"></Link>
                </li>
                <li>
                  <Link href="" className="youtube"></Link>
                </li>
                <li>
                  <Link href="" className="tviter"></Link>
                </li>
              </ul>
              <span className="footer_address">
                Москва, ул Пушкина 11 бульвар 5
              </span>
              <Link href="mailto:info@.ru" className="footer_email">
                info@gmail.ru
              </Link>
              {!authState?.token && (
                <Link
                  href="#!"
                  className="btn_site btn_site_white footer_btn"
                  onClick={() => setOpen((o) => !o)}
                >
                  Зарегистрироваться
                </Link>
              )}
            </div>
            <nav className="footer_nav">
              <span
                className="footer_nav_title arrow_bottom"
                onClick={handlerList}
              >
                Услуги
              </span>
              <ul
                className={
                  stateList ? "footer_nav_list list_visible" : "footer_nav_list"
                }
              >
                <li>
                  <Link href="/services/mortgage">Ипотека</Link>
                </li>
                <li>
                  <Link href="/services/removal_of_arrests">
                    Снятие арестов
                  </Link>
                </li>
                <li>
                  <Link href="/services/urgent_buyout">Срочный выкуп</Link>
                </li>
                <li>
                  <Link href="/services/repayment_of_debts">
                    Погашение долгов ЖКХ
                  </Link>
                </li>
                <li>
                  <Link href="/services/loan_before_sale">Займ до продажи</Link>
                </li>
                <li>
                  <Link href="/services/refinancing">Рефинансирование</Link>
                </li>
                <li>
                  <Link href="/services/real_estate_leasing">
                    Лизинг недвижимости
                  </Link>
                </li>
                <li>
                  <Link href="/services/help_registration">
                    Помощь в регистрации
                  </Link>
                </li>
              </ul>
            </nav>
            <nav className="footer_nav">
              <span
                className="footer_nav_title arrow_bottom"
                onClick={handlerList2}
              >
                Каталог лотов
              </span>
              <ul
                className={
                  stateList2
                    ? "footer_nav_list list_visible"
                    : "footer_nav_list"
                }
              >
                <li>
                  <Link href="">Аукционы недвижимости</Link>
                </li>
                <li>
                  <Link href="">Аренда недвижимости</Link>
                </li>
                <li>
                  <Link href="">Аукционы автомобилей</Link>
                </li>
              </ul>
            </nav>
            <nav className="footer_nav">
              <Link href="" className="footer_nav_title">
                Помощь
              </Link>
            </nav>
            <nav className="footer_nav">
              <Link href="" className="footer_nav_title">
                О проекте
              </Link>
            </nav>
            <nav className="footer_nav">
              <Link href="" className="footer_nav_title">
                Контакты
              </Link>
            </nav>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="grid_container footer_wrap">
            <span className="footer_link">&copy; АО «Аукцион» 2009—2023</span>
            <Link href="" className="footer_link">
              Политика конфиденциальности
            </Link>
            <Link href="" className="footer_link is-art">
              Разработано
            </Link>
          </div>
        </div>
      </footer>

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

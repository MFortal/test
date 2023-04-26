import Link from "next/link";
import { useEffect, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";

import LightGallery from "lightgallery/react";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";
import { FreeMode, Navigation, Thumbs } from "swiper/core";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { useWindowSize } from "../../hooks/useWindowSize";

import { Breadcrumb } from "@/components/Breadcrumb";
import { CountDown } from "@/components/CountDown";
import ModalRegister from "@/components/ModalRegister";
import { ResolveIssue } from "@/components/ResolveIssue";
import { clearUserData } from "@/helpers/clearUserData";
import { connection } from "@/helpers/connection";
import { formatPrice } from "@/helpers/formatPrice";
import { getAuthorization } from "@/helpers/getToken";
import {
  removeFavorite,
  selectFavoritesState,
  setFavorite,
} from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";

export default function CardLot({ lot }) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const [openRegister, setOpenRegister] = useState();
  const closeModalRegister = () => setOpenRegister(false);
  const [isVisible, setIsVisible] = useState();

  const [stateBtnMore, setStateBtnMore] = useState(false);
  const handlerBtnMore = () => setStateBtnMore(!stateBtnMore);

  const [stateBtnMoreDesc, setStateBtnMoredesc] = useState(false);
  const handlerBtnMoreDesc = () => setStateBtnMoredesc(!stateBtnMoreDesc);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { width } = useWindowSize();
  const [slidesView, setSlidesView] = useState(1);

  const router = useRouter();
  const dispatch = useDispatch();

  const favoriteState = useSelector(selectFavoritesState);

  useEffect(() => {
    width < 1180 && width >= 641 && setSlidesView(3);
    width > 1081 && setSlidesView(4);
  }, [width]);

  const getAvailabilityText = (value) => {
    return value ? "Есть" : "Нет";
  };

  const onClickFavorite = () => {
    if (Cookies.get("token")) {
      if (favoriteState.ids.includes(lot.id)) {
        dispatch(removeFavorite({ id: lot.id, lot: lot }));
      } else {
        dispatch(setFavorite({ id: lot.id, lot: lot }));
      }

      connection
        .get(`/api/v1/favorite/${lot.id}`, { headers: getAuthorization() })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);

          if (error.response.status == 401) {
            clearUserData(dispatch, router);
          } else {
            dispatch(removeFavorite({ id: lot.id, lot: lot }));
          }
        });
    } else {
      setOpenRegister((prev) => !prev);
    }
  };

  console.log(lot);

  return (
    <>
      <div>
        <MainLayout title={lot.name}>
          <main>
            <Breadcrumb
              secondLinkName={"Каталог лотов"}
              secondLinkPath={"catalog"}
              currentName={lot.name}
              marginBtn={false}
            />

            <div className="card_head">
              <div className="grid_container card_head_wrap">
                <div className="card_head_left">
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#fff",
                      "--swiper-pagination-color": "#fff",
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="card_top_slider"
                    centeredSlides={true}
                  >
                    {lot.images &&
                      lot.images.map((file) => (
                        <>
                          <SwiperSlide>
                            <LightGallery
                              speed={500}
                              plugins={[lgThumbnail, lgZoom]}
                            >
                              <a href={file.path} className="card_top_slide">
                                <img alt="" src={file.path} />
                              </a>
                            </LightGallery>
                          </SwiperSlide>
                        </>
                      ))}
                  </Swiper>

                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={slidesView}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="card_bottom_slider"
                  >
                    {lot.images &&
                      lot.images.map((file) => (
                        <>
                          <SwiperSlide>
                            <div className="card_bottom_slide">
                              <img alt="" src={file.path} />
                            </div>
                          </SwiperSlide>
                        </>
                      ))}
                  </Swiper>
                </div>
                <div className="card_head_info">
                  <div className="card_info_head">
                    <span className="card_head_status">
                      Горячее предложение
                    </span>
                    <button
                      className={`card_head_favorites ${
                        favoriteState?.ids.includes(lot.id)
                          ? "card_head_favorites_active"
                          : ""
                      }`}
                      onClick={() => onClickFavorite()}
                    ></button>
                  </div>
                  <div className="card_info_price_box">
                    <div className="card_price_start">
                      <span className="card_price_title">Начальная цена</span>
                      <span className="price_start price_num">
                        {formatPrice(lot.initial_price)} ₽
                      </span>
                    </div>
                    <div className="card_price_deposit">
                      <span className="card_price_title">Сумма задатка</span>
                      <span className="price_deposit price_num">560 ₽</span>
                    </div>
                  </div>
                  <div className="card_info_spec">
                    <div className="card_spec_item">
                      <span className="card_spec_title">Категория лота</span>
                      <span className="card_spec_value">{lot.category}</span>
                    </div>
                    {/* <div className="card_spec_item">
                    <span className="card_spec_title">Тип торгов</span>
                    <span className="card_spec_value">Аренда</span>
                  </div> */}
                    <div className="card_spec_item">
                      <span className="card_spec_title">
                        Уникальный идентификатор
                      </span>
                      <span className="card_spec_value blue_color_bold">
                        {lot.id}
                      </span>
                    </div>
                    <div className="card_spec_item">
                      <span className="card_spec_title">
                        Период подачи заявок
                      </span>
                      <span className="card_spec_value blue_color_bold">
                        {lot.date_publication}-{lot.date_bid.date}
                      </span>
                    </div>
                    <div className="card_spec_item">
                      <span className="card_spec_title">
                        Дата начала торгов
                      </span>
                      <span className="card_spec_value blue_color_bold">
                        {lot.date_start_trading}
                      </span>
                    </div>
                    <div className="card_spec_item">
                      <span className="card_spec_title">
                        Время до начала торгов
                      </span>

                      <CountDown before_date={lot.date_bid} />
                    </div>
                    <div className="card_spec_item">
                      <span className="card_spec_title">Шаг на повышение</span>
                      <span className="card_spec_value blue_color_bold">
                        0,5% - {formatPrice(lot.initial_price * 0.05)} ₽
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn_auctions btn_site"
                    onClick={() => router.push("/my_auctions")}
                    disabled
                  >
                    {lot.active ? "Участвовать в торгах" : "Торги завершены"}
                  </button>
                  <button
                    className="btn_questions btn_site"
                    onClick={() => setOpen((o) => !o)}
                  >
                    Задать вопрос
                  </button>
                </div>
              </div>
            </div>

            <div className="card_spec_box margin_bottom">
              {lot.flag_category != "car" && (
                <div className="grid_container">
                  <h2 className="card_spec_box_title">
                    {lot.name}, {lot.info.total_area} м²
                  </h2>
                  <div className="card_spec_box_text">
                    <p>
                      {lot.address}
                      <Link href="#map" className="link_map">
                        На карте
                      </Link>
                    </p>
                  </div>
                  <div className="card_spec_wrap">
                    <div className="card_spec_items">
                      <span className="spec_items_name">Общая площадь</span>
                      <span className="spec_items_value">
                        {lot.info.total_area} м²
                      </span>
                    </div>
                    <div className="card_spec_items">
                      <span className="spec_items_name">Жилая площадь</span>
                      <span className="spec_items_value">
                        {lot.info.living_area} м²
                      </span>
                    </div>
                    <div className="card_spec_items">
                      <span className="spec_items_name">Отделка дома</span>
                      <span className="spec_items_value">
                        {lot.info.decoration}
                      </span>
                    </div>
                    <div className="card_spec_items">
                      <span className="spec_items_name">Тип недвижимости</span>
                      <span className="spec_items_value">
                        {lot.info.type_immovable}
                      </span>
                    </div>
                    <div className="card_spec_items">
                      <span className="spec_items_name">Канализация</span>
                      <span className="spec_items_value">
                        {lot.info.sewerage}
                      </span>
                    </div>
                    <div className="card_spec_items">
                      <span className="spec_items_name">Газ</span>
                      <span className="spec_items_value">{lot.info.gas}</span>
                    </div>
                    <div className="card_spec_items">
                      <span className="spec_items_name">Этажей в доме</span>
                      <span className="spec_items_value">
                        {lot.info.house_floors}
                      </span>
                    </div>

                    <div className="card_spec_items">
                      <span className="spec_items_name">Этажей</span>
                      <span className="spec_items_value">
                        {lot.info.number_floors}
                      </span>
                    </div>
                    <div className="card_spec_items">
                      <span className="spec_items_name">Год постройки</span>
                      <span className="spec_items_value">{lot.info.year}</span>
                    </div>
                    <div className="card_spec_items">
                      <span className="spec_items_name">Паркинг</span>
                      <span className="spec_items_value">
                        {getAvailabilityText(lot.info.parking)}
                      </span>
                    </div>
                    <div className="card_spec_items">
                      <span className="spec_items_name">Санузел</span>
                      <span className="spec_items_value">
                        {getAvailabilityText(lot.info.lavatory)}
                      </span>
                    </div>
                    <div className="card_spec_items">
                      <span className="spec_items_name">Водоснабжение</span>
                      <span className="spec_items_value">
                        {getAvailabilityText(lot.info.water_supply)}
                      </span>
                    </div>
                    <div className="card_spec_items">
                      <span className="spec_items_name">Отопление</span>
                      <span className="spec_items_value">
                        {getAvailabilityText(lot.info.heating)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {lot.flag_category == "car" && (
                <div className="grid_container">
                  <h2 className="card_spec_box_title">
                    {lot.name}, {formatPrice(lot.info.mileage)} км
                  </h2>
                  <div className="card_spec_box_text">
                    <p>
                      {lot.address}
                      <Link href="#map" className="link_map">
                        На карте
                      </Link>
                    </p>
                  </div>
                  <div className="card_spec_wrap">
                    <div className="card_spec_items">
                      <span className="spec_items_name">Тип авто</span>
                      <span className="spec_items_value">
                        {lot.info.model_body.type}
                      </span>
                    </div>

                    <div className="card_spec_items">
                      <span className="spec_items_name">Марка</span>
                      <span className="spec_items_value">
                        {lot.info.model_body.brand}
                      </span>
                    </div>

                    <div className="card_spec_items">
                      <span className="spec_items_name">Модель</span>
                      <span className="spec_items_value">
                        {lot.info.model_body.model}
                      </span>
                    </div>

                    <div className="card_spec_items">
                      <span className="spec_items_name">Поколение</span>
                      <span className="spec_items_value">
                        {lot.info.generation.name}
                      </span>
                    </div>

                    <div className="card_spec_items">
                      <span className="spec_items_name">Тип кузова</span>
                      <span className="spec_items_value">
                        {lot.info.model_body.body}
                      </span>
                    </div>

                    <div className="card_spec_items">
                      <span className="spec_items_name">Год выпуска</span>
                      <span className="spec_items_value">{lot.info.year}</span>
                    </div>

                    <div className="card_spec_items">
                      <span className="spec_items_name">Пробег</span>
                      <span className="spec_items_value">
                        {formatPrice(lot.info.mileage)} км
                      </span>
                    </div>

                    <div className="card_spec_items">
                      <span className="spec_items_name">Привод</span>
                      <span className="spec_items_value">{lot.info.drive}</span>
                    </div>

                    <div className="card_spec_items">
                      <span className="spec_items_name">Двигатель</span>
                      <span className="spec_items_value">
                        {lot.info.engine}
                      </span>
                    </div>

                    <div className="card_spec_items">
                      <span className="spec_items_name">Объем</span>
                      <span className="spec_items_value">
                        {lot.info.volume}
                      </span>
                    </div>

                    <div className="card_spec_items">
                      <span className="spec_items_name">Коробка</span>
                      <span className="spec_items_value">
                        {lot.info.transmission}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="card_description margin_bottom">
              <div className="grid_container">
                <span className="card_description_head description_icon">
                  Описание
                </span>

                <div
                  className={
                    stateBtnMoreDesc
                      ? "card_description_wrap card_description_wrap_active"
                      : "card_description_wrap"
                  }
                >
                  <p>{lot.description}</p>
                </div>
                <span
                  className={
                    stateBtnMoreDesc ? "btn_more btn_more_active" : "btn_more"
                  }
                  onClick={handlerBtnMoreDesc}
                >
                  {stateBtnMoreDesc ? "Свернуть" : "Развернуть"}
                </span>
              </div>
            </div>

            <div className="card_familiarization card_description  margin_bottom">
              <div className="grid_container">
                <span className="card_description_head description_icon">
                  Порядок ознакомления
                </span>

                <div
                  className={
                    stateBtnMore
                      ? "card_description_wrap card_description_wrap_active"
                      : "card_description_wrap"
                  }
                >
                  <p>
                    С другой стороны укрепление и развитие структуры
                    обеспечивает участие в формировании систем массового
                    участия. Идейные соображения высшего порядка, а также
                    укрепление и развитие структуры играет важную роль в
                    формировании существенных финансовых и административных
                    условий. Таким образом новая модель организационной
                    деятельности способствует подготовки и реализации систем
                    массового участия. Если у вас есть какие то интересные
                    предложения, обращайтесь! Студия Web-Boss всегда готова
                    решить любую задачу. Идейные соображения высшего порядка, а
                    также укрепление и развитие структуры играет важную роль в
                    формировании существенных финансовых и административных
                    условий. Разнообразный и богатый опыт консультация с широким
                    активом обеспечивает широкому кругу. Разнообразный и богатый
                    опыт консультация с широким активом обеспечивает широкому
                    кругу. Равным образом постоянный количественный рост и сфера
                    нашей активности играет важную роль в формировании системы
                    обучения кадров, соответствует насущным потребностям.
                  </p>
                </div>
                <span
                  className={
                    stateBtnMore ? "btn_more btn_more_active" : "btn_more"
                  }
                  onClick={handlerBtnMore}
                >
                  {stateBtnMore ? "Свернуть" : "Развернуть"}
                </span>
              </div>
            </div>

            <div className="card_documents margin_bottom" id="map">
              <div className="grid_container">
                <span className="card_documents_title">
                  Документы подтверждены
                </span>
              </div>
            </div>

            {/* <div className="card_map margin_bottom">
              <div className="grid_container card_map_wrap">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A86c8f0765cff40e45ab2903f772dd271faf2757ba399c9c4a7f2395266ceca30&amp;source=constructor"
                  width="100%"
                  height="400"
                  frameborder="0"
                  loading="lazy"
                ></iframe>
              </div>
            </div> */}

            <ResolveIssue />

            <div className="card_hottest_auctions hottest_auctions">
              <div className="grid_container">
                <div className="title_head">
                  <h2 className="title_site">Похожие проекты</h2>
                  <Link href="/catalog" className="btn_site btn_site_white">
                    Все лоты
                  </Link>
                </div>
                <div className="hottest_auctions_wrap">
                  <Link href="" legacyBehavior>
                    <a className="auction_card">
                      <div className="auction_card_top">
                        <img src="/images/auction_card.jpg" alt="" />
                        <span className="auction_card_status">Объявленный</span>
                        <span className="auction_card_favorites"></span>
                      </div>
                      <div className="box_border">
                        <h2 className="auction_card_title">
                          Санкт-Петербург, ул. Мичманская, уч. 14
                        </h2>
                        <div className="auction_card_info">
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Цена
                            </span>
                            <span className="auction_card_info__value">
                              1 055 618 000 ₽
                            </span>
                          </div>
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Прием заявок до
                            </span>
                            <span className="auction_card_info__value">
                              27.02.2023
                            </span>
                          </div>
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Площадь
                            </span>
                            <span className="auction_card_info__value">
                              6,9 га
                            </span>
                          </div>
                        </div>
                        <div className="card_info__item w100">
                          <span className="auction_card_info__name">
                            Вид реализации
                          </span>
                          <span className="auction_card_info__value">
                            Продажа земельного участка
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <Link href="" legacyBehavior>
                    <a className="auction_card">
                      <div className="auction_card_top">
                        <img src="/images/auction_card2.jpg" alt="" />
                        <span className="auction_card_status">Объявленный</span>
                        <span className="auction_card_favorites favorites_active"></span>
                      </div>
                      <div className="box_border">
                        <h2 className="auction_card_title">
                          Санкт-Петербург, ул. Мичманская, уч. 14
                        </h2>
                        <div className="auction_card_info">
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Цена
                            </span>
                            <span className="auction_card_info__value">
                              1 055 618 000 ₽
                            </span>
                          </div>
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Прием заявок до
                            </span>
                            <span className="auction_card_info__value">
                              27.02.2023
                            </span>
                          </div>
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Площадь
                            </span>
                            <span className="auction_card_info__value">
                              6,9 га
                            </span>
                          </div>
                        </div>
                        <div className="card_info__item w100">
                          <span className="auction_card_info__name">
                            Вид реализации
                          </span>
                          <span className="auction_card_info__value">
                            Продажа земельного участка
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <Link href="" legacyBehavior>
                    <a className="auction_card">
                      <div className="auction_card_top">
                        <img src="/images/auction_card3.jpg" alt="" />
                        <span className="auction_card_status">Объявленный</span>
                        <span className="auction_card_favorites"></span>
                      </div>
                      <div className="box_border">
                        <h2 className="auction_card_title">
                          Санкт-Петербург, ул. Мичманская, уч. 14
                        </h2>
                        <div className="auction_card_info">
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Цена
                            </span>
                            <span className="auction_card_info__value">
                              1 055 618 000 ₽
                            </span>
                          </div>
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Прием заявок до
                            </span>
                            <span className="auction_card_info__value">
                              27.02.2023
                            </span>
                          </div>
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Площадь
                            </span>
                            <span className="auction_card_info__value">
                              6,9 га
                            </span>
                          </div>
                        </div>
                        <div className="card_info__item w100">
                          <span className="auction_card_info__name">
                            Вид реализации
                          </span>
                          <span className="auction_card_info__value">
                            Продажа земельного участка
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <Link href="" legacyBehavior>
                    <a className="auction_card">
                      <div className="auction_card_top">
                        <img src="/images/auction_card4.jpg" alt="" />
                        <span className="auction_card_status">Объявленный</span>
                        <span className="auction_card_favorites"></span>
                      </div>
                      <div className="box_border">
                        <h2 className="auction_card_title">
                          Санкт-Петербург, ул. Мичманская, уч. 14
                        </h2>
                        <div className="auction_card_info">
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Цена
                            </span>
                            <span className="auction_card_info__value">
                              1 055 618 000 ₽
                            </span>
                          </div>
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Прием заявок до
                            </span>
                            <span className="auction_card_info__value">
                              27.02.2023
                            </span>
                          </div>
                          <div className="card_info__item">
                            <span className="auction_card_info__name">
                              Площадь
                            </span>
                            <span className="auction_card_info__value">
                              6,9 га
                            </span>
                          </div>
                        </div>
                        <div className="card_info__item w100">
                          <span className="auction_card_info__name">
                            Вид реализации
                          </span>
                          <span className="auction_card_info__value">
                            Продажа земельного участка
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
                <Link href="/catalog" className="btn_site btn_mobail">
                  Все лоты
                </Link>
              </div>
            </div>
          </main>

          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="modal_technical_support">
              <a className="close" onClick={closeModal}>
                &times;
              </a>
              <span className="technical_support__title">Задать вопрос</span>
              <form action="" className="form_technical_support">
                <input type="text" placeholder="Ваше имя" />
                <input type="mail" placeholder="Email" />
                <textarea placeholder="Текст вопроса"></textarea>
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
              Спасибо, Ваша заявка обрабатывается
            </div>
          </Popup>
        </MainLayout>
      </div>
      <ModalRegister
        isVisible={isVisible}
        open={openRegister}
        setOpen={setOpenRegister}
        closeModal={closeModalRegister}
        setIsVisible={setIsVisible}
      />
    </>
  );
}

CardLot.getInitialProps = async (ctx) => {
  const code = ctx.query.code;
  const response = await connection.get(`api/v1/lots/${code}`);
  return {
    lot: response.data.data,
  };
};

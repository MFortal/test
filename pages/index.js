import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MainLayout } from "../layouts/MainLayout";

/*----react-select----*/

/*-----Swiper JS-------*/
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
//import 'swiper/css/scrollbar'
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { connection } from "@/helpers/connection";

export default function Home({ services }) {
  const mystyle = {
    background: "url(/images/banner_item.jpg) no-repeat",
    backgroundSize: "cover",
  };
  const mystyle2 = {
    background: "url(/images/banner_item2.jpg) no-repeat",
    backgroundSize: "cover",
  };
  const mystyle3 = {
    background: "url(/images/banner_item3.jpg) no-repeat",
    backgroundSize: "cover",
  };

  const styleSelectAuctions = {
    control: (base) => ({
      ...base,
      border: "1.3px solid #007EEE",
      boxShadow: "none",
      background: "#fff",
      padding: "0 8px",
      height: "48px",
      fontWeight: "700",
      fontSize: "16px",
      lineHeight: "22px",
      color: "#007EEE;",

      "&:hover": {
        cursor: "pointer",
        boxShadow: "none",
      },
    }),

    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused ? "rgba(224, 224, 224, 0.2)" : undefined,
      zIndex: 1,
      color: isSelected ? "#fff" : undefined,
      background: isSelected ? "hsl(208, 100%, 47%)" : undefined,
      "&:hover": {
        color: isSelected ? "#fff" : undefined,
        background: "trensparent",
        cursor: "pointer",
      },
    }),

    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),

    dropdownIndicator: (base) => ({
      ...base,
    }),

    singleValue: (base) => ({
      ...base,
      color: "inherit",
    }),
  };

  const hotAuctions = [
    { value: "Недвижимость", label: "Недвижимость" },
    { value: "Автомобили", label: "Автомобили" },
    { value: "Аренда", label: "Аренда" },
  ];

  /*----- слайдер ------*/

  SwiperCore.use([Navigation, Pagination]);
  const [value, onChange] = useState(new Date());
  {
    /*
  const {width} = useWindowSize();
  */
  }
  const [slidesView, setSlidesView] = useState(1);
  const [slidesView2, setSlidesView2] = useState(3);

  /*---- слайдер баннер ----*/

  const [isVisible, setIsVisible] = React.useState(false);
  {
    /*
  React.useEffect(() => {
    function resize() {
      if (window.innerWidth > 1200) {
        setIsVisible(true);
      }
      if (window.innerWidth < 1199) {
        setIsVisible(false);
      }
    }
    window.addEventListener("resize", resize);
  }, []);
  */
  }
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (width > 1299) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [width]);

  useEffect(() => {
    setSlidesView(1);
    width < 640 && setSlidesView(1);
    width < 1000 && width >= 641 && setSlidesView(2);
    width < 1081 && width >= 1000 && setSlidesView(2);
    width > 1081 && setSlidesView(3);
  }, [width]);

  /*---- слайдер продавцы ----*/
  useEffect(() => {
    setSlidesView2(6.5);
    width < 640 && setSlidesView2(1);
    width < 1000 && width >= 640 && setSlidesView2(3.2);
    width < 1531 && width >= 1001 && setSlidesView2(3.5);
    width < 1580 && width >= 1530 && setSlidesView2(5.5);
  }, [width]);

  return (
    <div>
      <MainLayout title={"Главная"}>
        <main>
          <div className="banner">
            <div className="grid_container banner_wrap">
              {isVisible ? (
                <div className="banner_wrap">
                  <div className="banner_item">
                    <h2 className="banner_item_title">Продажа недвижимости</h2>
                    <ul className="banner_item_list">
                      <li>
                        <Link href="#!" data-heading="Первичная недвижимость">
                          Первичная недвижимость
                        </Link>
                      </li>
                      <li>
                        <Link href="#!" data-heading="Вторичная недвижимость">
                          Вторичная недвижимость
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#!"
                          data-heading="Коммерческая недвижимость"
                        >
                          Коммерческая недвижимость
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="banner_item">
                    <h2 className="banner_item_title">Аренда недвижимости</h2>
                    <ul className="banner_item_list">
                      <li>
                        <Link href="#!" data-heading="Первичная недвижимость">
                          Первичная недвижимость
                        </Link>
                      </li>
                      <li>
                        <Link href="#!" data-heading="Вторичная недвижимость">
                          Вторичная недвижимость
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#!"
                          data-heading="Коммерческая недвижимость"
                        >
                          Коммерческая недвижимость
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="banner_item">
                    <h2 className="banner_item_title">Аукционы автомобилей</h2>
                    <ul className="banner_item_list">
                      <li>
                        <Link href="#!" data-heading="Первичная недвижимость">
                          Первичная недвижимость
                        </Link>
                      </li>
                      <li>
                        <Link href="#!" data-heading="Вторичная недвижимость">
                          Вторичная недвижимость
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#!"
                          data-heading="Коммерческая недвижимость"
                        >
                          Коммерческая недвижимость
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <Swiper
                  className="banner_slider mySwiper"
                  slidesPerView={slidesView}
                  spaceBetween={24}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                >
                  <SwiperSlide>
                    <div className="banner_item" style={mystyle}>
                      <h2 className="banner_item_title">
                        Продажа недвижимости
                      </h2>
                      <ul className="banner_item_list">
                        <li>
                          <Link href="#!" legacyBehavior>
                            <a>Первичная недвижимость</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#!" legacyBehavior>
                            <a>Вторичная недвижимость</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#!" legacyBehavior>
                            <a>Коммерческая недвижимость</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="banner_item" style={mystyle2}>
                      <h2 className="banner_item_title">Аренда недвижимости</h2>
                      <ul className="banner_item_list">
                        <li>
                          <Link href="#!" legacyBehavior>
                            <a>Первичная недвижимость</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#!" legacyBehavior>
                            <a>Вторичная недвижимость</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#!" legacyBehavior>
                            <a>Коммерческая недвижимость</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="banner_item" style={mystyle3}>
                      <h2 className="banner_item_title">
                        Аукционы автомобилей
                      </h2>
                      <ul className="banner_item_list">
                        <li>
                          <Link href="#!" legacyBehavior>
                            <a>Легковые автомобили</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#!" legacyBehavior>
                            <a>Аукционы мотоциклов</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#!" legacyBehavior>
                            <a>Коммерческие автомобили</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </SwiperSlide>
                </Swiper>
              )}
            </div>
          </div>

          <div className="category_index margin_bottom">
            <div className="grid_container category_wrap">
              {services.map((service, index) =>
                index < 8 ? (
                  <Link
                    href={`/services/${service.code}`}
                    className="category_item"
                    key={service.id}
                  >
                    <div className="category_item_img">
                      {service.icon_path.path && (
                        <img src={service.icon_path.path} alt="" />
                      )}
                    </div>
                    <h2 className="category_item_name">{service.name}</h2>
                  </Link>
                ) : null
              )}
            </div>
            <Link href="/services" className="btn_site category_index_btn">
              Все услуги
            </Link>
          </div>

          <div className="hottest_auctions">
            <div className="grid_container">
              <div className="title_head">
                <h2 className="title_site">Самые горячие аукционы</h2>
                <Link href="/catalog" className="btn_site btn_site_white">
                  Все лоты
                </Link>
              </div>
              <div className="hottest_auctions_wrap">
                <Link href="/catalog" legacyBehavior>
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
                          <span className="auction_card_info__name">Цена</span>
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
                <Link href="/catalog" legacyBehavior>
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
                          <span className="auction_card_info__name">Цена</span>
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
                <Link href="/catalog" legacyBehavior>
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
                          <span className="auction_card_info__name">Цена</span>
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
                <Link href="/catalog" legacyBehavior>
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
                          <span className="auction_card_info__name">Цена</span>
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
                <Link href="/catalog" legacyBehavior>
                  <a className="auction_card">
                    <div className="auction_card_top">
                      <img src="/images/auction_card5.jpg" alt="" />
                      <span className="auction_card_status">Объявленный</span>
                      <span className="auction_card_favorites"></span>
                    </div>
                    <div className="box_border">
                      <h2 className="auction_card_title">
                        Санкт-Петербург, ул. Мичманская, уч. 14
                      </h2>
                      <div className="auction_card_info">
                        <div className="card_info__item">
                          <span className="auction_card_info__name">Цена</span>
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
                <Link href="/catalog" legacyBehavior>
                  <a className="auction_card">
                    <div className="auction_card_top">
                      <img src="/images/auction_card6.jpg" alt="" />
                      <span className="auction_card_status">Объявленный</span>
                      <span className="auction_card_favorites"></span>
                    </div>
                    <div className="box_border">
                      <h2 className="auction_card_title">
                        Санкт-Петербург, ул. Мичманская, уч. 14
                      </h2>
                      <div className="auction_card_info">
                        <div className="card_info__item">
                          <span className="auction_card_info__name">Цена</span>
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
                <Link href="/catalog" legacyBehavior>
                  <a className="auction_card">
                    <div className="auction_card_top">
                      <img src="/images/auction_card7.jpg" alt="" />
                      <span className="auction_card_status">Объявленный</span>
                      <span className="auction_card_favorites"></span>
                    </div>
                    <div className="box_border">
                      <h2 className="auction_card_title">
                        Санкт-Петербург, ул. Мичманская, уч. 14
                      </h2>
                      <div className="auction_card_info">
                        <div className="card_info__item">
                          <span className="auction_card_info__name">Цена</span>
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
                <Link href="/catalog" legacyBehavior>
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
                          <span className="auction_card_info__name">Цена</span>
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
                <Link href="/catalog" legacyBehavior>
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
                          <span className="auction_card_info__name">Цена</span>
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
                <Link href="/catalog" legacyBehavior>
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
                          <span className="auction_card_info__name">Цена</span>
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
                <Link href="/catalog" legacyBehavior>
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
                          <span className="auction_card_info__name">Цена</span>
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
                <Link href="/catalog" legacyBehavior>
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
                          <span className="auction_card_info__name">Цена</span>
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

          <div className="index_map margin_bottom">
            <div className="grid_container index_map_wrap">
              <h2 className="index_map_title">
                Ищите новостройки рядом с работой, парком или родственниками
              </h2>
              <Link href="" legacyBehavior>
                <a className="btn_site">Поиск на карте</a>
              </Link>
            </div>
          </div>

          <div className="sellers margin_bottom">
            <div className="grid_container">
              <h2 className="title_site sellers_title">
                Работаем с самыми крупными продавцами
              </h2>
            </div>

            <Swiper
              className="sellers_slider"
              loop={true}
              loopedSlidesLimit={false}
              slidesPerView={slidesView2}
              loopedSlides={slidesView2}
              spaceBetween={24}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            >
              <SwiperSlide>
                <div className="sellers_slide">
                  <img src="/images/sellers_slide.svg" alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="sellers_slide">
                  <img src="/images/sellers_slide2.svg" alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="sellers_slide">
                  <img src="/images/sellers_slide3.svg" alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="sellers_slide">
                  <img src="/images/sellers_slide4.svg" alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="sellers_slide">
                  <img src="/images/sellers_slide5.svg" alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="sellers_slide">
                  <img src="/images/sellers_slide5.svg" alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="sellers_slide">
                  <img src="/images/sellers_slide2.svg" alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="sellers_slide">
                  <img src="/images/sellers_slide.svg" alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="sellers_slide">
                  <img src="/images/sellers_slide5.svg" alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="sellers_slide">
                  <img src="/images/sellers_slide2.svg" alt="" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="sellers_slide">
                  <img src="/images/sellers_slide.svg" alt="" />
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="swiper-pagination"></div>
          </div>

          <div className="blog_index margin_bottom">
            <div className="grid_container">
              <div className="title_head">
                <h2 className="title_site">Блог компании</h2>
                <Link href="" legacyBehavior>
                  <a href="" className="btn_site btn_site_white">
                    Все статьи
                  </a>
                </Link>
              </div>
              <div className="blog_index_wrap">
                <Link href="" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
                <Link href="" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
                <Link href="" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
              </div>
              <Link href="" legacyBehavior>
                <a href="" className="btn_site btn_mobail">
                  Все статьи
                </a>
              </Link>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

Home.getInitialProps = async () => {
  const response = await connection.get(`api/v1/service/`);
  return {
    services: response.data.data,
  };
};

import React, { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";

import { expiryTimestamp, useTimer } from "react-timer-hook";

import LightGallery from "lightgallery/react";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

import Popup from "reactjs-popup";

import { FreeMode, Navigation } from "swiper/core";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
//import 'swiper/css/scrollbar'
import { Breadcrumb } from "@/components/Breadcrumb";

export default function Home() {
  React.useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600);
  }, []);

  const { seconds, minutes, hours, days, isRunning, start, restart } = useTimer(
    { expiryTimestamp }
  );

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  {
    /*
  React.useEffect(()=>{
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1111300);
    restart(time)
  },[])
*/
  }

  return (
    <div>
      <MainLayout title={"Комната торгов №34"}>
        <main>
          <Breadcrumb
            currentName={"Комната торгов №34"}
            secondLinkName={"Мои аукционы"}
            secondLinkPath={"my_lots"}
          />

          <div className="trading_room">
            <div className="grid_container trading_room_wrap">
              <div className="trading_room_left">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  spaceBetween={10}
                  navigation={true}
                  modules={[FreeMode, Navigation]}
                  className="card_top_slider"
                >
                  <SwiperSlide>
                    <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
                      <a
                        href="/images/card_slide.jpg"
                        className="card_top_slide"
                      >
                        <img alt="" src="/images/card_slide.jpg" />
                      </a>
                    </LightGallery>
                  </SwiperSlide>
                  <SwiperSlide>
                    <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
                      <a
                        href="/images/card_slide2.jpg"
                        className="card_top_slide"
                      >
                        <img alt="" src="/images/card_slide2.jpg" />
                      </a>
                    </LightGallery>
                  </SwiperSlide>
                  <SwiperSlide>
                    <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
                      <a
                        href="/images/card_slide3.jpg"
                        className="card_top_slide"
                      >
                        <img alt="" src="/images/card_slide3.jpg" />
                      </a>
                    </LightGallery>
                  </SwiperSlide>
                  <SwiperSlide>
                    <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
                      <a
                        href="/images/card_slide4.jpg"
                        className="card_top_slide"
                      >
                        <img alt="" src="/images/card_slide4.jpg" />
                      </a>
                    </LightGallery>
                  </SwiperSlide>
                  <SwiperSlide>
                    <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
                      <a
                        href="/images/card_slide.jpg"
                        className="card_top_slide"
                      >
                        <img alt="" src="/images/card_slide.jpg" />
                      </a>
                    </LightGallery>
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="trading_room_right">
                <p className="trading_room_time_left">
                  До конца аукциона осталось:
                  <span className="bold">
                    {/*
                <span className="hours">{hours}</span>:<span className="minutes">{minutes}</span>:<span className="seconds">{seconds}</span>
                */}
                    <span className="hours">20</span>:
                    <span className="minutes">15</span>:
                    <span className="seconds">10</span>
                  </span>{" "}
                  (по мск)
                </p>
                <h2 className="trading_room_title">
                  3-этажный таунхаус, 278 м²
                </h2>
                <div className="trading_room_info">
                  <p>
                    Московская область, Истра городской округ, Красный Поселок
                    деревня, Парк Фонтэ жилой комплекс, Почтовый индекс: 456 648
                    <span className="btn_more">Подробнее</span>
                  </p>
                </div>
                <div className="trading_room_price">
                  <div className="room_price_item">
                    <span className="room_price_item_title">
                      Начальная цена
                    </span>
                    <span className="room_price_item_num">480 567 000 ₽</span>
                  </div>
                  <div className="room_price_item">
                    <span className="room_price_item_title">
                      Текущая цена лота
                    </span>
                    <span className="room_price_item_num">34 56 567 000 ₽</span>
                  </div>
                </div>
                <div className="trading_room_spec">
                  <div className="trading_room_spec_item">
                    <span className="trading_room_spec_title">
                      Количество участников
                    </span>
                    <span className="trading_room_spec_value">45</span>
                  </div>
                  <div className="trading_room_spec_item">
                    <span className="trading_room_spec_title">
                      Количество ставок
                    </span>
                    <span className="trading_room_spec_value">4</span>
                  </div>
                  <div className="trading_room_spec_item">
                    <span className="trading_room_spec_title">
                      Дата и время окончания аукциона
                    </span>
                    <span className="trading_room_spec_value">
                      20.01.23 в 15:00:01
                    </span>
                  </div>
                  <div className="trading_room_spec_item">
                    <span className="trading_room_spec_title">
                      Ваша последняя ставка
                    </span>
                    <span className="trading_room_spec_value">
                      56 567 000 ₽
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="trading_history margin_bottom">
            <div className="grid_container">
              <div className="my_lots_accordion">
                <div className="lots_accordion_head">
                  <span className="lots_accordion_title">История торгов</span>
                  <span className="lots_accordion_subtitle">
                    Тут вы можете посмотреть на ход аукциона
                  </span>
                </div>
                <div className="trading_history_info my_lot_content">
                  <div className="wrap_height">
                    <div className="my_lot_status status_bet_is_made">
                      <span className="my_lot_status_name">
                        Ставка повышена:
                      </span>
                      <span className="my_lot_status_prise">
                        1 065 700 000 ₽ &nbsp;
                      </span>
                      <span className="my_lot_status_time">
                        (22.03.2023 в 15:15:01)
                      </span>
                    </div>
                    <div className="my_lot_status status_rate_increased">
                      <span className="my_lot_status_name">
                        Ставка повышена:
                      </span>
                      <span className="my_lot_status_prise">
                        1 065 700 000 ₽ &nbsp;
                      </span>
                      <span className="my_lot_status_time">
                        (22.03.2023 в 15:15:01)
                      </span>
                    </div>
                    <div className="my_lot_status status_rate_increased">
                      <span className="my_lot_status_name">
                        Ставка повышена:
                      </span>
                      <span className="my_lot_status_prise">
                        1 067 500 000 ₽ &nbsp;
                      </span>
                      <span className="my_lot_status_time">
                        (22.03.2023 в 15:15:01)
                      </span>
                    </div>
                    <div className="my_lot_status status_rate_increased">
                      <span className="my_lot_status_name">
                        Ставка повышена:
                      </span>
                      <span className="my_lot_status_prise">
                        1 099 000 000 ₽ &nbsp;
                      </span>
                      <span className="my_lot_status_time">
                        (22.03.2023 в 15:15:01)
                      </span>
                    </div>
                    <div className="my_lot_status status_rate_increased">
                      <span className="my_lot_status_name">
                        Ставка повышена:
                      </span>
                      <span className="my_lot_status_prise">
                        1 065 700 000 ₽ &nbsp;
                      </span>
                      <span className="my_lot_status_time">
                        (22.03.2023 в 15:15:01)
                      </span>
                    </div>
                    <div className="my_lot_status status_rate_increased">
                      <span className="my_lot_status_name">
                        Ставка повышена:
                      </span>
                      <span className="my_lot_status_prise">
                        1 067 500 000 ₽ &nbsp;
                      </span>
                      <span className="my_lot_status_time">
                        (22.03.2023 в 15:15:01)
                      </span>
                    </div>
                    <div className="my_lot_status status_rate_increased">
                      <span className="my_lot_status_name">
                        Ставка повышена:
                      </span>
                      <span className="my_lot_status_prise">
                        1 099 000 000 ₽ &nbsp;
                      </span>
                      <span className="my_lot_status_time">
                        (22.03.2023 в 15:15:01)
                      </span>
                    </div>
                    <div className="my_lot_status status_rate_increased">
                      <span className="my_lot_status_name">
                        Ставка повышена:
                      </span>
                      <span className="my_lot_status_prise">
                        1 065 700 000 ₽ &nbsp;
                      </span>
                      <span className="my_lot_status_time">
                        (22.03.2023 в 15:15:01)
                      </span>
                    </div>
                    <div className="my_lot_status status_rate_increased">
                      <span className="my_lot_status_name">
                        Ставка повышена:
                      </span>
                      <span className="my_lot_status_prise">
                        1 067 500 000 ₽ &nbsp;
                      </span>
                      <span className="my_lot_status_time">
                        (22.03.2023 в 15:15:01)
                      </span>
                    </div>
                    <div className="my_lot_status status_rate_increased">
                      <span className="my_lot_status_name">
                        Ставка повышена:
                      </span>
                      <span className="my_lot_status_prise">
                        1 099 000 000 ₽ &nbsp;
                      </span>
                      <span className="my_lot_status_time">
                        (22.03.2023 в 15:15:01)
                      </span>
                    </div>
                    <div className="my_lot_status status_winning_amount">
                      <span className="my_lot_status_name">
                        Выигрышная ставка:
                      </span>
                      <span className="my_lot_status_prise">
                        14 56 055 618 000 ₽ &nbsp;
                      </span>
                      <span className="my_lot_status_time">
                        (22.03.2023 в 15:15:01)
                      </span>
                    </div>
                  </div>
                  <span
                    className="btn_raise_rate btn_site"
                    onClick={() => setOpen((o) => !o)}
                  >
                    Повысить ставку
                  </span>
                  <p className="trading_history_text">
                    <span className="bold">Пояснение:</span>&nbsp; Шаг на
                    повышение равен&nbsp;<span className="bold">0,5%</span>
                    &nbsp;(Шаг на повышение это величина повышения начальной
                    (минимальной) цены имущества)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="modal_bet_amount">
            <a className="close" onClick={closeModal}>
              &times;
            </a>
            <span className="modal_bet_amount_title">Введите сумму ставки</span>
            <form action="" className="modal_bet_amount_form">
              <input type="text" placeholder="10000000" />
              <button className="amount_form_btn btn_site">Отправить</button>
            </form>
            <p className="modal_bet_amount_text">
              Шаг на повышение равен <span className="bold">0,5%</span> (Шаг на
              повышение это величина повышения начальной (минимальной) цены
              имущества)
            </p>
          </div>
        </Popup>
      </MainLayout>
    </div>
  );
}

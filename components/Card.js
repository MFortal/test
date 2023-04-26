import Link from "next/link";

import { formatPrice } from "@/helpers/formatPrice";

export const Card = ({ lot, favorite = false, onClick }) => {
  console.log(lot);

  return (
    <Link
      href={`/catalog/${lot.code}`}
      className="auction_card"
      прием
      заявок
      key={lot.code}
      target="_blank"
    >
      <div className="auction_card_top">
        <img src={lot.images[0].path} alt="" />
        <span className="auction_card_status">
          {lot.date_completion ? "Завершенный" : "Объявленный"}
        </span>
        <span
          className={
            favorite
              ? "auction_card_favorites favorites_active"
              : "auction_card_favorites"
          }
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        ></span>
      </div>
      <div className="box_border">
        <h2 className="auction_card_title">{lot.address}</h2>
        <div className="auction_card_info">
          <div className="card_info__item">
            <span className="auction_card_info__name">Цена</span>
            <span className="auction_card_info__value">
              {formatPrice(lot.initial_price)} ₽
            </span>
          </div>
          <div className="card_info__item">
            {lot.info.total_area && (
              <>
                <span className="auction_card_info__name">Площадь</span>
                <span className="auction_card_info__value">
                  {lot.info.total_area} га
                </span>
              </>
            )}
            {lot.info.mileage && (
              <>
                <span className="auction_card_info__name">Пробег</span>
                <span className="auction_card_info__value">
                  {formatPrice(lot.info.mileage)} км
                </span>
              </>
            )}
          </div>
          <div className="card_info__item">
            <span className="auction_card_info__name">Начало торгов</span>
            <span className="auction_card_info__value">
              {lot.date_start_trading}
            </span>
          </div>
          <div className="card_info__item">
            <span className="auction_card_info__name">Прием заявок до</span>
            <span className="auction_card_info__value">
              {lot.date_bid.date}
            </span>
          </div>
        </div>
        <div className="card_info__item w100">
          <span className="auction_card_info__name">Вид реализации</span>
          <span className="auction_card_info__value">{lot.category}</span>
        </div>
      </div>
    </Link>
  );
};

import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-datepicker";
import NumericInput from "react-numeric-input";
import Select from "react-select";

import { Card } from "@/components/Card";
import { connection } from "@/helpers/connection";
import { MainLayout } from "@/layouts/MainLayout";

import { ORDER_BY, SORTED, STATUS_TYPE } from "@/common/const";
import {
  styleSelect,
  styleSelect5,
  styleSelectNumber,
} from "@/common/styleSelect";
import { Breadcrumb } from "@/components/Breadcrumb";
import ModalRegister from "@/components/ModalRegister";
import { clearUserData } from "@/helpers/clearUserData";
import { getObjOptions } from "@/helpers/getObjOptions";
import { getAuthorization } from "@/helpers/getToken";
import {
  removeFavorite,
  selectFavoritesState,
  setFavorite,
} from "@/redux/slices/authSlice";
import { FormikProvider, useFormik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";

export default function Catalog({
  sortedLots,
  total,
  currentPage,
  links,
  lastPage,
  perPage,
  count,
  categories,
}) {
  const [data, setData] = useState({
    lots: sortedLots,
    total,
    currentPage,
    links,
    lastPage,
    perPage,
    count,
  });

  const [stateMap, setStateMap] = useState();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const authFavorites = useSelector(selectFavoritesState);
  const [favorites, setFavorites] = useState(authFavorites?.ids ?? []);
  const dispatch = useDispatch();

  const [stateLots, setStateLots] = useState(false);
  const handlerLots = () => setStateLots(!stateLots);

  const optionsDate = [
    { value: "Регион поиска", label: "Регион поиска" },
    { value: "Москва", label: "Москва" },
    { value: "Северное Бутово", label: "Северное Бутово" },
    { value: "Южное Бутово", label: "Южное Бутово" },
  ];

  const optionsNumber = [
    { value: "6", label: "6" },
    { value: "12", label: "12" },
    { value: "18", label: "18" },
    { value: "24", label: "24" },
  ];

  const optionsRange2 = [
    { value: ORDER_BY.INITIAL_PRICE, label: "По цене" },
    { value: ORDER_BY.DATE_START_TRADING, label: "По дате начала торгов" },
  ];

  const optionsRange = [
    { value: SORTED.ASC, label: "По возрастанию" },
    { value: SORTED.DESC, label: "По убыванию" },
  ];

  const optionsCategory = [{ value: null, label: "Категория лота" }];
  optionsCategory.push(...getObjOptions(categories));

  const [filter, setFilter] = useState({
    paginate: 6,
    page: currentPage,
    sort: SORTED.ASC,
    order: ORDER_BY.DATE_PUBLICATION,
  });

  const [open, setOpen] = useState();
  const closeModal = () => {
    setOpen(false);
  };
  const [isVisible, setIsVisible] = useState();

  const onClickFavorite = (lot) => {
    if (Cookies.get("token")) {
      if (favorites.includes(lot.id)) {
        setFavorites((favorites) => favorites.filter((x) => x != lot.id));
        dispatch(removeFavorite({ id: lot.id, lot: lot }));
      } else {
        setFavorites([...favorites, lot.id]);
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
            setFavorites((favorites) => favorites.filter((x) => x != lot.id));
            dispatch(removeFavorite({ id: lot.id, lot: lot }));
          }
        });
    } else {
      setOpen((prev) => !prev);
    }
  };

  const getFullValues = () => {
    const newValues = {};
    const values = formik.values;

    for (let key in values) {
      if (values[key]) {
        newValues[key] = values[key];
      }
    }
    newValues.category_id = newValues.category?.value;

    return newValues;
  };

  const fetchData = async (params) => {
    await connection
      .get(`api/v1/filter/lots/`, {
        params: { ...params },
      })
      .then((response) => {
        setData({
          lots: response.data?.data,
          total: response.data?.total,
          currentPage: response.data?.current_page,
          links: response.data?.links,
          lastPage: response.data?.last_page,
          perPage: response.data?.per_page,
          count: response.data?.count,
        });

        setFilter((prev) => ({ ...prev, page: response.data?.current_page }));
      });
  };

  const numberLots = async (v) => {
    setFilter((state) => ({ ...state, paginate: v.value }));
    fetchData({ ...getFullValues(), page: filter.page, paginate: v.value });
  };

  const changePaginate = async (page) => {
    const nextPage = page.selected + 1;
    setFilter((state) => ({ ...state, page: nextPage }));

    fetchData({
      ...getFullValues(),
      ...filter,
      page: nextPage,
    });
  };

  const formik = useFormik({
    initialValues: {
      price_from: "",
      price_to: "",
      category: optionsCategory[0],
      date_from: "",
      date_to: "",
      status: STATUS_TYPE.ALL,
    },
    onSubmit: () => {
      const newValues = getFullValues();
      if (JSON.stringify(newValues) != "{}") {
        changePaginate(1);
      }
    },
  });

  const resetForm = () => {
    setStartDate();
    setEndDate();
    formik.resetForm();
  };

  return (
    <>
      <div>
        <MainLayout title={"Каталог лотов"}>
          <main>
            <Breadcrumb currentName={"Каталог лотов"} />

            <div className="catalog margin_bottom">
              <div className="grid_container catalog_wrap">
                <div className={"catalog_filter"}>
                  <span className="catalog_filter_title">Горячие лоты</span>

                  <FormikProvider value={formik}>
                    <form
                      className="catalog_filter_box"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="catalog_filter_item">
                        <span className="filter_item_title">
                          Категория лота
                        </span>
                        <div className="filter_item_object">
                          <Select
                            className="react-select-container"
                            defaultValue={filter.category}
                            options={optionsCategory}
                            styles={styleSelect}
                            value={formik.values.category}
                            onChange={(value) =>
                              formik.setFieldValue("category", value)
                            }
                          />
                        </div>
                      </div>
                      {/* <div className="catalog_filter_item">
                        <span className="filter_item_title">Регион поиска</span>
                        <div className="filter_item_object">
                          <Select
                            className="react-select-container"
                            defaultValue={optionsDate[0]}
                            options={optionsDate}
                            styles={styleSelect}
                          />
                        </div>
                      </div> */}
                      <div className="catalog_filter_item">
                        <span className="filter_item_title">
                          Начальная цена
                        </span>
                        <div className="filter_item_object half_input">
                          <NumericInput
                            className="input-numeric"
                            min={0}
                            placeholder="От"
                            onChange={(value) => {
                              formik.setFieldValue("price_from", value);
                            }}
                            value={formik.values.price_from}
                          />

                          <NumericInput
                            className="input-numeric"
                            min={0}
                            placeholder="До"
                            onChange={(value) => {
                              formik.setFieldValue("price_to", value);
                            }}
                            value={formik.values.price_to}
                          />
                        </div>
                      </div>
                      {/* <div className="catalog_filter_item">
                    <span className="filter_item_title">Сумма задатка</span>
                    <div className="filter_item_object half_input">
                      <NumericInput
                        className="input-numeric"
                        min={0}
                        placeholder="От"
                      />
                      <NumericInput
                        className="input-numeric"
                        min={0}
                        placeholder="До"
                      />
                    </div>
                  </div> */}
                      <div className="catalog_filter_item">
                        <span className="filter_item_title">Начало торгов</span>
                        <div className="filter_item_object date_inputs">
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                              setStartDate(date);
                              formik.setFieldValue("date_from", date);
                            }}
                            name="date_from"
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="От"
                            dateFormat="dd/MM/yyyy"
                          />

                          <DatePicker
                            selected={endDate}
                            onChange={(date) => {
                              setEndDate(date);
                              formik.setFieldValue("date_to", date);
                            }}
                            name="date_to"
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="До"
                            dateFormat="dd/MM/yyyy"
                          />
                        </div>
                      </div>
                      <div className="catalog_filter_item">
                        <span className="filter_item_title">Статус лотов:</span>
                        <div className="filter_item_object half_input">
                          <span
                            className={`item_object_status ${
                              formik.values.status == STATUS_TYPE.ALL
                                ? "status_active"
                                : ""
                            }`}
                            onClick={() =>
                              formik.setFieldValue("status", STATUS_TYPE.ALL)
                            }
                          >
                            Все лоты
                            {/* <span className="status_num">{data.count.all}</span> */}
                          </span>

                          <span
                            className={`item_object_status ${
                              formik.values.status == STATUS_TYPE.ACTIVE
                                ? "status_active"
                                : ""
                            }`}
                            onClick={() =>
                              formik.setFieldValue("status", STATUS_TYPE.ACTIVE)
                            }
                          >
                            Актуальные лоты
                            {/* <span className="status_num">
                              {data.count.active}
                            </span> */}
                          </span>
                          <span
                            className={`item_object_status ${
                              formik.values.status == STATUS_TYPE.COMPLETED
                                ? "status_active"
                                : ""
                            }`}
                            onClick={() =>
                              formik.setFieldValue(
                                "status",
                                STATUS_TYPE.COMPLETED
                              )
                            }
                          >
                            Завершенные лоты
                            {/* <span className="status_num">
                              {data.count.completed}
                            </span> */}
                          </span>
                        </div>
                      </div>
                      {/*
                <div className="catalog_filter_item">
                  <span className="filter_item_title">
                    Тип торгов:
                  </span>
                  <div className="filter_item_object">
                    <label className="control control-checkbox">
                        TorgiGov
                            <input type="checkbox" />
                        <div className="control_indicator"></div>
                    </label>
                    <label className="control control-checkbox">
                        Банкротство
                            <input type="checkbox" />
                        <div className="control_indicator"></div>
                    </label> 
                    <label className="control control-checkbox">
                        Залоговое
                            <input type="checkbox" />
                        <div className="control_indicator"></div>
                    </label> 
                    <label className="control control-checkbox">
                        Коммерческое
                            <input type="checkbox" />
                        <div className="control_indicator"></div>
                    </label>                           
                  </div>
                </div>
                <div className="catalog_filter_item">
                  <span className="filter_item_title">
                    Форма торгов:
                  </span>
                  <div className="filter_item_object">
                    <label className="control control-checkbox">
                        Открытый аукцион
                            <input type="checkbox" />
                        <div className="control_indicator"></div>
                    </label>
                    <label className="control control-checkbox">
                        Открытый конкурс
                            <input type="checkbox" />
                        <div className="control_indicator"></div>
                    </label> 
                    <label className="control control-checkbox">
                        Публичное предложение
                            <input type="checkbox" />
                        <div className="control_indicator"></div>
                    </label> 
                  </div>
                </div>
                */}
                      <div className="filter_btns">
                        <button type="submit" className="btn_site filter__btn">
                          Поиск
                        </button>
                        <button
                          type="reset"
                          className="btn_site btn_site_white filter__btn"
                          onClick={(e) => resetForm()}
                        >
                          Очистить
                        </button>
                      </div>
                    </form>
                  </FormikProvider>
                </div>
                <div className="catalog_lots">
                  <div className="catalog_lots_head">
                    <span className="catalog_lots_number">
                      Найдено: {data.total} объектов
                    </span>
                    <div className="catalog_lots_sorting">
                      <span className="sorting_title">Сортировать:</span>
                      <div className="sorting_price">
                        <Select
                          className="react-select-container"
                          defaultValue={optionsRange2[0]}
                          options={optionsRange2}
                          styles={styleSelect5}
                          onChange={(e) => {
                            setFilter((prev) => ({ ...prev, order: e.value }));
                            fetchData({
                              ...getFullValues(),
                              ...filter,
                              order: e.value,
                            });
                          }}
                        />
                      </div>

                      <div className="sorting_date">
                        <Select
                          className="react-select-container"
                          defaultValue={optionsRange[0]}
                          options={optionsRange}
                          styles={styleSelect5}
                          onChange={(e) => {
                            setFilter((prev) => ({ ...prev, sort: e.value }));
                            fetchData({
                              ...getFullValues(),
                              ...filter,
                              sort: e.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    {/* <div className="catalog_lots_display">
                      <span className="sorting_title">Отображать:</span>
                      <button
                        className="lots_display_map lots_display_btn"
                        onClick={() => setStateMap(true)}
                      />
                      <button
                        className="lots_display_box lots_display_btn"
                        onClick={() => setStateMap()}
                      />
                      <span className="btn_filter" onClick={handlerFilter}>
                        Фильтр
                      </span>
                    </div> */}
                  </div>

                  {!stateMap && (
                    <>
                      <div className="catalog_auctions_wrap">
                        {data.lots?.map((lot) => (
                          <>
                            <Card
                              key={lot.id}
                              lot={lot}
                              favorite={favorites?.includes(lot.id)}
                              onClick={() => onClickFavorite(lot)}
                            />
                          </>
                        ))}
                        {data.total == 0 && <p>Ничего не найдено</p>}
                      </div>
                      <div className="catalog_lots_footer">
                        <div className="lots_footer_number">
                          Выводить по
                          <Select
                            className="react-select-container"
                            defaultValue={optionsNumber[0]}
                            options={optionsNumber}
                            styles={styleSelectNumber}
                            onChange={(v) => numberLots(v)}
                            isSearchable={false}
                          />
                          объектов
                        </div>
                        <div className="paginations">
                          <ReactPaginate
                            forcePage={data.currentPage - 1}
                            nextLabel=""
                            onPageChange={(page) => changePaginate(page)}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={data.lastPage}
                            previousLabel=""
                            pageLinkClassName="page_number"
                            previousLinkClassName="page_link prev"
                            nextClassName=""
                            nextLinkClassName="page_link next"
                            breakLabel="..."
                            breakClassName="page_number"
                            activeLinkClassName="current"
                            renderOnZeroPageCount={null}
                          />
                        </div>
                        <span className="lots_footer_info">
                          Показано объектов{" "}
                          {data.total < data.perPage
                            ? data.total
                            : data.perPage}{" "}
                          из {data.total}
                        </span>
                      </div>
                    </>
                  )}

                  {stateMap && (
                    <div className="catalog_map">
                      <div
                        className={
                          stateLots
                            ? "catalog_map_lots catalog_map_active"
                            : "catalog_map_lots"
                        }
                      >
                        <div className="catalog_map_head">
                          <span className="catalog_lots_number">
                            Найдено: 5 объектов
                          </span>
                          <span
                            className="catalog_map_clouse"
                            onClick={handlerLots}
                          ></span>
                        </div>
                        <div className="catalog_auctions_wrap">
                          <Link href="" legacyBehavior>
                            <a className="auction_card">
                              <div className="auction_card_top">
                                <img src="/images/auction_card.jpg" alt="" />
                                <span className="auction_card_status">
                                  Объявленный
                                </span>
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
                                <span className="auction_card_status">
                                  Объявленный
                                </span>
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
                                <span className="auction_card_status">
                                  Объявленный
                                </span>
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
                                <span className="auction_card_status">
                                  Объявленный
                                </span>
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
                                <img src="/images/auction_card5.jpg" alt="" />
                                <span className="auction_card_status">
                                  Объявленный
                                </span>
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
                                <img src="/images/auction_card6.jpg" alt="" />
                                <span className="auction_card_status">
                                  Объявленный
                                </span>
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
                                <img src="/images/auction_card7.jpg" alt="" />
                                <span className="auction_card_status">
                                  Объявленный
                                </span>
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
                                <span className="auction_card_status">
                                  Объявленный
                                </span>
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
                                <img src="/images/auction_card.jpg" alt="" />
                                <span className="auction_card_status">
                                  Объявленный
                                </span>
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
                      </div>
                      <div className="catalog_map_points" onClick={handlerLots}>
                        <img src="/images/contacts_map.jpg" alt="" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </MainLayout>
      </div>
      <ModalRegister
        isVisible={isVisible}
        open={open}
        setOpen={setOpen}
        closeModal={closeModal}
        setIsVisible={setIsVisible}
      />
    </>
  );
}

Catalog.getInitialProps = async (ctx) => {
  const response = await connection.get(`api/v1/filter/lots/`, {
    params: {
      paginate: 6,
      status: STATUS_TYPE.ALL,
      page: 1,
      order: ORDER_BY.INITIAL_PRICE,
      sort: SORTED.ASC,
    },
  });

  const responseSearch = await connection.get("api/v1/info/lot/");

  return {
    sortedLots: response.data?.data,
    total: response.data?.total,
    currentPage: response.data?.current_page,
    links: response.data?.links,
    lastPage: response.data?.last_page,
    perPage: response.data?.per_page,
    count: response.data?.count,
    categories: responseSearch.data.data,
  };
};

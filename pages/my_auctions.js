import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";
import React from "react";
import { useState, useEffect } from "react";

/*----reactjs-popup-----*/
import Popup from "reactjs-popup";

/*------- Accordion --------*/

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function Home() {
  /*------popup-----------*/

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <MainLayout title={"Мои аукционы"}>
        <main>
          <Breadcrumb
            currentName={"Мои аукционы"}
            secondLinkName={"Личный кабинет"}
            secondLinkPath={"personal_area"}
          />

          <div className="my_lots margin_bottom">
            <div className="grid_container">
              <span className="my_lots_title">Виды лотов</span>
              <div className="my_lots_tabs">
                <div className="scroll_wrap">
                  <span className="lots_tabs_item active_tabs_item">
                    Учавствую
                  </span>
                  <span className="lots_tabs_item">Необходим залог</span>
                  <span className="lots_tabs_item">Завершенные</span>
                </div>
              </div>

              <div className="my_lots_accordion">
                <div className="lots_accordion_head">
                  <span className="lots_accordion_title">
                    Список моих аукцинов
                  </span>
                  <span className="lots_accordion_subtitle">
                    Подробная информация о всех объявлениях
                  </span>
                </div>
                <div className="accordion_box_title">
                  <span className="accordion_box_title_item">
                    Название лота
                  </span>
                  <span className="accordion_box_title_item">
                    Период подачи заявок
                  </span>
                  <span className="accordion_box_title_item">
                    Начальная стоимсть
                  </span>
                  <span className="accordion_box_title_item">
                    Предложенная сумма
                  </span>
                </div>

                <Accordion allowZeroExpanded>
                  <AccordionItem className="my_auctions my_lot">
                    <AccordionItemHeading className="my_lot_head">
                      <AccordionItemButton>
                        <div className="my_lot_wrap">
                          <div className="my_lot_name">
                            <span className="my_lot_mobail_title">
                              Название лота
                            </span>
                            <div className="my_lot_name_wrap">
                              <div className="my_lot_name_icon">
                                <img src="/images/lot_icon.jpg" alt="" />
                              </div>
                              <div className="my_lot_name_title">
                                <h3 className="my_lot_title">
                                  Нижегородский Фарфорвый завод
                                </h3>
                                <span className="my_lot_name___date">
                                  Дата торгов: 23 октября 2022 года
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="my_lot_days">
                            <span className="my_lot_mobail_title">
                              Период подачи заявок
                            </span>
                            <span className="days_wrap">54 дня</span>
                          </div>
                          <div className="my_lot_assigned_cost">
                            <span className="my_lot_mobail_title">
                              Начальная стоимсть
                            </span>
                            <span className="assigned_cost_wrap">
                              1 055 618 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_proposed_price">
                            <span className="my_lot_mobail_title">
                              Предложенная сумма
                            </span>
                            <san className="proposed_price_wrap">
                              2 055 618 000 ₽
                            </san>
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="my_lot_content">
                      <div className="my_lot_status status_bail_paid">
                        <span className="my_lot_status_name">
                          Внесен залог:
                        </span>
                        <span className="my_lot_status_prise">
                          1 055 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem className="my_auctions my_lot">
                    <AccordionItemHeading className="my_lot_head">
                      <AccordionItemButton>
                        <div className="my_lot_wrap">
                          <div className="my_lot_name">
                            <span className="my_lot_mobail_title">
                              Название лота
                            </span>
                            <div className="my_lot_name_wrap">
                              <div className="my_lot_name_icon">
                                <img src="/images/luzhayka.jpg" alt="" />
                              </div>
                              <div className="my_lot_name_title">
                                <h3 className="my_lot_title">
                                  Нижегородский завод
                                </h3>
                                <span className="my_lot_name___date">
                                  Дата торгов: 23 октября 2022 года
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="my_lot_days">
                            <span className="my_lot_mobail_title">
                              Период подачи заявок
                            </span>
                            <span className="days_wrap">34 дня</span>
                          </div>
                          <div className="my_lot_assigned_cost">
                            <span className="my_lot_mobail_title">
                              Начальная стоимсть
                            </span>
                            <span className="assigned_cost_wrap">
                              1 555 618 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_proposed_price">
                            <span className="my_lot_mobail_title">
                              Предложенная сумма
                            </span>
                            <san className="proposed_price_wrap">
                              3 155 618 000 ₽
                            </san>
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="my_lot_content">
                      <div className="my_lot_status status_bail_paid">
                        <span className="my_lot_status_name">
                          Внесен залог:
                        </span>
                        <span className="my_lot_status_prise">
                          1 055 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem className="my_auctions my_lot">
                    <AccordionItemHeading className="my_lot_head">
                      <AccordionItemButton>
                        <div className="my_lot_wrap">
                          <div className="my_lot_name">
                            <span className="my_lot_mobail_title">
                              Название лота
                            </span>
                            <div className="my_lot_name_wrap">
                              <div className="my_lot_name_icon">
                                <img
                                  src="https://www.citymoscow.ru/static/news/images/5ea05ef75fbb457ab13a3ca1_b0ee3b0932909bfb14b027a643d662a1.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="my_lot_name_title">
                                <h3 className="my_lot_title">Москва сити</h3>
                                <span className="my_lot_name___date">
                                  Дата торгов: 23 октября 2022 года
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="my_lot_days">
                            <span className="my_lot_mobail_title">
                              Период подачи заявок
                            </span>
                            <span className="days_wrap">64 дня</span>
                          </div>
                          <div className="my_lot_assigned_cost">
                            <span className="my_lot_mobail_title">
                              Начальная стоимсть
                            </span>
                            <span className="assigned_cost_wrap">
                              11 055 618 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_proposed_price">
                            <span className="my_lot_mobail_title">
                              Предложенная сумма
                            </span>
                            <san className="proposed_price_wrap">
                              22 550 000 000 ₽
                            </san>
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="my_lot_content">
                      <div className="my_lot_status status_bail_paid">
                        <span className="my_lot_status_name">
                          Внесен залог:
                        </span>
                        <span className="my_lot_status_prise">
                          1 055 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem className="my_auctions my_lot">
                    <AccordionItemHeading className="my_lot_head">
                      <AccordionItemButton>
                        <div className="my_lot_wrap">
                          <div className="my_lot_name">
                            <span className="my_lot_mobail_title">
                              Название лота
                            </span>
                            <div className="my_lot_name_wrap">
                              <div className="my_lot_name_icon">
                                <img src="/images/lot_icon.jpg" alt="" />
                              </div>
                              <div className="my_lot_name_title">
                                <h3 className="my_lot_title">
                                  Нижегородский Фарфорвый завод
                                </h3>
                                <span className="my_lot_name___date">
                                  Дата торгов: 23 октября 2022 года
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="my_lot_days">
                            <span className="my_lot_mobail_title">
                              Период подачи заявок
                            </span>
                            <span className="days_wrap">54 дня</span>
                          </div>
                          <div className="my_lot_assigned_cost">
                            <span className="my_lot_mobail_title">
                              Начальная стоимсть
                            </span>
                            <span className="assigned_cost_wrap">
                              1 055 618 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_proposed_price">
                            <span className="my_lot_mobail_title">
                              Предложенная сумма
                            </span>
                            <san className="proposed_price_wrap">
                              2 055 618 000 ₽
                            </san>
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="my_lot_content">
                      <div className="my_lot_status status_bail_paid">
                        <span className="my_lot_status_name">
                          Внесен залог:
                        </span>
                        <span className="my_lot_status_prise">
                          1 055 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem className="my_auctions my_lot">
                    <AccordionItemHeading className="my_lot_head">
                      <AccordionItemButton>
                        <div className="my_lot_wrap">
                          <div className="my_lot_name">
                            <span className="my_lot_mobail_title">
                              Название лота
                            </span>
                            <div className="my_lot_name_wrap">
                              <div className="my_lot_name_icon">
                                <img src="/images/luzhayka.jpg" alt="" />
                              </div>
                              <div className="my_lot_name_title">
                                <h3 className="my_lot_title">
                                  Нижегородский завод
                                </h3>
                                <span className="my_lot_name___date">
                                  Дата торгов: 23 октября 2022 года
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="my_lot_days">
                            <span className="my_lot_mobail_title">
                              Период подачи заявок
                            </span>
                            <span className="days_wrap">54 дня</span>
                          </div>
                          <div className="my_lot_assigned_cost">
                            <span className="my_lot_mobail_title">
                              Начальная стоимсть
                            </span>
                            <span className="assigned_cost_wrap">
                              1 055 618 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_proposed_price">
                            <span className="my_lot_mobail_title">
                              Предложенная сумма
                            </span>
                            <san className="proposed_price_wrap">
                              2 055 618 000 ₽
                            </san>
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="my_lot_content">
                      <div className="my_lot_status status_bail_paid">
                        <span className="my_lot_status_name">
                          Внесен залог:
                        </span>
                        <span className="my_lot_status_prise">
                          1 055 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem className="my_auctions my_lot">
                    <AccordionItemHeading className="my_lot_head">
                      <AccordionItemButton>
                        <div className="my_lot_wrap">
                          <div className="my_lot_name">
                            <span className="my_lot_mobail_title">
                              Название лота
                            </span>
                            <div className="my_lot_name_wrap">
                              <div className="my_lot_name_icon">
                                <img
                                  src="https://www.citymoscow.ru/static/news/images/5ea05ef75fbb457ab13a3ca1_b0ee3b0932909bfb14b027a643d662a1.jpg"
                                  alt=""
                                />
                              </div>
                              <div className="my_lot_name_title">
                                <h3 className="my_lot_title">Москва сити</h3>
                                <span className="my_lot_name___date">
                                  Дата торгов: 23 октября 2022 года
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="my_lot_days">
                            <span className="my_lot_mobail_title">
                              Период подачи заявок
                            </span>
                            <span className="days_wrap">54 дня</span>
                          </div>
                          <div className="my_lot_assigned_cost">
                            <span className="my_lot_mobail_title">
                              Начальная стоимсть
                            </span>
                            <span className="assigned_cost_wrap">
                              11 055 618 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_proposed_price">
                            <span className="my_lot_mobail_title">
                              Предложенная сумма
                            </span>
                            <san className="proposed_price_wrap">
                              12 055 618 000 ₽
                            </san>
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className="my_lot_content">
                      <div className="my_lot_status status_bail_paid">
                        <span className="my_lot_status_name">
                          Внесен залог:
                        </span>
                        <span className="my_lot_status_prise">
                          1 055 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                      <div className="my_lot_status outbid_status">
                        <span className="my_lot_status_name">
                          Статус ставки:
                        </span>
                        <span className="my_lot_status_prise">Перебита</span>
                        <span
                          className="boost_btn"
                          onClick={() => setOpen((o) => !o)}
                        >
                          Повысить ставку
                        </span>
                      </div>
                      <div className="my_lot_status status_rate_up">
                        <span className="my_lot_status_name">
                          Ставка повышена:
                        </span>
                        <span className="my_lot_status_prise">
                          1 056 618 000 ₽
                        </span>
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
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

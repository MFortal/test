import { STATUS_LOTS } from "@/common/const";
import { Breadcrumb } from "@/components/Breadcrumb";
import { formatPrice } from "@/helpers/formatPrice";
import { MainLayout } from "@/layouts/MainLayout";
import { selectAuthState } from "@/redux/slices/authSlice";
import moment from "moment/moment";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useSelector } from "react-redux";

export default function Home() {
  const [statusLots, setStatusLots] = useState(STATUS_LOTS.PUBLISHED);

  const lots = useSelector(selectAuthState).info.lots;
  console.log(lots);

  const optionsFormatDate = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("ru", optionsFormatDate);
  };

  return (
    <div>
      <MainLayout title={"Мои лоты"}>
        <main>
          <Breadcrumb
            currentName={"Мои лоты"}
            secondLinkName={"Личный кабинет"}
            secondLinkPath={"personal_area"}
          />

          <div className="my_lots margin_bottom">
            <div className="grid_container">
              <span className="my_lots_title">Виды лотов</span>
              <div className="my_lots_tabs">
                <div className="scroll_wrap">
                  <span
                    className={`lots_tabs_item ${
                      statusLots == STATUS_LOTS.PUBLISHED
                        ? "active_tabs_item"
                        : ""
                    }`}
                    onClick={() => setStatusLots(STATUS_LOTS.PUBLISHED)}
                  >
                    Опубликованные <span>{lots.published.length}</span>
                  </span>
                  <span
                    className={`lots_tabs_item ${
                      statusLots == STATUS_LOTS.MODERATION
                        ? "active_tabs_item"
                        : ""
                    }`}
                    onClick={() => setStatusLots(STATUS_LOTS.MODERATION)}
                  >
                    На модерации <span>{lots.moderation.length}</span>
                  </span>
                  <span
                    className={`lots_tabs_item ${
                      statusLots == STATUS_LOTS.COMPLETED
                        ? "active_tabs_item"
                        : ""
                    }`}
                    onClick={() => setStatusLots(STATUS_LOTS.COMPLETED)}
                  >
                    Завершенные
                    <span>{lots.completed.length}</span>
                  </span>
                </div>
              </div>

              {statusLots == STATUS_LOTS.PUBLISHED && (
                <div className="my_lots_accordion">
                  <div className="lots_accordion_head">
                    <span className="lots_accordion_title">Список лотов</span>
                    <span className="lots_accordion_subtitle">
                      Подробная информация об опубликованных объявлениях
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
                    {lots.published.map((lot) => (
                      <AccordionItem className="my_lot">
                        <AccordionItemHeading className="my_lot_head">
                          <AccordionItemButton>
                            <div className="my_lot_wrap">
                              <div className="my_lot_name">
                                <div className="my_lot_name_wrap">
                                  <div className="my_lot_name_icon">
                                    <img src={lot.images[0]?.path} alt="" />
                                  </div>
                                  <div className="my_lot_name_title">
                                    <h3 className="my_lot_title">{lot.name}</h3>
                                    <span className="my_lot_name___date">
                                      Дата торгов: {lot.date_start_trading}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="my_lot_days">
                                <span className="days_wrap">54 дня</span>
                              </div>
                              <div className="my_lot_assigned_cost">
                                <span className="assigned_cost_wrap">
                                  {formatPrice(lot.initial_price)} ₽
                                </span>
                              </div>
                              <div className="my_lot_proposed_price">
                                <san className="proposed_price_wrap">
                                  2 055 618 000 ₽
                                </san>
                              </div>
                            </div>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="my_lot_content">
                          <div className="my_lot_status status_initial_cost">
                            <span className="my_lot_status_name">
                              Начальная стоимость:
                            </span>
                            <span className="my_lot_status_prise">
                              {formatPrice(lot.initial_price)} ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_rate_increased">
                            <span className="my_lot_status_name">
                              Ставка повышена:
                            </span>
                            <span className="my_lot_status_prise">
                              1 065 700 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_rate_increased">
                            <span className="my_lot_status_name">
                              Ставка повышена:
                            </span>
                            <span className="my_lot_status_prise">
                              1 067 500 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_rate_increased">
                            <span className="my_lot_status_name">
                              Ставка повышена:
                            </span>
                            <span className="my_lot_status_prise">
                              1 099 000 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_winning_amount">
                            <span className="my_lot_status_name">
                              Аукцион завершен: &nbsp; Сумма выигрыша
                            </span>
                            <span className="my_lot_status_prise">
                              1 099 000 000 ₽
                            </span>
                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {statusLots == STATUS_LOTS.MODERATION && (
                <div className="my_lots_accordion">
                  <div className="lots_accordion_head">
                    <span className="lots_accordion_title">Список лотов</span>
                    <span className="lots_accordion_subtitle">
                      Подробная информация об объявлениях, которые находятся на
                      модерации
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
                    {lots.moderation.map((lot) => (
                      <AccordionItem className="my_lot">
                        <AccordionItemHeading className="my_lot_head">
                          <AccordionItemButton>
                            <div className="my_lot_wrap">
                              <div className="my_lot_name">
                                <div className="my_lot_name_wrap">
                                  <div className="my_lot_name_icon">
                                    <img src={lot.images[0]?.path} alt="" />
                                  </div>
                                  <div className="my_lot_name_title">
                                    <h3 className="my_lot_title">{lot.name}</h3>
                                    <span className="my_lot_name___date">
                                      Дата торгов: {lot.date_start_trading}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="my_lot_days">
                                <span className="days_wrap">54 дня</span>
                              </div>
                              <div className="my_lot_assigned_cost">
                                <span className="assigned_cost_wrap">
                                  {formatPrice(lot.initial_price)} ₽
                                </span>
                              </div>
                              <div className="my_lot_proposed_price">
                                <san className="proposed_price_wrap">
                                  2 055 618 000 ₽
                                </san>
                              </div>
                            </div>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="my_lot_content">
                          <div className="my_lot_status status_initial_cost">
                            <span className="my_lot_status_name">
                              Начальная стоимость:
                            </span>
                            <span className="my_lot_status_prise">
                              {formatPrice(lot.initial_price)} ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_rate_increased">
                            <span className="my_lot_status_name">
                              Ставка повышена:
                            </span>
                            <span className="my_lot_status_prise">
                              1 065 700 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_rate_increased">
                            <span className="my_lot_status_name">
                              Ставка повышена:
                            </span>
                            <span className="my_lot_status_prise">
                              1 067 500 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_rate_increased">
                            <span className="my_lot_status_name">
                              Ставка повышена:
                            </span>
                            <span className="my_lot_status_prise">
                              1 099 000 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_winning_amount">
                            <span className="my_lot_status_name">
                              Аукцион завершен: &nbsp; Сумма выигрыша
                            </span>
                            <span className="my_lot_status_prise">
                              1 099 000 000 ₽
                            </span>
                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {statusLots == STATUS_LOTS.COMPLETED && (
                <div className="my_lots_accordion">
                  <div className="lots_accordion_head">
                    <span className="lots_accordion_title">Список лотов</span>
                    <span className="lots_accordion_subtitle">
                      Подробная информация о завершенных объявлениях
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
                    {lots.completed.map((lot) => (
                      <AccordionItem className="my_lot">
                        <AccordionItemHeading className="my_lot_head">
                          <AccordionItemButton>
                            <div className="my_lot_wrap">
                              <div className="my_lot_name">
                                <div className="my_lot_name_wrap">
                                  <div className="my_lot_name_icon">
                                    <img src={lot.images[0]?.path} alt="" />
                                  </div>
                                  <div className="my_lot_name_title">
                                    <h3 className="my_lot_title">{lot.name}</h3>
                                    <span className="my_lot_name___date">
                                      Дата торгов: {lot.date_start_trading}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="my_lot_days">
                                <span className="days_wrap">54 дня</span>
                              </div>
                              <div className="my_lot_assigned_cost">
                                <span className="assigned_cost_wrap">
                                  {formatPrice(lot.initial_price)} ₽
                                </span>
                              </div>
                              <div className="my_lot_proposed_price">
                                <san className="proposed_price_wrap">
                                  2 055 618 000 ₽
                                </san>
                              </div>
                            </div>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="my_lot_content">
                          <div className="my_lot_status status_initial_cost">
                            <span className="my_lot_status_name">
                              Начальная стоимость:
                            </span>
                            <span className="my_lot_status_prise">
                              {formatPrice(lot.initial_price)} ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_rate_increased">
                            <span className="my_lot_status_name">
                              Ставка повышена:
                            </span>
                            <span className="my_lot_status_prise">
                              1 065 700 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_rate_increased">
                            <span className="my_lot_status_name">
                              Ставка повышена:
                            </span>
                            <span className="my_lot_status_prise">
                              1 067 500 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_rate_increased">
                            <span className="my_lot_status_name">
                              Ставка повышена:
                            </span>
                            <span className="my_lot_status_prise">
                              1 099 000 000 ₽
                            </span>
                          </div>
                          <div className="my_lot_status status_winning_amount">
                            <span className="my_lot_status_name">
                              Аукцион завершен: &nbsp; Сумма выигрыша
                            </span>
                            <span className="my_lot_status_prise">
                              1 099 000 000 ₽
                            </span>
                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

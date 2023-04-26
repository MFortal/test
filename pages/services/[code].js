import React from "react";
import Link from "next/link";

import { MainLayout } from "../../layouts/MainLayout";
import { connection } from "@/helpers/connection";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function Service({ service }) {
  return (
    <div>
      <MainLayout title={service.name}>
        <main>
          <Breadcrumb
            secondLinkName={"Услуги"}
            secondLinkPath={"services"}
            currentName={service.name}
            marginBtn={false}
          />

          <div className="sigle_services margin_bottom">
            <div className="grid_container">
              <div className="sigle_content">
                <h2>{service.title}</h2>

                <div
                  className="container"
                  dangerouslySetInnerHTML={{ __html: service.text }}
                ></div>
              </div>
            </div>
          </div>

          <div className="services_trigger margin_bottom">
            <div className="grid_container">
              <h2 className="services_triggers_title">
                С нами вы в полной уверенности:
              </h2>
              <div className="services_trigger_wrap">
                <div className="services_trigger_item">
                  <div className="services_trigger_img">
                    <img src="/images/services_trigger.png" alt="" />
                  </div>
                  <h3 className="services_trigger_title">
                    Выгодное предложение
                  </h3>
                  <p className="services_trigger_text">
                    Помогаем взять ипотеку на выгодных условиях, ставка от 2,7%
                    и дополнительным сервисом INFULL.
                  </p>
                </div>
                <div className="services_trigger_item">
                  <div className="services_trigger_img">
                    <img src="/images/services_trigger2.png" alt="" />
                  </div>
                  <h3 className="services_trigger_title">
                    Быстрое оформление ипотеки
                  </h3>
                  <p className="services_trigger_text">
                    Рассмотрение заявки в 20+ банках партнёрах. Срок
                    рассмотрения от 3 дней.
                  </p>
                </div>
                <div className="services_trigger_item">
                  <div className="services_trigger_img">
                    <img src="/images/services_trigger3.png" alt="" />
                  </div>
                  <h3 className="services_trigger_title">
                    Решение сложных вопросов
                  </h3>
                  <p className="services_trigger_text">
                    Бесплатная консультация специалиста, подготовка необходимого
                    комплекта документов.
                  </p>
                </div>
                <div className="services_trigger_item">
                  <div className="services_trigger_img">
                    <img src="/images/services_trigger4.png" alt="" />
                  </div>
                  <h3 className="services_trigger_title">
                    Прозрачное взаимодействие
                  </h3>
                  <p className="services_trigger_text">
                    Информируем по всем стадиям согласования сделки без
                    посещения офиса
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="confidence">
            <div className="grid_container">
              <h2 className="confidence_title">
                С нами вы в полной уверенности:
              </h2>
              <div className="confidence_wrap">
                <div className="confidence_item">
                  <img src="/images/sber_bank.svg" alt="" />
                </div>
                <div className="confidence_item">
                  <img src="/images/sber_bank1.svg" alt="" />
                </div>
                <div className="confidence_item">
                  <img src="/images/image.svg" alt="" />
                </div>
                <div className="confidence_item">
                  <img src="/images/sber_bank.svg" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="form_question">
            <div className="grid_container form_question_wrap">
              <div className="form_question_left">
                <span className="form_question_title">
                  Закажите бесплатную консультацию!
                </span>
                <p className="form_question_phone">
                  Или позвоните &nbsp;
                  <Link href="tel:+7 (000) 000-00-00" legacyBehavior>
                    <a>+7 (000) 000-00-00</a>
                  </Link>
                </p>
              </div>
              <form action="" className="form_question_right">
                <span className="form_question_title2">
                  Обсудите ваше ситуацию с специалистом по рынку
                </span>
                <input type="text" placeholder="Ваше имя" />
                <input type="text" placeholder="Ваш телефон" />
                <input type="text" placeholder="Ваша почта" />
                <button className="btn_site form_question_btn">
                  Отправить
                </button>
                <label className="form_question_control control control-checkbox">
                  Я соглашаюсь с условиями обработки и хранения моих
                  персональных данных
                  <input type="checkbox" />
                  <div className="control_indicator"></div>
                </label>
              </form>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

Service.getInitialProps = async (ctx) => {
  const code = ctx.query.code;
  const response = await connection.get(`api/v1/service/${code}`);
  return {
    service: response.data.data,
  };
};

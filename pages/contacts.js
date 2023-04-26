import { Breadcrumb } from "@/components/Breadcrumb";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";

export default function Home() {
  return (
    <div>
      <MainLayout title={"Контакты"}>
        <main>
          <Breadcrumb currentName={"Контакты"} />

          <div className="page_contacts">
            <div className="grid_container">
              <div className="page_contacts_item">
                <span className="page_contacts_name">Email:</span>
                <Link href="mailto:info@gmail.com" legacyBehavior>
                  <a className="page_contacts_value">info@gmail.com</a>
                </Link>
              </div>
              <div className="page_contacts_item">
                <span className="page_contacts_name">Телефон:</span>
                <Link href="tel:+7 (000) 000 00 00" legacyBehavior>
                  <a className="page_contacts_value">+7 (000) 000 00 00</a>
                </Link>
              </div>
              <div className="page_contacts_item">
                <span className="page_contacts_name">Адрес:</span>
                <span className="page_contacts_value">
                  145907, Московская область, г. Орехово-Зуево, д 134, стр.2,оф.
                  340
                </span>
              </div>
              <div className="page_contacts_item">
                <span className="page_contacts_name">График работы:</span>
                <span className="page_contacts_value">
                  07:00 - 17:00 МСК (По будням)
                </span>
              </div>
            </div>
          </div>
          <div className="contacts_map margin_bottom">
            <div className="grid_container card_map_wrap">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A86c8f0765cff40e45ab2903f772dd271faf2757ba399c9c4a7f2395266ceca30&amp;source=constructor"
                width="100%"
                height="400"
                frameborder="0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

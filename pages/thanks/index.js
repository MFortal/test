import { MainLayout } from "@/layouts/MainLayout";

export default function Thanks() {
  return (
    <div>
      <MainLayout title={"Спасибо"}>
        <main>
          <div className="sigle_services margin_bottom">
            <div className="grid_container">
              <div className="sigle_content">
                <h2>Спасибо, что пополнили баланс!</h2>

                <div className="container">
                  Мы получили Ваше пополнение. Теперь вы можете участвовать в
                  торгах.
                </div>
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

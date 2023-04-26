import "../styles/reset.scss";
import "../styles/globals.scss";
import "../styles/fonts.scss";
import "../styles/index.scss";
import "../styles/button.scss";
import "../styles/hamb.scss";
import "../styles/catalog.scss";
import "../styles/card_lot.scss";
import "../styles/single_services.scss";
import "../styles/page.scss";
import "../styles/contacts.scss";
import "../styles/question_answer.scss";
import "../styles/personal_area.scss";
import "../styles/adding_lot.scss";
import "../styles/personal_data.scss";
import "../styles/my_lots.scss";
import "../styles/trading_room.scss";
import "../styles/modal.scss";
import "../styles/mobail.scss";
import { wrapper } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { useEffect } from "react";
import { getCSRF } from "@/helpers/getCSRF";

function App({ Component, pageProps }) {
  const store = useStore();

  useEffect(() => {
    getCSRF().catch(console.error);
  }, []);

  return (
    <PersistGate
      persistor={store.__persistor}
      //loading={<div>Loading</div>}
    >
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(App);

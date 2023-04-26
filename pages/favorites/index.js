import { Card } from "@/components/Card";
import { MainLayout } from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumb } from "@/components/Breadcrumb";
import { connection } from "@/helpers/connection";
import { getAuthorization } from "@/helpers/getToken";
import {
  removeFavorite,
  selectFavoritesState,
  setFavorite,
} from "@/redux/slices/authSlice";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from "react-paginate";

export default function Favorites() {
  const authFavorites = useSelector(selectFavoritesState);
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState(authFavorites?.ids ?? []);
  const [lots, setLots] = useState(authFavorites?.lots ?? []);

  const itemsPage = 4;

  const onClickFavorite = async (lot) => {
    if (favorites.includes(lot.id)) {
      setFavorites((favorites) => favorites.filter((x) => x != lot.id));
      setLots((lots) => lots.filter((x) => x.id != lot.id));

      dispatch(removeFavorite({ id: lot.id, lot: lot }));
    } else {
      setFavorites([...favorites, lot.id]);
      setLots([...lots, lot]);
      dispatch(setFavorite({ id: lot.id, lot: lot }));
    }

    await connection
      .get(`/api/v1/favorite/${lot.id}`, { headers: getAuthorization() })
      .then((response) => {
        console.log(response);
        dispatch(setFavorite({ id: lot.id, lot: lot }));
      })
      .catch((error) => {
        console.log(error);
        setFavorites((favorites) => favorites.filter((x) => x != lot.id));
        setLots((lots) => lots.filter((x) => x.id != lot.id));

        dispatch(removeFavorite({ id: lot.id, lot: lot }));
      });
  };

  return (
    <div>
      <MainLayout title={"Избранное"}>
        <main>
          <Breadcrumb
            currentName={"Избранное"}
            secondLinkName={"Личный кабинет"}
            secondLinkPath={"personal_area"}
          />

          <div className="favorites margin_bottom">
            <div className="grid_container favorites_wrap">
              {lots.length > 0 && (
                <PaginatedItems
                  itemsPerPage={itemsPage}
                  lots={lots}
                  favorites={favorites}
                  onClickFavorite={onClickFavorite}
                  paginate={lots.length > itemsPage}
                />
              )}
              {lots.length <= 0 && <p>Здесь пока нет избранных лотов</p>}
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

function PaginatedItems({
  itemsPerPage,
  lots,
  favorites,
  onClickFavorite,
  paginate,
}) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(lots.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(lots.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % lots.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="hottest_auctions_wrap">
        {currentItems.map((lot) => (
          <Card
            key={lot.id}
            lot={lot}
            favorite={favorites.includes(lot.id)}
            onClick={() => onClickFavorite(lot)}
          />
        ))}
      </div>
      {paginate && (
        <div className="paginations_wrap">
          <div className="paginations">
            <ReactPaginate
              nextLabel=""
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
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
        </div>
      )}
    </>
  );
}

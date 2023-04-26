import { Breadcrumb } from "@/components/Breadcrumb";
import { CustomPopup } from "@/components/CustomPopup";
import FormAddLotImmovables from "@/components/Form/FormAddLotImmovables";
import { clearLS } from "@/helpers/clearLS";
import { clearUserData } from "@/helpers/clearUserData";
import { connection } from "@/helpers/connection";
import { getObjOptions } from "@/helpers/getObjOptions";
import { getAuthorization } from "@/helpers/getToken";
import { MainLayout } from "@/layouts/MainLayout";
import { addModerationLot } from "@/redux/slices/authSlice";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddLotCode({
  decorations,
  sewerages,
  gas,
  type_immovables,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [stateModal, setStateModal] = useState();

  const optionsDecorationWithoutFirst = getObjOptions(decorations);
  const optionsSewerageWithoutFirst = getObjOptions(sewerages);
  const optionsGasWithoutFirst = getObjOptions(gas);
  const optionsTypeImmovableWithoutFirst = getObjOptions(type_immovables);

  const optionsImmovable = [
    { value: 0, label: "Тип недвижимости" },
    ...optionsTypeImmovableWithoutFirst,
  ];
  const optionsSewerage = [
    { value: 0, label: "Канализация" },
    ...optionsSewerageWithoutFirst,
  ];
  const optionsGas = [{ value: 0, label: "Газ" }, ...optionsGasWithoutFirst];
  const optionsDecoration = [
    { value: 0, label: "Отделка" },
    ...optionsDecorationWithoutFirst,
  ];

  const initialDataFromLS = localStorage.dataLot
    ? JSON.parse(localStorage.dataLot)
    : {};

  const submitFormImmovables = (e) => {
    e.preventDefault();
    localStorage.dataLot = JSON.stringify(formik.values);

    const lot = JSON.parse(localStorage.lot);
    const values = formik.values;
    Object.assign(values, lot);

    values.sewerage_id = formik.values.sewerage?.value;
    values.gas_id = formik.values.gas?.value;
    values.decoration_id = formik.values.decoration?.value;
    values.type_immovable_id = formik.values.type_immovable?.value;
    values.package_id = values.package?.value;
    values.category_id = values.category?.value;

    values.photos = Array.from(
      new Map(JSON.parse(localStorage.dataFiles)).values()
    );
    values.files = Array.from(new Map(JSON.parse(localStorage.files)).values());
    console.log(values.files);

    connection
      .post("/api/v1/lots/add/immovable/", values, {
        headers: getAuthorization(),
      })
      .then((response) => {
        dispatch(addModerationLot(response.data.data));

        clearLS();

        setStateModal({
          open: true,
          success: true,
          heading: "Лот успешно добавлен",
          message: "Совсем скоро он пройдет модерацию",
        });
      })
      .catch((error) => {
        if (error.response.status == 401) {
          clearUserData(dispatch, router);
        }
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: initialDataFromLS.name ?? "",
      address: initialDataFromLS.address ?? "",
      initial_price: initialDataFromLS.initial_price ?? "",
      description: initialDataFromLS.description ?? "",
      total_area: initialDataFromLS.total_area ?? "",
      living_area: initialDataFromLS.living_area ?? "",
      number_floors: initialDataFromLS.number_floors ?? "",
      house_floors: initialDataFromLS.house_floors ?? "",
      year: initialDataFromLS.year ?? "",
      photos: "",

      decoration: initialDataFromLS.decoration ?? optionsDecoration[0],
      type_immovable: initialDataFromLS.type_immovable ?? optionsImmovable[0],
      sewerage: initialDataFromLS.sewerage ?? optionsSewerage[0],
      gas: initialDataFromLS.gas ?? optionsGas[0],

      parking: initialDataFromLS.parking ?? false,
      heating: initialDataFromLS.heating ?? false,
      water_supply: initialDataFromLS.water_supply ?? false,
      lavatory: initialDataFromLS.lavatory ?? false,
    },
  });

  return (
    <div>
      <MainLayout title={"Данные о лоте"}>
        <main>
          <Breadcrumb
            currentName={"Данные о лоте"}
            secondLinkName={"Личный кабинет"}
            secondLinkPath={"personal_area"}
          />

          <div className="lot_date adding_lot margin_bottom">
            <div className="grid_container">
              <FormikProvider value={formik}>
                <FormAddLotImmovables
                  submitForm={(e) => {
                    submitFormImmovables(e);
                  }}
                  formik={formik}
                  optionsDecoration={optionsDecoration}
                  optionsImmovable={optionsImmovable}
                  optionsSewerage={optionsSewerage}
                  optionsGas={optionsGas}
                />
              </FormikProvider>
            </div>
          </div>
        </main>

        <CustomPopup stateModal={stateModal} setStateModal={setStateModal} />
      </MainLayout>
    </div>
  );
}

AddLotCode.getInitialProps = async () => {
  const response = await connection.get(`api/v1/info/addLot/`);

  return {
    decorations: response.data.data.decoration,
    sewerages: response.data.data.sewerage,
    gas: response.data.data.gas,
    type_immovables: response.data.data.type_immovable,
  };
};

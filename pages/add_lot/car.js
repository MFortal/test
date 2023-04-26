import { validationSchemaAddLotCar } from "@/common/validationSchema";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CustomPopup } from "@/components/CustomPopup";
import FormAddLotCar from "@/components/Form/FormAddLotCar";
import { clearLS } from "@/helpers/clearLS";
import { clearUserData } from "@/helpers/clearUserData";
import { connection } from "@/helpers/connection";
import { getObjOptions } from "@/helpers/getObjOptions";
import { getAuthorization } from "@/helpers/getToken";
import { MainLayout } from "@/layouts/MainLayout";
import { addModerationLot } from "@/redux/slices/authSlice";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddLotCode({
  types,
  brands,
  transmissions,
  drives,
  engines,
}) {
  const [stateModal, setStateModal] = useState();
  const [responseData, setResponseData] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const optionsTypesCarWithoutFirst = getObjOptions(types);
  const optionsTypesCar = [
    { value: 0, label: "Тип автомобиля" },
    ...optionsTypesCarWithoutFirst,
  ];

  const optionsBrandsCarWithoutFirst = getObjOptions(brands);
  const optionsBrandsCar = [
    { value: 0, label: "Бренд" },
    ...optionsBrandsCarWithoutFirst,
  ];

  const optionsEnginesCarWithoutFirst = getObjOptions(engines);
  const optionsEnginesCar = [
    { value: 0, label: "Двигатель" },
    ...optionsEnginesCarWithoutFirst,
  ];

  const optionsTransmissionsCarWithoutFirst = getObjOptions(transmissions);
  const optionsTransmissionsCar = [
    { value: 0, label: "Коробка передач" },
    ...optionsTransmissionsCarWithoutFirst,
  ];

  const optionsDrivesCarWithoutFirst = getObjOptions(drives);
  const optionsDrivesCar = [
    { value: 0, label: "Привод" },
    ...optionsDrivesCarWithoutFirst,
  ];

  const initialBody = [{ value: 0, label: "Кузов" }];
  const initialGeneration = [{ value: 0, label: "Поколение" }];
  const initialModel = [
    {
      value: 0,
      label: "Модель",
      category_id: null,
    },
  ];

  const initialDataFromLS = localStorage.dataLot
    ? JSON.parse(localStorage.dataLot)
    : {};

  const formik = useFormik({
    initialValues: {
      name: initialDataFromLS.name ?? "",
      address: initialDataFromLS.address ?? "",
      initial_price: initialDataFromLS.initial_price ?? "",
      description: initialDataFromLS.description ?? "",
      photos: "",
      type: initialDataFromLS.type ?? optionsTypesCar[0],
      brand: initialDataFromLS.brand ?? optionsBrandsCar[0],
      model: initialDataFromLS.model ?? initialModel[0],
      body: initialDataFromLS.body ?? initialBody[0],
      mileage: initialDataFromLS.mileage ?? "",
      volume: initialDataFromLS.volume ?? "",
      transmission:
        initialDataFromLS.transmission ?? optionsTransmissionsCar[0],
      engine: initialDataFromLS.engine ?? optionsEnginesCar[0],
      drive: initialDataFromLS.drive ?? optionsDrivesCar[0],
      generation: initialDataFromLS.generation ?? initialGeneration[0],
      year: initialDataFromLS.year ?? "",
    },
    validationSchema: validationSchemaAddLotCar,
  });

  const submitFormCar = (e) => {
    e.preventDefault();
    localStorage.dataLot = JSON.stringify(formik.values);

    const lot = JSON.parse(localStorage.lot);
    const values = formik.values;
    Object.assign(values, lot);

    const bodies = responseData.find((x) => x.id == values.model?.value).bodies;

    values.body_id = formik.values.body?.value;
    values.brand_id = formik.values.brand?.value;
    values.drive_id = formik.values.drive?.value;
    values.engine_id = formik.values.engine?.value;
    values.generation_id = values.generation?.value;
    values.model_id = values.model?.value;
    values.transmission_id = values.transmission?.value;
    values.type_id = values.type?.value;
    values.package_id = values.package?.value;
    values.category_id = values.category?.value;
    values.model_body_id = bodies.find(
      (x) => x.id == formik.values.body?.value
    ).model_body_id;

    values.photos = Array.from(
      new Map(JSON.parse(localStorage.dataFiles)).values()
    );
    values.files = Array.from(new Map(JSON.parse(localStorage.files)).values());

    console.log(values);

    connection
      .post("/api/v1/lots/add/car/", values, {
        headers: getAuthorization(),
      })
      .then((response) => {
        console.log(response.data);
        dispatch(addModerationLot(response.data.data));
        clearLS();

        setStateModal({
          open: true,
          success: true,
          heading: "Лот успешно добавлен",
          message: "Совсем скоро он пройдет модерацию",
          path: "/my_lots",
        });
      })
      .catch((error) => {
        if (error.response.status == 401) {
          clearUserData(dispatch, router);
        }
        console.log(error);
      });
  };

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
              <FormAddLotCar
                formik={formik}
                submitFormCar={submitFormCar}
                initialBody={initialBody}
                initialModel={initialModel}
                initialGeneration={initialGeneration}
                optionsTypesCar={optionsTypesCar}
                optionsBrandsCar={optionsBrandsCar}
                optionsEnginesCar={optionsEnginesCar}
                optionsTransmissionsCar={optionsTransmissionsCar}
                optionsDrivesCar={optionsDrivesCar}
                initialDataFromLS={initialDataFromLS}
                responseData={responseData}
                setResponseData={setResponseData}
              />
            </div>
          </div>
        </main>

        <CustomPopup stateModal={stateModal} setStateModal={setStateModal} />
      </MainLayout>
    </div>
  );
}

AddLotCode.getInitialProps = async () => {
  const response = await connection.get(`api/v1/info/getAllCar`);

  return {
    types: response.data?.types,
    brands: response.data?.brands,
    transmissions: response.data?.transmissions,
    engines: response.data?.engines,
    drives: response.data?.drives,
  };
};

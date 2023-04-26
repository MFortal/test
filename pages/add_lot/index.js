import { Breadcrumb } from "@/components/Breadcrumb";
import FormAddLotStart from "@/components/Form/FormAddLotStart";
import { connection } from "@/helpers/connection";
import { getObjOptions, getObjOptionsDocuments } from "@/helpers/getObjOptions";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/router";
import { MainLayout } from "../../layouts/MainLayout";
import { validationSchemaAddLotStart } from "@/common/validationSchema";

export default function AddLot({ packages, categories, documents }) {
  const router = useRouter();

  const initialDataFromLS = localStorage.lot
    ? JSON.parse(localStorage.lot)
    : {};

  const optionsPackage = getObjOptions(packages);

  const optionsCategories = [
    { value: 0, label: "Выберите категорию" },
    ...getObjOptions(categories),
  ];

  const formik = useFormik({
    initialValues: {
      full_name: initialDataFromLS.full_name ?? "",
      files: "",
      package: initialDataFromLS.package ?? optionsPackage[0],
      category: initialDataFromLS.category ?? optionsCategories[0],
      email: initialDataFromLS.email ?? "",
    },
    validationSchema: validationSchemaAddLotStart,
  });

  const optionsDocumentsWithoutFirst = getObjOptionsDocuments(
    formik.values.category.value
      ? documents.filter((x) => x.category_id == formik.values.category.value)
      : documents
  );

  const optionsDocuments = [
    {
      value: 0,
      label: "Выберите из списка",
      category_id: null,
    },
    ...optionsDocumentsWithoutFirst,
  ];

  const submitForm = async (e) => {
    e.preventDefault();
    localStorage.lot = JSON.stringify(formik.values);
    const category = categories.find(
      (x) => x.id == formik.values.category.value
    );

    if (category?.id) {
      const path = category?.id == 1 ? "car" : "immovable";
      router.push(router.pathname + "/" + path);
    }
  };

  return (
    <div>
      <MainLayout title={"Добавление лота"}>
        <main>
          <Breadcrumb
            currentName={"Добавление лота"}
            secondLinkName={"Личный кабинет"}
            secondLinkPath={"personal_area"}
          />

          <div className="adding_lot margin_bottom">
            <div className="grid_container">
              <FormikProvider value={formik}>
                <FormAddLotStart
                  submitForm={(e) => {
                    submitForm(e);
                  }}
                  formik={formik}
                  optionsDocuments={optionsDocuments}
                  optionsDocumentsWithoutFirst={optionsDocumentsWithoutFirst}
                  optionsPackage={optionsPackage}
                  optionsCategories={optionsCategories}
                  intialDocuments={documents}
                />
              </FormikProvider>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

AddLot.getInitialProps = async () => {
  const response = await connection.get(`api/v1/info/addLot/`);

  return {
    packages: response.data.data.packages,
    categories: response.data.data.categories,
    documents: response.data.data.documents,
  };
};

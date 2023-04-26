import { styleSelect2 } from "@/common/styleSelect";
import { Field } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import Select from "react-select";
import { CustomInputLotFile } from "./components/CustomInputLotFile";
import CustomSelect from "./components/CustomSelect";
import { getObjOptionsDocuments } from "@/helpers/getObjOptions";

export default function FormAddLotStart({
  submitForm,
  formik,
  optionsDocuments,
  optionsDocumentsWithoutFirst,
  optionsPackage,
  optionsCategories,
  intialDocuments,
}) {
  const router = useRouter();

  const filesLS = localStorage.files
    ? new Map(JSON.parse(localStorage.files))
    : new Map();

  const [documents, setDocuments] = useState({
    all: optionsDocuments,
    withoutFirst: optionsDocumentsWithoutFirst,
  });

  const [selectDoc, setSelectDoc] = useState(filesLS);
  const [documentDisabled, setDocumentDisabled] = useState(
    !formik.values.category.value
  );

  const deleteFile = (value) => {
    selectDoc.delete(value);
    localStorage.files = JSON.stringify(Array.from(selectDoc.entries()));
  };

  const selectDocument = (e) => {
    const map = new Map(selectDoc);
    if (!map.has(e.value)) {
      map.set(e.value, {});
    }
    setSelectDoc(map);
    localStorage.files = JSON.stringify(Array.from(selectDoc.entries()));
  };

  const onChangeCategory = (newCategory) => {
    if (formik.values.category.value != newCategory.value) {
      formik.setFieldValue("category", newCategory);
      if (newCategory.value == 0) {
        setDocumentDisabled(true);
        setDocuments({
          all: [
            {
              value: 0,
              label: "Выберите из списка",
              category_id: null,
            },
          ],
          withoutFirst: [],
        });
      } else {
        setDocumentDisabled(false);
        const newOptionsDocumentWithoutFirst = getObjOptionsDocuments(
          intialDocuments
        ).filter((doc) => doc.category_id == newCategory.value);

        const allDocuments = [
          {
            value: 0,
            label: "Выберите из списка",
            category_id: null,
          },
        ];
        allDocuments.push(...newOptionsDocumentWithoutFirst);
        setDocuments({
          all: allDocuments,
          withoutFirst: newOptionsDocumentWithoutFirst,
        });
      }
      //setSelectDoc(new Map());
    }
  };

  return (
    <form
      className="adding_lot_wrap"
      onSubmit={submitForm}
      encType="multipart/form-data"
    >
      <div className="adding_lot_item">
        <span className="adding_lot_title">1. Выберите категорию</span>
        <CustomSelect
          className="react-select-container"
          styles={styleSelect2}
          defaultValue={formik.values.category}
          options={optionsCategories}
          value={formik.values.category}
          onChange={(value) => {
            onChangeCategory(value);
          }}
        />
      </div>
      <div className="adding_lot_item">
        <span className="adding_lot_title">
          2. Загрузите документы на проверку
        </span>

        <Select
          className="react-select-container"
          defaultValue={documents.all[0]}
          onChange={(e) => selectDocument(e)}
          options={documents.all}
          isDisabled={documentDisabled}
          styles={styleSelect2}
        />

        {documents.withoutFirst &&
          documents.withoutFirst.map((doc) => (
            <CustomInputLotFile
              key={doc.index}
              doc={doc}
              selectDoc={selectDoc}
              deleteFile={() => deleteFile(doc.value)}
              name={"files[]"}
            />
          ))}
      </div>

      <div className="adding_lot_item">
        <span className="adding_lot_title">3. Выберите пакет</span>
        <CustomSelect
          className="react-select-container"
          styles={styleSelect2}
          defaultValue={formik.values.package}
          options={optionsPackage}
          value={formik.values.package}
          onChange={(value) => formik.setFieldValue("package", value)}
        />
      </div>

      <div className="adding_lot_item">
        <span className="adding_lot_title">4. Введите контактные данные</span>

        <div className="adding_lot_input">
          <Field
            type="text"
            placeholder="ФИО*"
            name="full_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.full_name}
          />
        </div>
        <div className="adding_lot_input">
          <Field
            type="email"
            placeholder="Почта*"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}
        </div>
        <div className="adding_lot_btn_box">
          <button href="/lot_data" className="btn_site">
            Следующий шаг
          </button>
          <button
            className="btn_site btn_site_white"
            onClick={(e) => {
              e.preventDefault();
              router.push("/personal_area");
            }}
          >
            Назад
          </button>
        </div>
      </div>
    </form>
  );
}

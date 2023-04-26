import { USER_TYPE } from "@/common/const";
import { Breadcrumb } from "@/components/Breadcrumb";
import FormLegalEdit from "@/components/Form/FormLegalEdit";
import { FormNaturalEdit } from "@/components/Form/FormNaturalEdit";
import { FormPrivateEdit } from "@/components/Form/FormPrivateEdit";
import { connection } from "@/helpers/connection";
import { MainLayout } from "@/layouts/MainLayout";

export default function UpdateData({ type, documents }) {
  return (
    <div>
      <MainLayout title={"Изменение личных данных"}>
        <main>
          <Breadcrumb
            currentName={"Изменение данных"}
            secondLinkName={"Личный кабинет"}
            secondLinkPath={"personal_area"}
          />

          <div className="personal_data margin_bottom">
            {type == USER_TYPE.PRIVATE && <FormPrivateEdit />}
            {type == USER_TYPE.LEGAL && <FormLegalEdit documents={documents} />}
            {type == USER_TYPE.NATURAL && <FormNaturalEdit />}
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

UpdateData.getInitialProps = async (ctx) => {
  const data = { type: ctx.query.type };

  if (data.type == USER_TYPE.LEGAL) {
    const response = await connection.get(`api/v1/info/juridical/`);
    data.documents = response.data?.data;
  }

  return data;
};

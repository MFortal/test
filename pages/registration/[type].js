import { USER_TYPE } from "@/common/const";
import { Breadcrumb } from "@/components/Breadcrumb";
import FormLegal from "@/components/Form/FormLegal";
import { FormNatural } from "@/components/Form/FormNatural";
import { FormPrivate } from "@/components/Form/FormPrivate";
import { connection } from "@/helpers/connection";
import { MainLayout } from "@/layouts/MainLayout";

export default function Registration({ type, documents }) {
  const title =
    "Регистрация для " +
    (type == USER_TYPE.LEGAL
      ? "Юридического лица"
      : type == USER_TYPE.PRIVATE
      ? "ИП"
      : "Физического лица");

  return (
    <div>
      <MainLayout title={title}>
        <main>
          <Breadcrumb
            currentName={title}
            secondLinkName={"Личный кабинет"}
            secondLinkPath={"personal_area"}
          />

          <div className="personal_data margin_bottom">
            {type == USER_TYPE.PRIVATE && <FormPrivate />}
            {type == USER_TYPE.NATURAL && <FormNatural />}
            {type == USER_TYPE.LEGAL && <FormLegal documents={documents} />}
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

Registration.getInitialProps = async (ctx) => {
  const data = { type: ctx.query.type };

  if (data.type == USER_TYPE.LEGAL) {
    const response = await connection.get(`api/v1/info/juridical/`);
    data.documents = response.data?.data;
  }

  return data;
};

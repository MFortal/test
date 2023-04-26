import React from "react";
import Link from "next/link";

import { MainLayout } from "../../layouts/MainLayout";
import { connection } from "@/helpers/connection";
import { ResolveIssue } from "@/components/ResolveIssue";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function Services({ services }) {
  return (
    <div>
      <MainLayout title={"Услуги"}>
        <main>
          <Breadcrumb currentName={"Услуги"} marginBtn={false} />

          <div className="category_page">
            <div className="grid_container category_wrap">
              {services.map((service) => (
                <Link
                  href={`/services/${service.code}`}
                  className="category_item"
                  key={service.id}
                >
                  <div className="category_item_img">
                    {service.icon_path.path && (
                      <img src={service.icon_path.path} alt="" />
                    )}
                  </div>
                  <h2 className="category_item_name">{service.name}</h2>
                </Link>
              ))}
            </div>
          </div>

          <ResolveIssue />
        </main>
      </MainLayout>
    </div>
  );
}

Services.getInitialProps = async (ctx) => {
  const code = ctx.query.code;
  const response = await connection.get(`api/v1/service/`);
  return {
    services: response.data.data,
  };
};

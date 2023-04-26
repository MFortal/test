import Link from "next/link";
import { MainLayout } from "../../layouts/MainLayout";

/*----react-select----*/

import { styleSelectNumber } from "@/common/styleSelect";
import { Breadcrumb } from "@/components/Breadcrumb";
import Select from "react-select";

export default function Home() {
  const optionsNumber = [
    { value: "9", label: "9" },
    { value: "18", label: "18" },
    { value: "27", label: "27" },
    { value: "36", label: "36" },
  ];

  return (
    <div>
      <MainLayout title={"Блог"}>
        <main>
          <Breadcrumb currentName={"Блог"} />

          <div className="blog_page margin_bottom">
            <div className="grid_container">
              <div className="blog_index_wrap">
                <Link href="/single_blog" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
                <Link href="/single_blog" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
                <Link href="/single_blog" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
                <Link href="/single_blog" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
                <Link href="/single_blog" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
                <Link href="/single_blog" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
                <Link href="/single_blog" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
                <Link href="/single_blog" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
                <Link href="/single_blog" legacyBehavior>
                  <a className="blog_index_item">
                    <div className="blog_index_item_img">
                      <img src="/images/index_blogs.jpg" alt="" />
                    </div>
                    <div className="blog_index_item_wrap">
                      <h3 className="blog_index_title">
                        Недвижимость вашей <br /> мечты появились тут
                      </h3>
                      <span className="blog_index_text">
                        Противоположная точка зрения подразумевает, что
                        диаграммы связей, которые....
                      </span>
                      <span className="blog_index_more">Читать дальше</span>
                    </div>
                  </a>
                </Link>
              </div>
              <div className="catalog_lots_footer">
                <div className="lots_footer_number">
                  Выводить по
                  <Select
                    className="react-select-container"
                    defaultValue={optionsNumber[0]}
                    options={optionsNumber}
                    styles={styleSelectNumber}
                  />
                  объектов
                </div>
                <div className="paginations">
                  <ul>
                    <li>
                      <Link href="#!" legacyBehavior>
                        <a className="prev"></a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!" legacyBehavior>
                        <span className="page_number current">1</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!" legacyBehavior>
                        <a className="page_number">2</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!" legacyBehavior>
                        <a className="page_number">3</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!" legacyBehavior>
                        <a className="page_number">4</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!" legacyBehavior>
                        <a className="page_number">5</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!" legacyBehavior>
                        <a className="page_number">...</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!" legacyBehavior>
                        <a className="page_number">35</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!" legacyBehavior>
                        <a className="next"></a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <span className="lots_footer_info">
                  Показано объектов 9 из 55
                </span>
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

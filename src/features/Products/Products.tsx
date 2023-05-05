import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../../ui/common/Breadcrumb";
import { styled } from "../../../stitches.config";
import shop from "../../../static/icons/shop.png";
import { ProductCard } from "./ProductCard";
import { Product, ProductCategory } from "../../types/product";
import { sendRequestToAPI } from "../../api/api";
import { Pagination } from "./Pagination";
import { useShopContext } from "../../context/ShopPopupContext";

type Props = {
  pageContext: Partial<PageContext>;
};

export const Products: React.FC<Props> = ({ pageContext }) => {
  const [filteredCategory, setFilteredCategory] = useState<string | undefined>(
    undefined
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [productsCategories, setProductsCategories] = useState<
    ProductCategory[]
  >([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(15);
  const { toggleShop } = useShopContext();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await sendRequestToAPI(
          `query($language: I18NLocaleCode, $pagination: PaginationArg, $filter: ProductsCategoryFiltersInput, $category: String)  {
            products(locale: $language, pagination: $pagination, sort: "createdAt:desc", filters: {products_category: {categoryId: {contains: $category}}}) {
              meta {
                pagination {
                  pageCount 
                  pageSize
                  page
                }
              } 
              data {
              attributes {
                name
                description
                haveInStock
                thickness
                color
                slug
                mainImage {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                images {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                sheetOption {
                  pricePerMeter
                  totalPrice
                  listSize
                  haveInStock
                }
                }
              }
            }
            productsCategories(locale: $language, filters: $filter) {
              data {
                attributes {
                  categoryName 
                  categoryId
                  products {
                    data {
                      attributes {
                        name
                        haveInStock
                        mainImage{
                          data {
                            attributes{
                              url
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }`,
          {
            language: pageContext.language,
            pagination: { page: currentPage, pageSize: productsPerPage },
            category: filteredCategory,
          }
        );
        setProducts(data.data.products.data);
        setProductsCategories(data.data.productsCategories.data);
        setTotalPage(data.data.products.meta.pagination.pageCount);
        setProductsPerPage(data.data.products.meta.pagination.pageSize);
      } catch (err) {
        return err;
      }
    };
    getData();
  }, [currentPage, filteredCategory]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage >= totalPage) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage <= 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <LinkBox>
        <Breadcrumb way={[{ link: "/products", text: "Продукция" }]} />
        <Button onClick={toggleShop}>
          <ShopImage src={shop} alt="shop" />
          Корзина
        </Button>
      </LinkBox>
      <Container>
        <LeftContainer>
          <TypeBox>
            <TypeTitle>Продукция</TypeTitle>
            <TypeList>
              <Item onClick={() => setFilteredCategory(undefined)}>
                Вся продукция
              </Item>
              {productsCategories.map((el, i) => (
                <Item
                  key={i}
                  onClick={() => setFilteredCategory(el.attributes.categoryId)}
                >
                  {el.attributes.categoryName}
                </Item>
              ))}
            </TypeList>
          </TypeBox>
          <SortBox>
            <Left>
              <SortTitle>Толщина</SortTitle>
              {products.map((el: Product, i: number) => (
                <div>{el.attributes.thickness}</div>
              ))}
            </Left>
            <Right>
              <SortTitle>Цвет</SortTitle>
              {products.map((el: Product, i: number) => (
                <div>{el.attributes.color}</div>
              ))}
            </Right>
          </SortBox>
        </LeftContainer>
        <RightContainer>
          <CardsBox>
            {products.map((el: Product, i: number) => (
              <ProductCard key={i} info={el} />
            ))}
          </CardsBox>
          {!!products?.length && totalPage > 1 && (
            <Pagination
              length={totalPage}
              paginate={paginate}
              prevPage={prevPage}
              nextPage={nextPage}
              currentPage={currentPage}
            />
          )}
        </RightContainer>
      </Container>
    </>
  );
};

const Container = styled("section", {
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  gap: 35,
  maxWidth: 1280,
  margin: "0 auto",
  "@md": {
    flexDirection: "row",
    padding: "30px 20px 100px",
    gap: 90,
  },
});

const CardsBox = styled("div", {
  display: "flex",
  gap: 35,
});

const TypeBox = styled("div", {
  background: "rgba(0, 0, 255, 0.05)",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "0px 5px",
  padding: "20px 0",
  margin: "0 0 20px",
  "@md": {
    margin: "0 0 40px",
  },
});

const SortBox = styled("div", {
  display: "flex",
  background: "rgba(0, 0, 255, 0.05)",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "0px 5px",
  padding: "20px",
});

const Left = styled("div", {
  width: "50%",
  borderRight: "1px solid #cbcbcb",
  margin: "-20px 0 0",
  padding: "20px 0 0",
});

const Right = styled("div", {
  width: "50%",
  borderLeft: "1px solid #cbcbcb",
  margin: "-20px 0 0",
  padding: "20px 0 0",
});

const TypeTitle = styled("h4", {
  textAlign: "center",
  fontWeight: 500,
  fontSize: 17,
  lineHeight: "19px",
  color: "#171717",
  margin: "0 0 15px",
  "@md": {
    fontSize: 20,
    lineHeight: "23px",
  },
});

const SortTitle = styled("h4", {
  textAlign: "center",
  fontWeight: 500,
  fontSize: 17,
  lineHeight: "19px",
  color: "#171717",
  padding: "0 0 15px",
  margin: "0 -20px",
  borderBottom: "1px solid #cbcbcb",
  "@md": {
    fontSize: 20,
    lineHeight: "23px",
  },
});

const TypeList = styled("ul", {
  padding: 0,
  listStyle: "none",
  display: "flex",
  gap: 5,
  "@md": {
    flexDirection: "column",
  },
});

const Item = styled("li", {
  textAlign: "center",
  padding: "8px 20px",
  fontWeight: 400,
  fontSize: 10,
  lineHeight: "13px",
  borderRadius: "0px 5px",
  cursor: "pointer",
  "@md": {
    textAlign: "start",
    fontSize: 17,
    lineHeight: "19px",
  },
});

const LeftContainer = styled("div", {
  "@md": {
    width: "30%",
  },
});

const RightContainer = styled("div", {
  "@md": {
    width: "70%",
  },
});

const LinkBox = styled("div", {
  maxWidth: 1280,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  "&>div": {
    margin: "0",
    "@md": {
      padding: "70px 20px 10px 0",
    },
  },
});

const Button = styled("button", {
  textDecoration: "none",
  cursor: "pointer",
  display: "flex",
  gap: 8,
  background: "#FFA500",
  border: "none",
  borderRadius: "0px 5px",
  padding: "8px 18px",
  fontWeight: 700,
  fontSize: 10,
  lineHeight: "12px",
  color: "$white",
  margin: "auto 0 0",
  "@md": {
    padding: "10px 60px",
    fontSize: 18,
    lineHeight: "21px",
  },
});

const ShopImage = styled("img", {
  width: "12px",
  height: "12px",
  "@md": {
    width: "20px",
    height: "20px",
  },
});

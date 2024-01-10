import { PageContext } from "gatsby-plugin-react-i18next/dist/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "../../ui/common/Breadcrumb";
import { styled } from "../../../stitches.config";
import shop from "../../../static/icons/shop.png";
import { ProductCard } from "./ProductCard";
import { Product, ProductCategory } from "../../types/product";
import { sendRequestToAPI } from "../../api/api";
import { Pagination } from "./Pagination";
import { useShopContext } from "../../context/ShopPopupContext";
import { Link } from "gatsby-plugin-react-i18next";
import { Loading } from "../../ui/common/Loading";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";
import { SmallLoading } from "../../ui/common/SmallLoading";

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
  const [productsPerPage, setProductsPerPage] = useState<number>(9);
  const [thickness, setThickness] = useState<number | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);

  const [productInfo, setProductInfo] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await sendRequestToAPI(
          `query {
            info: products(pagination: {limit: 100000}) {
              data {
                attributes {
                  policarbonSheetOptions {
                    thickness
                    color
                  }
                  accessoriesSheetOptions {
                    color
                  }
                }
              }
            }
          }`,
          {}
        );
        setProductInfo(data.data.info.data);
      } catch (err) {
        return err;
      }
    };
    getData();
  }, []);

  const getData = useCallback(async () => {
    try {
      const { data } = await sendRequestToAPI(
        // $pagination: PaginationArg,
        // pagination: $pagination,
        `query($pagination: PaginationArg, $filter: ProductsCategoryFiltersInput, $category: String)  {
          products(pagination: $pagination, sort: "createdAt:ASC", filters: {products_category: {categoryId: {contains: $category}}}) {
            meta {
              pagination {
                pageCount 
                pageSize
                page
              }
            } 
            data {
              id
              attributes {
                name
                description
                haveInStock
                topSellers
                mainImage {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
                slug
                products_category {
                  data {
                    attributes {
                      categoryName
                      categoryId
                    }
                  }
                }
                characteristics
                productImages {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
                policarbonSheetOptions {
                  haveInStock
                  listSize
                  warrantyText
                  wholesalePriceInfo
                  totalPrice
                  pricePerMeter
                  thickness
                  color
                }
                accessoriesSheetOptions {
                  haveInStock
                  warrantyText
                  accessoriesType
                  wholesalePriceInfo
                  totalPrice
                  color
                  itemLength
                }
              }
            }
          }
          productsCategories(filters: $filter) {
            data {
              attributes {
                categoryName 
                categoryId
                 products {
                  data {
                    attributes {
                      name
                      slug
                    }
                  }
                }
              }
            }
          }
        }`,
        {
          pagination: { page: currentPage, pageSize: productsPerPage },
          category: filteredCategory,
        }
      );
      setProducts(data.data.products.data);
      setProductsCategories(data.data.productsCategories.data);
      setTotalPage(data.data.products.meta.pagination.pageCount);
      setProductsPerPage(data.data.products.meta.pagination.pageSize);
      setIsLoading(true);
    } catch (err) {
      return err;
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const nextPage = () => {
    if (currentPage >= totalPage) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const prevPage = () => {
    if (currentPage <= 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  const uniqueThickness = useMemo(() => {
    const uniqueThicknesses = [
      ...new Set(
        productInfo.flatMap((product: any) =>
          product.attributes.policarbonSheetOptions.map(
            (variant: any) => variant.thickness
          )
        )
      ),
    ];

    return uniqueThicknesses;
  }, [productInfo]);

  const uniqueColor = useMemo(() => {
    const uniqueColors = [
      ...new Set(
        productInfo.flatMap((product: any) =>
          product.attributes.policarbonSheetOptions.map(
            (variant: any) => variant.color
          )
        )
      ),
      ...new Set(
        productInfo.flatMap((product: any) =>
          product.attributes.accessoriesSheetOptions.map(
            (variant: any) => variant.color
          )
        )
      ),
    ];

    const uniqueColorsWithoutDuplicates = uniqueColors.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    return uniqueColorsWithoutDuplicates;
  }, [productInfo]);

  const fetchMoreData = () => {
    if (currentPage < totalPage) {
      setTimeout(async () => {
        try {
          const { data } = await sendRequestToAPI(
            `query($pagination: PaginationArg, $filter: ProductsCategoryFiltersInput, $category: String)  {
            products(pagination: $pagination, sort: "createdAt:ASC", filters: {products_category: {categoryId: {contains: $category}}}) {
              meta {
                pagination {
                  pageCount 
                  pageSize
                  page
                }
              } 
              data {
                id
                attributes {
                  name
                  description
                  haveInStock
                  topSellers
                  mainImage {
                    data {
                      id
                      attributes {
                        url
                      }
                    }
                  }
                  slug
                  products_category {
                    data {
                      attributes {
                        categoryName
                        categoryId
                      }
                    }
                  }
                  characteristics
                  productImages {
                    data {
                      id
                      attributes {
                        url
                      }
                    }
                  }
                  policarbonSheetOptions {
                    haveInStock
                    listSize
                    warrantyText
                    wholesalePriceInfo
                    totalPrice
                    pricePerMeter
                    thickness
                    color
                  }
                  accessoriesSheetOptions {
                    haveInStock
                    warrantyText
                    accessoriesType
                    wholesalePriceInfo
                    totalPrice
                    color
                    itemLength
                  }
                }
              }
            }
            productsCategories(filters: $filter) {
              data {
                attributes {
                  categoryName 
                  categoryId
                   products {
                    data {
                      attributes {
                        name
                        slug
                      }
                    }
                  }
                }
              }
            }
          }`,
            {
              pagination: { page: currentPage + 1, pageSize: productsPerPage },
              category: filteredCategory,
            }
          );
          setProducts((prevProducts) => [
            ...prevProducts,
            ...data.data.products.data,
          ]);
          setCurrentPage((prevPage) => prevPage + 1);
        } catch (err) {
          console.error("Ошибка при загрузке данных:", err);
        }
      }, 1000);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!thickness && !color) {
      // если оба стейта undefined, возвращаем исходный массив
      return products;
    } else if (thickness && !color) {
      // если есть только thickness, возвращаем массив с товарами, у которых thickness равен стейту thickness
      const filteredThicknessProducts = products.filter((product) =>
        product.attributes.policarbonSheetOptions.some(
          (variant) => variant.thickness === thickness
        )
      );
      return filteredThicknessProducts;
    } else if (!thickness && color) {
      // если есть только color, возвращаем массив с товарами, у которых color равен стейту color
      const filteredColorProducts = [];
      filteredColorProducts.push(
        ...products.filter((product) =>
          product.attributes.policarbonSheetOptions.some(
            (variant) => variant.color === color
          )
        )
      );
      filteredColorProducts.push(
        ...products.filter((product) =>
          product.attributes.accessoriesSheetOptions.some(
            (variant) => variant.color === color
          )
        )
      );
      return filteredColorProducts;
    } else {
      // если есть и thickness и color, возвращаем массив с товарами, у которых и thickness, и color равны соответствующим стейтам
      const filteredColorThicknessProducts = products.filter((product) =>
        product.attributes.policarbonSheetOptions.some(
          (variant) =>
            variant.thickness === thickness && variant.color === color
        )
      );
      return filteredColorThicknessProducts;
    }
  }, [products, thickness, color]);

  const filteredSortedProducts = useMemo(() => {
    return filteredProducts.sort((a, b) => {
      if (a.attributes.topSellers && !b.attributes.topSellers) {
        return -1; // продукт a идет перед продуктом b
      } else if (!a.attributes.topSellers && b.attributes.topSellers) {
        return 1; // продукт b идет перед продуктом a
      } else {
        return 0; // порядок не изменяется
      }
    });
  }, [filteredProducts]);

  const title = "Продукция";
  const description =
    "Продажа сотового, монолитного и профилированого поликарбоната";

  return (
    <>
      <Helmet defaultTitle={title}>
        <meta
          name="keywords"
          content="поликарбон, поликарбонат, теплицы, навесы, продажа поликарбоната, сотовый поликарбонат, монолитный поликарбонат, магазин поликарботана"
        />
        <meta property="og:type" content="website" />

        <meta property="og:title" content="Policarbonat VIKET" />
        <meta name="twitter:title" content="Policarbonat VIKET" />

        <meta property="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />

        <meta property="og:site_name" content="policarbonat-viket" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      {!isLoading ? (
        <Loading />
      ) : (
        <>
          <LinkBox>
            <Breadcrumb way={[{ link: "/products", text: "Продукция" }]} />
          </LinkBox>
          <Container>
            <LeftContainer>
              <TypeBox>
                <TypeTitle>Продукция</TypeTitle>
                <TypeList>
                  <Item
                    isActive={!filteredCategory}
                    onClick={() => setFilteredCategory(undefined)}
                  >
                    Вся продукция
                  </Item>
                  {productsCategories.map((el, i) => (
                    <Item
                      isActive={filteredCategory === el.attributes.categoryId}
                      key={i}
                      onClick={() =>
                        setFilteredCategory(el.attributes.categoryId)
                      }
                    >
                      {el.attributes.categoryName}
                    </Item>
                  ))}
                  <ItemLink to="/technical/greenhouse">Теплицы</ItemLink>
                </TypeList>
              </TypeBox>
              <SortBox>
                <Left>
                  <SortTitle>Толщина</SortTitle>
                  <SortParamBox>
                    {uniqueThickness
                      .sort((a, b) => a - b)
                      .map((el: number, i: number) => (
                        <SortParam
                          key={i}
                          onClick={() => {
                            if (!thickness || thickness !== el) {
                              setThickness(el);
                            }
                            if (thickness === el) {
                              setThickness(undefined);
                            }
                          }}
                        >
                          <Input type="checkbox" checked={thickness === el} />
                          <Text>{el} мм</Text>
                        </SortParam>
                      ))}
                  </SortParamBox>
                </Left>
                <Right>
                  <SortTitle>Цвет</SortTitle>
                  <SortParamBox>
                    {uniqueColor.map((el: string, i: number) => (
                      <SortParam
                        key={i}
                        onClick={() => {
                          if (!color || color !== el) {
                            setColor(el);
                          }
                          if (color === el) {
                            setColor(undefined);
                          }
                        }}
                      >
                        <Input type="checkbox" checked={color === el} />
                        <Text>{el}</Text>
                      </SortParam>
                    ))}
                  </SortParamBox>
                </Right>
              </SortBox>
            </LeftContainer>
            <RightContainer>
              <InfiniteScroll
                dataLength={filteredProducts.length}
                next={fetchMoreData}
                hasMore={currentPage < totalPage}
                loader={<SmallLoading />}
              >
                <CardsBox>
                  {filteredSortedProducts.map((el: Product, i: number) => (
                    <ProductCard key={i} info={el} />
                  ))}
                </CardsBox>
              </InfiniteScroll>
              {/* {!!filteredProducts?.length && totalPage > 1 && (
                <Pagination
                  length={totalPage}
                  paginate={paginate}
                  prevPage={prevPage}
                  nextPage={nextPage}
                  currentPage={currentPage}
                />
              )} */}
            </RightContainer>
          </Container>
        </>
      )}
    </>
  );
};

export const Text = styled("label", {
  cursor: "pointer",
  margin: 0,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "16px",
  color: "#171717",
});

export const Input = styled("input", {
  cursor: "pointer",
  borderRadius: "100% !important",
});

export const SortParamBox = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const Container = styled("section", {
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  gap: 35,
  maxWidth: 1280,
  margin: "0 auto",
  "@sm": {
    flexDirection: "row",
    padding: "30px 20px 100px",
    gap: 90,
  },
});

const SortParam = styled("label", {
  display: "flex",
  alignItems: "center",
  gap: 5,
  margin: "5px 10px",
  width: "fit-content",
  cursor: "pointer",
  padding: "2px 10px",
});

const CardsBox = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
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
  margin: "-20px 0 -20px",
  padding: "20px 0 20px",
});

const Right = styled("div", {
  width: "50%",
  borderLeft: "1px solid #cbcbcb",
  margin: "-20px 0 -20px",
  padding: "20px 0 20px",
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
  flexWrap: "wrap",
  width: "100%",
  gap: 5,
});

const ItemLink = styled(Link, {
  textDecoration: "none",
  color: "#171717",
  textAlign: "center",
  padding: "8px 20px",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "15px",
  borderRadius: "0px 5px",
  cursor: "pointer",
  background: "$white",
  width: "100%",
  maxWidth: 400,
  margin: "0 auto",
  "@md": {
    textAlign: "start",
    fontSize: 17,
    lineHeight: "19px",
  },
});

const Item = styled("li", {
  color: "#171717",
  textAlign: "center",
  padding: "8px 20px",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "15px",
  borderRadius: "0px 5px",
  cursor: "pointer",
  background: "$white",
  width: "100%",
  maxWidth: 400,
  margin: "0 auto",
  "@md": {
    textAlign: "start",
    fontSize: 17,
    lineHeight: "19px",
  },

  variants: {
    isActive: {
      true: {
        background: "#5B7FAF",
        color: "$white",
      },
    },
  },
});

const LeftContainer = styled("div", {
  "@sm": {
    width: "30%",
  },
});

const RightContainer = styled("div", {
  "@sm": {
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
  margin: "auto 20px 0",
  "@md": {
    padding: "10px 60px",
    fontSize: 18,
    lineHeight: "21px",
    margin: "auto 0 0",
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

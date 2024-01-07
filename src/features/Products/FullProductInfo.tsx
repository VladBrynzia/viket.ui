import React, { useState } from "react";
import {
  AccessoriesSheetOptionsType,
  AccessoriesType,
  PolicarbonSheetOptionsType,
  ProductInfoType,
  ShopItem,
} from "../../types/product";
import { styled } from "../../../stitches.config";
import warranty from "../../../static/icons/warranty.png";
import { useShopContext } from "../../context/ShopPopupContext";

type Props = {
  product: ProductInfoType;
  isPolicarbon: boolean;
};

type Tabs = "description" | "characteristics";

export function addTargetBlank(htmlString: string) {
  const regex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"([^>]*)>/g;
  return htmlString.replace(regex, `<a href="$1" target="_blank"$2>`);
}

export const FullProductInfo: React.FC<Props> = ({ product, isPolicarbon }) => {
  const richTextCharacteristicsObj = eval(
    "({obj:[" + product.characteristics + "]})"
  );
  const richTextDescriptionObj = eval("({obj:[" + product.description + "]})");

  const defaultSelectedSheetOption = isPolicarbon
    ? product.policarbonSheetOptions[0]
    : product.accessoriesSheetOptions[0];

  const [selectedSheetOption, setSelectedSheetOption] = useState<
    PolicarbonSheetOptionsType | AccessoriesSheetOptionsType
  >(defaultSelectedSheetOption);
  const [selectedTab, setSelectedTab] = useState<Tabs>("description");
  const { addProductToShop } = useShopContext();

  const [productCount, setProductCount] = useState(1);

  const shopItem: ShopItem = {
    mainImage: product.mainImage,
    name: product.name,
    slug: product.slug,
    sheetOption: selectedSheetOption,
  };

  const handleChange = (
    el: PolicarbonSheetOptionsType | AccessoriesSheetOptionsType
  ) => {
    setSelectedSheetOption(el);
  };

  const checkType = (el: any) => {
    if (el.type === "paragraph") {
      const finalValue = addTargetBlank(el.data.text);
      return (
        <CharacteristicText
          dangerouslySetInnerHTML={{ __html: `${finalValue}` }}
        ></CharacteristicText>
      );
    }
    if (el.type === "header") {
      return selectHeederLevel(el.data.level, el.data.text);
    }
    if (el.type === "list") {
      return selectListStyle(el.data.style, el.data.items);
    }
    if (el.type === "image") {
      return imagesRender(el.data);
    }
    if (el.type === "delimiter") {
      return <Delimiter>* * *</Delimiter>;
    }
    if (el.type === "checklist") {
      return checklistRender(el.data.items);
    }
    if (el.type === "warning") {
      return warningRender(el.data);
    }
    if (el.type === "quote") {
      return (
        <Quote>
          <QuoteText>"{el.data.text}"</QuoteText>
          <QuoteAuthor>{el.data.caption || "Unknown author"}</QuoteAuthor>
        </Quote>
      );
    }
    if (el.type === "LinkTool") {
      return (
        <Link href={el.data.link} target="_blank">
          {el.data.meta.title || el.data.link}
        </Link>
      );
    }
  };

  const warningRender = (warning: any) => {
    return (
      <WarningBox>
        <WarningTitle>{warning.title}</WarningTitle>
        <WarningText>{warning.message}</WarningText>
      </WarningBox>
    );
  };

  const checklistRender = (checklistItems: any) => {
    return (
      <CheckBoxList>
        {checklistItems.map((el: any, i: number) => (
          <CheckBoxItem key={i}>
            <CheckInput type="checkbox" checked={el.checked} readOnly />
            <CheckText>{el.text}</CheckText>
          </CheckBoxItem>
        ))}
      </CheckBoxList>
    );
  };

  const imagesRender = (images: any) => {
    if (images.length === 1) {
      return images[0].caption === "center" ? (
        <ArticleImage
          css={{ margin: "0 auto !important" }}
          src={images[0].url}
          alt="article image"
        />
      ) : (
        <ArticleImage
          css={{ float: images[0].caption }}
          src={images[0].url}
          alt="article image"
        />
      );
    }
    if (images.length >= 2) {
      return (
        <ImageBox>
          {images.map((el: any, i: number) => (
            <ArticleImage key={i} src={el.url} alt="article image" />
          ))}
        </ImageBox>
      );
    }
  };

  const selectHeederLevel = (size: number, text: string) => {
    switch (size) {
      case 1:
        return <CharacteristicTitle>{text}</CharacteristicTitle>;
      case 2:
        return <Subtitle>{text}</Subtitle>;
      case 3:
        return <H3>{text}</H3>;
      case 4:
        return <H4>{text}</H4>;
    }
  };

  const selectListStyle = (style: string, items: string[]) => {
    switch (style) {
      case "ordered":
        return (
          <>
            {items.map((el, i) => (
              <ListBox key={i}>
                <ListIcon src="/icons/list-item.svg" alt="list" />
                <CharacteristicList>{el}</CharacteristicList>
              </ListBox>
            ))}
          </>
        );
      case "unordered":
        return (
          <>
            {items.map((el, i) => (
              <ListBox key={i}>
                <ListIcon src="/icons/list-item.svg" alt="list" />
                <CharacteristicList>{el}</CharacteristicList>
              </ListBox>
            ))}
          </>
        );
    }
  };

  return (
    <Container>
      <Content>
        <LeftBox>
          <Image
            src={product.mainImage.data.attributes.url}
            alt={product.name}
          />
          {product.topSellers && (
            <AbsoluteLabel>
              <AbsoluteText>Топ продаж</AbsoluteText>
            </AbsoluteLabel>
          )}
        </LeftBox>
        <RightBox>
          {isPolicarbon ? (
            <>
              <Title>{product.name}</Title>
              <Text>Выберите размер листа</Text>
              <List>
                {product.policarbonSheetOptions.map((el, i) => {
                  return (
                    <Item key={i}>
                      <ItemBox>
                        <Input
                          type="checkbox"
                          checked={selectedSheetOption === el}
                          onChange={() => handleChange(el)}
                        />
                        {el.listSize}
                      </ItemBox>
                    </Item>
                  );
                })}
              </List>
              <BoldText>{selectedSheetOption.totalPrice} грн / лист</BoldText>
              {selectedSheetOption.haveInStock ? (
                <Yes>Есть на наличии</Yes>
              ) : (
                <No>Нет в наличии</No>
              )}
              <Text>
                Цена за 1 м2 - {selectedSheetOption.pricePerMeter} грн
              </Text>
              {selectedSheetOption.wholesalePriceInfo && (
                <LightText>{selectedSheetOption.wholesalePriceInfo}</LightText>
              )}
              {selectedSheetOption.warrantyText && (
                <Box>
                  <Warranty src={warranty} alt="warranty" />
                  <WarrantyText>
                    {selectedSheetOption.warrantyText}
                  </WarrantyText>
                </Box>
              )}
              <Button
                isDisabled={!selectedSheetOption.haveInStock}
                disabled={!selectedSheetOption.haveInStock}
                onClick={() => addProductToShop(shopItem, productCount)}
              >
                Купить
              </Button>
              <CountText>Количество добавляемых в корзину товаров</CountText>
              <AddBox>
                <AddButton
                  isDisabled={!selectedSheetOption.haveInStock}
                  disabled={!selectedSheetOption.haveInStock}
                  onClick={() => {
                    if (productCount === 1) {
                      setProductCount(1);
                    } else {
                      setProductCount(productCount - 1);
                    }
                  }}
                >
                  <MinusImage src="/icons/minus.svg" alt="minus" />
                </AddButton>
                <ProductCount>{productCount}</ProductCount>
                <AddButton
                  isDisabled={!selectedSheetOption.haveInStock}
                  disabled={!selectedSheetOption.haveInStock}
                  onClick={() => {
                    if (productCount === 1000) {
                      setProductCount(1000);
                    } else {
                      setProductCount(productCount + 1);
                    }
                  }}
                >
                  <PlusImage src="/icons/plus.svg" alt="plus" />
                </AddButton>
              </AddBox>
            </>
          ) : (
            <>
              <Title>{product.name}</Title>
              {product.accessoriesSheetOptions[0].accessoriesType ===
              AccessoriesType.Meters ? (
                <Text>Выберите длинну</Text>
              ) : (
                <PcText>Цена указана за единицу товара</PcText>
              )}

              <List>
                {product.accessoriesSheetOptions.map((el, i) => {
                  const itemTypeText =
                    el.accessoriesType === AccessoriesType.Meters && "мм";
                  return (
                    !!itemTypeText && (
                      <Item key={i}>
                        <ItemBox>
                          <Input
                            type="checkbox"
                            checked={selectedSheetOption === el}
                            onChange={() => handleChange(el)}
                          />
                          {el.itemLength} {itemTypeText}
                        </ItemBox>
                      </Item>
                    )
                  );
                })}
              </List>
              <BoldText>
                {selectedSheetOption.totalPrice} грн
                {product.accessoriesSheetOptions[0].accessoriesType ===
                  AccessoriesType.Pieces && "/шт"}
              </BoldText>
              {selectedSheetOption.haveInStock ? (
                <Yes>Есть на наличии</Yes>
              ) : (
                <No>Нет в наличии</No>
              )}
              {selectedSheetOption.wholesalePriceInfo && (
                <LightText>{selectedSheetOption.wholesalePriceInfo}</LightText>
              )}
              {selectedSheetOption.warrantyText && (
                <Box>
                  <Warranty src={warranty} alt="warranty" />
                  <WarrantyText>
                    {selectedSheetOption.warrantyText}
                  </WarrantyText>
                </Box>
              )}
              <Button
                isDisabled={!selectedSheetOption.haveInStock}
                disabled={!selectedSheetOption.haveInStock}
                onClick={() => addProductToShop(shopItem, productCount)}
              >
                Купить
              </Button>
              <CountText>Количество добавляемых в корзину товаров</CountText>
              <AddBox>
                <AddButton
                  isDisabled={!selectedSheetOption.haveInStock}
                  disabled={!selectedSheetOption.haveInStock}
                  onClick={() => {
                    if (productCount === 1) {
                      setProductCount(1);
                    } else {
                      setProductCount(productCount - 1);
                    }
                  }}
                >
                  <MinusImage src="/icons/minus.svg" alt="minus" />
                </AddButton>
                <ProductCount>{productCount}</ProductCount>
                <AddButton
                  isDisabled={!selectedSheetOption.haveInStock}
                  disabled={!selectedSheetOption.haveInStock}
                  onClick={() => {
                    if (productCount === 1000) {
                      setProductCount(1000);
                    } else {
                      setProductCount(productCount + 1);
                    }
                  }}
                >
                  <PlusImage src="/icons/plus.svg" alt="plus" />
                </AddButton>
              </AddBox>
            </>
          )}
        </RightBox>
      </Content>
      <TabsContainer>
        <Tabs>
          <TabsButton
            isSelected={selectedTab === "description"}
            onClick={() => setSelectedTab("description")}
          >
            Описание
          </TabsButton>
          <TabsButton
            isSelected={selectedTab === "characteristics"}
            onClick={() => setSelectedTab("characteristics")}
          >
            Характеристики
          </TabsButton>
        </Tabs>
        {selectedTab === "description" ? (
          <>
            {richTextDescriptionObj.obj[0].blocks.map((el: any, i: number) => (
              <React.Fragment key={i}>{checkType(el)}</React.Fragment>
            ))}
          </>
        ) : (
          <>
            {richTextCharacteristicsObj.obj[0].blocks.map(
              (el: any, i: number) => (
                <React.Fragment key={i}>{checkType(el)}</React.Fragment>
              )
            )}
          </>
        )}
      </TabsContainer>
    </Container>
  );
};

export const Container = styled("div", {
  maxWidth: 1280,
  padding: "30px 20px",
  margin: "0 auto 50px",
  "@md": {
    margin: "0 auto 100px",
  },
});

const PlusImage = styled("img", {
  width: 32,
  height: 32,
});

const MinusImage = styled("img", {
  width: 16,
  height: 28,
});

const AbsoluteText = styled("p", {
  margin: 0,
  padding: "4px 12px",
  fontWeight: 500,
  color: "#fff",
  fontSize: 12,
  lineHeight: "14px",
});

const AbsoluteLabel = styled("div", {
  position: "absolute",
  top: 8,
  left: 8,
  background: "#ffa500",
  borderRadius: "20px",
});

export const TabsContainer = styled("div", {});

export const Input = styled("input", {
  cursor: "pointer",
});

export const Tabs = styled("div", {
  border: "1px solid #5B7FAF",
  borderRadius: "0 5px",
  boxSizing: "border-box",
  margin: "0 0 20px",
  width: "100%",
  "@md": {
    width: "calc(50% - 10px)",
    margin: "0 0 40px",
  },
});

export const TabsButton = styled("button", {
  background: "#5B7FAF",
  padding: "10px 30px",
  width: "50%",
  border: "none",
  borderRadius: "0 3px",
  cursor: "pointer",
  "@md": {
    padding: "20px 60px",
  },
  variants: {
    isSelected: {
      true: {
        color: "$white",
        background: "#5B7FAF",
      },
      false: {
        color: "#5B7FAF",
        background: "#fff",
      },
    },
  },
});

export const Description = styled("p", {
  width: "50%",
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "19px",
  color: "#171717",
  margin: "0 0 15px",
  "@md": {
    margin: "0 0 20px",
  },
});

export const List = styled("ul", {
  padding: 0,
  margin: "0 0 20px",
  listStyle: "none",
});

export const Item = styled("li", {
  cursor: "pointer",
});

export const ItemBox = styled("label", {
  display: "flex",
  alignItems: "center",
  gap: 8,
  margin: "0 0 10px",
  cursor: "pointer",
});

export const Box = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 8,
  margin: "0 0 30px",
});

export const Warranty = styled("img", {
  width: 25,
  height: 25,
  "@md": {
    width: 32,
    height: 32,
  },
});

export const WarrantyText = styled("p", {
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "19px",
  color: "#171717",
  margin: "0",
});

export const Title = styled("h1", {
  fontWeight: 700,
  fontSize: 20,
  lineHeight: "23px",
  color: "#171717",
  margin: "0 0 30px",
  "@md": {
    margin: "0 0 40px",
  },
});

export const BoldText = styled("p", {
  fontWeight: 700,
  fontSize: 20,
  lineHeight: "23px",
  color: "#171717",
  margin: "0 0 8px",
});

export const LightText = styled("p", {
  fontWeight: 600,
  fontSize: 10,
  lineHeight: "12px",
  color: "#828282",
  margin: "0 0 20px",
  "@md": {
    fontSize: 14,
    lineHeight: "16px",
    margin: "0 0 35px",
  },
});

export const PcText = styled("p", {
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "19px",
  color: "#585858",
  margin: "0 0 10px",
});

export const Text = styled("p", {
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "19px",
  color: "#171717",
  margin: "0 0 15px",
  "@md": {
    margin: "0 0 20px",
  },
});
export const CountText = styled("p", {
  fontWeight: 600,
  fontSize: 9,
  lineHeight: "19px",
  color: "#171717",
  margin: "10px 0 0",
  textAlign: "center",
  "@md": {
    textAlign: "start",
  },
});

export const ProductCount = styled("p", {
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "19px",
  color: "#171717",
});

const AddBox = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "0 auto",
  width: "220px",
  "@md": {
    textAlign: "start",
    margin: "0",
  },
});

const AddButton = styled("button", {
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "25px",
  height: "25px",
  margin: "0 auto",
  background: "#FFA500",
  border: "none",
  borderRadius: "0px 5px",
  padding: "8px",
  color: "$white",
  "@md": {
    margin: "0",
    padding: "20px",
  },

  variants: {
    isDisabled: {
      true: {
        background: "#cf8602",
        color: "#d6d3ce",
      },
    },
  },
});

const Button = styled("button", {
  textDecoration: "none",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  maxWidth: "220px",
  margin: "0 auto",
  background: "#FFA500",
  border: "none",
  borderRadius: "0px 5px",
  padding: "8px 18px",
  fontWeight: 700,
  fontSize: 10,
  lineHeight: "12px",
  color: "$white",
  "@md": {
    margin: "0",
    padding: "20px 40px",
    fontSize: 18,
    lineHeight: "21px",
  },

  variants: {
    isDisabled: {
      true: {
        background: "#cf8602",
        color: "#d6d3ce",
      },
    },
  },
});

export const Content = styled("div", {
  margin: "20px 0",
  display: "flex",
  gap: 20,
  flexDirection: "column",
  "@md": {
    margin: "30px 0",
    flexDirection: "row",
  },
});

export const Image = styled("img", {
  width: "100%",
  height: "100%",
  borderRadius: "0px 5px",
});

export const LeftBox = styled("div", {
  position: "relative",
  "@sm": {
    width: "50%",
  },
});

export const RightBox = styled("div", {
  "@sm": {
    width: "50%",
  },
});

const Yes = styled("p", {
  fontWeight: 400,
  color: "#14AC36",
  margin: "0 0 25px",
  fontSize: 12,
  lineHeight: "15px",
});

const No = styled("p", {
  fontWeight: 400,
  color: "#B30303",
  margin: "0 0 25px",
  fontSize: 12,
  lineHeight: "15px",
});

//styles for strapi richtext

const WarningBox = styled("div", {
  margin: "`0px 0",
  border: "1px solid $warning",
  borderRadius: "10px",
  padding: "10px",
});

const WarningTitle = styled("h3", {
  color: "$warning",
  margin: "0 0 20px",
});

const WarningText = styled("p", {
  margin: 0,
  color: "$warning",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
});

const CheckBoxList = styled("div", {
  margin: "10px 0",
});

const CheckBoxItem = styled("div", {
  display: "flex",
  gap: 10,
  alignItems: "flex-start",
  "@md": {
    gap: 20,
  },
});

const CheckInput = styled("input", {
  width: 25,
  height: 25,
  margin: 0,
});

const CheckText = styled("p", {
  margin: "0 0 `0px",
});

const Quote = styled("div", {});

const QuoteText = styled("p", {
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 10px",
});

const QuoteAuthor = styled("p", {
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 `0px",
  textAlign: "end",
});

const CharacteristicTitle = styled("h1", {
  fontWeight: "600",
  fontSize: "21px",
  lineHeight: "25px",
  margin: "0 0 10px",
});

const Subtitle = styled("h2", {
  fontWeight: "600",
  fontSize: "19px",
  lineHeight: "23px",
  margin: "0 0 10px",
});

const H3 = styled("h3", {
  fontWeight: "600",
  fontSize: "17px",
  lineHeight: "19px",
  margin: "0 0 10px",
});

const H4 = styled("h4", {
  fontWeight: "600",
  fontSize: "15px",
  lineHeight: "18px",
  margin: "0 0 10px",
});

const ListBox = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 10,
  margin: "0 0 10px",
  "@md": {
    gap: 20,
  },
});

const ListIcon = styled("img", {
  width: 25,
  height: 25,
});

const CharacteristicList = styled("li", {
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "20px",
  margin: 0,
  listStyle: "none",
  textAlign: "justify",
});

const CharacteristicText = styled("p", {
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 10px",
  textAlign: "justify",
});

const Delimiter = styled("p", {
  fontWeight: "500",
  fontSize: "20px",
  lineHeight: "24px",
  margin: "20px auto",
  textAlign: "center",
});

const Link = styled("a", {
  display: "block",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 10px",
  color: "$violet",
  cursor: "pointer",
});

const ArticleImage = styled("img", {
  width: "100%",
  objectFit: "cover",
  borderRadius: "20px",
  margin: "10px 0",
  "@sm": {
    margin: "10px 20px",
    width: "47.5%",
  },
});

const ImageBox = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 20,
  justifyContent: "space-evenly",
});

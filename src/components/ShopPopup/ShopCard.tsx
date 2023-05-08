import React from "react";
import { styled } from "../../../stitches.config";
import { UniqueShopItem, useShopContext } from "../../context/ShopPopupContext";
import { Link } from "gatsby-plugin-react-i18next";

type Props = {
  info: UniqueShopItem;
};

export const ShopCard: React.FC<Props> = ({ info }) => {
  const { addProductToShop, removeProductFromShop } = useShopContext();
  return (
    <Container to={`/products/${info.item.slug}`}>
      {info.item.mainImage && (
        <CardImageBox>
          <Image
            src={info.item.mainImage.data.attributes.url}
            alt={info.item.name}
          />
        </CardImageBox>
      )}
      <Box>
        <Title>{info.item.name}</Title>
        <Text>
          Размер листа:
          <br></br>
          {info.item.sheetOption.listSize} мм
        </Text>
        <Price>{info.item.sheetOption.totalPrice * info.count} грн</Price>
        <ButtonBox>
          <Button onClick={() => removeProductFromShop(info.item)}>-</Button>
          {info.count}
          <Button onClick={() => addProductToShop(info.item)}>+</Button>
        </ButtonBox>
      </Box>
    </Container>
  );
};

const ButtonBox = styled("div", {
  display: "flex",
  gap: 5,
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #5B7FAF",
  color: "#5B7FAF",
  fontWeight: 700,
  fontSize: 14,
  lineHeight: "16px",
});

const Button = styled("button", {
  background: "#5B7FAF",
  border: "none",
  padding: "8px 12px",
  color: "$white",
  fontWeight: 700,
  fontSize: 16,
  lineHeight: "19px",
  minWidth: 35,
});

const Container = styled(Link, {
  textDecoration: "none",
  background: "#FAFAFA",
  borderRadius: "0px 5px",
  minHeight: "max-content",
  width: "calc(100%/2 - 8px)",
  "@xs": {
    width: "calc(100%/4 - 8px)",
  },
  "@xl": {
    width: "calc(100%/5 - 8px)",
  },
});

const CardImageBox = styled("div", {
  position: "relative",
  width: "100%",
  paddingBottom: "65%",
  overflow: "hidden",
});

const Image = styled("img", {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  borderRadius: "5px",
});

const Title = styled("p", {
  fontWeight: 700,
  color: "#171717",
  margin: "0",
  fontSize: 16,
  lineHeight: "18px",
  height: "35px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});

const Price = styled("p", {
  fontWeight: 700,
  color: "#171717",
  margin: "0",
  fontSize: 16,
  lineHeight: "18px",
});

const Text = styled("p", {
  fontWeight: 400,
  color: "#171717",
  margin: "0",
  fontSize: 12,
  lineHeight: "15px",
});

const Box = styled("div", {
  padding: "10px 10px 20px",
  background: "#FAFAFA",
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

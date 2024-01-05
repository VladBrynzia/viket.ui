import React from "react";
import { styled } from "../../../stitches.config";
import { Link } from "gatsby-plugin-react-i18next";
import { Product } from "../../types/product";

type Props = {
  info: Product;
};

export const ProductCard: React.FC<Props> = ({ info }) => {
  return (
    <Container to={info.attributes.slug}>
      {info.attributes.mainImage && (
        <CardImageBox>
          <Image
            src={info.attributes.mainImage.data.attributes.url}
            alt={info.attributes.name}
          />
          {info.attributes.topSellers && (
            <AbsoluteLabel>
              <Text>Топ продаж</Text>
            </AbsoluteLabel>
          )}
        </CardImageBox>
      )}
      <Box>
        <Title>{info.attributes.name}</Title>
        {info.attributes.haveInStock ? (
          <Yes>Есть на наличии</Yes>
        ) : (
          <No>Нет в наличии</No>
        )}

        <Button>Подробнее</Button>
      </Box>
    </Container>
  );
};

const Container = styled(Link, {
  background: "#FAFAFA",
  borderRadius: "0px 5px",
  minHeight: "max-content",
  width: "calc(100%/2 - 10px)",
  textDecoration: "none",
  cursor: "pointer",
  "@xs": {
    width: "calc(100%/3 - 13.35px)",
  },
});

const Text = styled("p", {
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

const CardImageBox = styled("div", {
  position: "relative",
  width: "100%",
  paddingBottom: "65%",
  overflow: "hidden",
  marginBottom: 20,
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
  fontWeight: 500,
  color: "#171717",
  margin: "0",
  fontSize: 14,
  lineHeight: "18px",
  height: "35px",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});

const Yes = styled("p", {
  fontWeight: 400,
  color: "#14AC36",
  margin: "0",
  fontSize: 12,
  lineHeight: "15px",
});

const No = styled("p", {
  fontWeight: 400,
  color: "#B30303",
  margin: "0",
  fontSize: 12,
  lineHeight: "15px",
});

const Box = styled("div", {
  padding: "10px 10px 20px",
  background: "#FAFAFA",
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const Button = styled("button", {
  margin: "0 auto",
  textDecoration: "none",
  cursor: "pointer",
  display: "flex",
  gap: 8,
  background: "#FFA500",
  border: "none",
  borderRadius: "0px 5px",
  padding: "8px 12px",
  fontWeight: 700,
  color: "$white",
  fontSize: 14,
  lineHeight: "18px",
  "@md": {
    padding: "10px 40px",
  },
});

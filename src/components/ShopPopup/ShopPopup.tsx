import React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { styled } from "../../../stitches.config";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ProductInfoType, ShopItem } from "../../types/product";
import { ProductCard } from "../../features/Products/ProductCard";
import { ShopCard } from "./ShopCard";
import { UniqueShopItem } from "../../context/ShopPopupContext";
import empty from "../../../static/icons/empty-shop.png";

type Props = {
  onClose: () => void;
  isShopOpen: boolean;
  products: UniqueShopItem[];
};

export const ShopPopup: React.FC<Props> = ({
  isShopOpen,
  onClose,
  products,
}) => {
  const { ref } = useClickOutside({
    onClickOutside: onClose,
    isOpen: isShopOpen,
  });

  return (
    <AbsoluteContainer ref={(interalRef) => (ref.current = interalRef)}>
      <Container>
        <Box>
          <Title>Корзина</Title>
          <ExitBox>
            <ExitImage src="/icons/exit.svg" alt="exit" onClick={onClose} />
          </ExitBox>
        </Box>
        <CardBox>
          {!!products.length ? (
            <>
              {products.map((el, i) => (
                <ShopCard key={i} info={el} />
              ))}
            </>
          ) : (
            <Flex>
              <Title>Корзина пустая</Title>
              <Image src={empty} alt="empty" />
            </Flex>
          )}
        </CardBox>
      </Container>
    </AbsoluteContainer>
  );
};

const Image = styled("img", {
  width: 60,
  height: 60,
  "@md": {
    width: 80,
    height: 80,
  },
});

const Flex = styled("div", {
  width: "100%",
  margin: "45px auto",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  justifyContent: "center",
  alignItems: "center",
});

const AbsoluteContainer = styled("div", {
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "45vw",
  height: "fit-content",
  minHeight: "40vh",
  top: 0,
  right: 0,
  background: "$white",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "0px",
  zIndex: 1000,
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "20px",
  "@md": {
    padding: "20px 40px 40px",
  },
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const CardBox = styled("div", {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
});

const ExitImage = styled("img", {
  width: "20px",
  cursor: "pointer",
  padding: 5,
  transition: "all 300ms ease",
  "&:hover": {
    transform: "rotate(90deg)",
  },
});

const ExitBox = styled("div", {
  cursor: "pointer",
  width: 20,
  height: 20,
  "&>svg": {
    width: 30,
    height: 30,
    transition: "all 300ms ease",
  },
  "&>svg>path": {
    cursor: "pointer",
    fill: "$black",
  },
  "&:hover": {
    "&>svg": {
      transition: "all 300ms ease",
      fill: "$black",
      transform: "rotate(90deg)",
    },
  },
});

const Title = styled("h1", {
  display: "flex",
  alignItems: "center",
  fontWeight: "600",
  fontSize: "26px",
  lineHeight: "30px",
  margin: "20px 0",
});

const Subtitle = styled("h2", {
  display: "flex",
  alignItems: "center",
  fontWeight: "500",
  fontSize: "20px",
  lineHeight: "28px",
  margin: "20px 0",
});

const Text = styled("p", {
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  fontWeight: "300",
  fontSize: "18px",
  lineHeight: "32px",
});

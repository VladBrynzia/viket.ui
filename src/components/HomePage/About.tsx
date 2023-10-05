import React from "react";
import { styled } from "../../../stitches.config";

export const About = () => {
  return (
    <Container>
      <ContentContainer>
        <BoxReverse>
          <Image src="/images/about.png" alt="about" />
        </BoxReverse>
        <Info>
          <Title>Коротко о нас </Title>
          <Line />
          <MobileImage src="/images/about.png" alt="about" />
          <Text>
            Компания «VIKET» поставляет листовые полимерные материалы
            европейских производителей на рынок Украины с 2015 года. Мы
            реализуем сотовый, монолитный, профилированный поликарбонат и
            комплектующие для монтажа с собственных складских помещений общей
            площадью более 500 кв.м.
          </Text>
          <Text>
            Собственные складские помещения позволяют обеспечить широкий
            ассортимент листов различных толщин, плотности и цветов. Наши
            сотрудники с радостью помогут Вам выбрать материал, рассчитать
            нужное количество, а также ответят на все технические вопросы. У нас
            доступна услуга порезки листов под размер, монтаж поликарбоната и
            установка металлоконструкций под ключ (навесы, козырьки, теплицы,
            остекление и прочее).
          </Text>
        </Info>
      </ContentContainer>
    </Container>
  );
};

const Container = styled("section", {
  background: "rgba(0, 0, 255, 0.05)",
});

const MobileImage = styled("img", {
  margin: "0 auto",
  width: "100%",
  maxWidth: 504,
  "@md": {
    display: "none",
  },
});

const Info = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 15,
  "@md": {
    maxWidth: 700,
  },
});

const BoxReverse = styled("div", {
  display: "none",
  "@md": {
    display: "block",
  },
});

const ContentContainer = styled("div", {
  padding: "30px 20px",
  display: "flex",
  flexDirection: "column",
  gap: 15,
  maxWidth: 1280,
  margin: "0 auto",
  "@md": {
    gap: 60,
    padding: "60px 20px",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const Image = styled("img", {
  width: "100%",
  maxWidth: 504,
  borderRadius: 5,
  margin: "0 auto",
  "@md": {
    width: 504,
  },
});

const Title = styled("h2", {
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: 700,
  fontSize: 16,
  lineHeight: "19px",
  color: "#FFA500",
  margin: "0",
  "@md": {
    textAlign: "start",
  },
});

const SubTitle = styled("h2", {
  textAlign: "center",
  fontWeight: 700,
  fontSize: 18,
  lineHeight: "21px",
  color: "#171717",
  margin: "0 0 25px",
  "@md": {
    margin: "0 0 5px",
    fontSize: 20,
    lineHeight: "23px",
    textAlign: "start",
  },
});

const Text = styled("p", {
  margin: "0",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "170%",
  color: "#171717",
  "@xs": {
    maxWidth: 700,
    margin: "0 auto",
  },
  "@md": {
    maxWidth: "initial",
    margin: "5px 0 0",
  },
});

const Line = styled("div", {
  display: "none",
  "@md": {
    display: "block",
    width: "60%",
    borderBottom: "1px solid rgba(54, 57, 61, 0.1)",
  },
});

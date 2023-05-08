import React from "react";
import { styled } from "../../../stitches.config";

export const WhatItIs = () => {
  return (
    <Container>
      <Title>Что такое поликарбонат?</Title>
      <Box>
        <Image src="/images/picture-1.png" alt="picture" />
        <Text>
          В строительных и архитектурных задачах, где требуются облегченные,
          прозрачные материалы широко используется поликарбонат. Он представляет
          собой прозрачный полимерный пластик, который хранится в гранулах, а в
          процессе переработки превращается в поликарбонатные листы. Они бывают
          двух видов: структурированные и монолитные. Применяются такие
          материалы в различных сферах жизнедеятельности.
        </Text>
      </Box>
      <BoxReverse>
        <SubBox>
          <Subtitle>Коммерческое и городское строительство:</Subtitle>
          <ListText>
            1. Остекление торговых, офисных и производственных комплексов
          </ListText>
          <ListText>
            2. Антивандальная защита в магазинах, на остановках, в банках
          </ListText>
          <ListText>3. Ветровые и антишумовые ограждения автотрасс</ListText>
        </SubBox>
        <Image src="/images/picture-2.png" alt="picture" />
      </BoxReverse>
      <Box>
        <Image src="/images/picture-3.png" alt="picture" />
        <SubBox>
          <Subtitle>Структурированный поликарбонат</Subtitle>
          <Text>
            Этот вид поликарбоната называют также «сотовым» или «ячеистым» из-за
            его внутренней структуры, которая представляет собой двух-, трех-
            или четырехслойную конструкцию, заполненную большим количеством
            продольных перемычек (ребер жесткости). Ребра жесткости могут
            образовывать квадраты, треугольники, крестовые структуры.
          </Text>
        </SubBox>
      </Box>
    </Container>
  );
};

const Container = styled("section", {
  padding: "50px 20px 30px",
  display: "flex",
  flexDirection: "column",
  gap: 35,
  maxWidth: 1280,
  margin: "0 auto",
  "@md": {
    padding: "100px 20px",
    gap: 60,
  },
});

const Title = styled("h2", {
  textAlign: "center",
  fontWeight: 700,
  fontSize: 18,
  lineHeight: "21px",
  color: "#171717",
  margin: "0 0 30px",
  "@md": {
    fontSize: 24,
    lineHeight: "28px",
  },
});

const Box = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 30,
  "@md": {
    flexDirection: "row",
    gap: 60,
  },
});

const SubBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const BoxReverse = styled("div", {
  display: "flex",
  flexDirection: "column-reverse",
  gap: 30,
  "@md": {
    flexDirection: "row",
    gap: 60,
  },
});

const Image = styled("img", {
  width: "100%",
  maxWidth: 504,
  borderRadius: 5,
  margin: "0 auto",
});

const Subtitle = styled("h4", {
  margin: "0",
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "170%",
  color: "#171717",
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
  },
});

const ListText = styled("p", {
  margin: "0",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "170%",
  color: "#171717",
  "@xs": {
    maxWidth: 700,
  },
  "@md": {
    maxWidth: "initial",
  },
});

import React from "react";
import { styled } from "../../../stitches.config";
import sotaCard from "../../../static/images/sot-card.png";
import monoCard from "../../../static/images/mono-card.png";
import profCard from "../../../static/images/prof-card.png";
import { Link } from "gatsby-plugin-react-i18next";

const cards = [
  {
    link: 'policarbon-sota',
    image: sotaCard,
    title: "Поликарбонат сотовый",
    info: "Сотовый поликарбонат – светопрозрачный полимерный материал, который представляет собой двух-, трех- или четырехслойную конструкцию, заполненную большим количеством продольных перемычек (ребер жесткости), уникальные характеристики которого позволяют применять его во многих строительных направлениях (частное, коммунальное, промышленное, с/х строительство).",
  },
  {
    link: 'policarbon-mono',
    image: monoCard,
    title: "Поликарбонат монолитный",
    info: "Монолитный поликарбонат - cветопрозрачный листовой полимерный материал без внутренних пустот (литой). Благодаря исключительной стойкости, ударопрочности и легкому весу (в 250 раз прочнее стекла такой же толщины и в 2 раза легче) имеет более широкий спектр применения, чем сотовый поликарбонат (промышленность, медицина, строительство и прочие сферы деятельности)",
  },
  {
    link: 'policarbon-profiled',
    image: profCard,
    title: "Поликарбонат профилированный",
    info: "Профилированный поликарбонат - вид монолитного поликарбоната в виде трапеции или волны. Отлично подходит для накрытия крыш и скатных навесов, практичный в эксплуатации – ударопрочный и легкий, простой в монтаже (не требующий элементов соединения).",
  },
];

export const WhatItIs = () => {
  return (
    <Container>
      {cards.map((el, i) => (
        <Box key={i} to={`/products?${el.link}`}>
          <Image src={el.image} alt="card-image" />
          <Title>{el.title}</Title>
          <Text>{el.info}</Text>
        </Box>
      ))}
    </Container>
  );
};

const Container = styled("section", {
  padding: "50px 20px 30px",
  display: "flex",
  gap: 35,
  maxWidth: 1280,
  margin: "0 auto",
  flexDirection: "column",
  alignItems: "center",
  "@md": {
    flexDirection: "row",
    padding: "100px 20px",
    gap: 60,
    alignItems: "initial",
  },
});

const Title = styled("h2", {
  textAlign: "center",
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "18px",
  color: "#171717",
  textTransform: "uppercase",
  "@md": {
    lineHeight: "27px",
  },
});

const Box = styled(Link, {
  cursor: 'pointer',
  display: "flex",
  flexDirection: "column",
  gap: 15,
  padding: "15px 15px 30px",
  borderRadius: "0px 10px 0px 10px",
  background:
    "linear-gradient(135deg, hsla(156, 85%, 92%, 1) 45%, hsla(337, 90%, 92%, 1) 100%, hsla(0, 63%, 79%, 1) 100%)",
  maxWidth: 360,
});

const Image = styled("img", {
  width: "100%",
  height: 230,
  maxWidth: 504,
  borderRadius: 5,
  margin: "0 auto",
});

const Text = styled("p", {
  margin: "0",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "170%",
  color: "#171717",
  textAlign: "center",
  "@xs": {
    maxWidth: 700,
    margin: "0 auto",
  },
  "@md": {
    maxWidth: "initial",
  },
});

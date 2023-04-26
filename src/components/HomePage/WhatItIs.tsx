import React from "react";
import { styled } from "../../../stitches.config";

export const WhatItIs = () => {
  return (
    <Container>
      <Title>Что такое поликарбонат?</Title>
      <Box>
        <Image src="/images/picture-1.png" alt="picture" />
        <Text>
          Lorem Ipsum - это текст-"рыба", часто используемый в печати и
          вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на
          латинице с начала XVI века. В то время некий безымянный печатник
          создал большую коллекцию размеров и форм шрифтов, используя Lorem
          Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил
          без заметных изменений пять веков, но и перешагнул в электронный
          дизайн. Его популяризации в новое время послужили публикация листов
          Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
          время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах
          которых используется Lorem Ipsum.
        </Text>
      </Box>
      <BoxReverse>
        <Text>
          Lorem Ipsum - это текст-"рыба", часто используемый в печати и
          вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на
          латинице с начала XVI века. В то время некий безымянный печатник
          создал большую коллекцию размеров и форм шрифтов, используя Lorem
          Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил
          без заметных изменений пять веков, но и перешагнул в электронный
          дизайн. Его популяризации в новое время послужили публикация листов
          Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
          время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах
          которых используется Lorem Ipsum.
        </Text>
        <Image src="/images/picture-2.png" alt="picture" />
      </BoxReverse>
      <Box>
        <Image src="/images/picture-3.png" alt="picture" />
        <Text>
          Lorem Ipsum - это текст-"рыба", часто используемый в печати и
          вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на
          латинице с начала XVI века. В то время некий безымянный печатник
          создал большую коллекцию размеров и форм шрифтов, используя Lorem
          Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил
          без заметных изменений пять веков, но и перешагнул в электронный
          дизайн. Его популяризации в новое время послужили публикация листов
          Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
          время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах
          которых используется Lorem Ipsum.
        </Text>
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

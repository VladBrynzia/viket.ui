import React from "react";
import { styled } from "../../../stitches.config";

type Props = {
  length?: number;
  paginate: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  length,
  paginate,
  prevPage,
  nextPage,
  currentPage,
}) => {
  const pages = [];

  if (length) {
    for (let i = 0; i < length; i++) {
      pages.push(i + 1);
    }
  }

  return (
    <Container>
      <Box>
        <Prev onClick={prevPage}>🡠 Назад</Prev>
        {pages.map((number) => (
          <Page
            key={number}
            onClick={() => paginate(number)}
            variant={number === currentPage ? "selected" : "notSelected"}
          >
            <Number>{number}</Number>
          </Page>
        ))}
        <Next onClick={nextPage}>Вперед 🡢</Next>
      </Box>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px 0",
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
});

const Page = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 35,
  height: 35,
  fontWeight: 400,
  fontSize: 15,
  lineHeight: '170%',
  border: "none",
  borderRadius: "0px 5px",
  cursor: "pointer",
  variants: {
    variant: {
      selected: {
        background: "#F88500",
        color: "#fff",
      },
      notSelected: {
        color: "#999999",
      },
    },
  },
  defaultVariants: {
    variant: "notSelected",
  },
});

const Number = styled("p", {
  fontWeight: "400",
  fontSize: 15,
  lineHeight: '170%',
  color: "$fff",
  margin: 0,
  transition: "all 300ms ease",
});

const Prev = styled("p", {
  color: "#999999",
  cursor: "pointer",
});

const Next = styled("p", {
  color: "#999999",
  cursor: "pointer",
});

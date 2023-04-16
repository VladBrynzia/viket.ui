import React from "react";
import { styled } from "../../../../stitches.config";

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
        <ImagePrev src="/icons/paginate-arrow.svg" alt="" onClick={prevPage} />
        {pages.map((number) => (
          <Page
            key={number}
            onClick={() => paginate(number)}
            variant={number === currentPage ? "selected" : "notSelected"}
          >
            <Number>{number}</Number>
          </Page>
        ))}
        <ImageNext src="/icons/paginate-arrow.svg" alt="" onClick={nextPage} />
      </Box>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px 0",
  "@md": {
    margin: "30px 0 60px",
  },
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 15,
});

const Page = styled("div", {
  padding: "10px 20px",
  border: "2px solid #F6D9FF",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "all 300ms ease",
  "&:hover": {
    border: "2px solid #FD7E08",
  },
  variants: {
    variant: {
      selected: {
        background: "#FD7E08",
        border: "2px solid #FD7E08",
        color: "#fff",
      },
      notSelected: {
        color: "#9900CC",
        border: "2px solid #F6D9FF",
        "&:hover": {
          color: "#fff",
          border: "2px solid #FD7E08",
        },
      },
    },
  },
  defaultVariants: {
    variant: "notSelected",
  },
});

const Number = styled("p", {
  fontWeight: "700",
  fontSize: "24px",
  lineHeight: "28px",
  color: "$formBorder",
  margin: 0,
  transition: "all 300ms ease",
});

const ImagePrev = styled("img", {
  width: 20,
  height: 50,
  cursor: "pointer",
});

const ImageNext = styled("img", {
  width: 20,
  height: 50,
  transform: "rotate(180deg)",
  cursor: "pointer",
});

import React, { useMemo, useState } from "react";
import { styled } from "@stitches/react";
import { useI18next } from "gatsby-plugin-react-i18next";
import translate from "../../../../static/icons/language.svg";
import translateArrow from "../../../../static/icons/lang-arrow.svg";
import { useClickOutside } from "../../../hooks/useClickOutside";

const languagesFullName = [
  {
    abbreviation: "en",
    language: "English",
  },
  {
    abbreviation: "sk",
    language: "Slovensky",
  },
];

export const ChoseLanguage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { changeLanguage, language } = useI18next();
  const { ref } = useClickOutside({
    onClickOutside: () => setIsOpen(!isOpen),
    isOpen,
  });

  const defineLanguage = useMemo(() => {
    if (language === "en") {
      return "English";
    }
    if (language === "sk") {
      return "Slovensky";
    }
  }, [language]);

  return (
    <Container onClick={() => setIsOpen(!isOpen)}>
      <LanguageBox>
        <Image src={translate} />
        <Text>{defineLanguage}</Text>
      </LanguageBox>
      <ArrowImage src={translateArrow} />
      {isOpen && (
        <Box ref={(interalRef) => (ref.current = interalRef)}>
          {languagesFullName.map((lang, i) => (
            <Button
              key={i}
              onClick={() => {
                changeLanguage(lang.abbreviation);
                setIsOpen(!isOpen);
              }}
              variant={
                lang.abbreviation === language ? "selected" : "notSelected"
              }
            >
              <Item>{lang.language}</Item>
            </Button>
          ))}
        </Box>
      )}
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  background: "rgba(153, 0, 204, 0.1)",
  border: "1px solid #9900CC",
  borderRadius: "5px",
  padding: "0 10px",
  cursor: "pointer",
  minWidth: 150,
  "&:hover": {
    "&>img": {
      "&:last-of-type": {
        transform: "rotate(180deg)",
      },
    },
  },
});

const Box = styled("div", {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 5,
  background: "rgba(51, 0, 64, 0.9)",
  border: "1px solid #9900CC",
  borderRadius: 5,
  position: "absolute",
  top: 45,
  left: 0,
  right: 0,
  padding: "10px",
});

const LanguageBox = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 10,
});

const Item = styled("li", {});

const Image = styled("img", {
  width: 18,
  height: 18,
});

const ArrowImage = styled("img", {
  width: 10,
  transition: "all 300ms ease",
});

const Text = styled("p", {
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "35px",
  margin: 0,
  color: "$white",
});

const Button = styled("button", {
  display: "flex",
  gap: 8,
  borderRadius: "5px",
  fontWeight: "500",
  fontSize: "16px",
  padding: "3px 8px",
  cursor: "pointer",
  transition: "all 300ms ease",
  height: 27,
  width: 120,
  variants: {
    variant: {
      selected: {
        background: "transparent",
        border: "none",
        color: "$orange",
      },
      notSelected: {
        background: "transparent",
        border: "none",
        color: "$white",
        "&:hover": {
          color: "$link",
        },
      },
    },
  },
  defaultVariants: {
    variant: "notSelected",
  },
});

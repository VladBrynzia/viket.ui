import React, { useState } from "react";
import { styled } from "../../../../stitches.config";
import { ArticleCategory } from "../../../types/ArticleCategory";
import { useTranslation } from "gatsby-plugin-react-i18next";
import CategoryStar from "../../../../static/icons/categoryStar.svg";
import CategoryArrow from "../../../../static/icons/categoryArrow.svg";
import { useScreenResolution } from "../../../hooks/useScreenResolution";

type Props = {
  category: ArticleCategory[];
  setFilteredCategory: (value: string | undefined) => void;
  setFilteredSubcategory: (value: string | undefined) => void;
};

type ExpandedCategories = Record<string, boolean>;

export const FiltersSection: React.FC<Props> = ({
  category,
  setFilteredCategory,
  setFilteredSubcategory,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] =
    useState<ExpandedCategories>({});
  const { resolution } = useScreenResolution();
  const { t } = useTranslation();

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategories((prevState) => ({
      [categoryId]: !prevState[categoryId],
    }));
  };

  return (
    <Container>
      <ContentContainer>
        <Arrow
          src={CategoryArrow}
          onClick={() => {
            setExpandedCategories({});
            setIsCategoryOpen(!isCategoryOpen);
          }}
          variant={isCategoryOpen}
        />
        <Button
          onClick={() => {
            setFilteredCategory(undefined);
            setFilteredSubcategory(undefined);
            setIsCategoryOpen(!isCategoryOpen);
            setExpandedCategories({});
          }}
        >
          {t("blog.all")}
        </Button>
        {resolution === "mobile" ? (
          <>
            {isCategoryOpen && (
              <>
                {category.map((el) => {
                  const isArrowVisible = !!el.attributes.subcategory.length;
                  return (
                    <RelativeBox key={el.attributes.categoryId}>
                      <Button
                        onClick={() => {
                          setFilteredCategory(el.attributes.categoryId);
                          setIsCategoryOpen(!isCategoryOpen);
                        }}
                      >
                        {el.attributes.categoryName}
                        {isArrowVisible && (
                          <SubcategoryArrow
                            src={CategoryArrow}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleCategoryClick(el.attributes.categoryId);
                            }}
                          />
                        )}
                      </Button>
                      {expandedCategories[el.attributes.categoryId] && (
                        <SubcategoryBox>
                          {el.attributes.subcategory.map((el, i) => (
                            <Subcategory
                              key={i}
                              onClick={() => {
                                setFilteredCategory(undefined);
                                setFilteredSubcategory(el.name);
                                setExpandedCategories({});
                                setIsCategoryOpen(!isCategoryOpen)
                              }}
                            >
                              <Text>{el.name}</Text>
                            </Subcategory>
                          ))}
                        </SubcategoryBox>
                      )}
                    </RelativeBox>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <>
            {category.map((el) => {
              const isArrowVisible = !!el.attributes.subcategory.length;
              return (
                <RelativeBox key={el.attributes.categoryId}>
                  <Button
                    onClick={() => {
                      setFilteredCategory(el.attributes.categoryId);
                      setFilteredSubcategory(undefined);
                      setExpandedCategories({});
                    }}
                  >
                    {el.attributes.categoryName}
                    {isArrowVisible && (
                      <SubcategoryArrow
                        src={CategoryArrow}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleCategoryClick(el.attributes.categoryId);
                        }}
                      />
                    )}
                  </Button>
                  {expandedCategories[el.attributes.categoryId] && (
                    <SubcategoryBox>
                      {el.attributes.subcategory.map((el, i) => (
                        <Subcategory
                          key={i}
                          onClick={() => {
                            setFilteredCategory(undefined);
                            setFilteredSubcategory(el.name);
                            setExpandedCategories({});
                          }}
                        >
                          <Text>{el.name}</Text>
                        </Subcategory>
                      ))}
                    </SubcategoryBox>
                  )}
                </RelativeBox>
              );
            })}
          </>
        )}
      </ContentContainer>
    </Container>
  );
};

const Container = styled("div", {
  padding: "20px 10px",
  width: "100%",
});

const RelativeBox = styled("div", {
  position: "relative",
});

const SubcategoryBox = styled("div", {
  position: "absolute",
  top: 80,
  left: 0,
  right: "18px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "$white",
  borderRadius: "10px",
  zIndex: 1,
  "@xs": {
    right: "37px",
  },
  "@md": {
    right: 0,
  },
});

const Subcategory = styled("div", {
  border: "1px solid #F6D9FF",
  borderRadius: "10px",
  margin: "5px 0 0",
  cursor: "pointer",
  background: "$feedbackPinkLightBackground",
  "@md": {
    backgroundColor: "$white",
  },
  "&:hover": {
    background: "$feedbackPinkLightBackground",
  },
});

const Text = styled("p", {
  margin: 0,
  padding: "10px 15px",
  color: "$black",
});

const Arrow = styled("img", {
  position: "absolute",
  padding: "15px",
  top: "22px",
  right: "25px",
  zIndex: 10,
  transform: "rotate(180deg)",
  transition: "all 300ms ease",
  "@md": {
    display: "none",
  },
  variants: {
    variant: {
      true: {
        transform: "rotate(360deg)",
      },
    },
  },
});

const SubcategoryArrow = styled("img", {
  position: "absolute",
  padding: "5px",
  margin: "0 10px",
  top: "32px",
  right: "5px",
  transform: "rotate(180deg)",
  transition: "all 300ms ease",
});

const ContentContainer = styled("div", {
  position: "relative",
  margin: "30px 10px",
  width: "100%",
  "@md": {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-start",
    width: "1240px",
    margin: "30px auto",
  },
});

const Button = styled("button", {
  position: "relative",
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "30px",
  color: "$category",
  cursor: "pointer",
  width: "95%",
  height: "80px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 25px",
  background: "transparent",
  border: "1px solid #F6D9FF",
  borderRadius: "10px",
  transition: "all 300ms ease",
  marginBottom: 5,
  "&:hover": {
    color: "$white",
    background: "$violet",
    border: "1px solid $violet",
    transition: "all 300ms ease",
    "&:before": {
      position: "absolute",
      content: "",
      top: 0,
      left: 0,
      width: 67,
      height: 67,
      background: `url(${CategoryStar}) no-repeat`,
    },
  },
  "@md": {
    minWidth: "240px",
    maxWidth: "240px",
    marginBottom: 0,
  },
});

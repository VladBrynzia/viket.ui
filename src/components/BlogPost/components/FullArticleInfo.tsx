import React from "react";
import { styled } from "../../../../stitches.config";
import { Article } from "../../../types/Article";
import { AuthorInfo } from "../../../ui/common/AuthorInfo";

type Props = {
  article: Article;
};

export const FullArticleInfo: React.FC<Props> = ({ article }) => {
  const richText = article.fullDescription;
  const richTextObj = eval("({obj:[" + richText + "]})");

  const checkType = (el: any) => {
    if (el.type === "paragraph") {
      return (
        <Text dangerouslySetInnerHTML={{ __html: `${el.data.text}` }}></Text>
      );
    }
    if (el.type === "header") {
      return selectHeederLevel(el.data.level, el.data.text);
    }
    if (el.type === "list") {
      return selectListStyle(el.data.style, el.data.items);
    }
    if (el.type === "image") {
      return imagesRender(el.data);
    }
    if (el.type === "delimiter") {
      return <Delimiter>* * *</Delimiter>;
    }
    if (el.type === "checklist") {
      return checklistRender(el.data.items);
    }
    if (el.type === "warning") {
      return warningRender(el.data);
    }
    if (el.type === "quote") {
      return (
        <Quote>
          <QuoteText>"{el.data.text}"</QuoteText>
          <QuoteAuthor>{el.data.caption || "Unknown author"}</QuoteAuthor>
        </Quote>
      );
    }
    if (el.type === "LinkTool") {
      return (
        <Link href={el.data.link} target="_blank">
          {el.data.meta.title || el.data.link}
        </Link>
      );
    }
  };

  const warningRender = (warning: any) => {
    return (
      <WarningBox>
        <WarningTitle>{warning.title}</WarningTitle>
        <WarningText>{warning.message}</WarningText>
      </WarningBox>
    );
  };

  const checklistRender = (checklistItems: any) => {
    return (
      <CheckBoxList>
        {checklistItems.map((el: any, i: number) => (
          <CheckBoxItem key={i}>
            <CheckInput type="checkbox" checked={el.checked} readOnly />
            <CheckText>{el.text}</CheckText>
          </CheckBoxItem>
        ))}
      </CheckBoxList>
    );
  };

  const imagesRender = (images: any) => {
    if (images.length === 1) {
      return images[0].caption === "center" ? (
        <ArticleImage
          css={{ margin: "0 auto !important" }}
          src={images[0].url}
          alt="article image"
        />
      ) : (
        <ArticleImage
          css={{ float: images[0].caption }}
          src={images[0].url}
          alt="article image"
        />
      );
    }
    if (images.length >= 2) {
      return (
        <ImageBox>
          {images.map((el: any, i: number) => (
            <ArticleImage key={i} src={el.url} alt="article image" />
          ))}
        </ImageBox>
      );
    }
  };

  const selectHeederLevel = (size: number, text: string) => {
    switch (size) {
      case 1:
        return <Title>{text}</Title>;
      case 2:
        return <Subtitle>{text}</Subtitle>;
      case 3:
        return <H3>{text}</H3>;
      case 4:
        return <H4>{text}</H4>;
    }
  };

  const selectListStyle = (style: string, items: string[]) => {
    switch (style) {
      case "ordered":
        return (
          <>
            {items.map((el, i) => (
              <ListBox key={i}>
                <ListIcon src="/icons/list-item.svg" alt="list" />
                <List>{el}</List>
              </ListBox>
            ))}
          </>
        );
      case "unordered":
        return (
          <>
            {items.map((el, i) => (
              <ListBox key={i}>
                <ListIcon src="/icons/list-item.svg" alt="list" />
                <List>{el}</List>
              </ListBox>
            ))}
          </>
        );
    }
  };

  return (
    <Container>
      <Title>{article.title}</Title>
      <AuthorBox>
        <AuthorInfo
          author={article.author}
          date={article.date}
          authorImage={article.authorImage.data.attributes.url}
          readingTime={article.timeToReading}
        />
      </AuthorBox>
      <MainImageBox>
        <MainImage
          src={article.mainImage.data.attributes.url}
          alt="article image"
        />
      </MainImageBox>
      {richTextObj.obj[0].blocks.map((el: any, i: number) => (
        <React.Fragment key={i}>{checkType(el)}</React.Fragment>
      ))}
    </Container>
  );
};

const Container = styled("div", {
  width: "90%",
  margin: "0 auto",
  overflow: "hidden",
  "@md": {
    width: "1240px",
    gap: 30,
  },
});

const MainImageBox = styled("div", {
  width: "100%",
  paddingTop: "33.33%",
  position: "relative",
  margin: "0 0 30px",
});

const MainImage = styled("img", {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 20,
});

const WarningBox = styled("div", {
  margin: "30px 0",
  border: "1px solid $warning",
  borderRadius: "10px",
  padding: "20px 10px",
  "@md": {
    padding: "20px",
  },
});

const WarningTitle = styled("h3", {
  color: "$warning",
  margin: "0 0 20px",
});

const WarningText = styled("p", {
  margin: 0,
  color: "$warning",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
});

const CheckBoxList = styled("div", {
  margin: "30px 0",
});

const CheckBoxItem = styled("div", {
  display: "flex",
  gap: 10,
  alignItems: "flex-start",
  "@md": {
    gap: 20,
  },
});

const CheckInput = styled("input", {
  width: 25,
  height: 25,
  margin: 0,
});

const CheckText = styled("p", {
  margin: "0 0 20px",
});

const Quote = styled("div", {});

const QuoteText = styled("p", {
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 10px",
});

const QuoteAuthor = styled("p", {
  fontWeight: "600",
  fontSize: "18px",
  lineHeight: "24px",
  margin: "0 0 20px",
  textAlign: "end",
});

const Title = styled("h1", {
  fontWeight: "600",
  fontSize: "30px",
  lineHeight: "32px",
  margin: "0 0 30px",
  "@md": {
    fontSize: "40px",
    lineHeight: "50px",
  },
});

const Subtitle = styled("h2", {
  fontWeight: "600",
  fontSize: "26px",
  lineHeight: "30px",
  margin: "0 0 30px",
  "@md": {
    fontSize: "34px",
    lineHeight: "40px",
  },
});

const H3 = styled("h3", {
  fontWeight: "600",
  fontSize: "22px",
  lineHeight: "28px",
  margin: "0 0 30px",
  "@md": {
    fontSize: "30px",
    lineHeight: "36px",
  },
});

const H4 = styled("h4", {
  fontWeight: "600",
  fontSize: "20px",
  lineHeight: "26px",
  margin: "0 0 30px",
  "@md": {
    fontSize: "26px",
    lineHeight: "32px",
  },
});

const ListBox = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 10,
  margin: "0 0 10px",
  "@md": {
    gap: 20,
    margin: "0 0 20px",
  },
});

const ListIcon = styled("img", {
  width: 25,
  height: 25,
});

const List = styled("li", {
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "30px",
  margin: 0,
  listStyle: "none",
  textAlign: "justify",
});

const Text = styled("p", {
  fontWeight: "400",
  fontSize: "18px",
  lineHeight: "30px",
  margin: "0 0 30px",
  textAlign: "justify",
});

const Delimiter = styled("p", {
  fontWeight: "500",
  fontSize: "30px",
  lineHeight: "30px",
  margin: "30px auto",
  textAlign: "center",
});

const Link = styled("a", {
  display: "block",
  fontWeight: "600",
  fontSize: "18px",
  lineHeight: "30px",
  margin: "0 0 20px",
  color: "$violet",
  cursor: "pointer",
});

const ArticleImage = styled("img", {
  width: "100%",
  objectFit: "cover",
  borderRadius: "20px",
  margin: "10px 0",
  "@sm": {
    margin: "10px 20px",
    width: "47.5%",
  },
});

const ImageBox = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 20,
  justifyContent: "space-evenly",
});

const AuthorBox = styled("div", {
  margin: "0 0 30px",
});

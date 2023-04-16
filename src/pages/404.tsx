import * as React from "react";
import { HeadFC } from "gatsby";
import { NotFound } from "../components/NotFound/NotFound";

const NotFoundPage = () => {
  return <NotFound />;
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;

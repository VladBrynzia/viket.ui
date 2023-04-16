import axios, { AxiosRequestHeaders } from "axios";

const API_URL = process.env.GATSBY_API_URL;

export const sendRequestToAPI = (query: string, variables: unknown, customHeaders?: AxiosRequestHeaders, customLink?: string) => {

  return axios({
    url: customLink ? customLink : API_URL,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...customHeaders
    },
    data: JSON.stringify({
      query,
      variables
    }),
  });
};

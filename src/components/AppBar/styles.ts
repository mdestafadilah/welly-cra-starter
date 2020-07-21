import css, { SerializedStyles } from "@emotion/css/macro";

export const menuBtn = (theme: any): SerializedStyles => css`
  margin-right: ${theme.spacing(2)}px;
`;

export const emoji = css`
  margin-right: 0.5rem;
`;

export const title = css`
  flex-grow: 1;
`;

export const select = css`
  margin-right: 1rem;
`;

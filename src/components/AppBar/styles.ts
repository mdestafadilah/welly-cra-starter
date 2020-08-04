import { Theme } from "@material-ui/core/styles";
import { css, SerializedStyles } from "@emotion/core";

export const menuBtn = ({ spacing }: Theme): SerializedStyles => css`
  margin-right: ${spacing(2)}px;
`;

export const emoji = css`
  margin-right: 0.5rem;
`;

export const title = css`
  flex-grow: 1;
`;

export const select = ({ spacing }: Theme): SerializedStyles => css`
  margin-right: ${spacing(2)}px;

  .MuiSelect-select,
  .MuiSelect-icon {
    color: #fff;
  }

  &::before,
  &:hover::before {
    border-color: #fff !important;
  }
`;

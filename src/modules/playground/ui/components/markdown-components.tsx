import { type HTMLAttributes } from "react";
import { type Components } from "react-markdown";

export const markdownComponents: Components = {
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol style={{ listStyle: "revert" }} {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul style={{ listStyle: "revert" }} {...props} />
  ),
};

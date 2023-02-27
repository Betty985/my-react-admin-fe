import React from "react";
import { FC } from "react";
interface ListErrorsProps {
  errors: any;
}
const ListErrors: FC<ListErrorsProps> = (props) => {
  const { errors } = props;
  return (
    errors && (
      <ul className="error-messages">
        {Object.keys(errors).map((key) => {
          return (
            <li key={key}>
              {key} {errors[key]}
            </li>
          );
        })}
      </ul>
    )
  );
};
export default ListErrors;

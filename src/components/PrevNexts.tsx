import React, { useState } from "react";

interface PrevnextsI {
  prevnexts: {
    [v: string]: {
      prev?: any;
      next?: any;
    };
  };
}

export const PrevNexts: React.FC<{
  prevnexts: PrevnextsI;
}> = ({ prevnexts }) => {
  const [selected, setSelected] = useState("/");
  const [name, { prev, next }] = Object.entries(prevnexts).find(
    ([name, pn]) => name === selected,
  )!;
  return (
    <nav>
      <hr />
      <div className="nav">
        <span>
          {prev && (
            <a href={"./" + prev.id}>
              <span aria-hidden="true">«</span> Previous
            </a>
          )}
        </span>
        <span>
          <a href={"./" + name}>{name}</a>
        </span>
        <span>
          {next && (
            <a href={"./" + next.id}>
              Next <span aria-hidden="true">»</span>
            </a>
          )}
        </span>
      </div>
      <hr />
    </nav>
  );
};

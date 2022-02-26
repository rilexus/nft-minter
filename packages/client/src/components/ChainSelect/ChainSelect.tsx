import React, { useMemo, VFC } from "react";
import { Select, Option } from "@nightfall-ui/inputs";
import { CHAINS } from "../../utils/chains";

const ChainSelect: VFC<{
  onChange: (event: { target: { value: string | number } }) => void;
  value: string;
}> = ({ onChange, value }) => {
  const options = useMemo(() => Object.keys(CHAINS), []);
  return (
    <div>
      <Select onChange={onChange} value={value}>
        {options.map((chainId) => {
          return (
            <Option key={chainId} value={chainId}>
              {CHAINS[chainId]?.name ?? chainId}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export { ChainSelect };

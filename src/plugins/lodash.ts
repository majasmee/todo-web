import * as _ from "lodash";

const custom = {
  ..._,
  get: (object: any, path: any, defaultValue: any = null) => {
    return _.get(object, path, defaultValue) || defaultValue;
  },
};

export default custom;

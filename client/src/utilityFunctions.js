// createId
// returns an underscore prefix id tag for objects
export const createID = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

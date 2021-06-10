// Number.prototype.zeroPad = function() {
//     return this.toString().padStart(2, "0");
//   };

export const zeroPad = (no: number) => {
  return no.toString().padStart(2, "0");
};

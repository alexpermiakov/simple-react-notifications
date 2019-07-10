export const getPrintedCode = (options, n = 1) => {
  let text = "";
  let { length } = Object.keys(options);
  let i = 0;
  for (let k in options) {
    let comma = i++ < length - 1 ? "," : "";
    let val = options[k];
    const offset = "  ".repeat(n);
    let pval = typeof val === "string" ? `"${val}"` : val;
    pval =
      typeof pval === "object"
        ? `{\n${getPrintedCode(pval, n + 1)}${offset}}`
        : pval;
    text += `${offset}${k}: ${pval}${comma}\n`;
  }

  return text;
};

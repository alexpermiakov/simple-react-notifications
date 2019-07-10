export const getPrintedCode = (options, n = 1, avoidQuotes) => {
  let text = "";

  if (!options.animation) {
    delete options.animation;
  }

  let { length } = Object.keys(options);
  let i = 0;
  for (let k in options) {
    let comma = i++ < length - 1 ? "," : "";
    let val = options[k];
    const offset = "  ".repeat(n);
    let pval = typeof val === "string" && !avoidQuotes ? `"${val}"` : val;
    pval =
      typeof pval === "object"
        ? `{\n${getPrintedCode(pval, n + 1)}${offset}}`
        : pval;
    text += `${offset}${k}: ${pval}${comma}\n`;
  }

  return text;
};

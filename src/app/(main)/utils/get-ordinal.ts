const getOrdinal = (number: number) => {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;
  const isTeens = lastTwoDigits >= 11 && lastTwoDigits <= 13;
  const suffix = isTeens ? "th" : ["st", "nd", "rd"][lastDigit - 1] || "th";

  return `${number}${suffix}`;
};

export default getOrdinal;

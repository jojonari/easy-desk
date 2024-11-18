const convertToKoreanCurrency = (value: string | number | bigint) => {
  // If the input is a number, remove decimals
  if (typeof value === "number") {
    value = Math.floor(value);
  } else if (typeof value === "string" && !isNaN(Number(value))) {
    // If the input is a string and can be converted to a number, remove decimals
    value = Math.floor(Number(value));
  }

  // Remove non-numeric characters from the string
  if (typeof value === "string") {
    value = value.replace(/[^0-9]/g, "");
  }

  // Convert to BigInt
  value = BigInt(value);

  // Handle case where value is 0
  if (value === BigInt(0)) {
    return "0";
  }

  // Define units for Korean currency
  const units = [
    "",
    "만",
    "억",
    "조",
    "경",
    "해",
    "자",
    "양",
    "구",
    "간",
    "정",
    "재",
    "극",
    "항하사세",
    "아승기",
    "나유타",
    "불가사의",
    "무량대수",
  ];

  let result = "";
  let unitIndex = 0;

  // Loop to break down the number into segments of 10,000
  while (value >= BigInt(10000)) {
    const segment = value % BigInt(10000);
    if (segment > BigInt(0)) {
      result = `${segment}${units[unitIndex]}${result}`;
    }
    value = value / BigInt(10000);
    unitIndex++;
  }

  // Handle the remaining value below 10,000
  if (value > BigInt(0)) {
    result = `${value}${units[unitIndex]}${result}`;
  }

  // Function to add commas to numbers
  const addCommas = (number: string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return addCommas(result);
};

export default convertToKoreanCurrency;

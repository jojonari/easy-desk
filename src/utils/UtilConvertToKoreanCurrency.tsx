// utils/convertToKoreanCurrency.js

const convertToKoreanCurrency = (value: string | number | bigint | boolean) => {
  // 숫자나 문자열을 입력받고, BigInt로 변환
  if (typeof value === 'string') {
    value = value.replace(/[^0-9]/g, '');  // 숫자만 남기기
  }
  // 문자열을 BigInt로 변환
  value = BigInt(value);

   // value가 0인 경우 처리
   if (value === 0n) { 
    return '0';
  }
  // 단위 배열 (큰 단위까지 포함)
  const units = ['', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극', '항하사세', '아승기', '나유타', '불가사의', '무량대수'];

  let result = '';
  let unitIndex = 0;

  // 1억 이상일 때만 억 단위를 사용
  while (value >= 10000n) {  // BigInt는 n을 붙여야 사용됨
    let segment = value % 10000n;  // 만 단위로 나누기
    if (segment > 0n) {
      result = `${segment}${units[unitIndex]}${result}`;
    }
    value = value / 10000n; // 만 단위로 나누기
    unitIndex++;
  }

  // 만 미만 값 처리 (만원 미만은 그냥 원으로 처리)
  if (value > 0n) {
    result = `${value}${units[unitIndex]}${result}`;
  }

  // 쉼표 추가
  const addCommas = (number: string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return addCommas(result);
};

export default convertToKoreanCurrency;

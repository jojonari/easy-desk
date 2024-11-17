// 숫자에 천 단위 쉼표를 추가하는 함수
const formatNumber = (num: number | string) => {
    if (!num) return '';
    let formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 소수점이 0인 경우 제거
    if (formatted.includes('.')) {
        formatted = formatted.replace(/\.0$/, '');
    }

    return formatted;
};

export default formatNumber;

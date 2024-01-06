
/**
 * 주민등록번호 앞 7자리를 받아 기준일 기준 년, 개월, 일수를 게산한다.
 * @param resdNoFrnt 주민등록번호 앞자리(7자리)
 * @param baseDate 기준일 (default = new Date(): 오늘)
 * @returns object { ageYear, ageMonth, ageDay }
 */
export const calcPatientAge = (resdNoFrnt: string, baseDate: Date = new Date()): { ageYear: number, ageMonth: number, ageDay: number } | null => {
  // 주민등록번호 앞자리가 7자리가 아닌 경우 빈 값을 return한다.
  if (resdNoFrnt.length !== 7) {
    return null;
  }
  
  const result: { ageYear: number, ageMonth: number, ageDay: number } = {
    ageYear: 0,
    ageMonth: 0,
    ageDay: 0
  }

  // 마지막 자리수를 가져온다.
  const firstDigitForLast7Digit: string = resdNoFrnt.substring(6, 7);

  // 출생년도
  let resdNoYear: number | undefined = Number.parseInt(resdNoFrnt.substring(0, 2))
  // 출생월
  const resdNoMonth: number | undefined = Number.parseInt(resdNoFrnt.substring(2, 4));
  // 출생일
  const resdNoDay: number | undefined = Number.parseInt(resdNoFrnt.substring(4, 6));

  // 주민번호를 파싱한 값이 잘못되었다면 null을 리턴한다.
  if (resdNoYear === undefined || resdNoMonth === undefined || resdNoDay === undefined) {
    return null;
  }

  // 7번째 자리가 1, 2, 5, 6일 경우 1900년대에 태어난 것으로 한다.
  if (firstDigitForLast7Digit === "1" || firstDigitForLast7Digit === "2" || firstDigitForLast7Digit === "5" || firstDigitForLast7Digit === "6") {
    resdNoYear += 1900;
  } else {
    resdNoYear += 2000;
  }

  // 기준일에서 출생년월일을 빼는 방식으로 계산한다.
  baseDate.setDate(baseDate.getDate() - resdNoDay);
  baseDate.setMonth(baseDate.getMonth() - resdNoMonth + 1);
  baseDate.setFullYear(baseDate.getFullYear() - resdNoYear);

  // 결과에 값을 대입한다.
  result.ageYear = baseDate.getFullYear();
  result.ageMonth = baseDate.getMonth();
  result.ageDay = baseDate.getDate();

  return result;
}

/**
 * date를 yyyyMMdd 로 또는 yyyyMMddHHmmss 형태의 string으로 변환한다.
 * - DATE: yyyyMMdd
 * - DATETIME: yyyyMMddHHmmss
 * @param date 날짜
 * @param dateType 'DATE' | 'DATETIME'
 * @returns
 */
export const convertDateToString = (date: Date, type: 'DATE' | 'DATETIME'): string => {
  // 지정한 타입이 아니라면 빈 값을 리턴한다.
  if (type !== 'DATE' && type !== 'DATETIME') {
    return '';
  }

	const year: string = '' + date.getFullYear();
	const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
	const day: string = ('0' + date.getDate()).slice(-2);

	let result: string = (year + month + day);

  // DATETIME일 경우 시, 분, 초를 포함시킨다.
  if (type === 'DATETIME') {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    result += (hours + minutes + seconds);
  }

  return result
};

/**
 * yyyyMMdd 또는 yyyyMMddHHmmss 형태의 dateString을 Date로 변환한다.
 * - DATE: yyyyMMdd
 * - DATETIME: yyyyMMddHHmmss
 * @param dateString
 * @param dateType 'DATE' | 'DATETIME'
 * @returns 
 */
export const convertStringToDate = (dateString: string, type: 'DATE' | 'DATETIME'): Date => {
  // 지정한 타입이 아니거나 8글자 또는 14글자가 아니라면 Date의 초기값을 리턴한다.
  if (type !== 'DATE' && type !== 'DATETIME' && (dateString.length === 8 || dateString.length === 14)) {
    return new Date('1900-01-01');
  }

  const yearString: string = dateString.substring(0, 4);
  const monthString: string = dateString.substring(4, 6);
  const dayString: string = dateString.substring(6, 8);

  const result: Date = new Date(`${yearString}-${monthString}-${dayString}`);

   // DATETIME일 경우 시, 분, 초를 포함시킨다.
  if (type === 'DATETIME') {
    const hoursString = dateString.substring(8, 10);
    const minutesString = dateString.substring(10, 12);
    const secondsString = dateString.substring(12, 14);
    
    result.setHours(Number.parseInt(hoursString) ?? 0);
    result.setMinutes(Number.parseInt(minutesString) ?? 0);
    result.setSeconds(Number.parseInt(secondsString) ?? 0);
  }

  return result;
}

/**
 * date를 yyyy-MM-dd 로 또는 yyyy-MM-dd HH:mm:ss 형태의 string으로 변환한다.
 * - DATE: yyyy-MM-dd
 * - DATETIME: yyyy-MM-dd HH:mm:ss
 * @param date 날짜
 * @param dateType 'DATE' | 'DATETIME'
 * @returns
 */
export const convertDateToFormattedString = (date: Date, type: 'DATE' | 'DATETIME'): string => {
  // 지정한 타입이 아니라면 빈 값을 리턴한다.
  if (type !== 'DATE' && type !== 'DATETIME') {
    return '';
  }

	const year: string = '' + date.getFullYear();
	const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
	const day: string = ('0' + date.getDate()).slice(-2);

	let result: string = `${year}-${month}-${day}`;

  // DATETIME일 경우 시, 분, 초를 포함시킨다.
  if (type === 'DATETIME') {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    result += ` ${hours}:${minutes}:${seconds}`;
  }

  return result
};

/**
 * date를 yyyy-MM-dd 로 또는 yyyy-MM-dd HH:mm:ss 형태의 string으로 변환한다.
 * - DATE: yyyy-MM-dd
 * - DATETIME: yyyy-MM-dd HH:mm:ss
 * @param date 날짜
 * @param dateType 'DATE' | 'DATETIME'
 * @returns
 */
export const convertDateStringToFormattedString = (dateString: string, type: 'DATE' | 'DATETIME'): string => {
  // 지정한 타입이 아니거나 8글자 또는 14글자가 아니라면 Date의 초기값을 리턴한다.
  if (type !== 'DATE' && type !== 'DATETIME' && (dateString.length === 8 || dateString.length === 14)) {
    return '';
  }

  const yearString: string = dateString.substring(0, 4);
  const monthString: string = dateString.substring(4, 6);
  const dayString: string = dateString.substring(6, 8);

  let result: string = `${yearString}-${monthString}-${dayString}`;

  // DATETIME일 경우 시, 분, 초를 포함시킨다.
  if (type === 'DATETIME') {
    const hoursString = dateString.substring(8, 10);
    const minutesString = dateString.substring(10, 12);
    const secondsString = dateString.substring(12, 14);

    result += ` ${hoursString}:${minutesString}:${secondsString}`;
  }

  return result
};
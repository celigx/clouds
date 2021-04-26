// Temperature color gradient for daily forecast
export const tempGradient = (temp) => {
  if (temp <= 0) {
    return '#2E328D'
  } else if (temp > 0 && temp <= 9) {
    return '#0070B6'
  } else if (temp >= 10 && temp <= 14) {
    return '#65C2CA'
  } else if (temp >= 15 && temp <= 19) {
  return '#FBC000'
  } else if (temp >= 20 && temp <= 24) {
    return '#EB8D25'
  } else if (temp >= 25 && temp <= 29) {
    return '#EB5A25'
  } else if (temp >= 30 && temp <= 34) {
    return '#D75138'
  } else if (temp >= 35 && temp <= 39) {
    return '#BC272D'
  } else if ( temp >= 40) {
    return '#80100E'
  }
}
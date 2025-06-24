export const convertToCurrencySymbol = (curr) => {
    const currencyData = {
        'usd': '$',
        'gbp': '£',
        'gel': '₾'
    }
    return currencyData[curr] || '$';
}
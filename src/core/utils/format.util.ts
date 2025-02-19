export function formatNumber(value: number, decimals?: number) {
    const formattedValue = value.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals ?? 8,
    });

    return formattedValue;
}

export function formatCryptoPrice(value: number) {
    let decimals = 2;

    // Increase decimals for lower values
    if (value < 1) decimals = 6;
    else if (value < 100) decimals = 4;
    else if (value < 10000) decimals = 2;

    return value.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
    });
}

export function formatPercentage(value: number, decimals: number = 2) {
    // Show negative percentages without negative symbol
    const absoluteValue = Math.abs(value);
    return `${formatNumber(absoluteValue, decimals)}%`;
}
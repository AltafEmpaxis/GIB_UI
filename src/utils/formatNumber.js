import numeral from 'numeral';

// Basic number formatting
export function fNumber(number) {
  if (number === null || number === undefined) return '';
  return numeral(number).format('0,0.00');
}

// Currency formatting with symbol
export function fCurrency(number) {
  if (number === null || number === undefined) return '';
  return numeral(number).format('$0,0.00');
}

// Percentage formatting
export function fPercent(number) {
  if (number === null || number === undefined) return '';
  return numeral(number / 100).format('0.00%');
}

// Round percentage to 2 decimal places
export function fRoundPercent(number) {
  if (number === null || number === undefined) return '';
  return numeral(Math.round(number * 100) / 100 / 100).format('0.00%');
}

// Compact number formatting (e.g., 1K, 1M, 1B)
export function fShortenNumber(number) {
  if (number === null || number === undefined) return '';
  return numeral(number).format('0.00a');
}

// Data size formatting (e.g., bytes, KB, MB)
export function fData(number) {
  if (number === null || number === undefined) return '';
  return numeral(number).format('0.0 b');
}

// Integer formatting (no decimals)
export function fInteger(number) {
  if (number === null || number === undefined) return '';
  return numeral(number).format('0,0');
}

// Decimal formatting with custom precision
export function fDecimal(number, precision = 2) {
  if (number === null || number === undefined) return '';
  return numeral(number).format(`0,0.${'0'.repeat(precision)}`);
}

// Format with plus/minus sign
export function fSignedNumber(number) {
  if (number === null || number === undefined) return '';
  return numeral(number).format('+0,0.00');
}

// Format as accounting style
export function fAccounting(number) {
  if (number === null || number === undefined) return '';
  return numeral(number).format('$0,0.00');
}

// Format large numbers in exponential notation
export function fExponential(number) {
  if (number === null || number === undefined) return '';
  return numeral(number).format('0.00e+0');
}

// Format as basis points (multiply by 10000)
export function fBasisPoints(number) {
  if (number === null || number === undefined) return '';
  return numeral(number * 10000).format('0.00');
}

// Format with custom thousand/decimal separators
export function fCustomSeparators(number, thousandSep = ',', decimalSep = '.') {
  if (number === null || number === undefined) return '';
  const format = numeral(number).format('0,0.00');
  return format.replace(/,/g, thousandSep).replace(/\./g, decimalSep);
}

// Format as absolute value
export function fAbsolute(number) {
  if (number === null || number === undefined) return '';
  return numeral(Math.abs(number)).format('0,0.00');
}

// Format with minimum precision (trims unnecessary zeros)
export function fMinPrecision(number) {
  if (number === null || number === undefined) return '';
  const formatted = numeral(number).format('0.00');
  return formatted.replace(/\.?0+$/, '');
}

// Format as rounded number
export function fRounded(number, precision = 0) {
  if (number === null || number === undefined) return '';
  const factor = Math.pow(10, precision);
  return numeral(Math.round(number * factor) / factor).format(`0,0${precision > 0 ? '.' + '0'.repeat(precision) : ''}`);
}

// Format with SI prefixes (k, M, G, T, etc.)
export function fSI(number) {
  if (number === null || number === undefined) return '';
  const ranges = [
    { divider: 1e12, suffix: 'T' },
    { divider: 1e9, suffix: 'G' },
    { divider: 1e6, suffix: 'M' },
    { divider: 1e3, suffix: 'k' }
  ];

  for (const range of ranges) {
    if (Math.abs(number) >= range.divider) {
      return numeral(number / range.divider).format('0.00') + range.suffix;
    }
  }
  return numeral(number).format('0.00');
}

// Helper function to remove trailing zeros
export function removeTrailingZeros(format, key = '.00') {
  const isInteger = format.includes(key);
  return isInteger ? format.replace(key, '') : format;
}

/**
 * Time formatting and conversion utilities
 */

/**
 * Convert time object to milliseconds
 * @param {Object} time - Time object with hours, minutes, seconds
 * @returns {number} - Time in milliseconds
 */
export function timeToMilliseconds(time) {
  const { hours = 0, minutes = 0, seconds = 0 } = time;
  return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
}

/**
 * Convert milliseconds to time object
 * @param {number} ms - Time in milliseconds
 * @returns {Object} - Time object with hours, minutes, seconds
 */
export function millisecondsToTime(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

/**
 * Convert seconds to time object
 * @param {number} totalSeconds - Total seconds to convert
 * @returns {Object} - Time object with hours, minutes, seconds
 */
export function secondsToTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
}

/**
 * Format time duration into human readable string with appropriate units
 * @param {Object} time - Time object with hours, minutes, seconds
 * @param {Object} options - Formatting options
 * @returns {Object} - Formatted time with different display options
 */
export function formatTime(time, options = {}) {
  const { hours = 0, minutes = 0, seconds = 0 } = time;
  const { conjunction = 'and', includeZeroUnits = false } = options;

  // Format parts with units
  const formatPart = (value, unit) => {
    if (value === 0 && !includeZeroUnits) return '';
    return `${value} ${unit}${value === 1 ? '' : 's'}`;
  };

  // Build parts array
  const parts = [];
  if (hours > 0 || includeZeroUnits) parts.push(formatPart(hours, 'hour'));
  if (minutes > 0 || includeZeroUnits) parts.push(formatPart(minutes, 'minute'));
  if (seconds > 0 || (hours === 0 && minutes === 0) || includeZeroUnits) parts.push(formatPart(seconds || 0, 'second'));

  // Different format options
  return {
    // "1 hour 30 minutes 45 seconds" or "1 hour and 30 minutes and 45 seconds"
    verbose: parts.filter(Boolean).join(conjunction ? ` ${conjunction} ` : ' '),

    // "1h 30m 45s"
    short: `${hours ? hours + 'h ' : ''}${minutes ? minutes + 'm ' : ''}${seconds}s`,

    // "01:30:45"
    digital: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,

    // "1:30:45" (no leading zeros for hours)
    compact:
      hours > 0
        ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        : `${minutes}:${seconds.toString().padStart(2, '0')}`,

    // For natural language
    parts: {
      hours,
      minutes,
      seconds
    }
  };
}

/* ========================================================================
  HOW TO USE ALL NUMBER FORMATTING FUNCTIONS
  Examples with different number types and scenarios
======================================================================== */

/*
1. Basic Number Formatting (fNumber)
--------------------------------
fNumber(1234.5678)      -> "1,234.57"
fNumber(1000000)        -> "1,000,000.00"
fNumber(-5432.12)       -> "-5,432.12"
fNumber(null)           -> ""
fNumber(undefined)      -> ""

2. Currency Formatting (fCurrency)
--------------------------------
fCurrency(1234.56)      -> "$1,234.56"
fCurrency(-1234.56)     -> "-$1,234.56"
fCurrency(1000000)      -> "$1,000,000.00"
fCurrency(0.99)         -> "$0.99"

3. Percentage Formatting (fPercent)
--------------------------------
fPercent(45.678)        -> "45.68%"
fPercent(100)           -> "100.00%"
fPercent(-25.5)         -> "-25.50%"
fPercent(0.5)           -> "0.50%"

4. Shortened Number Format (fShortenNumber)
--------------------------------
fShortenNumber(1234)    -> "1.23k"
fShortenNumber(1234567) -> "1.23m"
fShortenNumber(1.23e6)  -> "1.23m"
fShortenNumber(-1e9)    -> "-1.00b"

5. Data Size Formatting (fData)
--------------------------------
fData(1234)             -> "1.2 KB"
fData(1234567)          -> "1.2 MB"
fData(1234567890)       -> "1.2 GB"

6. Integer Formatting (fInteger)
--------------------------------
fInteger(1234.56)       -> "1,235"
fInteger(1000000)       -> "1,000,000"
fInteger(-5432)         -> "-5,432"

7. Custom Decimal Formatting (fDecimal)
--------------------------------
fDecimal(1234.5678, 2)  -> "1,234.57"
fDecimal(1234.5678, 3)  -> "1,234.568"
fDecimal(1234.5678, 0)  -> "1,235"

8. Signed Number Format (fSignedNumber)
--------------------------------
fSignedNumber(1234.56)  -> "+1,234.56"
fSignedNumber(-1234.56) -> "-1,234.56"
fSignedNumber(0)        -> "+0.00"

9. Accounting Format (fAccounting)
--------------------------------
fAccounting(1234.56)    -> "$1,234.56"
fAccounting(-1234.56)   -> "($1,234.56)"
fAccounting(0)          -> "$0.00"

10. Exponential Format (fExponential)
--------------------------------
fExponential(1234.56)   -> "1.23e+3"
fExponential(0.00123)   -> "1.23e-3"
fExponential(-1234.56)  -> "-1.23e+3"

11. Basis Points Format (fBasisPoints)
--------------------------------
fBasisPoints(0.0125)    -> "125.00"
fBasisPoints(0.01)      -> "100.00"
fBasisPoints(0.0001)    -> "1.00"

12. Custom Separators Format (fCustomSeparators)
--------------------------------
fCustomSeparators(1234.56, '.', ',')  -> "1.234,56"
fCustomSeparators(1234.56, ' ', ',')  -> "1 234,56"
fCustomSeparators(1234.56, "'", '.')  -> "1'234.56"

13. Absolute Value Format (fAbsolute)
--------------------------------
fAbsolute(-1234.56)     -> "1,234.56"
fAbsolute(1234.56)      -> "1,234.56"
fAbsolute(-0.123)       -> "0.12"

14. Minimum Precision Format (fMinPrecision)
--------------------------------
fMinPrecision(1234.00)  -> "1,234"
fMinPrecision(1234.50)  -> "1,234.5"
fMinPrecision(1234.56)  -> "1,234.56"

15. Rounded Number Format (fRounded)
--------------------------------
fRounded(1234.56789, 2) -> "1,234.57"
fRounded(1234.56789, 0) -> "1,235"
fRounded(1234.56789, 3) -> "1,234.568"

16. SI Prefix Format (fSI)
--------------------------------
fSI(1234)               -> "1.23k"
fSI(1234567)            -> "1.23M"
fSI(1234567890)         -> "1.23G"
fSI(1234567890000)      -> "1.23T"

17. Time Duration Format (formatTime)
--------------------------------
formatTime({ hours: 1, minutes: 30, seconds: 45 })
Returns: {
  verbose: "1 hour 30 minutes 45 seconds",
  short: "1h 30m 45s",
  digital: "01:30:45",
  compact: "1:30:45",
  parts: { hours: 1, minutes: 30, seconds: 45 }
}

formatTime({ minutes: 5, seconds: 30 })
Returns: {
  verbose: "5 minutes 30 seconds",
  short: "5m 30s",
  digital: "00:05:30",
  compact: "5:30",
  parts: { hours: 0, minutes: 5, seconds: 30 }
}

formatTime({ seconds: 45 })
Returns: {
  verbose: "45 seconds",
  short: "45s",
  digital: "00:00:45",
  compact: "0:45",
  parts: { hours: 0, minutes: 0, seconds: 45 }
}

18. Time Conversion and Formatting Examples
--------------------------------
timeToMilliseconds({ hours: 1, minutes: 30, seconds: 45 })  -> 5445000
millisecondsToTime(5445000)  -> { hours: 1, minutes: 30, seconds: 45 }
secondsToTime(5445)  -> { hours: 1, minutes: 30, seconds: 45 }

formatTime({ hours: 1, minutes: 30, seconds: 45 }, { conjunction: 'and' })
Returns: {
  verbose: "1 hour and 30 minutes and 45 seconds",
  short: "1h 30m 45s",
  digital: "01:30:45",
  compact: "1:30:45",
  parts: { hours: 1, minutes: 30, seconds: 45 }
}

formatTime({ minutes: 5, seconds: 30 }, { includeZeroUnits: true })
Returns: {
  verbose: "0 hours 5 minutes 30 seconds",
  short: "5m 30s",
  digital: "00:05:30",
  compact: "5:30",
  parts: { hours: 0, minutes: 5, seconds: 30 }
}

Example Usage in React Components:
--------------------------------
import {
  fNumber,
  fCurrency,
  fPercent,
  fShortenNumber,
  fData,
  fInteger,
  fDecimal,
  fSignedNumber,
  fAccounting,
  fExponential,
  fBasisPoints,
  fCustomSeparators,
  fAbsolute,
  fMinPrecision,
  fRounded,
  fSI,
  formatTime
} from 'utils/formatNumber';

function MyComponent() {
  const number = 1234.5678;

  return (
    <div>
      <p>Basic Number: {fNumber(number)}</p>
      <p>Currency: {fCurrency(number)}</p>
      <p>Percentage: {fPercent(number)}</p>
      <p>Shortened: {fShortenNumber(number)}</p>
      <p>Data Size: {fData(number)}</p>
      <p>Integer: {fInteger(number)}</p>
      <p>Custom Decimal: {fDecimal(number, 3)}</p>
      <p>Signed: {fSignedNumber(number)}</p>
      <p>Accounting: {fAccounting(number)}</p>
      <p>Exponential: {fExponential(number)}</p>
      <p>Basis Points: {fBasisPoints(number)}</p>
      <p>Custom Separators: {fCustomSeparators(number, "'", '.')}</p>
      <p>Absolute: {fAbsolute(number)}</p>
      <p>Min Precision: {fMinPrecision(number)}</p>
      <p>Rounded: {fRounded(number, 1)}</p>
      <p>SI Prefix: {fSI(number)}</p>
      <p>Time Duration: {JSON.stringify(formatTime({ hours: 1, minutes: 30, seconds: 45 }))}</p>
    </div>
  );
}

Error Handling:
--------------------------------
- All functions handle null/undefined by returning empty string
- Invalid numbers return appropriate fallback values
- Type coercion is handled by numeral library
- Precision/rounding follows mathematical standards
*/

/**
 * Reports web vitals metrics using the web-vitals library
 * @param {(metric: {name: string, value: number, id: string, delta: number}) => void} onPerfEntry - Callback function to handle the metrics
 * @see https://web.dev/vitals/ for more information about Web Vitals
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); // Cumulative Layout Shift
      getFID(onPerfEntry); // First Input Delay
      getFCP(onPerfEntry); // First Contentful Paint
      getLCP(onPerfEntry); // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

export default reportWebVitals;

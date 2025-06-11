// Full Match Percentage Overview Data
export const fullMatchPercentageData = {
  historical: {
    series: [
      {
        name: 'Match Percentage',
        data: [52.4, 32.1]
      }
    ],
    categories: ['Custodian', 'APX']
  },
  current: {
    series: [
      {
        name: 'Match Percentage',
        data: [58.6, 36.8]
      }
    ],
    categories: ['Custodian', 'APX']
  }
};

// Full Match Trend Data
export const fullMatchTrendData = {
  historical: {
    series: [
      {
        name: 'Full Match Percentage',
        data: [95, 92, 94, 93, 96, 95]
      },
      {
        name: 'Near Match Percentage',
        data: [85, 83, 86, 84, 87, 85]
      }
    ],
    categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  current: {
    series: [
      {
        name: 'Reconciliation Status',
        data: [95, 85, 65, 45, 0]
      }
    ],
    categories: ['Full Match', 'Tolerance', 'Near Match', 'Missing', 'Skipped']
  }
};

// Issues Summary Table Data
export const issuesSummaryData = {
  current: [
    {
      id: 1,
      issueType: 'Missing Data',
      count: 872
    },
    {
      id: 2,
      issueType: 'Tolerance Exceeded',
      count: 1132
    },
    {
      id: 3,
      issueType: 'Mismatches',
      count: 1077
    }
  ],
  historical: [
    {
      id: 1,
      issueType: 'Missing Data',
      count: 872
    },
    {
      id: 2,
      issueType: 'Tolerance Exceeded',
      count: 1132
    },
    {
      id: 3,
      issueType: 'Mismatches',
      count: 1077
    }
  ]
};

// Missing Summary Data
export const missingSummaryData = {
  historical: {
    axysOnly: 669,
    genevaOnly: 203
  },
  current: {
    axysOnly: 458,
    genevaOnly: 174
  }
};

// Analytics Summary Data
export const analyticsSummaryData = {
  historical: {
    fullMatch: {
      count: 15234,
      percentage: 52.4,
      axysPercentage: 52.4,
      genevaPercentage: 32.1
    },
    tolerance: {
      count: 1132,
      percentage: 3.9
    },
    nearMatch: {
      count: 1077,
      percentage: 3.7
    },
    missing: {
      count: 872,
      percentage: 3.0,
      axysCount: 669,
      genevaCount: 203
    },
    skipped: {
      count: 245,
      percentage: 0.8
    },
    total: 29087
  },
  current: {
    fullMatch: {
      count: 17562,
      percentage: 58.6,
      axysPercentage: 58.6,
      genevaPercentage: 36.8
    },
    tolerance: {
      count: 892,
      percentage: 3.0
    },
    nearMatch: {
      count: 945,
      percentage: 3.2
    },
    missing: {
      count: 632,
      percentage: 2.1,
      axysCount: 458,
      genevaCount: 174
    },
    skipped: {
      count: 198,
      percentage: 0.7
    },
    total: 29954
  }
};

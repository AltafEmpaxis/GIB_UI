import { Avatar, Badge, Box, Divider, Stack, Switch, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { fCurrency, fNumber, fSignedNumber } from 'utils/formatNumber';

// Helper functions for consistent cell rendering
const renderText = (value) => value || '-';
const renderNumber = (value) => (value ? fNumber(Number(value)) : '-');
const renderCurrency = (value) => (value ? fCurrency(Number(value)) : '-');
const renderSignedNumber = (value) => (value ? fSignedNumber(Number(value)) : '-');
const renderDate = (value) => (value ? dayjs(value).format('DD/MM/YYYY') : '-');
const renderDateTime = (value) => (value ? dayjs(value).format('DD/MM/YYYY HH:mm:ss') : '-');
const renderLongShort = (value) => (value === 'NaN' ? '-' : value || '-');

//==============================******||All Columns||******==============================

// /generated-reports(PAGE) TAB=--> FULL MATCH
// /api/NormaliseFile/GenerateReconTable/generate-recon?reconciliationType=FullMatch
export const FullMatchColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'portfolio',
        header: 'Portfolio',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativePortfolio',
        header: 'Alternative Portfolio',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'longOrShort',
        header: 'Long/Short',
        size: 250,
        Cell: ({ cell }) => renderLongShort(cell.getValue())
      },
      {
        accessorKey: 'alternativeLongOrShort',
        header: 'Alt Long/Short',
        size: 250,
        Cell: ({ cell }) => renderLongShort(cell.getValue())
      },
      {
        accessorKey: 'investment',
        header: 'Investment',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeInvestment',
        header: 'Alt Investment',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping1',
        header: 'Cash Mapping 1',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping2',
        header: 'Cash Mapping 2',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'lotDay',
        header: 'Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'alternativeLotDay',
        header: 'Alt Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'taxLotID',
        header: 'Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeTaxLotID',
        header: 'Alt Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'locationAccount',
        header: 'Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeLocationAccount',
        header: 'Alt Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'axysQuantity',
        header: 'Custodian Quantity',
        size: 250,
        Cell: ({ cell }) => renderNumber(cell.getValue())
      },
      {
        accessorKey: 'genevaQuantity',
        header: 'APX Quantity',
        size: 250,
        Cell: ({ cell }) => renderNumber(cell.getValue())
      },
      {
        accessorKey: 'differenceQuantity',
        header: 'Difference Quantity',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceLocal',
        header: 'Custodian Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceLocal',
        header: 'APX Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceLocal',
        header: 'Difference Market Price (Local)',
        size: 420,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceBook',
        header: 'Custodian Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceBook',
        header: 'APX Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceBook',
        header: 'Difference Market Price (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostLocal',
        header: 'Custodian Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostLocal',
        header: 'APX Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostLocal',
        header: 'Difference Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostBook',
        header: 'Custodian Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostBook',
        header: 'APX Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostBook',
        header: 'Difference Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueLocal',
        header: 'Custodian Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueLocal',
        header: 'APX Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueLocal',
        header: 'Difference Market Value (Local)',
        size: 400,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueBook',
        header: 'Custodian Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueBook',
        header: 'APX Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueBook',
        header: 'Difference Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysPriceGainOrLoss',
        header: 'Custodian Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'genevaPriceGainOrLoss',
        header: 'APX Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'differencePriceGainOrLoss',
        header: 'Difference Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      }
    ],
    []
  );

// /generated-reports(PAGE) TAB=--> TOLERANCE
// /api/NormaliseFile/GenerateReconTable/generate-recon?reconciliationType=Tolerance
export const ToleranceColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 305
      },
      {
        accessorKey: 'portfolio',
        header: 'Portfolio',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativePortfolio',
        header: 'Alternative Portfolio',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'longOrShort',
        header: 'Long/Short',
        size: 250,
        Cell: ({ cell }) => renderLongShort(cell.getValue())
      },
      {
        accessorKey: 'alternativeLongOrShort',
        header: 'Alt Long/Short',
        size: 250,
        Cell: ({ cell }) => renderLongShort(cell.getValue())
      },
      {
        accessorKey: 'investment',
        header: 'Investment',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeInvestment',
        header: 'Alt Investment',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping1',
        header: 'Cash Mapping 1',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping2',
        header: 'Cash Mapping 2',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'lotDay',
        header: 'Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'alternativeLotDay',
        header: 'Alt Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'taxLotID',
        header: 'Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeTaxLotID',
        header: 'Alt Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'locationAccount',
        header: 'Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeLocationAccount',
        header: 'Alt Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'axysQuantity',
        header: 'Custodian Quantity',
        size: 250
        // Cell: ({ cell }) => fNumber(cell.getValue() ?? 0)
      },
      {
        accessorKey: 'genevaQuantity',
        header: 'APX Quantity',
        size: 250
        // Cell: ({ cell }) => fNumber(cell.getValue() ?? 0)
      },
      {
        accessorKey: 'differenceQuantity',
        header: 'Difference Quantity',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceLocal',
        header: 'Custodian Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceLocal',
        header: 'APX Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceLocal',
        header: 'Difference Market Price (Local)',
        size: 420,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceBook',
        header: 'Custodian Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceBook',
        header: 'APX Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceBook',
        header: 'Difference Market Price (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostLocal',
        header: 'Custodian Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostLocal',
        header: 'APX Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostLocal',
        header: 'Difference Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostBook',
        header: 'Custodian Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostBook',
        header: 'APX Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostBook',
        header: 'Difference Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueLocal',
        header: 'Custodian Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueLocal',
        header: 'APX Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueLocal',
        header: 'Difference Market Value (Local)',
        size: 400,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueBook',
        header: 'Custodian Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueBook',
        header: 'APX Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueBook',
        header: 'Difference Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysPriceGainOrLoss',
        header: 'Custodian Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'genevaPriceGainOrLoss',
        header: 'APX Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'differencePriceGainOrLoss',
        header: 'Difference Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      }
    ],
    []
  );

// /generated-reports(PAGE) TAB=--> NEAR MATCH
// /api/NormaliseFile/GenerateReconTable/generate-recon?reconciliationType=NearMatch
export const NearMatchColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 305
      },
      {
        accessorKey: 'portfolio',
        header: 'Portfolio',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativePortfolio',
        header: 'Alternative Portfolio',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'longOrShort',
        header: 'Long/Short',
        size: 250,
        Cell: ({ cell }) => renderLongShort(cell.getValue())
      },
      {
        accessorKey: 'alternativeLongOrShort',
        header: 'Alt Long/Short',
        size: 250,
        Cell: ({ cell }) => renderLongShort(cell.getValue())
      },
      {
        accessorKey: 'investment',
        header: 'Investment',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeInvestment',
        header: 'Alt Investment',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping1',
        header: 'Cash Mapping 1',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping2',
        header: 'Cash Mapping 2',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'lotDay',
        header: 'Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'alternativeLotDay',
        header: 'Alt Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'taxLotID',
        header: 'Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeTaxLotID',
        header: 'Alt Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'locationAccount',
        header: 'Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeLocationAccount',
        header: 'Alt Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'axysQuantity',
        header: 'Custodian Quantity',
        size: 250,
        Cell: ({ cell }) => renderNumber(cell.getValue())
      },
      {
        accessorKey: 'genevaQuantity',
        header: 'APX Quantity',
        size: 250,
        Cell: ({ cell }) => renderNumber(cell.getValue())
      },
      {
        accessorKey: 'differenceQuantity',
        header: 'Difference Quantity',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceLocal',
        header: 'Custodian Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceLocal',
        header: 'APX Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceLocal',
        header: 'Difference Market Price (Local)',
        size: 420,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceBook',
        header: 'Custodian Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceBook',
        header: 'APX Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceBook',
        header: 'Difference Market Price (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostLocal',
        header: 'Custodian Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostLocal',
        header: 'APX Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostLocal',
        header: 'Difference Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostBook',
        header: 'Custodian Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostBook',
        header: 'APX Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostBook',
        header: 'Difference Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueLocal',
        header: 'Custodian Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueLocal',
        header: 'APX Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueLocal',
        header: 'Difference Market Value (Local)',
        size: 400,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueBook',
        header: 'Custodian Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueBook',
        header: 'APX Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueBook',
        header: 'Difference Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysPriceGainOrLoss',
        header: 'Custodian Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'genevaPriceGainOrLoss',
        header: 'APX Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'differencePriceGainOrLoss',
        header: 'Difference Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      }
    ],
    []
  );

// /generated-reports(PAGE) TAB=--> MISSING DATA --> Custodian Not In APX (AXYS TAX LOTS)
// /api/NormaliseFile/GenerateReconTable/generate-recon?reconciliationType=AxysNotInGeneva
export const AxysNotInGeneva = () =>
  useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 305
      },
      {
        accessorKey: 'portfolio',
        header: 'Portfolio',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativePortfolio',
        header: 'Alternative Portfolio',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'longOrShort',
        header: 'Long/Short',
        size: 250,
        Cell: ({ cell }) => renderLongShort(cell.getValue())
      },
      {
        accessorKey: 'alternativeLongOrShort',
        header: 'Alt Long/Short',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'investment',
        header: 'Investment',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeInvestment',
        header: 'Alt Investment',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping1',
        header: 'Cash Mapping 1',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping2',
        header: 'Cash Mapping 2',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'lotDay',
        header: 'Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'alternativeLotDay',
        header: 'Alt Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'taxLotID',
        header: 'Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeTaxLotID',
        header: 'Alt Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'locationAccount',
        header: 'Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeLocationAccount',
        header: 'Alt Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'axysQuantity',
        header: 'Custodian Quantity',
        size: 250
        // Cell: ({ cell }) => fNumber(cell.getValue() ?? 0)
      },
      {
        accessorKey: 'genevaQuantity',
        header: 'APX Quantity',
        size: 250
        // Cell: ({ cell }) => fNumber(cell.getValue() ?? 0)
      },
      {
        accessorKey: 'differenceQuantity',
        header: 'Difference Quantity',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceLocal',
        header: 'Custodian Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceLocal',
        header: 'APX Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceLocal',
        header: 'Difference Market Price (Local)',
        size: 420,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceBook',
        header: 'Custodian Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceBook',
        header: 'APX Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceBook',
        header: 'Difference Market Price (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostLocal',
        header: 'Custodian Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostLocal',
        header: 'APX Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostLocal',
        header: 'Difference Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostBook',
        header: 'Custodian Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostBook',
        header: 'APX Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostBook',
        header: 'Difference Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueLocal',
        header: 'Custodian Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueLocal',
        header: 'APX Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueLocal',
        header: 'Difference Market Value (Local)',
        size: 400,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueBook',
        header: 'Custodian Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueBook',
        header: 'APX Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueBook',
        header: 'Difference Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysPriceGainOrLoss',
        header: 'Custodian Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'genevaPriceGainOrLoss',
        header: 'APX Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'differencePriceGainOrLoss',
        header: 'Difference Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      }
    ],
    []
  );

// /generated-reports(PAGE) TAB=--> MISSING DATA --> APX Not In Custodian (GENEVA TAX LOTS)
// api/NormaliseFile/GenerateReconTable/generate-recon?reconciliationType=GenevaNotInAxys
export const GenevaNotInAxys = () =>
  useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 305
      },
      {
        accessorKey: 'portfolio',
        header: 'Portfolio',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativePortfolio',
        header: 'Alternative Portfolio',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'longOrShort',
        header: 'Long/Short',
        size: 250,
        Cell: ({ cell }) => renderLongShort(cell.getValue())
      },
      {
        accessorKey: 'alternativeLongOrShort',
        header: 'Alt Long/Short',
        size: 250,
        Cell: ({ cell }) => renderLongShort(cell.getValue())
      },
      {
        accessorKey: 'investment',
        header: 'Investment',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeInvestment',
        header: 'Alt Investment',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping1',
        header: 'Cash Mapping 1',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping2',
        header: 'Cash Mapping 2',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'lotDay',
        header: 'Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'alternativeLotDay',
        header: 'Alt Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'taxLotID',
        header: 'Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeTaxLotID',
        header: 'Alt Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'locationAccount',
        header: 'Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeLocationAccount',
        header: 'Alt Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'axysQuantity',
        header: 'Custodian Quantity',
        size: 250
        // Cell: ({ cell }) => fNumber(cell.getValue() ?? 0)
      },
      {
        accessorKey: 'genevaQuantity',
        header: 'APX Quantity',
        size: 250
        // Cell: ({ cell }) => fNumber(cell.getValue() ?? 0)
      },
      {
        accessorKey: 'differenceQuantity',
        header: 'Difference Quantity',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceLocal',
        header: 'Custodian Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceLocal',
        header: 'APX Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceLocal',
        header: 'Difference Market Price (Local)',
        size: 420,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceBook',
        header: 'Custodian Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceBook',
        header: 'APX Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceBook',
        header: 'Difference Market Price (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostLocal',
        header: 'Custodian Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostLocal',
        header: 'APX Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostLocal',
        header: 'Difference Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostBook',
        header: 'Custodian Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostBook',
        header: 'APX Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostBook',
        header: 'Difference Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueLocal',
        header: 'Custodian Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueLocal',
        header: 'APX Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueLocal',
        header: 'Difference Market Value (Local)',
        size: 400,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueBook',
        header: 'Custodian Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueBook',
        header: 'APX Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueBook',
        header: 'Difference Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysPriceGainOrLoss',
        header: 'Custodian Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'genevaPriceGainOrLoss',
        header: 'APX Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'differencePriceGainOrLoss',
        header: 'Difference Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      }
    ],
    []
  );

// /generated-reports(PAGE) TAB=--> SKIPPED DATA
// /api/NormaliseFile/GenerateReconTable/generate-recon?reconciliationType=Skipped
export const SkippedColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 305
      },
      {
        accessorKey: 'portfolio',
        header: 'Portfolio',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativePortfolio',
        header: 'Alternative Portfolio',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'longOrShort',
        header: 'Long/Short',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeLongOrShort',
        header: 'Alt Long/Short',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'investment',
        header: 'Investment',
        size: 250,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeInvestment',
        header: 'Alt Investment',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping1',
        header: 'Cash Mapping 1',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'cashMapping2',
        header: 'Cash Mapping 2',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'lotDay',
        header: 'Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'alternativeLotDay',
        header: 'Alt Lot Day',
        size: 370,
        Cell: ({ cell }) => renderDate(cell.getValue())
      },
      {
        accessorKey: 'taxLotID',
        header: 'Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeTaxLotID',
        header: 'Alt Tax Lot ID',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'locationAccount',
        header: 'Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'alternativeLocationAccount',
        header: 'Alt Location Account',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      },
      {
        accessorKey: 'axysQuantity',
        header: 'Custodian Quantity',
        size: 250,
        Cell: ({ cell }) => renderNumber(cell.getValue())
      },
      {
        accessorKey: 'genevaQuantity',
        header: 'APX Quantity',
        size: 250,
        Cell: ({ cell }) => renderNumber(cell.getValue())
      },
      {
        accessorKey: 'differenceQuantity',
        header: 'Difference Quantity',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceLocal',
        header: 'Custodian Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceLocal',
        header: 'APX Market Price (Local)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceLocal',
        header: 'Difference Market Price (Local)',
        size: 420,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketPriceBook',
        header: 'Custodian Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketPriceBook',
        header: 'APX Market Price (Book)',
        size: 350,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketPriceBook',
        header: 'Difference Market Price (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostLocal',
        header: 'Custodian Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostLocal',
        header: 'APX Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostLocal',
        header: 'Difference Cost (Local)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysCostBook',
        header: 'Custodian Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaCostBook',
        header: 'APX Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceCostBook',
        header: 'Difference Cost (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueLocal',
        header: 'Custodian Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueLocal',
        header: 'APX Market Value (Local)',
        size: 420,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueLocal',
        header: 'Difference Market Value (Local)',
        size: 400,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysMarketValueBook',
        header: 'Custodian Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'genevaMarketValueBook',
        header: 'APX Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'differenceMarketValueBook',
        header: 'Difference Market Value (Book)',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'axysPriceGainOrLoss',
        header: 'Custodian Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'genevaPriceGainOrLoss',
        header: 'APX Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'differencePriceGainOrLoss',
        header: 'Difference Price Gain/Loss',
        size: 370,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      }
    ],
    []
  );

// /view-data(PAGE) TAB=--> RAW DATA --> APX Tax Lots
// /api/NormaliseFile/GetRawGenevaData/raw-geneva-data
export const RawGenevaData = () =>
  useMemo(
    () => [
      {
        accessorKey: ':PeriodEndDate',
        header: 'Period End Date',
        Cell: ({ cell }) => renderDateTime(cell.getValue()),
        size: 290
      },
      {
        accessorKey: 'Portfolio NameSort',
        header: 'Portfolio',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 250
      },
      {
        accessorKey: 'FundLegalEntity Code',
        header: 'Fund Legal Entity',
        size: 305
      },
      {
        accessorKey: 'LocationAccount NameSort',
        header: 'Location Account',
        size: 305
      },
      {
        accessorKey: 'Strategy Code',
        header: 'Strategy',
        size: 305
      },
      {
        accessorKey: 'TaxLotId',
        header: 'Tax Lot ID',
        size: 305
      },
      {
        accessorKey: 'PortfolioEvent UserTranId1',
        header: 'Portfolio Event ID',
        size: 305
      },
      {
        accessorKey: 'Denomination Code',
        header: 'Currency',
        size: 305
      },
      {
        accessorKey: 'InvestmentType Code',
        header: 'Investment Type',
        size: 305
      },
      {
        accessorKey: 'Investment Code',
        header: 'Investment Code',
        size: 305
      },
      {
        accessorKey: 'Quantity Period End',
        header: 'Quantity',
        size: 305,
        Cell: ({ cell }) => renderNumber(cell.getValue())
      },
      {
        accessorKey: 'Cost Local Period End',
        header: 'Cost (Local)',
        size: 305,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'Cost Book Period End',
        header: 'Cost (Book)',
        size: 305,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'Market Value Local Period End',
        header: 'Market Value (Local)',
        size: 305,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'Market Value Book Period End',
        header: 'Market Value (Book)',
        size: 305,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'Market Price Local Period End',
        header: 'Market Price (Local)',
        size: 305,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'Market Price Book Period End',
        header: 'Market Price (Book)',
        size: 305,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'Accrued Interest Local Period End',
        header: 'Accrued Interest (Local)',
        size: 305,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'Accrued Interest Book Period End',
        header: 'Accrued Interest (Book)',
        size: 305,
        Cell: ({ cell }) => renderCurrency(cell.getValue())
      },
      {
        accessorKey: 'Unrealized Price Gain/Loss',
        header: 'Unrealized P&L',
        size: 305,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'Unrealized FX Gain/Loss',
        header: 'Unrealized FX P&L',
        size: 305,
        Cell: ({ cell }) => renderSignedNumber(cell.getValue())
      },
      {
        accessorKey: 'SubBusinessUnit Code',
        header: 'Sub Business Unit',
        size: 305
      },
      {
        accessorKey: 'BusinessUnit Code',
        header: 'Business Unit',
        size: 305
      },
      {
        accessorKey: 'Investment ClassName',
        header: 'Investment Class',
        size: 305
      },
      {
        accessorKey: 'ActualSettleDate',
        header: 'Settle Date',
        Cell: ({ cell }) => renderDate(cell.getValue()),
        size: 260
      },
      {
        accessorKey: 'TaxLotDate',
        header: 'Tax Lot Date',
        Cell: ({ cell }) => renderDate(cell.getValue()),
        size: 260
      },
      {
        accessorKey: 'Original Face Period End',
        header: 'Original Face',
        size: 305,
        Cell: ({ cell }) => renderNumber(cell.getValue())
      }
    ],
    []
  );

// /view-data(PAGE) TAB=--> RAW DATA --> Custodian Tax Lots
// /api/NormaliseFile/GetRawAxysData/raw-axys-data
export const RawAxysData = () =>
  useMemo(
    () => [
      // Security Information
      {
        accessorKey: 'Security',
        header: 'Security',
        size: 305
      },
      {
        accessorKey: 'Symbol',
        header: 'Symbol',
        size: 305
      },
      {
        accessorKey: 'Sec Type',
        header: 'Security Type',
        size: 305
      },
      {
        accessorKey: 'Sec Type Group',
        header: 'Security Type Group',
        size: 305
      },
      {
        accessorKey: 'Risk Country',
        header: 'Risk Country',
        size: 305
      },
      {
        accessorKey: 'Base Security',
        header: 'Base Security',
        size: 305
      },
      {
        accessorKey: 'Base Sec Tax Country',
        header: 'Base Security Tax Country',
        size: 305
      },
      {
        accessorKey: 'Side Pocket?',
        header: 'Side Pocket',
        size: 305
      },
      {
        accessorKey: 'Cash And Equivalents?',
        header: 'Cash And Equivalents',
        size: 305
      },
      {
        accessorKey: 'Orig Cost Date',
        header: 'Original Cost Date',
        Cell: ({ cell }) => renderDate(cell.getValue()),
        size: 305
      },

      // Portfolio Information
      {
        accessorKey: 'Portfolio',
        header: 'Portfolio',
        size: 305
      },
      {
        accessorKey: 'Fund',
        header: 'Fund',
        size: 305
      },
      {
        accessorKey: 'Custodian Code',
        header: 'Custodian Code',
        size: 305
      },
      {
        accessorKey: 'Counterparty',
        header: 'Counterparty',
        size: 305
      },
      {
        accessorKey: 'Custodian Type',
        header: 'Custodian Type',
        size: 305
      },

      // Position Details
      {
        accessorKey: 'Tax Lot',
        header: 'Tax Lot',
        size: 305,
        Cell: ({ cell }) => renderNumber(cell.getValue())
      },
      {
        accessorKey: 'Quantity',
        header: 'Quantity',
        Cell: ({ cell }) => renderNumber(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'Price',
        header: 'Price',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'Deal Type',
        header: 'Deal Type',
        size: 305
      },
      {
        accessorKey: 'SIP Code',
        header: 'SIP Code',
        size: 305
      },

      // Financial Data
      {
        accessorKey: 'Cost (U)',
        header: 'Cost (U)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'Unrealized Gain',
        header: 'Unrealized Gain',
        Cell: ({ cell }) => renderNumber(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'Market Value (W)',
        header: 'Market Value (W)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'Cost (X)',
        header: 'Cost (X)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'Unrealized Gain (Y)',
        header: 'Unrealized Gain (Y)',
        Cell: ({ cell }) => renderNumber(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'Market Value (Z)',
        header: 'Market Value (Z)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },

      // IDs
      {
        accessorKey: 'Custodian Transaction Id',
        header: 'Custodian Transaction ID',
        size: 305,
        Cell: ({ cell }) => renderNumber(cell.getValue())
      },
      {
        accessorKey: 'Transaction Unique Id',
        header: 'Transaction Unique ID',
        size: 305
      }
    ],
    []
  );

// /view-data(PAGE) TAB=--> NORMALISED DATA --> Normalised APX Data(NormalizedGenevaData.jsx)
// /api/NormaliseFile/GetNormalizedGenevaData/normalized-geneva-data
export const NormalizedGenevaDataColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'portfolio',
        header: 'Portfolio',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'locationAccount',
        header: 'Location Account',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'longOrShort',
        header: 'Long/Short',
        Cell: ({ cell }) => renderLongShort(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'investments',
        header: 'Investment',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'baseSecurity',
        header: 'Base Security',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'taxLotID',
        header: 'Tax Lot ID',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'lotDay',
        header: 'Lot Day',
        Cell: ({ cell }) => renderDate(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        Cell: ({ cell }) => renderNumber(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'marketPriceLocal',
        header: 'Market Price (Local)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'marketPriceBook',
        header: 'Market Price (Book)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'costLocal',
        header: 'Cost (Local)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'costBook',
        header: 'Cost (Book)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'marketValueLocal',
        header: 'Market Value (Local)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'marketValueBook',
        header: 'Market Value (Book)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'priceGainOrLoss',
        header: 'Price Gain/Loss',
        Cell: ({ cell }) => renderSignedNumber(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'concatenate',
        header: 'Concatenate',
        size: 370
      }
    ],
    []
  );

// /view-data(PAGE) TAB=--> NORMALISED DATA --> Normalised Custodian Data (NormalizedAxysData.jsx)
// /api/NormaliseFile/GetNormalizedAxysData/normalized-axys-data
export const NormalizedAxysDataColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'portfolio',
        header: 'Portfolio',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'locationAccount',
        header: 'Location Account',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'longOrShort',
        header: 'Long/Short',
        Cell: ({ cell }) => renderLongShort(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'investments',
        header: 'Investment',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'baseSecurity',
        header: 'Base Security',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'taxLotID',
        header: 'Tax Lot ID',
        Cell: ({ cell }) => renderText(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'lotDay',
        header: 'Lot Day',
        Cell: ({ cell }) => renderDate(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        Cell: ({ cell }) => renderNumber(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'marketPriceLocal',
        header: 'Market Price (Local)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'marketPriceBook',
        header: 'Market Price (Book)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'costLocal',
        header: 'Cost (Local)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'costBook',
        header: 'Cost (Book)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'marketValueLocal',
        header: 'Market Value (Local)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'marketValueBook',
        header: 'Market Value (Book)',
        Cell: ({ cell }) => renderCurrency(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'priceGainOrLoss',
        header: 'Price Gain/Loss',
        Cell: ({ cell }) => renderSignedNumber(cell.getValue()),
        size: 305
      },
      {
        accessorKey: 'concatenate',
        header: 'Concatenate',
        size: 370,
        Cell: ({ cell }) => renderText(cell.getValue())
      }
    ],
    []
  );

//mapping-data(PAGE) TAB=--> CASH MAPPING DATA =4tabs=(cash mapping1, cash mapping2, investment mapping, portfolio mapping)
export const ViewMappingColumns = () =>
  useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 230,
        enableEditing: false,
        enableColumnFilter: true, // This will hide the column filter in the table - true is default
        Edit: () => null // This will hide the field in create/edit forms
      },
      {
        accessorKey: 'original',
        header: 'Original',
        size: 300,
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          sx: {
            mt: 1
          }
        }
      },
      {
        accessorKey: 'alternative',
        header: 'Alternative',
        size: 370,
        muiEditTextFieldProps: {
          required: true,
          variant: 'outlined',
          sx: {
            my: 1
          }
        }
      }
    ],
    []
  );

// /user-management(PAGE)
// /api/User/getUser
export const UserManagementColumns = ({ handleStatusChange, updateStatusMutation }) =>
  useMemo(
    () => [
      {
        accessorFn: (row) => row.username,
        id: 'username',
        header: 'Username',
        size: 250,
        Cell: ({ cell, row }) => (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              color={row?.original?.entity_status === 1 ? 'success' : 'error'}
            >
              <Avatar src={row?.original?.image} alt={row?.original?.username} color="primary" type="filled">
                {row?.original?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </Badge>
            <span>{cell.getValue()}</span>
          </Stack>
        )
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 250
      },
      {
        accessorKey: 'isAdmin',
        header: 'Role',
        accessorFn: (row) => (row?.isAdmin === 1 ? 'Administrator' : 'User'),
        size: 220
      },
      {
        accessorKey: 'entity_status',
        header: 'Status',
        size: 240,
        Cell: ({ row }) => {
          const isActive = row?.original?.entity_status === 1;
          const isUpdating =
            updateStatusMutation.isLoading && updateStatusMutation.variables?.userId === row?.original?.user_id;

          return (
            <Box>
              <Tooltip
                title={
                  isUpdating
                    ? 'Updating...'
                    : `Change status to ${isActive ? 'Inactive' : 'Active'} for ${row?.original?.username}`
                }
                arrow
                placement="top"
              >
                <Stack direction="row" alignItems="center">
                  <Typography variant="subtitle2" color="error" sx={{ textTransform: 'uppercase' }}>
                    Inactive
                  </Typography>
                  <Switch
                    size="small"
                    checked={isActive}
                    onChange={(event) => handleStatusChange(row?.original?.user_id, event.target.checked ? 1 : 2)}
                    inputProps={{ 'aria-label': 'status switch' }}
                    disabled={isUpdating}
                  />
                  <Typography variant="subtitle2" color="success.main" sx={{ textTransform: 'uppercase' }}>
                    Active
                  </Typography>
                </Stack>
              </Tooltip>
            </Box>
          );
        }
      }
    ],
    [handleStatusChange, updateStatusMutation.isLoading, updateStatusMutation.variables]
  );

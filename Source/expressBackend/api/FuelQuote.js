// calculates and returns suggestedPricePerGallon and totalAmountDue

export default function calculateFuelQuote(
  location,
  gallonsRequested,
  hasHistory
) {
  const currentPricePerGallon = 1.5; // Constant price per gallon
  const locationFactor = location === "Texas" ? 0.02 : 0.04;
  const rateHistoryFactor = hasHistory ? 0.01 : 0;
  const gallonsRequestedFactor = gallonsRequested > 1000 ? 0.02 : 0.03;
  const companyProfitFactor = 0.1;

  // Calculate the margin
  const margin =
    (locationFactor -
      rateHistoryFactor +
      gallonsRequestedFactor +
      companyProfitFactor) *
    currentPricePerGallon;

  // Calculate the suggested price per gallon
  const suggestedPricePerGallon = currentPricePerGallon + margin;

  return {
    suggestedPricePerGallon: suggestedPricePerGallon.toFixed(2),
    totalAmountDue: (gallonsRequested * suggestedPricePerGallon).toFixed(2),
  };
}

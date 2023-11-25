const KEYS = {
  Indicators: "Indicators",
  IndicatorId: "IndicatorId",
};

export const getCalculationCollection = () => [
  { id: "1", title: "SUM" },
  { id: "2", title: "AVERAGE" },
  { id: "3", title: "MAX" },
];

export function insertIndicator(data, name) {
  console.log("Inserting indicator:", data);

  let Indicators = getAllIndicators(name);
  data["indicatorId"] = generateIndicatorId();
  data["calculationId"] =
    data.calculation !== undefined ? data.calculation : "";
  Indicators.push(data);
  localStorage.setItem(name, JSON.stringify(Indicators));
}

export function updateIndicator(data, name) {
  let Indicators = getAllIndicators(name);
  let recordIndex = Indicators.findIndex(
    (x) => x.indicatorId === data.indicatorId
  ); // Corrected property name
  Indicators[recordIndex] = { ...data };
  localStorage.setItem(name, JSON.stringify(Indicators));
}

export function deleteIndicator(indicatorId, name) {
  let Indicators = getAllIndicators(name);
  let updatedIndicators = Indicators.filter(
    (x) => x.indicatorId !== indicatorId
  );
  localStorage.setItem(name, JSON.stringify(updatedIndicators));
  console.log(updatedIndicators);
  return updatedIndicators;
}

export function generateIndicatorId() {
  if (localStorage.getItem(KEYS.IndicatorId) == null)
    localStorage.setItem(KEYS.IndicatorId, "0");
  var id = parseInt(localStorage.getItem(KEYS.IndicatorId));
  localStorage.setItem(KEYS.IndicatorId, (++id).toString());
  return id;
}

export function getAllIndicators(name) {
  if (localStorage.getItem(name) == null)
    localStorage.setItem(name, JSON.stringify([]));
  let Indicators = JSON.parse(localStorage.getItem(name));

  // Ensure that calculations array is defined
  let calculations = getCalculationCollection();

  return Indicators.map((x) => ({
    ...x,
    calculation:
      x.calculationId !== undefined
        ? calculations.find((c) => c.id === x.calculationId)?.title || ""
        : "",
  }));
}

export const generateNextIndicatorId = (outcomeId) => {
  // Retrieve existing indicators for the given outcomeId
  const existingIndicators = getAllIndicators("OutcomeIndicators").filter(
    (indicator) => indicator.outcomeId === outcomeId
  );

  // Calculate the next available indicatorId
  const nextIndicatorNumber = existingIndicators.length + 1;

  // Combine outcomeId and nextIndicatorNumber to form the new indicatorId
  const nextIndicatorId = `${outcomeId}.${nextIndicatorNumber}`;

  return nextIndicatorId;
};

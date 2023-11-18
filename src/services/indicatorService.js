const KEYS = {
  Indicators: "Indicators",
  IndicatorId: "IndicatorId",
};

export const getCalculationCollection = () => [
  { id: "1", title: "SUM" },
  { id: "2", title: "AVERAGE" },
  { id: "3", title: "MAX" },
];

export function insertIndicator(data) {
  let Indicators = getAllIndicators();
  data["indicatorId"] = generateIndicatorId();
  data["calculationId"] =
    data.calculation !== undefined ? data.calculation : "";
  Indicators.push(data);
  localStorage.setItem(KEYS.Indicators, JSON.stringify(Indicators));
  // console.log(Indicators);
}

export function updateIndicator(data) {
  let Indicators = getAllIndicators();
  let recordIndex = Indicators.findIndex(
    (x) => x.indicatorId === data.indicatorId
  ); // Corrected property name
  Indicators[recordIndex] = { ...data };
  localStorage.setItem(KEYS.Indicators, JSON.stringify(Indicators));
}

export function deleteIndicator(indicatorId) {
  let Indicators = getAllIndicators();
  let updatedIndicators = Indicators.filter(
    (x) => x.indicatorId !== indicatorId
  );
  localStorage.setItem(KEYS.Indicators, JSON.stringify(updatedIndicators));
  return updatedIndicators;
}

export function generateIndicatorId() {
  if (localStorage.getItem(KEYS.IndicatorId) == null)
    localStorage.setItem(KEYS.IndicatorId, "0");
  var id = parseInt(localStorage.getItem(KEYS.IndicatorId));
  localStorage.setItem(KEYS.IndicatorId, (++id).toString());
  return id;
}

export function getAllIndicators() {
  if (localStorage.getItem(KEYS.Indicators) == null)
    localStorage.setItem(KEYS.Indicators, JSON.stringify([]));
  let Indicators = JSON.parse(localStorage.getItem(KEYS.Indicators));

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

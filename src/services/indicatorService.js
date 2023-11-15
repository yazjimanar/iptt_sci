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
  data["id"] = generateIndicatorId();
  Indicators.push(data);
  localStorage.setItem(KEYS.Indicators, JSON.stringify(Indicators));
}

export function updateIndicator(data) {
  let Indicators = getAllIndicators();
  let recordIndex = Indicators.findIndex((x) => x.id === data.id);
  Indicators[recordIndex] = { ...data };
  localStorage.setItem(KEYS.Indicators, JSON.stringify(Indicators));
}
export function deleteIndicator(indicatorId) {
  let Indicators = getAllIndicators();
  let updatedIndicators = Indicators.filter((x) => x.id !== indicatorId);
  localStorage.setItem(KEYS.Indicators, JSON.stringify(updatedIndicators));
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
  //map departmentID to department title
  let calculations = getCalculationCollection();
  return Indicators.map((x) => ({
    ...x,
    calculation: calculations[x.calculationId - 1].title,
  }));
}

interface FrontTotals {
  frente: string;
  totals: { producao: number; parada: number };
}

export function shouldSplitStopLines(
  base: 'auto' | 'colhedora' | 'trator',
  hasHarvesters: boolean,
  hasTractors: boolean,
) {
  return base === 'auto' && hasHarvesters && hasTractors;
}

/** Recebe os resumos oficiais já recortados; apenas une as séries pela frente. */
export function buildFrontComparison(
  totals: FrontTotals[],
  harvesters: FrontTotals[] = [],
  tractors: FrontTotals[] = [],
) {
  const harvesterStops = new Map(harvesters.map(s => [s.frente, s.totals.parada]));
  const tractorStops = new Map(tractors.map(s => [s.frente, s.totals.parada]));
  return totals.map(s => ({
    frente: `F${s.frente}`,
    producao: s.totals.producao / 60,
    parada: s.totals.parada / 60,
    paradaColhedoras: (harvesterStops.get(s.frente) ?? 0) / 60,
    paradaTratores: (tractorStops.get(s.frente) ?? 0) / 60,
  }));
}
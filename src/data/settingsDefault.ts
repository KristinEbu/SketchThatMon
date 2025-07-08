import { FILTERS } from "./filterOptions";

export const DEFAULT_SETTINGS = {
  isCanvasOn: false,
  isRoundsOn: true,
  numRounds: 10,
  isSkipsOn: true,
  numSkips: 5,
  isTimerOn: true,
  timerDuration: 1,
  regionValue: FILTERS.region.options,
  typeValue: FILTERS.type.options,
  legendaryValue: FILTERS.legendary.options,
  stageValue: FILTERS.stage.options,
  evolveValue: FILTERS.evolve.options,
  formValue: FILTERS.form.options,
};

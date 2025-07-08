import { useState } from "react";
import { DEFAULT_SETTINGS } from "@/data/settingsDefault";

export function useGameSettings() {
  const [isCanvasOn, setIsCanvasOn] = useState(DEFAULT_SETTINGS.isCanvasOn);
  const [isRoundsOn, setIsRoundsOn] = useState(DEFAULT_SETTINGS.isRoundsOn);
  const [numRounds, setNumRounds] = useState(DEFAULT_SETTINGS.numRounds);
  const [isSkipsOn, setIsSkipsOn] = useState(DEFAULT_SETTINGS.isSkipsOn);
  const [numSkips, setNumSkips] = useState(DEFAULT_SETTINGS.numSkips);
  const [isTimerOn, setIsTimerOn] = useState(DEFAULT_SETTINGS.isTimerOn);
  const [timerDuration, setTimerDuration] = useState(
    DEFAULT_SETTINGS.timerDuration,
  );

  const [regionValue, setRegionValue] = useState(DEFAULT_SETTINGS.regionValue);
  const [typeValue, setTypevalue] = useState(DEFAULT_SETTINGS.typeValue);
  const [legendaryValue, setLegendaryValue] = useState(
    DEFAULT_SETTINGS.legendaryValue,
  );
  const [stageValue, setStageValue] = useState(DEFAULT_SETTINGS.stageValue);
  const [evolveValue, setEvolveValue] = useState(DEFAULT_SETTINGS.evolveValue);
  const [formValue, setFormValue] = useState(DEFAULT_SETTINGS.formValue);

  const reset = () => {
    setIsCanvasOn(DEFAULT_SETTINGS.isCanvasOn);
    setIsRoundsOn(DEFAULT_SETTINGS.isRoundsOn);
    setNumRounds(DEFAULT_SETTINGS.numRounds);
    setIsSkipsOn(DEFAULT_SETTINGS.isSkipsOn);
    setNumSkips(DEFAULT_SETTINGS.numSkips);
    setIsTimerOn(DEFAULT_SETTINGS.isTimerOn);
    setTimerDuration(DEFAULT_SETTINGS.timerDuration);
    setRegionValue(DEFAULT_SETTINGS.regionValue);
    setTypevalue(DEFAULT_SETTINGS.typeValue);
    setLegendaryValue(DEFAULT_SETTINGS.legendaryValue);
    setStageValue(DEFAULT_SETTINGS.stageValue);
    setEvolveValue(DEFAULT_SETTINGS.evolveValue);
    setFormValue(DEFAULT_SETTINGS.formValue);
  };

  return {
    isCanvasOn,
    setIsCanvasOn,
    isRoundsOn,
    setIsRoundsOn,
    numRounds,
    setNumRounds,
    isSkipsOn,
    setIsSkipsOn,
    numSkips,
    setNumSkips,
    isTimerOn,
    setIsTimerOn,
    timerDuration,
    setTimerDuration,
    regionValue,
    setRegionValue,
    typeValue,
    setTypevalue,
    legendaryValue,
    setLegendaryValue,
    stageValue,
    setStageValue,
    evolveValue,
    setEvolveValue,
    formValue,
    setFormValue,
    reset,
  };
}

"use client";
import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import GameOption from "@/components/game/gameOption";
import Popup from "@/components/ui/popup";
import { FILTERS } from "@/data/filterOptions";
import { HOW_TO_PLAY } from "@/data/instructions";
import { useGameContext } from "@/context/gameContext";
import { usePokemonContext } from "@/context/pokemonContext";

export default function VersusSettings() {
  const router = useRouter();
  const [isResetPopupOpen, setIsResetPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const {
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
    setSkipsLeft,
  } = useGameContext();

  const { fetchNewPokemon } = usePokemonContext();

  const dropdownValues = [
    regionValue,
    typeValue,
    legendaryValue,
    stageValue,
    evolveValue,
    formValue,
  ];

  useEffect(() => {
    setSkipsLeft(numSkips);
  }, [numSkips, setSkipsLeft]);

  const isEmpty = (dropdownValues: string[][]) => {
    for (let i = 0; i < dropdownValues.length; i++) {
      if (dropdownValues[i].length == 0) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="flex flex-col p-3 px-10 gap-4">
      <Popup
        open={isResetPopupOpen}
        onClose={() => setIsResetPopupOpen(false)}
        label="Are you sure you want to reset to default settings?"
        buttonLabelLeft="Cancel"
        onClickLeft={() => setIsResetPopupOpen(false)}
        buttonLabelRight="OK"
        onClickRight={() => (reset(), setIsResetPopupOpen(false))}
      />
      <Popup
        open={isErrorPopupOpen}
        onClose={() => setIsErrorPopupOpen(false)}
        label="Game Settings Error"
        description="Unable to start the game due to unselected Pokemon Filter"
        buttonLabelRight="OK"
        onClickRight={() => setIsErrorPopupOpen(false)}
      />
      <h1 className="font-title text-4xl">How To Play</h1>
      <p className="text-xl">{HOW_TO_PLAY}</p>
      <div className="flex pt-4 gap-25 justify-center">
        <div className="flex flex-col gap-4">
          <GameOption
            label="In Game Canvas"
            description="Turn on to draw here — or off to draw elsewhere."
            switchValue={isCanvasOn}
            onToggle={setIsCanvasOn}
            disabled
          />
          <GameOption
            label="Number of Rounds"
            description="Set a number of rounds — or play endlessly."
            switchValue={isRoundsOn}
            onToggle={setIsRoundsOn}
            inputValue={numRounds}
            onInputChange={setNumRounds}
            sliderValue={numRounds}
            onSliderChange={setNumRounds}
          />
          <GameOption
            label="Number of Skips"
            description="Limit the number of skips — or skip freely."
            switchValue={isSkipsOn}
            onToggle={setIsSkipsOn}
            inputValue={numSkips}
            onInputChange={setNumSkips}
            sliderValue={numSkips}
            onSliderChange={setNumSkips}
            min={0}
            max={50}
          />
        </div>
        <div className="flex flex-col max-w-120 gap-4">
          <GameOption
            label="Pokemon Filter"
            description="Filter Pokemon by region, type, legendary status, evolution stage, and more."
            dropdownLabels={[
              FILTERS.region.label,
              FILTERS.type.label,
              FILTERS.legendary.label,
              FILTERS.stage.label,
              FILTERS.evolve.label,
              FILTERS.form.label,
            ]}
            dropdownOptionsList={[
              FILTERS.region.options,
              FILTERS.type.options,
              FILTERS.legendary.options,
              FILTERS.stage.options,
              FILTERS.evolve.options,
              FILTERS.form.options,
            ]}
            dropdownValues={dropdownValues}
            dropdownOnChanges={[
              setRegionValue,
              setTypevalue,
              setLegendaryValue,
              setStageValue,
              setEvolveValue,
              setFormValue,
            ]}
            disabled={true}
          />
          <GameOption
            label="Round Duration (minutes)"
            description="Choose a time limit — or draw freely until your reveal."
            switchValue={isTimerOn}
            onToggle={setIsTimerOn}
            inputValue={timerDuration}
            onInputChange={setTimerDuration}
            sliderValue={timerDuration}
            onSliderChange={setTimerDuration}
            className="max-w-112"
            max={10}
          />
        </div>
      </div>
      <footer className="flex justify-between">
        <Button color="secondary" onClick={() => setIsResetPopupOpen(true)}>
          Reset to Default
        </Button>
        <Button
          color="primary"
          onClick={() => {
            if (isEmpty(dropdownValues)) {
              setIsErrorPopupOpen(true);
            } else {
              fetchNewPokemon();
              router.push("/solo/game/1/");
            }
          }}
        >
          Start Game
        </Button>
      </footer>
    </div>
  );
}

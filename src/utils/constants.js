export const letterColumns = [
  {
    name: "A",
    position: 0,
    prevValue: null,
    nextValue: "B",
  },
  {
    name: "B",
    position: 1,
    prevValue: "A",
    nextValue: "C",
  },
  {
    name: "C",
    position: 2,
    prevValue: "B",
    nextValue: "D",
  },
  {
    name: "D",
    position: 3,
    prevValue: "C",
    nextValue: "E",
  },
  {
    name: "E",
    position: 4,
    prevValue: "D",
    nextValue: "F",
  },
  {
    name: "F",
    position: 5,
    prevValue: "E",
    nextValue: "G",
  },
  {
    name: "G",
    position: 6,
    prevValue: "F",
    nextValue: "H",
  },
  {
    name: "H",
    position: 7,
    prevValue: "G",
    nextValue: "I",
  },
  {
    name: "I",
    position: 8,
    prevValue: "H",
    nextValue: "J",
  },
  {
    name: "J",
    position: 9,
    prevValue: "I",
    nextValue: null,
  },
];
export const numberRows = [
  {
    name: 1,
    position: 0,
    prevValue: null,
    nextValue: 2,
  },
  {
    name: 2,
    position: 1,
    prevValue: 1,
    nextValue: 3,
  },
  {
    name: 3,
    position: 2,
    prevValue: 2,
    nextValue: 4,
  },
  {
    name: 4,
    position: 3,
    prevValue: 3,
    nextValue: 5,
  },
  {
    name: 5,
    position: 4,
    prevValue: 4,
    nextValue: 6,
  },
  {
    name: 6,
    position: 5,
    prevValue: 5,
    nextValue: 7,
  },
  {
    name: 7,
    position: 6,
    prevValue: 6,
    nextValue: 8,
  },

  {
    name: 8,
    position: 7,
    prevValue: 7,
    nextValue: 9,
  },
  {
    name: 9,
    position: 8,
    prevValue: 8,
    nextValue: 10,
  },
  {
    name: 10,
    position: 9,
    prevValue: 9,
    nextValue: null,
  },
];

export const shipOptions = [
  { key: 1, text: "Carrier", value: { name: "Carrier", length: 4 } },
  { key: 2, text: "Cruisers-1", value: { name: "Cruisers-1", length: 3 } },
  { key: 3, text: "Cruisers-2", value: { name: "Cruisers-2", length: 3 } },
  { key: 4, text: "Cruisers-3", value: { name: "Cruisers-3", length: 3 } },
  { key: 5, text: "Submarine", value: { name: "Submarine", length: 2 } },
];

export const colors = {
  grey: "grey",
  green: "green",
  yellow: "yellow",
  blue: "blue",
};

export const messages = {
  userWin: "Felicitaciones, Ganaste!",
  cpuWin: "Has perdido!"
}

export const labels = {
  buttonStart: "Start Game",
  input: "Player Name",
  buttonPlayAgain: "Volver a jugar",
  modalTitle: "Juego Terminado!",
  mainTitle: "Battleship game"
}

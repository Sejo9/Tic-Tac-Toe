import {checkCPUPlay} from "./gameboard.js";

let isCPUActive = false;
let playerDetails;

const startCPU = (players) => {
    isCPUActive = true;
    playerDetails = players;
    checkCPUPlay();
}

const cpuPlay = () => {
    let index = Math.floor(Math.random() * 9);

    return index;
}

export {
    startCPU,
    cpuPlay
}
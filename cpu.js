import {checkCPUPlay} from "./gameboard.js";

const cpuState = {
    isCPUActive: false
}
let playerDetails;

const startCPU = (players) => {
    cpuState.isCPUActive = true;
    playerDetails = players;
    checkCPUPlay();
}

const cpuPlay = () => {
    let index = Math.floor(Math.random() * 9);

    return index;
}

const stopCPU = () => {
    cpuState.isCPUActive = false;
}

export {
    cpuState,
    startCPU,
    cpuPlay,
    stopCPU
}
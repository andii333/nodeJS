// - Generate array of length 1E+6 containing corresponding range of numbers starting from the 1.
import { monitorMemory } from "./implementMemoryMeasurement.mjs";
export const array = Array.from({ length: 1e6 }, (_, i) => i + 1);
function showArray() {
    console.log(array);
}
monitorMemory();
showArray();
import "regenerator-runtime/runtime.js";
import fetch from "node-fetch";

global.globalThis.fetch = fetch // Assign 'node-fetch' implementation to global scope for use

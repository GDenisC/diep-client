import sendRequest from "./request"

// slow, tip: ignore this
export default async function loadMods() {
    let list = await sendRequest("./mods/list.txt"),
        mods = [];

    for (let mod of list.split("\n")) {
        if (mod.length > 0) {
            mods.push(eval(await sendRequest("./mods/" + mod + '.js')));
        }
    }

    return mods;
}
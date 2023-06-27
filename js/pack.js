import { setItem, getItem } from "localforage";
import { loadAsync } from "jszip";

export async function getPacks() {
  return (await getItem("packs")) || [];
}

async function setPacks(packs) {
  return await setItem("packs", packs);
}

export async function getSelectedPack() {
  return await getItem("selectedPack");
}

export async function setSelectedPack(packID) {
  return await setItem("selectedPack", packID);
}

export async function getStickers(packID) {
  return await getItem("s/" + packID);
}

export async function importPack(file) {
  if (file.name.endsWith(".zip")) {
    const zip = await loadAsync(file);
    let packName;
    for (let [filename, entry] of Object.entries(zip.files)) {
      if (entry.dir) {
        continue;
      }
      const zipObj = zip.file(filename);
      const blob = await zipObj.async("blob");
      packName = packName || zipObj.name.split("/")[0] || file.name;
      await importSticker(
        packName,
        new File([blob], zipObj.name.split("/").pop())
      );
    }
  } else {
    await importSticker("./Saved", file);
  }
}

function importSticker(packID, file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const sticker = { name: file.name, url: reader.result };
      const packs = await getPacks();
      let pack;
      for (const p of packs) {
        if (p.id == packID) {
          pack = p;
          break;
        }
      }
      if (!pack) {
        packs.push({ id: packID, preview: sticker });
        await setPacks(packs);
        await setSelectedPack(packID);
      }
      const stickers = (await getStickers(packID)) || [];
      stickers.push(sticker);
      resolve(await setItem("s/" + packID, stickers));
    };
    reader.onerror = () => reject(reader.error);
  });
}

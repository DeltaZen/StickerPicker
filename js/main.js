import "@lottiefiles/lottie-player/dist/tgs-player.js";
import {
  getSelectedPack,
  setSelectedPack,
  importPack,
  getPacks,
  getStickers,
} from "./pack.js";

const tabs = document.getElementById("tabs");
const picker = document.getElementById("picker");

function h(tag, attributes, ...children) {
  const element = document.createElement(tag);
  if (attributes) {
    Object.entries(attributes).forEach((entry) => {
      element.setAttribute(entry[0], entry[1]);
    });
  }
  element.append(...children);
  return element;
}

function shareSticker(sticker) {
  const data_start = ";base64,";
  const data = sticker.url.slice(
    sticker.url.indexOf(data_start) + data_start.length,
  );
  webxdc.sendToChat({
    file: { type: "sticker", base64: data, name: sticker.name },
  });
}

function newSticker(name, src, onclick) {
  let sticker;
  if (name.endsWith(".tgs")) {
    sticker = h("tgs-player", {
      class: "sticker",
      hover: "",
      loop: "",
      count: 1,
      mode: "normal",
      src: src,
    });
    sticker.ontouchstart = () => {
      sticker.play();
    };
  } else {
    sticker = h("img", { class: "sticker", src: src });
  }
  if (onclick) {
    sticker.onclick = onclick;
  }
  return sticker;
}

async function reloadTabs() {
  picker.innerHTML = "";
  tabs.innerHTML = "";
  const packs = await getPacks();
  const selectedPack = (await getSelectedPack()) || (packs[0] && packs[0].id);
  for (const pack of packs) {
    const thumbnail = newSticker(pack.preview.name, pack.preview.url);
    if (pack.id == selectedPack) {
      thumbnail.classList.add("selected");
      const stickers = await getStickers(pack.id);
      for (const sticker of stickers) {
        picker.append(
          newSticker(sticker.name, sticker.url, () => {
            shareSticker(sticker);
          }),
        );
      }
    } else {
      thumbnail.onclick = async () => {
        await setSelectedPack(pack.id);
        await reloadTabs();
      };
    }
    tabs.append(thumbnail);
  }
  const addBtn = newSticker("add.svg", "./add.svg", onAddClicked);
  addBtn.classList.add("btn");
  tabs.append(addBtn);
}

async function onAddClicked() {
  const files = await webxdc.importFiles({ multiple: true });
  for (const file of files) {
    await importPack(file);
  }
  reloadTabs();
}

window.onload = async () => {
  await reloadTabs();
};

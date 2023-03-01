import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
const galleryItemTemplate = document
  .querySelector("#gallery-item-template")
  .innerHTML.trim();

const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

gallery.insertAdjacentHTML("beforeend", galleryItemsMarkup);

function createGalleryItemsMarkup(items) {
  return items
    .map((item) =>
      galleryItemTemplate.replace(/{{\s*(\w+)\s*}}/g, (match, p1) => item[p1])
    )
    .join("");
}

gallery.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(evt) {
  evt.preventDefault();

  const isGalleryImage = evt.target.classList.contains("gallery__image");

  if (!isGalleryImage) {
    return;
  }

  const largeImageURL = evt.target.dataset.source;
  openModalWindow(largeImageURL);
}

function openModalWindow(url) {
  const instance = basicLightbox.create(`
    <img src="${url}" width="800" height="600">
`);

  instance.show(
    () => {
      document.body.classList.add("modal-open");
    },
    () => {
      document.body.classList.remove("modal-open");
    }
  );

  const closeModal = () => {
    instance.close();
    document.body.classList.remove("modal-open");
  };

  document.addEventListener("keydown", (evt) => {
    if (evt.code === "Escape") {
      closeModal();
    }
  });

  modal.show(() => {
    document.body.classList.add("modal-open");
  }, closeModal);
}

export interface Photo {
  /** File under public/photos/ — e.g. "photo-01.jpg". Falsy → placeholder tile. */
  src?: string;
  title: string;
  /** Short caption shown on hover + in the lightbox. */
  caption?: string;
}

/*
 * Drop images into public/photos/ and add an entry here. See
 * public/photos/README.md. The gallery lays them out as a natural-aspect
 * masonry, so portraits and landscapes mix freely.
 */
export const photos: Photo[] = [
  { src: "photo-16.jpg", title: "Cotton-Candy Sky", caption: "Pink hour over the ridgeline." },
  { src: "photo-01.jpg", title: "Into the Mist", caption: "Fog drifting through a deodar forest." },
  { src: "photo-11.jpg", title: "God Rays", caption: "Light breaking over layered peaks." },
  { src: "photo-03.jpg", title: "Meadow Bloom", caption: "Wildflowers catching the last golden light." },
  { src: "photo-13.jpg", title: "Temple by the Hills", caption: "Still water at a hillside temple." },
  { src: "photo-09.jpg", title: "The Lone Sentinel", caption: "One tree, holding the ridge." },
  { src: "photo-06.jpg", title: "Tea Country", caption: "A lone tree over endless tea rows." },
  { src: "photo-12.jpg", title: "Valley Light", caption: "Sunbeams pouring onto the town below." },
  { src: "photo-04.jpg", title: "Dusk Silhouette", caption: "A lone branch framing the evening sky." },
  { src: "photo-08.jpg", title: "Street Softy", caption: "Soft-serve on a busy hill-station lane." },
  { src: "photo-07.jpg", title: "Cairns & Valley", caption: "Stone stacks watching over the valley." },
  { src: "photo-10.jpg", title: "Summit Ridge", caption: "Made it to the top." },
  { src: "photo-05.jpg", title: "Hills & Brews", caption: "Cold ones with a tea-garden view." },
  { src: "photo-15.jpg", title: "Tea Garden Skies", caption: "Storm light over the plantations." },
  { src: "photo-14.jpg", title: "Maggi at Altitude", caption: "The mountains' official meal." },
  { src: "photo-02.jpg", title: "Bare Canopy", caption: "Winter branches against a cold blue sky." },
];

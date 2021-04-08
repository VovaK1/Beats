let myMap;

const init = () => {
myMap = new ymaps.Map("map", {
  center: [50.427183, 30.678563],
  zoom: 11,
  controls: []
});

const coords = [
  [50.46000, 30.634114],
  [50.487776, 30.494020],
  [50.427183, 30.678563]
];
const myCollection = new ymaps.GeoObjectCollection({}, {
  draggable: false, 
  iconLayout: 'default#image',
  iconImageHref: './images/contacts/marker.svg',
  iconImageSize: [58, 73],
  iconImageOffset: [-35, -52]
});

coords.forEach(coord => {
  myCollection.add(new ymaps.Placemark(coord));
})

myMap.geoObjects.add(myCollection);

myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);
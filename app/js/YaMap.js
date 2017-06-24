ymaps.ready(init);
var myMap;

function init() {
    myMap = new ymaps.Map("contain__map", {
        center: [55.76, 37.64],
        zoom: 12,
        controls: ['zoomControl']
    });

    myPlacemark = new ymaps.Placemark([55.76, 37.64], {
        hintContent: 'Москва!',
        balloonContent: 'Столица России'
    });

    myMap.geoObjects.add(myPlacemark);
}
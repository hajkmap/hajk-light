async function Hajk(settings) {
  // Define some global config objects
  let c = {},
    layersConfig,
    mapConfig;

  /**
   * Parses config given at init. Takes care of decoding query params
   * as well. Places it all to the global 'c' object.
   */

  function parseConfig(settings) {
    const { urlToMapservice, injectToDOMelementWithId } = settings;
    const searchParams = new URLSearchParams(settings.queryParams);
    const m = searchParams.get("m");
    const x = searchParams.get("x");
    const y = searchParams.get("y");
    const z = searchParams.get("z");
    const l = searchParams.get("l");

    c = {
      injectToDOMelementWithId,
      urlToMapservice,
      m,
      x,
      y,
      z,
      l
    };
  }

  /**
   * Fetches both map config and layers config.
   * Places them in two global config files.
   */

  async function fetchAll() {
    let urls = [
      `${c.urlToMapservice}config/layers`,
      `${c.urlToMapservice}config/${c.m}`
    ];

    await Promise.all(
      urls.map(url => fetch(url).then(resp => resp.json()))
    ).then(data => {
      layersConfig = data[0];
      mapConfig = data[1];
    });
  }

  function injectMap() {
    let mapEl = c.injectToDOMelementWithId || "map";

    var map = new ol.Map({
      target: mapEl,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    });
  }

  /**
   * Main thread starts here.
   */

  parseConfig(settings);
  await fetchAll();
  // console.log(layersConfig, mapConfig);
  injectMap();
}

document.Hajk = Hajk;

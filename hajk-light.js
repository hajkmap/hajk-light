async function Hajk(settings) {
  // Define some global config objects
  let config = {},
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

    config = {
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
      `${config.urlToMapservice}config/layers`,
      `${config.urlToMapservice}config/${config.m}`
    ];

    await Promise.all(
      urls.map(url => fetch(url).then(resp => resp.json()))
    ).then(data => {
      layersConfig = data[0];
      mapConfig = data[1];
    });
  }

  /**
   * Loops through layer IDs specified in the "l" parameter. Creates a
   * valid OL Layer object for each layer. Returns an array, ready to be
   * supplied to ol.Map() later on.
   */

  function getLayers() {
    let allLayers = [];
    config.l.split(",").forEach(id => {
      // TODO: Similar for all other layer types
      let layer = layersConfig.wmslayers.find(match => match.id === id);
      console.log(layer);

      allLayers.push(
        new ol.layer.Tile({
          extent: mapConfig.map.extent,
          source: new ol.source.TileWMS({
            url: layer.url,
            params: { LAYERS: layer.layers.join(), TILED: layer.tiled },
            serverType: "geoserver",
            transition: 0
          })
        })
      );
    });
    return allLayers;
  }

  function injectMap() {
    let mapEl = config.injectToDOMelementWithId || "map";
    const mapProjection = mapConfig.projections.find(
      p => p.code === mapConfig.map.projection
    );
    proj4.defs(mapProjection.code, mapProjection.definition);
    ol.proj.proj4.register(proj4);

    var map = new ol.Map({
      target: mapEl,
      layers: getLayers(),
      view: new ol.View({
        center: ol.proj.fromLonLat([config.x / 10000, config.y / 100000]),
        zoom: config.z,
        projection: ol.proj.get(mapProjection.code)
      })
    });
  }

  /**
   * Main thread starts here.
   */

  parseConfig(settings);
  await fetchAll();

  console.log("config: ", config);
  console.log("mapConfig: ", mapConfig);
  console.log("layersConfig: ", layersConfig);
  console.log("ol: ", ol);

  injectMap();
}

document.Hajk = Hajk;

# hajk-light

Light version of Hajk, suitable for embedding.

# Quick start

_Note that you need a running Hajk (at least the mapservice component, but a working client and admin are recommended to make setup as easy as possible). Please refer to [this repo](https://github.com/hajkmap/Hajk) for Hajk installation details._

In `<head>`:

```HTML
<script src="hajk-light.js"></script>
```

In `<body>`:

```HTML
<div id="map"></div>
<script>
  document.Hajk({
    injectToDOMelementWithId: "map",
    urlToMapservice: "https://myhajkserver.domain.org/mapservice/",
    queryParams: "m=bl&x=109540.43517945363&y=6284671.775522817&z=5&l=58"
  });
</script>
```

# Required parameters

When initating the Hajk object you must supply the following parameters:

- `injectToDOMelementWithId`: ID of the element that we will inject our map to. It must in DOM when script loads.
- `urlToMapservice`: URL to running mapservice (see regular Hajk for more info). Can be with our without proxy.
- `queryParams`: Query params from the Anchor plugin in regular Hajk edition

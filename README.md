# hajk-light

Light version of Hajk, suitable for embedding.

# Quick start

In `<head>`:

```
<script src="hajk-light.js"></script>
```

In `<body>`:

```
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

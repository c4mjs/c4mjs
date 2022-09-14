# Viewing

You need to serve the `workspace.json` file, so that it can be read by the app.

The App will call out to the configured address to fetch the workspace file.

For local development we use `http-server` which can serve up the `workspace.json` from the local file system, serve it by
running

```shell
npx http-server -p 9876 --cors -c-1
```

or from a templated project run the following

```shell
npm run serve
```

And visiting http://localhost:9876/workspace.json to confirm its loading correctly.

If all is setup go ahead and render it by visiting the app.

https://c4model.app/#/?url=http%253A%252F%252Flocalhost%253A9876%252Fworkspace.json

> NOTE: Here we have pre-loaded the url to point to `http://localhost:9876/workspace.json`

## Serving for Sharing

Once local development is complete the workspace.json will need to be placed somewhere it can be accessed by others.

Github is particularly good as you can use the raw content address https://raw.githubusercontent.com/

Alternatively host it on a pages site of choice that intended consumers would have access to.

> TIP: watch out for CORS issues

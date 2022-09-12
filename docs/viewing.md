# Viewing

With the `workspace.json` workspace bundled, you need to expose it so it can be read by the app.

The App will call out to the address provided to fetch the workspace file.

> TIP: watch out for CORS issues

Useful deployments are places like Github where the raw content url can be used, or anywhere it can be served from.

For local development we use `http-server` which can serve up the `workspace.json` from the local file system, serve it by
running

```shell
npx http-server -p 9876 --cors -c-1
```

And visiting http://localhost:9876/workspace.json

## Rendering

With the `workspace.json` accessible load up https://c4model.app and paste the workspace file into the URL bar and hit load


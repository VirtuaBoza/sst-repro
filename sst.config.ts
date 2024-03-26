/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-repro",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const SomeSecret = new sst.Secret("SomeSecret");

    const app = new sst.aws.Nextjs("MyApp", {
      path: "packages/my-app",
      link: [SomeSecret],
      environment: {
        SOME_SECRET: SomeSecret.value,
      },
    });

    return {
      appUrl: app.url,
    };
  },
});

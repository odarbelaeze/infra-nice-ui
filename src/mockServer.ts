import { createServer, Response } from "miragejs";

const mockServer = () => {
  if (process.env.NODE_ENV === "development") {
    const server = createServer({});

    server.get("/api/teama", () => ({
      message: "hello from team a",
      path: "/api/teama",
      host: "mockhost",
    }));

    server.get(
      "/api/teamb",
      () =>
        new Response(
          200,
          { "Content-Type": "text/html" },
          "<html><head></head><body></body></html>"
        )
    );
  }
};

export default mockServer;

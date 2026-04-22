const axios = require("axios");

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

describe("Testes API JSONPlaceholder", () => {

  test("GET posts", async () => {
    const res = await api.get("/posts");
    expect(res.status).toBe(200);
    expect(res.data.length).toBeGreaterThan(0);
  });

  test("GET post específico", async () => {
    const res = await api.get("/posts/1");
    expect(res.status).toBe(200);
    expect(res.data.id).toBe(1);
  });

  test("POST criar post", async () => {
    const res = await api.post("/posts", {
      title: "Teste",
      body: "Conteúdo",
      userId: 1
    });
    expect(res.status).toBe(201);
    expect(res.data.title).toBe("Teste");
  });

  test("PUT atualizar post", async () => {
    const res = await api.put("/posts/1", {
      title: "Atualizado"
    });
    expect(res.status).toBe(200);
  });

  test("DELETE post", async () => {
    const res = await api.delete("/posts/1");
    expect(res.status).toBe(200);
  });



  test("GET post inexistente", async () => {
    try {
      await api.get("/posts/9999");
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  test("POST sem body", async () => {
    const res = await api.post("/posts", {});
    expect(res.status).toBe(201);
  });

  test("PUT inexistente", async () => {
    try {
      await api.put("/posts/9999", {});
    } catch (err) {
      expect(err.response.status).toBe(500);
    }
  });

  test("DELETE inexistente", async () => {
    const res = await api.delete("/posts/9999");
    expect(res.status).toBe(200);
  });

  test("GET endpoint inválido", async () => {
    try {
      await api.get("/invalid");
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

});

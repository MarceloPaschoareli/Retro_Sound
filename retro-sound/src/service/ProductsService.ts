
export const myService = {
  getAll: async () => {
      try {
          const response = await fetch("http://localhost:3000/products");
          if (!response.ok) throw new Error("Erro ao buscar produtos");
          return await response.json();
      } catch (error) {
          console.error(error);
          return [];
      }
  },
  getId: async (id:string) => {
      try {
          const response = await fetch(`http://localhost:3000/products/${id}`);
          if (!response.ok) throw new Error("Erro ao buscar produto");
          return await response.json();
      } catch (error) {
          console.error(error);
          return null;
      }
  }
};

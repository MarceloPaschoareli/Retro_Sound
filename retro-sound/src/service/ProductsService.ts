export const myService = {
    getAll: async () => {
        try {
            const response = await fetch("https://backendrs.onrender.com/products");
            if (!response.ok) throw new Error("Erro ao buscar produtos");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    getId: async (id: string) => {
        try {
            const response = await fetch(`https://backendrs.onrender.com/products/${id}`);
            if (!response.ok) throw new Error("Erro ao buscar produto");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    cadastrarProduto: async (nome: string, description: string, price: number, url_photo: string, categoria: number) => {
        try {
            const response = await fetch(`https://backendrs.onrender.com/products`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nome,
                    description: description,
                    price: price,
                    url_photo: url_photo,
                    stock: 10,
                    categoryId: categoria
                })
            });

            return response;
        } catch (error) {
            return error;
        }
    },
    getCategorias: async () => {
        try {
            const response = await fetch(`https://backendrs.onrender.com/categories`);
            return await response.json();
        } catch (error) {
            return error;
        }
    },
    excluirProduto: async (id: number) => {
        try {
            const response = await fetch(`https://backendrs.onrender.com/products/${id}`, {
                method: "DELETE"
            });

            if (!response) {
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    },
    atualizarProduto: async (
        nome: string,
        description: string,
        price: number,
        url_photo: string,
        categoria: number,
        stock: number,
        id: number
    ) => {
        try {
            const response = await fetch(`https://backendrs.onrender.com/products/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nome,
                    description: description,
                    price: price,
                    url_photo: url_photo,
                    stock: stock,
                    categoryId: categoria
                })
            });

            return response;
        } catch (error) {
            return error;
        }
    }
};

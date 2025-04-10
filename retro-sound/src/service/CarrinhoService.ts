export const CarrinhoService = {
    criarCarrinho: async (userId: number) => {
        const response = await fetch("https://backendrs.onrender.com/cart/" + userId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        return await response.json();
    },
    getCarrinho: async (id: number) => {
        try {
            const response = await fetch(`https://backendrs.onrender.com/cart/${id}`);
            if (!response.ok) throw new Error("Erro ao buscar o carrinho");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    adicionarItem: async (cartId: number, idproduct: number) => {
        try {
            const response = await fetch("https://backendrs.onrender.com/cart/" + cartId + "/item", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: idproduct,
                    quantity: 1
                })
            });

            return response;
    
        } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
            return false;
        }
    },
    removerItem: async (cartId: number, productId: number) => {
        try {
            const response = await fetch("https://backendrs.onrender.com/cart/" + cartId + "/item/" + productId, {
                method: "DELETE"
            });

            if (!response) {
                return false;
            }

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    atualizarQuant: async (id: number, productId: number, qt: number) => {
        try {
            const response = await fetch("https://backendrs.onrender.com/cart/" + id + "/item", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,
                    quantity: qt
                })
            });

            if (!response) {
                return false;
            } 

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    checkoutCarrinho: async (cart: number, userID: number) => {
        try {
            const response = await fetch(`https://backendrs.onrender.com/cart/${cart}/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const novoCarrinho = await CarrinhoService.criarCarrinho(userID);

            sessionStorage.setItem("Carrinho", JSON.stringify(novoCarrinho));

            return response;
        } catch (error) {
            console.error("Erro no checkout:", error);
            return error;
        }
    }
}

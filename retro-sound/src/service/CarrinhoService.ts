
export const CarrinhoService = {
    criarCarrinho: async (id:number) => {
        const response = await fetch("http://localhost:3000/cart/"+id)
        return await response.json()
    },
    getCarrinho: async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/cart/${id}`);
            if (!response.ok) throw new Error("Erro ao buscar o carrinho");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    adicionarItem: async (cartId: number, idproduct: number) => {
        try {
            const response = await fetch("http://localhost:3000/cart/"+cartId+"/item", {
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
    removerItem: async (cartId:number, productId:number) =>{
        try{
            const response = await fetch("http://localhost:3000/cart/"+cartId+"/item/"+productId,{
                method:"DELETE"
            })

            if(!response){
                return false
            }

            return true
        } catch(error){
            console.log(error)
            return false
        }
    }
    ,
    atualizarQuant: async (id:number,productId:number,qt:number) =>{
        try{
            const response = await fetch("http://localhost:3000/cart/"+id+"/item", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,
                    quantity: qt
                })
            });

            if(!response){
                return false
            } 

            return true
        } catch(error){
            console.log(error)
            return false
        }
    } 
    
}        
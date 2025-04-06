
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
  },
  cadastrarProduto: async (nome:string, description:string, price:number, url_photo:string, categoria:number) =>{
    try{
        const response = await fetch(`http://localhost:3000/products`, 
        {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nome,
                description:description,
                price:price,
                url_photo:url_photo,
                stock:10,
                categoryId:categoria
            })
        })

        return response
    } catch (error){
        return error
    }
    },
    getCategorias: async ()=>{
        try{
            const response = await fetch(`http://localhost:3000/categories`)
            return await response.json()
        } catch (error){
            return error
        }   
    },
    excluirProduto: async (id:number)=>{
        try{
            const response = await fetch(`http://localhost:3000/products/${id}`,{
                method:"DELETE"
            })

            if(!response){
                return false
            }

            return true
        } catch (error){
            return false
        }
    },
    atualizarProduto
    : async (nome:string, description:string, price:number, url_photo:string, categoria:number) =>{
        try{
            const response = await fetch(`http://localhost:3000/products`, 
            {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nome,
                    description:description,
                    price:price,
                    url_photo:url_photo,
                    stock:10,
                    categoryId:categoria
                })
            })
    
            return response
        } catch (error){
            return error
        }
        }
};

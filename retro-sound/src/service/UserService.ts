export const UserService = {
    getUser: async (email: string) => {
        const response = await fetch(`https://backendrs.onrender.com/user/login/${email}`);
        return await response.json();
    },

    getUsers: async () => {
        const response = await fetch("https://backendrs.onrender.com/user");
        return await response.json();
    },

    fazerLogin: async (email: string, senha: string): Promise<boolean> => {
        try {
            const response = await fetch(`https://backendrs.onrender.com/user/login/${email}`);

            if (!response.ok) {
                return false;
            }

            const data = await response.json();

            return senha === data.password;
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);
            return false;
        }
    },

    getEmail: async(email:string)=>{
        try {
            const response = await fetch(`https://backendrs.onrender.com/user/login/${email}`);

            if (!response.ok) {
                return false;
            }

            const data = await response.json();

            return data
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);
            return false;
        }
    },

    verificarEmail: async (email: string) => {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return "Formato de e-mail inválido!";
        }

        try {
            const response = await fetch(`https://backendrs.onrender.com/user/login/${email}`);

            if (!response.ok) {
                return "";
            }

            return "E-mail já cadastrado";
        } catch (error) {
            return "Erro ao verificar e-mail";
        }
    },

    cadastrarUser: async (nome: string, email: string, senha: string): Promise<Response> => {
        try {
            const response = await fetch("https://backendrs.onrender.com/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nome,
                    email: email,
                    password: senha
                })
            });

            return response;
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            throw error;
        }
    },

    atualizarSenha: async (idUser: number, senha: string) => {
        try {
            const response = await fetch("https://backendrs.onrender.com/user/" + idUser, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: senha
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
    }
};

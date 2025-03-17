export const cookies = {
    inicializarSessionStorage() {
        if (sessionStorage.getItem("emailUsuario") === null) {
            sessionStorage.setItem("emailUsuario", "");
        }
        if (sessionStorage.getItem("idUsuario") === null) {
            sessionStorage.setItem("idUsuario", "0");
        }
    },
    
    fazerLogin(email: string, id: number) {
        sessionStorage.setItem("emailUsuario", email);
        sessionStorage.setItem("idUsuario", String(id));
    },

    verificarLogin() {
        return sessionStorage.getItem("idUsuario") !== "0" && sessionStorage.getItem("idUsuario") !== null;
    }
};

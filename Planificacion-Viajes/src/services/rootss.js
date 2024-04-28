
const root = "http://localhost:2100/api/";

export const RegitrarUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }

    try {
        const response =await fetch(`${root}auth/register`, options);
    } catch (error) {
        
    }
}
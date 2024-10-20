
interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  }
  
  interface ApiResponse {
    status: string; 
    message?: string; 
  }
    
export const sendContactForm = async (data: ContactFormData): Promise<ApiResponse> => {
    const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
    });

    if (!response.ok) {
        throw new Error("Failed to send message");
    }

    return response.json();
};
  
export const apiInsertUser = async (email: string, password: string) : Promise<any> =>{
    try {
        const response = await fetch('/api/auth/insert-user', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        if(!response.ok){
            throw new Error("Failed to insert user");
        }

        const responseData = response.json();

        return responseData;
    }
    catch (error) {
        console.log("Failed to insert user", error);
        return {status: 'error', message: 'An error occured'}
    }
}

export const apiAuthenticateUser = async (email: string, password: string) : Promise<any> =>{
    try {
        const response = await fetch('/api/auth/auth-user', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        if(!response.ok){
            throw new Error("Failed to authenticate user");
        }

        const responseData = response.json();

        return responseData;
    }
    catch (error) {
        console.log("Failed to authenticate user", error);
        return {status: 'error', message: 'An error occured'}
    }
}

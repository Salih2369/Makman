const API_URL = "http://localhost:5000/api/auth";

// دالة تسجيل الدخول
export const loginRequest = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return await response.json();
    } catch (error) {
        console.error("خطأ في الاتصال بالسيرفر:", error);
        return { error: "السيرفر لا يستجيب" };
    }
};

// دالة إنشاء حساب جديد
export const registerRequest = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return await response.json();
    } catch (error) {
        console.error("خطأ في الاتصال بالسيرفر:", error);
        return { error: "السيرفر لا يستجيب" };
    }
};
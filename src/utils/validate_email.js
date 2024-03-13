const validateEmail = (email) => {
        
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for validating email addresses

    if (!emailPattern.test(email)) {
    return false;
    }else{
        return true;
    }
        
};

export default validateEmail;
export const users = [
    { id: "1", email: "user1@example.com", password: "password123", name: "John Doe" },
];

export const findUserByEmail = (email: string) =>
    users.find((user) => user.email === email);

export const validateUser = (email: string, password: string) => {
    const user = findUserByEmail(email);
    return user && user.password === password ? user : null;
};

import GoogleProvider from "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ profile }) {
            return true; // Do different verification for other providers that don't have `email_verified`
        },
        async signOut({ session }) {
            return true; // Do different verification for other providers that don't have `email_verified`
        },
    },
};

export { authOptions };

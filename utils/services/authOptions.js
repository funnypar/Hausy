import GoogleProvider from "next-auth/providers/google";
import supabase from "./supabase";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ profile }) {
            // 1. Connect to datbase
            // 2. Check if user exists
            let { data: user, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", profile.email)
                .single();
            // 3. If not, then add user to database
            if (!user) {
                // Truncate
                const name = profile.name.slice(0, 20);

                const { data, error } = await supabase
                    .from("users")
                    .insert([
                        {
                            email: profile.email,
                            username: name,
                            image: profile.image,
                        },
                    ])
                    .select();
            }

            // Return true
            return true;
        },
        async signOut({ session }) {
            // 1. Get user from database
            let { data: user, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", session.user.email)
                .single();
            // 2. Assign the user id to the session
            session.user.id = user.id.toString();
            // 3. return
            return true;
        },
    },
};

export { authOptions };

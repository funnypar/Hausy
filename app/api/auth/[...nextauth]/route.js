import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const supabaseUrl = "https://juyibhfuuvdjptkpenxp.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1eWliaGZ1dXZkanB0a3BlbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNTgzNTcsImV4cCI6MjA0NDYzNDM1N30.qsKOuqBRJ0XvkeUsQ7GRNogQGrgi0BOrLtfJGFbDusE";
const supabase = createClient(supabaseUrl, supabaseKey);

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
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

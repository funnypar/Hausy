import connectDb from "@/config/database";

export const GET = async () => {
    try {
        await connectDb();
        return new Response(JSON.stringify({ data: "hi" }), { status: 200 });
    } catch (error) {
        console.log("Something went wrong...");
        return new Response(JSON.stringify({ data: null }), { status: 500 });
    }
};

import connectDb from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async () => {
    try {
        await connectDb();
        const properties = Property.find({});
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        console.log("Something went wrong...");
        return new Response(JSON.stringify({ message: error }), {
            status: 500,
        });
    }
};

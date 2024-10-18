import { getAllProperties } from "@/utils/services/getAllProperties";

// GET /api/properties
export const GET = async () => {
    try {
        const properties = await getAllProperties();
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        console.log("Something went wrong...");
        return new Response(JSON.stringify({ message: error }), {
            status: 500,
        });
    }
};

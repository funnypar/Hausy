import { getOneProperty } from "@/utils/services/getOneProperty";

// GET /api/properties/id
export const GET = async (request, { params }) => {
    try {
        const property = await getOneProperty(params.id);
        return new Response(JSON.stringify(property), { status: 200 });
    } catch (error) {
        console.log("Something went wrong...");
        return new Response(JSON.stringify({ message: error }), {
            status: 500,
        });
    }
};

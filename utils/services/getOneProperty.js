import supabase from "./supabase";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

const getOneProperty = async (id) => {
    try {
        // Handle the case where the domain is not avaliable yet
        if (!apiDomain) {
            return [];
        }
        let { data: property, error } = await supabase
            .from("properties")
            .select("*")
            .eq("id", id)
            .single();

        if (!property) {
            throw new Error(error);
        }

        return property;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export { getOneProperty };

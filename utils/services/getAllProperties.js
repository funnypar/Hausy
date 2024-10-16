import supabase from "./supabase";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

const getAllProperties = async () => {
    try {
        // Handle the case where the domain is not avaliable yet
        if (!apiDomain) {
            return [];
        }

        let { data: properties, error } = await supabase
            .from("properties")
            .select("*");

        if (!properties) {
            throw new Error(error);
        }

        return properties;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export { getAllProperties };

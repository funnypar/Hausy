import cloudinary from "@/config/cloudinary";
import { getAllProperties } from "@/utils/services/getAllProperties";
import { getSession } from "@/utils/services/getSession";
import supabase from "@/utils/services/supabase";

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

// POST /api/properties
export const POST = async (request) => {
    try {
        // Get User
        const session = await getSession();

        if (!session || session.userId) {
            return new Response("The user can not be found !", { status: 401 });
        }

        const { userId } = session;

        // Get the form Data
        const datas = await request.formData();

        // Access all the values
        const amenitiesData = datas.getAll("amenities");
        const imagesData = datas
            .getAll("images")
            .filter((image) => image.name !== "");

        // Create Property obj
        const propertyObj = {
            type: datas.get("type"),
            name: datas.get("name"),
            description: datas.get("description"),
            location: {
                street: datas.get("location.street"),
                city: datas.get("location.city"),
                state: datas.get("location.state"),
                zipcode: datas.get("location.zipcode"),
            },
            beds: datas.get("beds"),
            baths: datas.get("baths"),
            square_feet: datas.get("square_feet"),
            amenities: amenitiesData,
            rates: {
                weekly: datas.get("rates.weekly"),
                monthly: datas.get("rates.monthly"),
                nightly: datas.get("rates.nightly"),
            },
            seller_info: {
                name: datas.get("seller_info.name"),
                email: datas.get("seller_info.email"),
                phone: datas.get("seller_info.phone"),
            },
            owner: userId,
        };

        // Upload Images to cloudnary
        const imageUploadPromises = [];

        for (const image of imagesData) {
            const imageBuffer = await image.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            // Convert Image to base64
            const imageBase64 = imageData.toString("base64");

            // Upload
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,
                { folder: "mopano-hausy" }
            );

            imageUploadPromises.push(result.secure_url);

            // Wait for image upload
            const uploadImages = await Promise.all(imageUploadPromises);

            // Add uploaded images to the propertyObj
            propertyObj.images = uploadImages;
        }

        const { data, error } = await supabase
            .from("properties")
            .insert([propertyObj])
            .select();

        return new Response.redirect(
            `${process.env.NEXTAUTH_URL}/properties/${data.id}`
        );
    } catch (error) {
        console.log("Something went wrong...");
        return new Response(JSON.stringify({ message: error }), {
            status: 500,
        });
    }
};

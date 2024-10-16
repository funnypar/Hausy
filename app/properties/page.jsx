import PropertyCard from "@/components/PropertyCard";
import { getAllProperties } from "@/utils/services/getAllProperties";

const ProperitesPage = async () => {
    const properties = await getAllProperties();

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {properties.length === 0 ? (
                    <p>No Properties Found!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties?.map((property) => {
                            return (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProperitesPage;

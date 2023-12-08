import React from "react";
import { type ICondos } from "@/services/condosForSale/types";
import PropertyCard from "@/components/Molecules/PropertyCard/PropertyCard.component";
import CardsContainer from "@/components/Molecules/CardsContainer/CardsContainer";
import { getCondosByCategory } from "@/services/condosForSale/getCondosByCategory";
// import { categories } from '@/components/Molecules/CategoryFilter/CategoryFilter';
import Hero from "@/components/Molecules/Hero/Hero";
import { slugParser } from "@/utils/slugParser";
import ContactUsBanner from "@/components/Molecules/ContactUsBanner/ContactUsBanner";
import { categories } from "@/components/Molecules/CategoryFilter/config";

interface IPropertyCategoryPageParams {
  slug: string;
}

interface IPropertyCategoryPageProps {
  params: IPropertyCategoryPageParams;
}

export async function generateStaticParams(): Promise<any> {
  return categories.map((item) => ({ slug: item.slug }));
}

const PropertyCategoryPage: React.FC<IPropertyCategoryPageProps> = async ({ params: { slug } }) => {
  const results = await getCondosByCategory(slug);

  return (
    <React.Fragment>
      <Hero
        title={slugParser(slug)}
        subtitle='Discover all available properties for you'
        image={"/images/property-categories-hero.png"}
        altText='Property'
        height='md'
      />
      <section className='bg-gray-100 pt-10 pb-20'>
        <CardsContainer>
          {results?.condos.map((item: ICondos) => (
            <PropertyCard
              key={item.slug}
              {...item}
            />
          ))}
        </CardsContainer>
      </section>
      <section>
        <ContactUsBanner
          image='/images/real-estate-agents.png'
          altText='Real estate agents'
          full
        />
      </section>
    </React.Fragment>
  );
};

export default PropertyCategoryPage;

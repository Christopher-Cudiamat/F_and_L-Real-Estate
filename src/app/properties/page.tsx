import React from "react";
import { getProperties } from "@/services/properties/getProperties";
import { type IProperties } from "@/services/properties/types";
import PropertyCard from "@/components/Molecules/PropertyCard/PropertyCard.component";
import Pagination from "@/components/Molecules/Pagination/Pagination";
import CardsContainer from "@/components/Molecules/CardsContainer/CardsContainer";
import Hero from "@/components/Molecules/Hero/Hero";
import ContactUsBanner from "@/components/Molecules/ContactUsBanner/ContactUsBanner";
import SectionTitle from "@/components/Molecules/SectionTitle/SectionTitle";
import CategoryFilter from "@/components/Molecules/CategoryFilter/CategoryFilter";
import Filters from "@/components/Molecules/Filters/Filters";
import { parsePageParam } from "@/utils/parsePageParam";
import Container from "@/components/Atoms/Container/Container";
import { IoFilterSharp } from "react-icons/io5";

interface ISearchParams {
  searchParams: { page?: string };
}

const pageSize = 8;

const PropertiesPage: React.FC<ISearchParams> = async ({ searchParams }) => {
  const page = parsePageParam(searchParams.page);
  const results = await getProperties(pageSize, page);

  return (
    <React.Fragment>
      <Hero
        title='Properties'
        subtitle='Discover all available properties for you'
        image='/images/properties-hero.png'
        altText='Property'
        height='md'
      />
      <Filters />
      <section className='bg-white pt-10 lg:pt-20 pb-10'>
        <Container className='flex flex-col lg:flex-row items-center justify-center lg:justify-start text-lg md:text-xl gap-4 mb-10'>
          <IoFilterSharp
            size={50}
            className='text-slate-700'
          />
          <p className='text-slate-500 text-center capitalize font-semibold'>All Properties</p>
        </Container>
        <CardsContainer>
          {results?.condos.map((item: IProperties) => (
            <PropertyCard
              key={item.slug}
              {...item}
            />
          ))}
        </CardsContainer>
        <Pagination
          pageCount={results?.pageCount}
          page={page}
          path='/properties'
        />
      </section>
      <section
        className='bg-white pt-10 pb-14 md:py-14'
        id='section-category'
      >
        <SectionTitle
          title='Property Categories'
          withLine
        />
        <CategoryFilter />
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

export default PropertiesPage;

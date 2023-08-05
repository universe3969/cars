import { SearchBar, CustomFilter, Hero, CarCard, ShowMore } from "@/components"
import { yearsOfProduction, fuels} from "@/constants";
import { SearchBarProps, CustomFilterProps, CarProps } from "@/types"
import { fetchCars } from "@/utils"

interface HomeProps {
  searchParams: {
    manufacturer?: string;
    year?: number;
    fuel?: string;
    limit?: number;
    model?: string;
  };
}

export default async function Home({searchParams}: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });

  const isDataEmpty = allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore Cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels}/>
            <CustomFilter title="year" options={yearsOfProduction}/>
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car: CarProps) => (
                <CarCard car={car}/>
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10)/10}
              isNext={(searchParams.limit || 10) > allCars.length }
              />
          </section>
        ) : (
          <div className="home_error-container">
            <div className="text-black-text-xl">Oops, no results</div>
            <p>{allCars?.message}</p>
          </div>
        )}

      </div>
    </main>
  )
}

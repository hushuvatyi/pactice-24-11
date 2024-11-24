import {
  Container,
  CountryList,
  Heading,
  Loader,
  SearchForm,
  Section,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/countryApi';

const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = value => {
    setSearchParams({ region: value });
  };
  const region = searchParams.get('region');

  useEffect(() => {
    if (!region) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [region]);

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSubmit} />
        {isLoading && <Loader />}
        {error && <Heading title="Some want wrang" bottom />}
        {countries.length > 0 && <CountryList countries={countries} />}{' '}
      </Container>
    </Section>
  );
};

export default SearchCountry;

import {
  Container,
  CountryInfo,
  GoBackBtn,
  Heading,
  Loader,
  Section,
} from 'components';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

const Country = () => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { countryId } = useParams();
  const location = useLocation();
  console.log(location, 'country');

  const goBack = useRef(location?.state ?? '/');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [countryId]);

  return (
    <Section>
      <Container>
        <GoBackBtn path={goBack.current}>Go back</GoBackBtn>
        {isLoading && <Loader />}
        {error && <Heading title="Something went wrong" bottom />}
        {country && <CountryInfo {...country} />}
      </Container>
    </Section>
  );
};

export default Country;

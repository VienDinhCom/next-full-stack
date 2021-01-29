import { ApiService, useQuery } from '@frontend/services/api.service';
import { DefaultLayout } from '@frontend/components/Layouts/DefaultLayout';

export default function Page() {
  const { loading, data, error, refetch } = useQuery(async () => {
    return ApiService.message.hello({ name: 'Vien' });
  }, []);

  if (loading)
    return (
      <DefaultLayout>
        <p>Loading ...</p>
      </DefaultLayout>
    );

  if (error)
    return (
      <DefaultLayout>
        <p>Error: {error.message}</p>
      </DefaultLayout>
    );

  return (
    <DefaultLayout>
      <h1>{data}</h1>
      <button onClick={refetch}>Refetch</button>
    </DefaultLayout>
  );
}

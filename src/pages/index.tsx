import { ApiService, useQuery } from '@frontend/services/api.service';

export default function Page() {
  const { loading, data, error, refetch } = useQuery(async () => {
    return ApiService.message.hello({ name: 'Vien' });
  }, []);

  if (loading) return <p>Loading ...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data}</h1>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
}

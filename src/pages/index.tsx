import { ApiService } from '@frontend/services/api.service';

export default function Page() {
  const { loading, data, error } = ApiService.useQuery(({ message }) => {
    return message.hello({ name: 'Vien' });
  });

  if (loading) return <p>Loading ...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return <h1>{data}</h1>;
}
